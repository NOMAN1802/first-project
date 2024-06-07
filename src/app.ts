/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// Middleware for parsing JSON and enabling CORS
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api/v1', router);

// Test route
const test = async(req: Request, res: Response) => {
  Promise.reject()
  const a = 10;
  res.json({ value: a }); // Send a JSON response instead of a raw number
};

app.get('/', test);

// Not Found middleware (should be after all routes)
app.use(notFound);

// Global error handler (should be last middleware)
app.use(globalErrorHandler);

export default app;
