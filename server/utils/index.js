

const skip = (req, res, next) => {
  console.log('logging skip');
  next();
  //set end time of an ad

};

const pause = (req, res, next) => {
  //start a timeDelta on the document for 
  //req.body.docid + sessionid
  console.log('logging pause');
  next();

};

const resume = (req, res, next) => {
  //end a timeDelta on the document for 
  //req.body.docid + sessionid
  console.log('logging resume');
  next();

};

const nav = (req, res, next) => {
  //end document for req.body.event_log.from
  //flag above document as ready-to-process
  //start document for req.body.event_log.to
  console.log('logging navigation');
  next();
};


module.exports = {
  skip,
  pause,
  resume,
  nav,
};