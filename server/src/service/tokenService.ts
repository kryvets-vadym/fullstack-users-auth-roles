import jwt from 'jsonwebtoken';
import Token from '../models/Token.js';
import { UserToReturn } from '../types/UserToReturn.js';

export const generateTokens = (payload: UserToReturn) => {
  const accessSecret = process.env.JWT_ACCESS_SECRET!;
  const refreshSecret = process.env.JWT_REFRESH_SECRET!;

  const accessToken = jwt.sign(
    payload,
    accessSecret,
    { expiresIn: '30m' },
  );

  const refreshToken = jwt.sign(
    payload,
    refreshSecret,
    { expiresIn: '30d' },
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const validateAccessToken = (token: string) => {
  try {
    const accessSecret = process.env.JWT_ACCESS_SECRET!;

    const userData = jwt.verify(token, accessSecret);

    return userData;
  } catch (err) {
    return null;
  }
};

export const validateRefreshToken = (token: string) => {
  try {
    const refreshSecret = process.env.JWT_REFRESH_SECRET!;

    const userData = jwt.verify(token, refreshSecret);

    return userData;
  } catch (err) {
    return null;
  }
};

export const saveToken = async (userId: string, refreshToken: string) => {
  const tokenData = await Token.findOne({ user: userId });

  if (tokenData) {
    tokenData.refreshToken = refreshToken;

    return tokenData.save();
  }

  const token = await Token.create({ user: userId, refreshToken });

  return token;
};

export const removeToken = async (refreshToken: string) => {
  const tokenData = await Token.deleteOne({ refreshToken });

  return tokenData;
};

export const findToken = async (refreshToken: string) => {
  const tokenData = await Token.findOne({ refreshToken });

  return tokenData;
};
