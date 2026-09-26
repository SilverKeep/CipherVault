'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import NavBar from './components/NavBar.js';

import mainStyles from './styles/main.module.css';
import genStyles from './styles/general.module.css';

export default function Home() {
    const router = useRouter();
    const [showSignupNotice, setShowSignupNotice] = useState(false);

    const tools = [
        {
            index: '01',
            title: 'Practice Four Ciphers',
            description: 'Switch between Aristocrat, Patristocrat, Hill, and Porta puzzles from one practice area.'
        },
        {
            index: '02',
            title: 'See Your Progress',
            description: 'Track solved puzzles, accuracy, and the cipher types that need another pass.'
        }
    ];

    const cipherTypes = ['Aristocrat', 'Patristocrat', 'Hill', 'Porta'];
    const practiceTypes = ['aristocrat', 'patristocrat', 'hill2x2', 'hill3x3', 'porta'];

    const openRandomPractice = () => {
        const randomCipher = practiceTypes[Math.floor(Math.random() * practiceTypes.length)];
        localStorage.setItem('gameType', JSON.stringify({ cipher: randomCipher }));
        router.push('/play');
    };

    useEffect(() => {
        const signupCompleted = new URLSearchParams(window.location.search).get('signup') === 'success';
        setShowSignupNotice(signupCompleted);
    }, []);

    return (
        <div className={genStyles['general-body']}>
            <NavBar />

            {showSignupNotice && (
                <p className={mainStyles['signup-notice']} role="status">
                    Please confirm your email to activate your account (check spam)
                </p>
            )}
            
            <section className={mainStyles['hero']}>
                <div className={mainStyles['hero-copy']}>
                    <p className={mainStyles['eyebrow']}>Cipher practice for SciOly Codebusters</p>
                    <h1>Practice ciphers and Build speed</h1>
                    <p className={mainStyles['hero-intro']}>Ciphervault gives cryptogram enthusiasts and sciolympians puzzles, useful solving tools, and clear stats so every practice session has a purpose.</p>
                    <div className={mainStyles['hero-buttons']}>
                        <button className={genStyles['primary-button']} onClick={() => router.push('/practice')}>
                            Open practice
                        </button>
                        <button className={genStyles['secondary-button']} onClick={openRandomPractice}>
                            Try a puzzle
                        </button>
                    </div>
                </div>
                <div className={mainStyles['cipher-preview']} aria-label="Example cipher puzzle">
                    <div className={mainStyles['preview-header']}>
                        <span>LIVE PRACTICE</span>
                        {/* <span className={mainStyles['preview-dot']}></span> */}
                    </div>
                    <p className={mainStyles['preview-label']}>Aristocrat / quote 014</p>
                    <p className={mainStyles['cipher-line']}>BIE OKFTK TOY<br />THE BROWN FOX</p>
                    <div className={mainStyles['preview-footer']}>
                        <span>mapping letters</span>
                        <span>03:42</span>
                    </div>
                </div>
            </section>

            <div className={mainStyles['feature-request-banner']}>
                Request features or report issues <Link className={mainStyles['feature-request-link']} href="https://forms.gle/XCKsCkbJVXAawHT46">here</Link>
            </div>

            <section className={mainStyles['features']}>
                <div className={mainStyles['section-heading']}>
                    <p className={mainStyles['eyebrow']}>What you can do here</p>
                    <h2>Tools for the next solve</h2>
                </div>
                <div className={mainStyles['features-grid']}>
                    {tools.map((tool) => (
                        <article className={mainStyles['feature-card']} key={tool.index}>
                            <span className={mainStyles['feature-index']}>{tool.index}</span>
                            <h3>{tool.title}</h3>
                            <p>{tool.description}</p>
                            <span className={mainStyles['feature-arrow']} aria-hidden="true">-&gt;</span>
                        </article>
                    ))}
                </div>
            </section>

            <section className={mainStyles['how-it-works']}>
                <div className={mainStyles['section-heading']}>
                    <p className={mainStyles['eyebrow']}>A simple session</p>
                    <h2>Start with a puzzle</h2>
                </div>
                <div className={mainStyles['steps-grid']}>
                    <div className={mainStyles['step-card']}>
                        <div className={mainStyles['step-number']}>1</div>
                        <h3>Pick a cipher</h3>
                        <p>Choose the format you want to sharpen, either mono or poly alphabetic.</p>
                    </div>
                    <div className={mainStyles['step-card']}>
                        <div className={mainStyles['step-number']}>2</div>
                        <h3>Test a solve</h3>
                        <p>Use the puzzle interface to map letters, check an answer, and keep moving.</p>
                    </div>
                    <div className={mainStyles['step-card']}>
                        <div className={mainStyles['step-number']}>3</div>
                        <h3>Review the result</h3>
                        <p>Check your stats after each attempt and compare with others.</p>
                    </div>
                </div>
                <div className={mainStyles['cipher-strip']}>
                    <span>Available now</span>
                    {cipherTypes.map((cipher) => <strong key={cipher}>{cipher}</strong>)}
                </div>
            </section>

            <section className={mainStyles['cta-section']}>
                <p className={mainStyles['eyebrow']}>Your next attempt is ready</p>
                <h2>Make a good solve.</h2>
                <p>Open a practice set and see which cipher gives you the most trouble.</p>
                <button className={genStyles['primary-button']} onClick={() => router.push('/practice')}>
                    Start practicing
                </button>
            </section>

            <footer className={mainStyles['site-footer']}>
                <div className={mainStyles['footer-brand']}>
                    <img src="/new-image.png" alt="Ciphervault logo" className={mainStyles['footer-mark']} />
                    <div>
                        <strong>Ciphervault</strong>
                        <p>Focused cipher practice for Science Olympiad.</p>
                    </div>
                </div>
                <div className={mainStyles['footer-links']}>
                    <Link href="/practice">Practice</Link>
                    <Link href="/blog">Blog</Link>
                    <Link href="/auth/login">Account</Link>
                    <Link href="/terms">Terms</Link>
                    <Link href="/privacy">Privacy</Link>
                </div>
                <p className={mainStyles['footer-meta']}>Built with care.</p>
                <div className={mainStyles['footer-social']}>
                    <a href="https://www.instagram.com/ciphervault_of_silverkeep/" target="_blank" rel="noreferrer">
                        Instagram
                    </a>
                    <a href="https://github.com/SilverKeep/CipherVault" target="_blank" rel="noreferrer">
                        GitHub
                    </a>
                </div>
            </footer>
        </div>
    );
}