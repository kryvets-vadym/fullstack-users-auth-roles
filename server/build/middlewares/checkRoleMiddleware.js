import { ApiError } from '../exceptions/apiError.js';
export const checkRoleMiddleware = (roles) => {
    return (req, res, next) => {
        if (req.user && roles.includes(req.user.role.toUpperCase())) {
            next();
        }
        else {
            throw ApiError.UserRoleError();
        }
    };
};
//# sourceMappingURL=checkRoleMiddleware.js.map