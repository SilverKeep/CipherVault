'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import { login, signup } from './actions';
import authStyles from '../../styles/auth.module.css';
import genStyles from '../../styles/general.module.css';

export default function LoginPage() {
  const [mode, setMode] = useState('signin');
  const [signupError, signupAction] = useActionState(signup, null);
  const isSignUp = mode === 'signup';

  return (
    <div className={genStyles['general-body']}>
      <div className={authStyles['auth-container']}>
        <h1 className={authStyles['auth-title']}>Welcome to CipherVault</h1>

        <div className={authStyles['auth-tabs']}>
          <button
            type="button"
            className={`${authStyles['auth-tab']} ${mode === 'signin' ? authStyles['auth-tab-active'] : ''}`}
            onClick={() => setMode('signin')}
          >
            Sign in
          </button>
          <button
            type="button"
            className={`${authStyles['auth-tab']} ${mode === 'signup' ? authStyles['auth-tab-active'] : ''}`}
            onClick={() => setMode('signup')}
          >
            Sign up
          </button>
        </div>

        <form className={authStyles['auth-form']}>
          {isSignUp && (
            <div className={authStyles['auth-form-group']}>
              <label className={authStyles['auth-label']} htmlFor="username">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required={isSignUp}
                className={authStyles['auth-input']}
                placeholder="Choose a username"
              />
            </div>
          )}

          <div className={authStyles['auth-form-group']}>
            <label className={authStyles['auth-label']} htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={authStyles['auth-input']}
              placeholder="Enter your email"
            />
          </div>

          <div className={authStyles['auth-form-group']}>
            <label className={authStyles['auth-label']} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className={authStyles['auth-input']}
              placeholder="Enter your password"
            />
          </div>

          {!isSignUp && (
            <Link className={authStyles['auth-link']} href="/auth/forgot-password">
              Forgot your password?
            </Link>
          )}

          <button
            type="submit"
            className={authStyles['auth-button']}
            formAction={isSignUp ? signupAction : login}
          >
            {isSignUp ? 'Create account' : 'Log in'}
          </button>

          {isSignUp && signupError && (
            <p className={authStyles['auth-error']} role="alert">
              {signupError}
            </p>
          )}

          <div className={authStyles['auth-footer']}>
            By continuing, you agree to Ciphervault's{' '}<Link className={authStyles['auth-link']} href="/terms">Terms of Service</Link>{' '}and{' '}<Link className={authStyles['auth-link']} href="/privacy">Privacy Policy</Link>
          </div>
        </form>
      </div>
    </div>
  );
}