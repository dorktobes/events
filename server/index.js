let express = require('express');
let { skip, pause, resume, nav,} = require('./utils/');


let app = express();

app.use('/log_event', skip, pause, resume, nav, (req, res) => {
  res.send();
})

app.use('/watchtime', (req, res) => {
  res.send();
})



app.listen(1982, console.log('listening...'));