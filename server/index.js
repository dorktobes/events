const express = require('express');
const { handleNav, } = require('./utils/middleware/');
const { updateBreakStart, updatePauseDelta } = require('../database/controllers');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

let app = express();

app.use(bodyParser.json())
app.use(cookieParser());

app.use('/video/:vid/event/nav', handleNav, (req, res) => {
  res.send(req.log);
})
app.use('/video/:vid/event/pause', updateBreakStart, (req, res) => {
  res.send();
})
app.use('/video/:vid/event/resume', updatePauseDelta, (req, res) => {
  res.send();
})


app.listen(1982, console.log('listening...'));