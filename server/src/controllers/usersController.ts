import { RequestWithUser } from '../middlewares/authMiddleware.js';
import { Response } from 'express';
import * as usersService from '../service/usersService.js';

export const getUsers = async (req: RequestWithUser, res: Response) => {
  const usersFromDb = await usersService.getUsers(req.user.role);

  return res.json(usersFromDb);
};
