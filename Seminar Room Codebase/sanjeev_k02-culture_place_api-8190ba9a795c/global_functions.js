to = (promise) => { // global function that will help use handle promise rejections
    return promise
      .then((data) => [null, data]).catch((err) =>
        [pe(err)]);
  };
  
  pe = require('parse-error');// parses error so you can read error message and handle them accordingly
  
  TE = (errMessage, log) => { // TE stands for Throw Error
    if (log === true) {
      console.error(errMessage);
    }
  
    throw new Error(errMessage);
  };
  
  ReE = (res, err, code) => { // Error Web Response
    if (typeof err === 'object' && typeof err.message !== 'undefined') {
      err = err.message;
    }
  
    if (typeof code !== 'undefined') res.statusCode = code;
  
    return res.send({ status: false, errorDescription: err, successObject: '' });
  };
  
  ReS = (res, data, code) => { // Success Web Response
    const sendData = { status: true, successObject: data, errorDescription: '' };
  
  
    if (typeof code !== 'undefined') res.statusCode = code;
  
    return res.json(sendData);
  };
  
  // This is here to handle all the uncaught promise rejections
  // process.on('unhandledRejection', error => {
  //     console.error('Uncaught Error', pe(error));
  // });
  