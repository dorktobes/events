const client = require('../../database/');
const { startRecord, retrieveRecord } = require('../../database/controllers');
const crypto = require('crypto');


const determineView = (log) => {
    let view, totalWatchTime = log.log_end - log.start_time - log.pause_delta;
    if (log.is_ad) {
      view = totalWatchTime >= 30000 || totalWatchTime === log.v_len;
      if (view) {
        //send PATCH request to videos to increment views
        return 1;
      }
    } else {
      view = totalWatchTime >= log.v_len * 0.10
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
    retrieveRecord(req.from, session, req.dispatchTime)
    .then(
      (data) => {
        data.log_end = req.dispatchTime;
        determineView(data)
      },
      (err) => {
        console.error(err)
      }
    )
  }
};
//this is for dev purposes only
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
  handleNav,
  determineView,
  test, 
};
