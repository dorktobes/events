const { startRecord, retrieveRecord, updateLogEnd } = require('../../../database/controllers');

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
    updateLogEnd(req.from, session, req.dispatchTime).then(() => {
      retrieveRecord(req.from, session, req.dispatchTime)
    })
    .then(
      (data) => {
        data.log_end = req.dispatchTime;
        determineView(data);
      },
      (err) => {
        console.error(err);
      }
    );
  }
};
//this is for dev purposes only
const test = (req, res, next) => {
  let today = new Date();
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

module.exports = { handleNav, test, }