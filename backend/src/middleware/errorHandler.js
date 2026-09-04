function errorHandler(err, req, res, next) {
  console.error(`[Error] ${req.method} ${req.url}:`, err.message);
  
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
}

module.exports = errorHandler;
