import { ErrorRequestHandler } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong on the server!';

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages: [
      {
        path: '',
        message: err?.message,
      },
    ],
    stack: process.env.NODE_ENV === 'development' ? err?.stack : undefined,
  });
};

export default globalErrorHandler;
