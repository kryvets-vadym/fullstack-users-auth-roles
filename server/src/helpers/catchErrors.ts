import { Request, Response, NextFunction } from 'express';
import { Action } from '../types/Action.js';

export const catchErrors = (action: Action) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await action(req, res, next);
    } catch (error) {
      next(error);
    }
  }
};
