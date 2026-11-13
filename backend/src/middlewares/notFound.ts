import { Request, Response } from 'express';

const notFound = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: `API Route Not Found: [${req.method}] ${req.originalUrl}`,
    error: '',
  });
};

export default notFound;
