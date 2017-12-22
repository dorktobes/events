const client = require('../');
const { createHash } = require('../../server/utils');

const updateBreakStart = (vidMeta, session, timestamp) => {
  return new Promise((resolve, reject) => {
    client.execute('UPDATE log SET break_start = ? WHERE log_id = ?;', [timestamp, createHash(vidMeta.v_id + session)], {prepare: true})
    .then((data) => {
      resolve(data);
    }, (err) => {
      reject(err);
    })
  })
};

const updatePauseDelta = (vidMeta, session, timestamp) => {
  return new Promise((resolve, reject) => {
    let log_id = createHash(vidMeta.v_id + session)
    client.execute(`
      SELECT break_start 
      FROM log 
      WHERE log_id = ?;`,[log_id], {prepare: true})
    .then((data) => {
      let break_start = data.rows[0].break_start;
      client.execute(`
        UPDATE log 
        SET pause_delta = ?
        WHERE log_id = ?;`, [timestamp - break_start, log_id], {prepare: true})
      .then(
        (data) => {
          resolve(data);
        },
        (err) => {
          reject(err)
        }
      )
    });
  })
};

const updateLogEnd = (vidMeta, session, timestamp) => {
  return new Promise((resolve, reject) => {
    client.execute('UPDATE log SET log_end = ? WHERE log_id = ?;', [timestamp, createHash(vidMeta.v_id + session)], {prepare: true})
    .then((data) => {
      resolve(data);
    }, (err) => {
      reject(err);
    });
  });
};

const startRecord = (vidMeta, session, timestamp) => {
  return new Promise((resolve, reject) => {
    let params = [createHash(vidMeta.id + session), vidMeta.id, vidMeta.isAd, timestamp, false];
    client.execute('INSERT INTO log (log_id, v_id, is_ad, start_time, ready_to_process) VALUES ( ?, ?, ?, ?, ?);', params, {prepare: true}, (err, data)  => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const retrieveRecord = (vidMeta, session, timestamp) => {
  return new Promise((resolve, reject) => {
    client.execute(`
      SELECT * 
      FROM log 
      WHERE log_id = ? ;`, 
      [createHash(vidMeta.id + session)], 
      {prepare: true}, 
      (err, data)  => {
        if (err) {
          reject(err);
        } else {
          resolve(data.rows[0]);
        }
      }
    )
  });
};

module.exports = {
  updateBreakStart, 
  updatePauseDelta,
  updateLogEnd,
  startRecord,
  retrieveRecord,
};