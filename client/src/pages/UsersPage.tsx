import { FC, useContext, useEffect, useState } from 'react';
import { usePageError } from '../hooks/usePageError';
import { userService } from '../services/userService';
import { Loader } from '../components/Loader';
import { AuthContext, Store } from '../components/AuthContext';

export interface UserItem {
  userId: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    city: string,
    zipcode: string,
  },
  phone: string,
  website: string,
  companyName: string
}

export const UsersPage: FC = () => {
  const [error, setError] = usePageError('');
  const [users, setUsers] = useState<any>([]);
  const { user }: Store = useContext(AuthContext);

  useEffect(() => {
    userService.getAll()
      .then(setUsers)
      .catch(error => {
        setError(error.message)
      });
  }, [])

  if (user && user.role === 'USER') {
    return <p className="title">
      This is a basic page for users with the USER role. To see the list of users, please log in using one of the following accounts: ADMIN, PAIRED, UNPAIRED.
      <span className="fa fa-cat"></span>
    </p>
  }

  if (!users.length) {
    console.log(user);
    return (<Loader/>)
  }

  return(
    <div className="content">
      <h1 className="title">Users</h1>
      <table className="table is-narrow is-fullwidth">
        <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>City</th>
        </tr>
        </thead>
        <tbody>
        {users.map((user: UserItem) => <tr key={user.email}>
          <td>{user.userId}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.address.city}</td>
        </tr>)}
        </tbody>
      </table>

      {error && <p className="notification is-danger is-light">{error}</p>}
    </div>
  );
};
