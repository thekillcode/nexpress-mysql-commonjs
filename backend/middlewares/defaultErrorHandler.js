const defaultErrorHandler = async (err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    error: {
      status: err.status || 500,
      message: JSON.parse(err.message),
    },
  });
};

module.exports = defaultErrorHandler;
