import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import classnames from 'classnames';

import { authService } from '../services/authService';
import { usePageError } from '../hooks/usePageError';

function validateUsername(value: string) {
  if (!value) {
    return 'Username is required';
  }

  const usernamePattern = /^[a-zA-Z0-9_-]+$/;

  if (!usernamePattern.test(value)) {
    return 'Username is not valid';
  }

  if (/^\d/.test(value)) {
    return 'The username should not begin with a number';
  }
}

function validateEmail(value: string) {
  if (!value) {
    return 'Email is required';
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(value)) {
    return 'Email is not valid';
  }
}

const validatePassword = (value: string) => {
  if (!value) {
    return 'Password is required';
  }

  if (value.length < 6) {
    return 'At least 6 characters';
  }
};

export const RegistrationPage: FC = () => {
  const [error, setError] = usePageError('');
  const [registered, setRegistered] = useState(false);

  if (registered) {
    return (
      <section className=''>
        <h1 className='title'>Check your email</h1>
        <p>We have sent you an email with the activation link</p>
      </section>
    );
  }

  return (
    <div className="column is-5">
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
        }}
        validateOnMount={true}
        onSubmit={({ username, email, password }, formikHelpers) => {
          formikHelpers.setSubmitting(true);

          authService.register({ username, email, password })
            .then(() => {
              setRegistered(true);
            })
            .catch((error) => {
              if (error.message) {
                setError(error.message);
              }

              if (!error.response?.data) {
                return;
              }

              const { errors, message } = error.response.data;

              formikHelpers.setFieldError('username', errors?.username);
              formikHelpers.setFieldError('email', errors?.email);
              formikHelpers.setFieldError('password', errors?.password);

              if (message) {
                setError(message);
              }
            })
            .finally(() => {
              formikHelpers.setSubmitting(false);
            });
        }
        }
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <h1 className='title'>Sign up</h1>

            <div className='field'>
              <label htmlFor='username' className='label'>Username</label>

              <div className='control has-icons-left has-icons-right'>
                <Field
                  validate={validateUsername}
                  name='username'
                  type='username'
                  id='username'
                  placeholder='e.g. Bob'
                  className={classnames('input', {
                    'is-danger': touched.username && errors.username,
                  })}
                />

                <span className='icon is-small is-left'>
                <i className='fa fa-user-ninja'></i>
              </span>

                {touched.username && errors.username && (
                  <span className='icon is-small is-right has-text-danger'>
                  <i className='fas fa-exclamation-triangle'></i>
                </span>
                )}
              </div>

              {touched.username && errors.username && (
                <p className='help is-danger'>{errors.username}</p>
              )}
            </div>

            <div className='field'>
              <label htmlFor='email' className='label'>Email</label>

              <div className='control has-icons-left has-icons-right'>
                <Field
                  validate={validateEmail}
                  name='email'
                  type='email'
                  id='email'
                  placeholder='e.g. bobsmith@gmail.com'
                  className={classnames('input', {
                    'is-danger': touched.email && errors.email,
                  })}
                />

                <span className='icon is-small is-left'>
                <i className='fa fa-envelope'></i>
              </span>

                {touched.email && errors.email && (
                  <span className='icon is-small is-right has-text-danger'>
                  <i className='fas fa-exclamation-triangle'></i>
                </span>
                )}
              </div>

              {touched.email && errors.email && (
                <p className='help is-danger'>{errors.email}</p>
              )}
            </div>

            <div className='field'>
              <label htmlFor='password' className='label'>
                Password
              </label>

              <div className='control has-icons-left has-icons-right'>
                <Field
                  validate={validatePassword}
                  name='password'
                  type='password'
                  id='password'
                  placeholder='*******'
                  className={classnames('input', {
                    'is-danger': touched.password && errors.password,
                  })}
                />

                <span className='icon is-small is-left'>
                <i className='fa fa-lock'></i>
              </span>

                {touched.password && errors.password && (
                  <span className='icon is-small is-right has-text-danger'>
                  <i className='fas fa-exclamation-triangle'></i>
                </span>
                )}
              </div>

              {touched.password && errors.password ? (
                <p className='help is-danger'>{errors.password}</p>
              ) : (
                <p className='help'>At least 6 characters</p>
              )}
            </div>

            <div className='field'>
              <button
                type='submit'
                className={classnames('button is-success has-text-weight-bold', {
                  'is-loading': isSubmitting,
                })}
                disabled={
                  Boolean(isSubmitting)
                  || Boolean(errors.email)
                  || Boolean(errors.password)
                }
              >
                Sign up
              </button>
            </div>

            Already have an account?
            {' '}
            <Link to='/login'>Log in</Link>
          </Form>
        )}
      </Formik>

      {error && <p className='notification is-danger is-light'>{error}</p>}
    </div>
  );
};
