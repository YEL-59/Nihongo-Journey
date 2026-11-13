import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './routes';
import notFound from './middlewares/notFound';
import globalErrorHandler from './middlewares/globalErrorHandler';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Application API routes
app.use('/api', router);

// Root health route
app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'EasyTemplate API Server is running smoothly!',
    timestamp: new Date().toISOString(),
  });
});

// 404 & Global Error Handling
app.use(notFound);
app.use(globalErrorHandler);

export default app;
