import React, { FC, useMemo, useState } from 'react';
import { accessTokenService } from '../services/accessTokenService';
import { authService } from '../services/authService';

export interface User {
  _id: string,
  email: string,
  username: string,
  role: string,
  isActivated: boolean,
  activationLink: null | string,
}

export interface Store {
  isChecked?: boolean,
  user?: User,
  checkAuth?: () => Promise<void>,
  activate?: (para: string) => Promise<void>,
  login?: (params: LoginParams) => Promise<void>,
  logout?: () => Promise<void>,
}

interface LoginParams {
  email: string;
  password: string;
}

interface Props {
  children: JSX.Element,
}

export const AuthContext = React.createContext({});

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isChecked, setChecked] = useState<boolean>(true);

  const activate = async (activationToken: string): Promise<void> => {
    const { accessToken, user }: Record<string, any> = await authService.activate(activationToken);

    accessTokenService.save(accessToken);
    setUser(user);
  };

  const checkAuth = async (): Promise<void> => {
    try {
      const { accessToken, user }: Record<string, any> = await authService.refresh();

      accessTokenService.save(accessToken);
      setUser(user);
    } catch (error) {
      console.log('User is not authenticated');
    } finally {
      setChecked(true);
    }
  };

  const login = async ({ email, password }: LoginParams): Promise<void> => {
    const { accessToken, user }: Record<string, any> = await authService
      .login({ email, password });

    accessTokenService.save(accessToken);
    setUser(user);
  };

  const logout = async (): Promise<void> => {
    await authService.logout();

    accessTokenService.remove();
    setUser(null);
  }

  const value = useMemo(() => ({
    isChecked,
    user,
    checkAuth,
    activate,
    login,
    logout,
  }), [user, isChecked]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
