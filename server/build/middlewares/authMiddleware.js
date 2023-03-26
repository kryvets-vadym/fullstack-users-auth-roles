import { ApiError } from '../exceptions/apiError.js';
import * as tokenService from '../service/tokenService.js';
export function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        throw ApiError.UnauthorizedError();
    }
    const [, accessToken] = authHeader.split(' ');
    if (!accessToken) {
        throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
        throw ApiError.UnauthorizedError();
    }
    req.user = userData;
    next();
}
//# sourceMappingURL=authMiddleware.js.map