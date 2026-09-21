'use server';

import { redirect } from 'next/navigation';
import { createClient } from '../../../utils/supabase/server';
import mainStyles from '../../styles/main.module.css';
import genStyles from '../../styles/general.module.css';
import NavBar from '../../components/NavBar';
import CipherStats from '../../components/CipherStats';

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc('get_user_cipher_stats');

    if (error) {
        redirect('/auth/login');
    }

    const cipherStats = Array.isArray(data) ? data : [];
    const totalPlayed = cipherStats.reduce((sum, cipher) => sum + Number(cipher.total_played || 0), 0);
    const totalSolved = cipherStats.reduce((sum, cipher) => sum + Number(cipher.total_solved || 0), 0);
    const successRate = totalPlayed > 0 ? Math.round((totalSolved / totalPlayed) * 100) : 0;

    return (
        <div className={`${genStyles['general-body']} ${mainStyles['play-stage']}`}>
            <NavBar />
            <main className={mainStyles['main-container']}>
                <div className={genStyles['general-main']}>
                    <div className={mainStyles['profile-container']}>
                        <div className={mainStyles['profile-header']}>
                            <p className={mainStyles.eyebrow}>FIELD NOTES / PROFILE</p>
                            <h1 className={genStyles['general-heading']}>Your Progress</h1>
                        </div>

                    <div className={mainStyles['profile-section']}>
                        <div className={mainStyles['profile-stats-grid']}>
                            <div className={mainStyles['profile-stat-card']}>
                                <div className={mainStyles['stat-label']}>Total Played</div>
                                <div className={mainStyles['stat-number']}>{totalPlayed}</div>
                                <div className={mainStyles['stat-description']}>puzzles attempted</div>
                            </div>

                            <div className={mainStyles['profile-stat-card']}>
                                <div className={mainStyles['stat-label']}>Successfully Solved</div>
                                <div className={mainStyles['stat-number']}>{totalSolved}</div>
                                <div className={mainStyles['stat-description']}>puzzles completed</div>
                            </div>

                            <div className={mainStyles['profile-stat-card']}>
                                <div className={mainStyles['stat-label']}>Success Rate</div>
                                <div className={mainStyles['stat-number']}>{successRate}%</div>
                                <div className={mainStyles['stat-description']}>completion rate</div>
                            </div>
                        </div>

                        <div className={mainStyles['profile-section-divider']} />

                        <div className={mainStyles['profile-section-header']}>
                            <h2>Cipher Performance</h2>
                            <p>Detailed breakdown of your progress with each cipher type</p>
                        </div>
                        <CipherStats stats={cipherStats} />

                        <div className={mainStyles['profile-section-divider']} />

                        <div className={mainStyles['profile-cta']}>
                            <h2>Ready to improve your skills?</h2>
                            <p>Every puzzle solved brings you closer to mastery.</p>
                            <a href="/practice" className={genStyles['general-button']}>
                                Continue Practice
                            </a>
                        </div>
                    </div>
                    </div>
                </div>
            </main>
        </div>
    );
}