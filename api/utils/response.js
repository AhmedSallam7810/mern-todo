const successResponse = (res, data = {}, message = 'Success', status = 200) => {
    return res.status(status).json({
      success: true,
      message,
      data
    });
  };

  const successTokenResponse = (res, data = {}, message = 'Success', token = null, status = 200) => {
    return res.status(status).json({
      success: true,
      message,
      data,
      token
    });
  };
  
const errorResponse = (res, error = 'Something went wrong', status = 500) => {
    return res.status(status).json({
      success: false,
      message: error,
      data:{}
    });
  };

  module.exports={successResponse,errorResponse,successTokenResponse}