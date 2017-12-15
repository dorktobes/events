const client = require('.');
const crypto = require('crypto');
let hash;


const startTime = new Date();

for (let i = 1; i < 10; i++) {
	hash = crypto.createHash('sha256')
	let rec = {};
	rec.log_start = Date.now() - (Math.random() * Date.now());
	rec.v_id = i;
	rec.session_id = crypto.randomBytes(32).toString('hex')
	hash.update(rec.v_id + rec.session_id)
	rec.log_id = hash.digest('hex');
	rec.is_ad = Math.random() > 0.9 ? true : false
    rec.start_time = rec.log_start - (Math.random() * 10000)
    rec.break_start = Math.random > 0.7 ? rec.start_time + (Math.random() * 10000): null
    rec.pause_delta = rec.break_start ? rec.break_start + Math.random() * 10000 : null
    rec.ready_to_process = i < 5001 ? false : true
    rec.v_len = rec.is_ad ? (Math.random() > 0.5 ? 15000 : 30000): Math.random() * (1800000 - 5000) + 5000
    rec.log_end = rec.start_time ? rec.log_start + rec.pause_delta + (rec.v_len * Math.random()) : rec.log_start + rec.v_len * Math.random();
    console.log(rec)

}

console.log('STARTING SEEDING AT', startTime, 'FINISHED SEEDING AT', new Date());


  
  //10,000,000 files
  //9,995,000 finished records
