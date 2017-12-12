let express = require('express');
let { skip, pause, resume, nav, determineView, } = require('./utils/');


let app = express();

app.use('/log_event', skip, pause, resume, nav, determineView, (req, res) => {
  res.send();
})

// app.use('/watchtime', (req, res) => {
//   res.send();
// })



app.listen(1982, console.log('listening...'));