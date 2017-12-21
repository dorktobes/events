const express = require('express');
const { handleNav, test, } = require('./utils/');
const { updateBreakStart, updatePauseDelta } = require('../database/controllers');
const bodyParser = require('body-parser');


let app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/video/:vid/event/nav', test, handleNav, (req, res) => {
  res.send(req.log);
})
app.use('/video/:vid/event/pause', test, updateBreakStart, (req, res) => {
  res.send();
})
app.use('/video/:vid/event/resume', test, updatePauseDelta, (req, res) => {
  res.send();
})


app.listen(1982, console.log('listening...'));