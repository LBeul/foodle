import { NextFunction, Request, Response } from 'express';

const logError = (...props: string[]) => {
  console.error(...props);
};

const errorHandler = (
  error: Error,
  _: Request,
  response: Response,
  next: NextFunction
) => {
  logError(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'invalid id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' });
  }
  next(error);
};

export default errorHandler;
