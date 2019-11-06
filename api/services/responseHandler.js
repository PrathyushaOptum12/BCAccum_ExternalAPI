function handleResponse(error, req, res, result) {
    let resObj = {
      'success': error ? false : true,
      'error': error,
      'data': result
    };
    res.json(resObj);
  }
  
  module.exports = handleResponse;