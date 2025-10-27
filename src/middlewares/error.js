export const errorHandler = (err, req, res, next) => {
  // Log the error details for debugging purposes
  console.error(err);

  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  const response = { error: message };

  // Include stack trace only in development environment
  if (process.env.NODE_ENV !== 'production' && err.stack) {
    response.stack = err.stack;
  }

  res.status(status).json(response);
};

export default errorHandler;