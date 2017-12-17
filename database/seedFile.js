const client = require('.');
const crypto = require('crypto');
let hash;

client.execute('DROP TABLE IF EXISTS log')
.then((data) => {
  console.log('deleted table', data);
  return client.execute('CREATE TABLE events.log ( log_id text PRIMARY KEY, session_id text, v_id int, is_ad boolean, start_time decimal, break_start decimal, pause_delta decimal, ready_to_process boolean, log_end decimal, log_start decimal, v_len decimal,);', {prepare: false});
})
.then((data) => {
  console.log('Created Table', data);
  seedDB(0);
})

const seedDB = (numOfRecords) => {
  let queries = [];
  for (let i = 1; i < 101; i++) {
    hash = crypto.createHash('sha256')
    let query = {
      query: 'INSERT INTO log (log_start, v_id, session_id, log_id, is_ad, start_time, break_start, pause_delta, ready_to_process, v_len, log_end) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      params: [],
    }
    query.params.push(log_start = Date.now() - (Math.random() * Date.now()));
    query.params.push(v_id = i + numOfRecords);
    query.params.push(session_id = crypto.randomBytes(32).toString('hex'));
    hash.update(v_id + session_id);
    query.params.push(log_id = hash.digest('hex'));
    query.params.push(is_ad = Math.random() > 0.9 ? true : false);
    query.params.push(start_time = log_start - (Math.random() * 10000));
    query.params.push(break_start = Math.random() > 0.7 ? start_time + (Math.random() * 10000): null);
    query.params.push(pause_delta = break_start ? break_start + Math.random() * 10000 : null);
    query.params.push(ready_to_process = v_id < 5001 ? false : true);
    query.params.push(v_len = is_ad ? (Math.random() > 0.5 ? 15000 : 30000): Math.random() * (1800000 - 5000) + 5000);
    query.params.push(log_end = break_start ? log_start + pause_delta + (v_len * Math.random()) : log_start + v_len * Math.random());
    queries.push(query);
  }

      client.batch(queries, { prepare: true })
      .then(result => {
        console.log('Data updated on cluster')
        queries = undefined;
        if ((numOfRecords + 100) === 10000000) {
          console.log('database seeded with', numOfRecords + 100, 'records \n ****END****')
        } else {
          console.log('inserted', numOfRecords, 'records');
          seedDB(numOfRecords + 100)
        }
      });

};
  
  //10,000,000 files
  //9,995,000 finished records
