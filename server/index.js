const express = require('express');
const { skip, pause, resume, nav, determineView, test, } = require('./utils/');
const bodyParser = require('body-parser');


let app = express();
// app.use(bodyParser);

app.use('/log_event', test, nav, skip, pause, resume, determineView, (req, res) => {
  res.send();
})


app.listen(1982, console.log('listening...'));