const express = require('express');
const { nav, determineView, test, } = require('./utils/');
const { updateBreakStart, updatePauseDelta } = require('../database/controllers');
const bodyParser = require('body-parser');


let app = express();
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())

// app.get('/', (req, res) => {
// 	res.send('this isn\'t an endpoint');
// })
app.use('/video/:vid/event/nav', test, nav, determineView, (req, res) => {
  res.send(req.log);
})
app.use('/video/:vid/event/pause', test, updateBreakStart, (req, res) => {
  res.send();
})
app.use('/video/:vid/event/resume', test, updatePauseDelta, (req, res) => {
  res.send();
})


app.listen(1982, console.log('listening...'));