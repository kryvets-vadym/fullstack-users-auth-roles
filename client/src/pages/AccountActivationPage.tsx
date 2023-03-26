import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { AuthContext, Store } from '../components/AuthContext';
import { Loader } from '../components/Loader';

export const AccountActivationPage = () => {
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const { activate }: Store = useContext(AuthContext);
  const { activationToken }: Record<string, any> = useParams();

  useEffect(() => {
    if (activate) {
      activate(activationToken)
        .catch(error => {
          setError(error.response?.data?.message || `Wrong activation link`);
        })
        .finally(() => {
          setDone(true);
        });
    }
  }, []);

  if (!done) {
    return <Loader />
  }

  return (
    <>
      <h1 className="title">Account activation</h1>

      {error ? (
        <p className="notification is-danger is-light">
          {error}
        </p>
      ) : (
        <p className="notification is-success is-light">
          Your account is now active
        </p>
      )}
    </>
  );
};
