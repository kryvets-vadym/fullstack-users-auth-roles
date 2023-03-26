import { UserRoles } from '../types/UserRoles.js';
import UserItem from '../models/UserItem.js';
export const getUsers = async (role) => {
    let users;
    switch (role) {
        case UserRoles.ADMIN:
            users = await UserItem.find({});
            break;
        case UserRoles.PAIRED:
            users = await UserItem.find({ userId: { $mod: [2, 0] } });
            break;
        case UserRoles.UNPAIRED:
            users = await UserItem.find({ userId: { $mod: [2, 1] } });
            break;
    }
    return users;
};
//# sourceMappingURL=usersService.js.map