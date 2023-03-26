import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { catchErrors } from '../helpers/catchErrors.js';
import * as usersController from '../controllers/usersController.js';
import { checkRoleMiddleware } from '../middlewares/checkRoleMiddleware.js';
import { UserRoles } from '../types/UserRoles.js';


const router = Router()

router.get('/users',
  authMiddleware,
  checkRoleMiddleware([
    UserRoles.ADMIN,
    UserRoles.PAIRED,
    UserRoles.UNPAIRED
  ]),
  catchErrors(usersController.getUsers),
)

export default router
