'use client';

import { useRouter } from 'next/navigation';
import NavBar from '../../components/NavBar';
import mainStyles from '../../styles/main.module.css';
import genStyles from '../../styles/general.module.css';

export default function PracticePage() {
    const router = useRouter();

    const setupPlay = (type) => {
        const gameType = {
            cipher: type
        };
        localStorage.setItem('gameType', JSON.stringify(gameType));
        router.push('/play');
    }

    return (
        <div className={`${genStyles['general-body']} ${mainStyles['play-stage']}`}>
            <NavBar />
            <div className={mainStyles['practice-container']}>
                <div className={mainStyles['practice-header']}>
                    <h1>Practice Ciphers</h1>
                    <p>Select a cipher type to begin your journey</p>
                </div>
                
                <div className={mainStyles['practice-grid']}>
                    <div className={mainStyles['practice-card']}>
                        <div className={mainStyles['practice-card-content']}>
                            <h2>Aristocrat</h2>
                            <p>A monoalphabetic substitution cipher that maintains word boundaries. Perfect for beginners!</p>
                        </div>
                        <button className={genStyles['primary-button']} onClick={() => setupPlay('aristocrat')}>
                            Start Practice
                        </button>
                    </div>

                    <div className={mainStyles['practice-card']}>
                        <div className={mainStyles['practice-card-content']}>
                            <h2>Patristocrat</h2>
                            <p>A challenging monoalphabetic substitution cipher without word boundaries.</p>
                        </div>
                        <button className={genStyles['primary-button']} onClick={() => setupPlay('patristocrat')}>
                            Start Practice
                        </button>
                    </div>

                    <div className={mainStyles['practice-card']}>
                        <div className={mainStyles['practice-card-content']}>
                            <h2>Hill Cipher 2x2</h2>
                            <p>A polygraphic substitution cipher based on linear algebra concepts.</p>
                            <ul className={mainStyles['practice-features']}>
                                <li>* <strong>Leave filler letters blank</strong></li>
                            </ul>
                        </div>
                        <button className={genStyles['primary-button']} onClick={() => setupPlay('hill2x2')}>
                            Start Practice
                        </button>
                    </div>

                    <div className={mainStyles['practice-card']}>
                        <div className={mainStyles['practice-card-content']}>
                            <h2>Hill Cipher 3x3</h2>
                            <p>A polygraphic substitution cipher based on linear algebra concepts.</p>
                            <ul className={mainStyles['practice-features']}>
                                <li>* <strong>Leave filler letters blank</strong></li>
                            </ul>
                        </div>
                        <button className={genStyles['primary-button']} onClick={() => setupPlay('hill3x3')}>
                            Start Practice
                        </button>
                    </div>

                    <div className={mainStyles['practice-card']}>
                        <div className={mainStyles['practice-card-content']}>
                            {/* <div className={mainStyles['cipher-icon']}>🔄</div> */}
                            <h2>Porta Cipher</h2>
                            <p>A polyalphabetic substitution cipher with a unique twist.</p>
                            {/* <ul className={mainStyles['practice-features']}>
                                <li><span>✓</span> Multiple alphabets</li>
                                <li><span>✓</span> Keyword-based</li>
                                <li><span>✓</span> Progressive difficulty</li>
                            </ul> */}
                        </div>
                        <button className={genStyles['primary-button']} onClick={() => setupPlay('porta')}>
                            Start Practice
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
