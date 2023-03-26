import * as usersService from '../service/usersService.js';
export const getUsers = async (req, res) => {
    const usersFromDb = await usersService.getUsers(req.user.role);
    return res.json(usersFromDb);
};
//# sourceMappingURL=usersController.js.map