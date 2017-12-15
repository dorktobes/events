const client = require('../../database/');

const skip = (req, res, next) => {
  //set end time of an ad
  // if (req.body.event_log.action.type ==='skip') {
    //flag determineView
    console.log('logging skip');
    
  // }

  next();
};

const pause = (req, res, next) => {
  //start a timeDelta on the document for 
  //req.body.docid + sessionid
  // if (req.body.event_log.action.type ==='pause') {
    console.log('logging pause');
  // }
  next();

};

const resume = (req, res, next) => {
  //end a timeDelta on the document for 
  //req.body.docid + sessionid
  // if (req.body.event_log.action.type ==='resume') {
    console.log('logging resume');
  // }
  next();

};

const nav = (req, res, next) => {
  //end document for req.body.event_log.from
  //flag above document as ready-to-process
  //start document for req.body.event_log.to
  // if (req.body.event_log.action.type ==='nav') {
    console.log('logging navigation');
    //flag determineView
  // }
  next();
};

const determineView = (req, res, next) => {
  let query = 'select * from log';
  client.execute(query, [], (err, data) => {
    if (err) return console.log(err);
    console.log(data);
  })
  //if document is flagged for dV,
    //compare total viewtime with video length
    //if doc is ad
      //is view time over 30secs || is video watched to completion
      //send for view increment
    //else
      //if viewtime is more than 12% of video length
        //send for view increment

};


module.exports = {
  skip,
  pause,
  resume,
  nav,
  determineView, 
};