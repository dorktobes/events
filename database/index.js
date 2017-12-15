const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ["127.0.0.1:9042"], keyspace: 'events' });

client.connect((err)=> {
	  if (err) return console.error(err);
  console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());
});

module.exports = client;

// let initTable = `CREATE TABLE log ( log_id text PRIMARY KEY, session_id text, v_id int, is_ad boolean, start_time int, break_start int, pause_delta int, ready_to_process boolean, log_end int, log_start int, );`
// const query = 'SELECT * FROM log';
// client.execute(query, [], { prepare: true }, function (err, result) {
//   if (err) return console.log(err);
//   console.log(result);
// });
// client.execute(query, (err, res) => {
// 	if (err) {
// 		console.log(err)
// 	} else {
// 		console.log(res)
// 	}
// })