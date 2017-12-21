const client = require('../');
const { createHash } = require('../../server/utils/')

const updateBreakStart = (req, res, next) => {
  client.execute('UPDATE log SET break_start = ? WHERE log_id = ?;', [req.body.dispatchTime, createHash(req.body.targetVid.v_id + req.cookies.youtube_session)], {prepare: true})
  .then((data) => {
    next();
  }, (err) => {
    res.send(err);
  })
};

const updatePauseDelta = (req, res, next) => {
  console.log(req);
  let log_id = createHash(req.body.targetVid.v_id + req.cookies.youtube_session)
  client.execute(`
    SELECT break_start 
    FROM log 
    WHERE log_id = ?`,[log_id], {prepare: true})
  .then((data) => {
    let break_start = data.rows[0].break_start;
    console.log(break_start);
    client.execute(`
      UPDATE log 
      SET pause_delta = ?
      WHERE log_id = ?;`, [req.body.dispatchTime - break_start, log_id], {prepare: true})
    .then((data) => {
      console.log(data);
      next();
    })
  }, (err) => console.log(err))
};

const startRecord = (vidMeta, session, timestamp) => {

};

const retrieveRecord = (vidMeta, session, timestamp) => {

};

module.exports = {
  updateBreakStart, 
  updatePauseDelta,
  startRecord,
}