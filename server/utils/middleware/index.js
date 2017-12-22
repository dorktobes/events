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
  );

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

module.exports = { handleNav, };