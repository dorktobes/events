const client = require('../../database/');
const { startRecord } = require('../../database/controllers');
const crypto = require('crypto');

/******************Note about nav*************
* this is the first middleware usedfor the /log_event endpoint. 
* if the event is a navigation event:
* it closes the first log and flags it for processing
* then it creates a new event to be saved for the next video
*
* for any other endpoint, it still does the work of retrieving the event from the db and attaching it to the body
* the actual event will do the saving
*/
const nav = (req, res, next) => {
  if (req.body.type === 'nav') {
    console.log('logging navigation');
    if (req.body.from) {
      client.execute('SELECT * FROM log WHERE log_id = ? ;', [createHash(req.body.from.id + req.cookies.youtube_session)], {prepare: true})
      .then((data) => {
        // console.log(data);
        req.workToDo = data.rows[0];
        req.workToDo.ready_to_process = true;
        let params = [createHash(req.body.to.id + req.cookies.youtube_session), req.body.targetVid.id, req.body.targetVid.isAd, req.body.dispatchTime, false, 0];
        client.execute('INSERT INTO log (log_id, v_id, is_ad, start_time, ready_to_process, pause_delta) VALUES ( ?, ?, ?, ?, ?, ?)', params, {prepare: true}, (err, data) => {
          if (err) {
            console.log(err)
          } else {
            // console.log(data)
          }
            next();
        })
      })
      
    } else {
      let params = [createHash(req.body.targetVid.id + req.cookies.youtube_session), req.body.targetVid.id, req.body.targetVid.isAd, req.body.dispatchTime, false];
      client.execute('INSERT INTO log (log_id, v_id, is_ad, start_time, ready_to_process) VALUES ( ?, ?, ?, ?, ?)', params, {prepare: true}, (err, data) => {
        if (err) {
          console.log(err)
        } else {
          // console.log(data)
        }
        next();
      })
    }
    
  }
};
//================> make this a cb and not middleware
const determineView = (log) => {
    let view, totalWatchTime = req.body.dispatchTime - req.workToDo.start_time - req.workToDo.pause_delta;
    if (req.workToDo.is_ad) {
      view = totalWatchTime >= 30000 || totalWatchTime === req.workToDo.v_len;
      if (view) {
        //send PATCH request to videos to increment views
        return 1;
      }
    } else {
      view = totalWatchTime >= req.workToDo.v_len * 0.10
      if (view) {
        //send PATCH request to videos to increment views
        return 1;
      }
    }
  return 0;
};
/////////////rename this
const handleNav = (req, res, next) => {
  let session = req.cookies.youtube_session;
  startRecord(req.body.targetVid, session, req.dispatchTime)
  .then(
    (data) => {
      next();
    },
    (err) => {
      res.status(500).send('something broke')
    }
  )
  if (req.body.from) {
    determineView(retrieveRecord(req.from, session, req.dispatchTime));
  }
};

const test = (req, res, next) => {
  let today = new Date()
  req.cookies = {
    youtube_session: '14aefda9799b3919125b3ed4d1f3f0942d4ae7273ff0d7e25f55c8c28a6ed056'//createHash( Math.floor(Math.random() * 10 + 1) + "" + today.getDate() + today.getHours())
  } 

  req.body = {
    targetVid: {
      v_id: '6777789',
      isAd: true,
      len: '30000',
    },
    type: 'resume',
    from: null,
    dispatchTime: Date.now(),
  }



  //sampe non-ad { id: '4561019', isAd: false, len: '21057'}
  //sample ad { id: '6777789', isAd: true, len: '3000'}
  next();
};

const createHash = (key) => {
  const hash = crypto.createHash('sha256');
  hash.update(key);
  return hash.digest('hex');
}

module.exports = {
  createHash,
  nav,
  determineView,
  test, 
};