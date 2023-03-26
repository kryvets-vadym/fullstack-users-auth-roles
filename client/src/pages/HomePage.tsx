import { AuthContext, Store } from '../components/AuthContext';
import { useContext } from 'react';

export const HomePage = () => {
  const { user }: Store = useContext(AuthContext);

  return (
    <>
      <h1 className="title">
        Home page
      </h1>
      {user && user.role && (
        <p className="fa-2x">To view the list of users, go to the "Users" tab.</p>
      )}

      {user && user.role === 'USER' && (
        <p className="fa-2x">This is a basic page for users with the USER role. To see the list of users, please log in using one of the following accounts: ADMIN, PAIRED, UNPAIRED.</p>
      )}
    </>
  )
};
