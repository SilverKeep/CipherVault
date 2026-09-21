'use client';

import { useState } from 'react';
import Link from 'next/link';
import authStyles from '../../styles/auth.module.css';
import genStyles from '../../styles/general.module.css';
import { createClient } from '../../../utils/supabase/client';

export default function UpdatePasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [isPending, setIsPending] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage(null);

        if (password.length < 6) {
            setMessage({ error: 'Your password must be at least 6 characters.' });
          return;
        }

        if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
          setMessage({ error: 'Your password must have at least 6 characters with letters and numbers.' });
          return;
        }

        if (password !== confirmPassword) {
            setMessage({ error: 'Passwords do not match.' });
        return;
        }

        setIsPending(true);
        const supabase = createClient();
        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            setMessage({ error: 'We could not update your password. The reset link may have expired.' });
        } else {
            setMessage({ success: 'Your password has been updated.' });
            setPassword('');
            setConfirmPassword('');
        }

        setIsPending(false);
    }

  return (
    <div className={genStyles['general-body']}>
      <div className={authStyles['auth-container']}>
        <h1 className={authStyles['auth-title']}>Choose a new password</h1>

        {message?.success ? (<p className={authStyles['auth-success']} role="status">{message.success}</p>) : (
          <form className={authStyles['auth-form']} onSubmit={handleSubmit}>
            <div className={authStyles['auth-form-group']}>
              <label className={authStyles['auth-label']} htmlFor="password">New password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                className={authStyles['auth-input']}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className={authStyles['auth-form-group']}>
              <label className={authStyles['auth-label']} htmlFor="confirm-password">Confirm new password</label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                className={authStyles['auth-input']}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>

            <button type="submit" className={authStyles['auth-button']} disabled={isPending}>{isPending ? 'Updating...' : 'Update password'}</button>

            {message?.error && (
              <p className={authStyles['auth-error']} role="alert">
                {message.error}
              </p>
            )}
          </form>
        )}

        <div className={authStyles['auth-footer']}>
          <Link className={authStyles['auth-link']} href="/auth/login">Back to sign in</Link>
        </div>
      </div>
    </div>
  );
}