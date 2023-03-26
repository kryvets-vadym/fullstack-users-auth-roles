import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { FC, useContext } from 'react';
import { AuthContext, Store } from './AuthContext';
import { Loader } from './Loader';

interface Props {
  children?: JSX.Element,
}

export const RequireAuth: FC<Props> = ({ children }) => {
  const { isChecked, user }: Store = useContext(AuthContext);
  const location = useLocation();

  if (!isChecked) {
    return <Loader />
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children || <Outlet />;
};
