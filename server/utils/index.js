// const client = require('../../database/');
const crypto = require('crypto');


const createHash = (key) => {
  const hash = crypto.createHash('sha256');
  hash.update(key);
  return hash.digest('hex');
}

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

module.exports = {
  createHash,
  determineView, 
};
