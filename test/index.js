const assert = require('assert');
const { nav, pause, resume, determineView } = require('../server/utils')
const client = require('../database');

after(() => {
  client.shutdown(() => {
    console.log('closing connection with the db');
  })
})

describe('Middleware', () => {
  describe('init nav', () => {
    it('placeholder', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    })
  })
  describe('pause', () => {
    it('placeholder', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    })
  })
  describe('resume', () => {
    it('placeholder', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    })
  })
  describe('between nav', () => {
    it('placeholder', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    })
  })
  describe('determineView', () => {
      let log = {
       log_id: 'f2315ad268f05c5866266f86497d546591716d2d787137deddf4550c703da0c9',
       break_start: 1513551026874,
       is_ad: true,
       log_end: 100000,
       log_start: 70000,
       pause_delta: 0,
       ready_to_process: false,
       session_id: null,
       start_time: 70000,
       v_id: null,
       v_len: 31000 }
    it('should return 1 when video is an ad and the user has watched 30 or more seconds', () => {
      assert.equal(determineView(log), 1);
    })
    it('should return 1 when video is an ad and the user has watched the entire video', () => {
      log.start_time = 0;
      log.v_len = 15000;
      log.log_end = 15000;
      assert.equal(determineView(log), 1);
    })
    it('should return 1 when video is not an ad and the user has watched 10% or more', () => {
      log.v_len = 60000;
      log.is_ad = false;
      log.log_end = 6001;
      assert.equal(determineView(log), 1);
    })
  })
})