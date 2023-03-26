import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import * as mailService from './mailService.js';
import * as tokenService from './tokenService.js';
import { v4 as uuidv4 }  from 'uuid';
import { UserToReturn } from '../types/UserToReturn.js';
import { ApiError } from '../exceptions/apiError.js';
import { UserRoles } from '../types/UserRoles.js'

export const registration = async (
  email: string,
  name: string,
  password: string,
  role: UserRoles,
) => {
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
  await mailService.sendActivationMail(
    email,
    `${process.env.CLIENT_URL!}/activate/${activationLink}`
  );

  const userDto: UserToReturn = { ...user.toJSON() };
  delete userDto.password;

  const tokens = tokenService.generateTokens(userDto);
  await tokenService.saveToken(userDto._id, tokens.refreshToken);

  return { ...tokens, userDto };
}

export const activate = async (activationLink: string) => {
  const user = await User.findOne({ activationLink });

  if (!user) {
    throw ApiError.BadRequest('Incorrect activation link!');
  }
  user.activationLink = null;
  user.isActivated = true;
  await user.save();

  const userDto: UserToReturn = { ...user.toJSON() };
  delete userDto.password;

  const tokens = tokenService.generateTokens(userDto);

  return {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    user: userDto,
  };
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw ApiError.BadRequest('No user with this email was found!');
  }

  const isPassEquals = await bcrypt.compare(password, user.password);

  if (!isPassEquals) {
    throw ApiError.BadRequest('Incorrect password entered!');
  }

  const userDto: UserToReturn = { ...user.toJSON() };
  delete userDto.password;

  const tokens = tokenService.generateTokens(userDto);
  await tokenService.saveToken(userDto._id, tokens.refreshToken);

  return { ...tokens, userDto};
}

export const logout = async (refreshToken: string) => {
  const token = await tokenService.removeToken(refreshToken);

  return token;
}

export const refresh = async (refreshToken: string) => {
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

  const userDto: UserToReturn = { ...user.toJSON() };
  delete userDto.password;

  const tokens = tokenService.generateTokens(userDto);
  await tokenService.saveToken(userDto._id, tokens.refreshToken);

  return { ...tokens, userDto};
};
