'use client';

import navStyles from '../styles/navigation.module.css';
import LogoutButton from '../auth/logout';
import Link from 'next/link';

import { createClient } from '../../utils/supabase/client.js';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';

export default function NavBar() {
    const router = useRouter();
    const supabase = useMemo(() => createClient(), []);
    const [user, setUser] = useState(null);
    const [authLoaded, setAuthLoaded] = useState(false);
    const [practiceOpen, setPracticeOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const cipherTypes = [
        { label: 'Aristocrat', value: 'aristocrat' },
        { label: 'Patristocrat', value: 'patristocrat' },
        { label: 'Hill 2x2', value: 'hill2x2' },
        { label: 'Hill 3x3', value: 'hill3x3' },
        { label: 'Porta', value: 'porta' }
    ];

    useEffect(() => {
        let isMounted = true;

        async function fetchSession() {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                if (!isMounted) return;

                if (error) {
                    setUser(null);
                } else {
                    setUser(session?.user ?? null);
                }
            } finally {
                if (isMounted) {
                    setAuthLoaded(true);
                }
            }
        }

        fetchSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!isMounted) return;
            setUser(session?.user ?? null);
            setAuthLoaded(true);
        });

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
    }, [supabase]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const setupPracticePlay = (type) => {
        localStorage.setItem('gameType', JSON.stringify({ cipher: type }));
        setPracticeOpen(false);

        if (window.location.pathname === '/play') {
            window.dispatchEvent(new CustomEvent('codebusters:cipher-change', { detail: type }));
        } else {
            router.push('/play');
        }
    };

    return (
        <nav className={`${navStyles['navigation-nav']} ${isScrolled ? navStyles['navigation-nav-scrolled'] : ''}`}>
            <div className={navStyles['nav-content']}>
                <div className={navStyles['nav-left']}>
                    {/* <div className={genStyles.chloe}>
                        <p className={genStyles['chloe-p']}></p>
                    </div> */}
                    <Link href="/" className={navStyles['nav-logo']} aria-label="Ciphervault home">
                        <img src="/new-image.png" alt="" className={navStyles['nav-logo-mark']} />
                        <span>Ciphervault</span>
                    </Link>
                    <ul className={navStyles['navigation-ul']}>
                        <li className={navStyles['navigation-nav-li']}>
                            <Link href="/" className={`${navStyles['navigation-nav-a']} ${navStyles['navigation-nav-underline-a']}`}>Home</Link>
                        </li>
                        <li
                            className={`${navStyles['navigation-nav-li']} ${navStyles['nav-practice-group']} ${practiceOpen ? navStyles['nav-practice-open'] : ''}`}
                            onPointerEnter={() => setPracticeOpen(true)}
                            onPointerLeave={() => setPracticeOpen(false)}
                            onFocus={() => setPracticeOpen(true)}
                            onBlur={(event) => {
                                if (!event.currentTarget.contains(event.relatedTarget)) {
                                    setPracticeOpen(false);
                                }
                            }}
                        >
                            <Link
                                href="/practice"
                                className={`${navStyles['navigation-nav-a']} ${navStyles['navigation-nav-underline-a']}`}
                                aria-haspopup="menu"
                                aria-expanded={practiceOpen}
                            >
                                Practice
                            </Link>
                            <div
                                className={navStyles['nav-dropdown']}
                                role="menu"
                                aria-label="Practice cipher options"
                            >
                                {cipherTypes.map((cipher) => (
                                    <button
                                        key={cipher.value}
                                        type="button"
                                        className={navStyles['nav-dropdown-item']}
                                        onClick={() => setupPracticePlay(cipher.value)}
                                    >
                                        {cipher.label}
                                    </button>
                                ))}
                            </div>
                        </li>
                        {/* <li className={navStyles['navigation-nav-li']}>
                            <Link href="/faq" className={`${navStyles['navigation-nav-a']} ${navStyles['navigation-nav-underline-a']}`}>FAQ</Link>
                        </li> */}
                        <li className={navStyles['navigation-nav-li']}>
                            <Link href="/blog" className={`${navStyles['navigation-nav-a']} ${navStyles['navigation-nav-underline-a']}`}>Blog</Link>
                        </li>
                    </ul>
                </div>

                <div className={navStyles['nav-right']}>
                    <ul className={navStyles['navigation-ul']}>
                        {authLoaded && !user &&
                        <li className={navStyles['navigation-nav-li']}>
                            <Link href="/auth/login" className={`${navStyles['navigation-nav-a']} ${navStyles['navigation-nav-underline-a']}`}>Login</Link>
                        </li>
                        }

                        {authLoaded && user &&
                        <li className={navStyles['navigation-nav-li']}>
                            <LogoutButton />
                        </li>
                        }

                        {authLoaded && user && 
                        <li className={navStyles['navigation-nav-li']}>
                            <Link href="/profile" className={`${navStyles['navigation-nav-a']} ${navStyles['navigation-nav-underline-a']}`}>Profile</Link>
                        </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}