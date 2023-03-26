import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import * as mailService from './mailService.js';
import * as tokenService from './tokenService.js';
import { v4 as uuidv4 } from 'uuid';
import { ApiError } from '../exceptions/apiError.js';
export const registration = async (email, name, password, role) => {
    const candidate = await User.findOne({ email });
    if (candidate) {
        throw ApiError.BadRequest('A user with this email already exists!');
    }
    const hashedPassword = await bcrypt.hash(password, 7);
    const activationLink = uuidv4();
    const user = new User({
        username: name,
        email,
        password: hashedPassword,
        activationLink,
    });
    if (role) {
        user.role = role.toUpperCase();
    }
    await user.save();
    await mailService.sendActivationMail(email, `${process.env.CLIENT_URL}/activate/${activationLink}`);
    const userDto = { ...user.toJSON() };
    delete userDto.password;
    const tokens = tokenService.generateTokens(userDto);
    await tokenService.saveToken(userDto._id, tokens.refreshToken);
    return { ...tokens, userDto };
};
export const activate = async (activationLink) => {
    const user = await User.findOne({ activationLink });
    if (!user) {
        throw ApiError.BadRequest('Incorrect activation link!');
    }
    user.activationLink = null;
    user.isActivated = true;
    await user.save();
    const userDto = { ...user.toJSON() };
    delete userDto.password;
    const tokens = tokenService.generateTokens(userDto);
    return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user: userDto,
    };
};
export const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw ApiError.BadRequest('No user with this email was found!');
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
        throw ApiError.BadRequest('Incorrect password entered!');
    }
    const userDto = { ...user.toJSON() };
    delete userDto.password;
    const tokens = tokenService.generateTokens(userDto);
    await tokenService.saveToken(userDto._id, tokens.refreshToken);
    return { ...tokens, userDto };
};
export const logout = async (refreshToken) => {
    const token = await tokenService.removeToken(refreshToken);
    return token;
};
export const refresh = async (refreshToken) => {
    if (!refreshToken) {
        throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
        throw ApiError.UnauthorizedError();
    }
    const user = await User.findById(userData);
    if (!user) {
        throw ApiError.UnauthorizedError();
    }
    const userDto = { ...user.toJSON() };
    delete userDto.password;
    const tokens = tokenService.generateTokens(userDto);
    await tokenService.saveToken(userDto._id, tokens.refreshToken);
    return { ...tokens, userDto };
};
//# sourceMappingURL=authService.js.map