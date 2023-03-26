import { NextFunction, Response } from 'express';
import { RequestWithUser } from './authMiddleware.js';
import { ApiError } from '../exceptions/apiError.js';

export const checkRoleMiddleware = (roles: Array<string>) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (req.user && roles.includes(req.user.role.toUpperCase())) {
      next();
    } else {
      throw ApiError.UserRoleError();
    }
  };
}
