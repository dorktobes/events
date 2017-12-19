const express = require('express');
const { skip, pause, resume, nav, determineView, test, } = require('./utils/');
const bodyParser = require('body-parser');


let app = express();
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.send('this isn\'t an endpoint');
})

app.use('/log_event', test, nav, skip, pause, resume, determineView, (req, res) => {
  res.send(req.log);
})


app.listen(1982, console.log('listening...'));