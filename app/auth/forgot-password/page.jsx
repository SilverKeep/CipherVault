'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { resetPassword } from './actions';
import authStyles from '../../styles/auth.module.css';
import genStyles from '../../styles/general.module.css';

export default function ForgotPassword() {
	const [state, formAction, isPending] = useActionState(resetPassword, null);

	return (
		<div className={genStyles['general-body']}>
			<div className={authStyles['auth-container']}>
				<h1 className={authStyles['auth-title']}>Reset your password</h1>

				{state?.success ? (
					<p className={authStyles['auth-success']} role="status">{state.success}</p>) : (
					<form className={authStyles['auth-form']} action={formAction}>
						<div className={authStyles['auth-form-group']}>
							<label className={authStyles['auth-label']} htmlFor="email">
								Email address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								autoComplete="email"
								className={authStyles['auth-input']}
								placeholder="Enter your email"
							/>
						</div>

						<button
							type="submit"
							className={authStyles['auth-button']}
							disabled={isPending}
						>
							{isPending ? 'Sending...' : 'Send reset link'}
						</button>

						{state?.error && (
							<p className={authStyles['auth-error']} role="alert">{state.error}</p>
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