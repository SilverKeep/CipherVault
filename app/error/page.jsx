'use client';

import { useRouter } from 'next/navigation';
import NavBar from '../components/NavBar';
import mainStyles from '../styles/main.module.css';
import genStyles from '../styles/general.module.css';

export default function ErrorPage() {
    const router = useRouter();

    return (
        <div className={`${genStyles['general-body']} ${mainStyles['play-stage']}`}>
            <NavBar />
            <main className={mainStyles['practice-container']}>
                <div className={mainStyles['practice-header']}>
                    <h1>Something went wrong</h1>
                    <p>We could not complete that request. Please return home and try again.</p>
                </div>

                <div className={mainStyles['practice-grid']}>
                    <div className={mainStyles['practice-card']}>
                        <div className={mainStyles['practice-card-content']}>
                            <h2>Back to Ciphervault</h2>
                            <p>Continue practicing Codebusters ciphers from the home page.</p>
                        </div>
                        <button
                            type="button"
                            className={genStyles['primary-button']}
                            onClick={() => router.push('/')}
                        >
                            Return Home
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}