const express = require('express');
const { handleNav, handlePause, handleResume } = require('./utils/middleware/');
// const { updateBreakStart, updatePauseDelta } = require('../database/controllers');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

let app = express();

app.use(bodyParser.json())
app.use(cookieParser());

app.use('/video/:vid/event/nav', handleNav, (req, res) => {
  res.send(req.log);
})
app.use('/video/:vid/event/pause', handlePause, (req, res) => {
  res.send();
})
app.use('/video/:vid/event/resume', handleResume, (req, res) => {
  res.send();
})


app.listen(1982, console.log('listening...'));