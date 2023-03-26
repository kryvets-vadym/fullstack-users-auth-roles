import { Navigate, Outlet } from 'react-router-dom';
import { FC, useContext } from 'react';
import { AuthContext, Store } from './AuthContext.jsx';
import { Loader } from './Loader.jsx';

interface Props {
  children: JSX.Element,
}

export const RequireNonAuth: FC<Props> = ({ children }) => {
  const { isChecked, user }: Store = useContext(AuthContext);

  if (!isChecked) {
    return <Loader />
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children || <Outlet />;
};
