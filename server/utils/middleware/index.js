const { startRecord, retrieveRecord, updateLogEnd, updatePauseDelta, updateBreakStart, } = require('../../../database/controllers');
const { determineView } = require('../');

const handleNav = (req, res, next) => {
  let session = req.cookies.youtube_session;
  let timestamp = req.body.dispatchTime;
  let logToClose = req.body.from;

  startRecord(req.body.targetVid, session, req.body.dispatchTime)
  .then((data) => {
      next();
  })
  .catch((err) => {
    res.status(500).send('something broke')
  });

  if (logToClose) {
    updateLogEnd(logToClose, session, timestamp)
    .then(() => {
      return retrieveRecord(logToClose, session, timestamp)
    })
    .then(
      (data) => {
        determineView(data);
      },
      (err) => {
        console.error(err);
      }
    );
  }
};

const handlePause = (req, res, next) => {
  updateBreakStart(req.body.targetVid, req.cookies.youtube_session, req.body.dispatchTime)
  .then((succesData) => {
    res.status(201).send(succesData);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
};

const handleResume = (req, res, next) => {
  updatePauseDelta(req.body.targetVid, req.cookies.youtube_session, req.dispatchTime)
  .then((succesData) => {
    res.status(201).send(succesData);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
};

module.exports = { handleNav, handlePause, handleResume };