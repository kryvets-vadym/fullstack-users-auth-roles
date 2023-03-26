import * as authService from '../service/authService.js';
import * as tokenService from '../service/tokenService.js';
import { ApiError } from '../exceptions/apiError.js';
import { validateRegisterInput } from '../helpers/registerValidation.js';
import Token from '../models/Token.js';
export const registration = async (req, res) => {
    const { isValid, errors } = validateRegisterInput(req.body);
    if (!isValid) {
        throw ApiError.BadRequest('Error in validating incoming data!', errors);
    }
    const { email, username, password, role } = req.body;
    const userData = await authService.registration(email, username, password, role);
    res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    });
    return res.json(userData);
};
export const activate = async (req, res) => {
    const activationLink = req.params.link;
    const activateData = await authService.activate(activationLink);
    res.cookie('refreshToken', activateData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    });
    res.send(activateData);
    return res.redirect(`${process.env.CLIENT_URL}/login`);
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    const userData = await authService.login(email, password);
    res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    });
    return res.send({
        user: userData.userDto,
        accessToken: userData.accessToken,
    });
};
export const logout = async (req, res) => {
    const { refreshToken } = req.cookies;
    const userData = tokenService.validateRefreshToken(refreshToken);
    res.clearCookie('refreshToken');
    if (userData) {
        await Token.deleteOne({ user: userData._id });
    }
    res.sendStatus(204);
};
export const refresh = async (req, res) => {
    const { refreshToken } = req.cookies;
    const userData = await authService.refresh(refreshToken);
    res.cookie('refreshToken', userData.refreshToken, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    });
    res.send({
        user: userData.userDto,
        accessToken: userData.accessToken,
    });
};
//# sourceMappingURL=authController.js.map