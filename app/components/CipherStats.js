'use client';

import { useEffect, useState } from 'react';
import mainStyles from '../styles/main.module.css';

const cipherOrder = ['aristocrat', 'patristocrat', 'hill', 'porta'];
const cipherLabels = {
    aristocrat: 'Aristocrat',
    patristocrat: 'Patristocrat',
    hill: 'Hill',
    porta: 'Porta'
};

export default function CipherStats({ stats = [] }) {
    const normalizedStats = Array.isArray(stats)
        ? stats
        : cipherOrder.map((cipherType) => ({
              cipher_type: cipherType,
              total_played: Number(stats[`${cipherType}_played`] || 0),
              total_solved: Number(stats[`${cipherType}_solved`] || 0),
          }));

    const availableCiphers = cipherOrder.filter((cipherType) =>
        normalizedStats.some((entry) => entry.cipher_type === cipherType)
    );

    const [activeCipher, setActiveCipher] = useState(availableCiphers[0] || 'aristocrat');

    useEffect(() => {
        if (!availableCiphers.includes(activeCipher)) {
            setActiveCipher(availableCiphers[0] || 'aristocrat');
        }
    }, [activeCipher, availableCiphers]);

    const activeCipherStats = normalizedStats.find((entry) => entry.cipher_type === activeCipher) || {
        total_played: 0,
        total_solved: 0,
        solve_rate_percent: 0,
        avg_time_seconds: 0,
        avg_seconds_per_letter: 0,
    };

    const averageMetric =
        activeCipher === 'aristocrat' || activeCipher === 'patristocrat'
            ? {
                  label: 'Avg Time',
                  value: Number(activeCipherStats.avg_time_seconds || 0),
              }
            : {
                  label: 'Avg Time / Letter',
                  value: Number(activeCipherStats.avg_seconds_per_letter || 0),
              };

    if (availableCiphers.length === 0) {
        return <div className={mainStyles['cipher-empty']}>No cipher stats available yet.</div>;
    }

    return (
        <div className={mainStyles['cipher-details']}>
            <nav className={mainStyles['cipher-nav']}>
                {availableCiphers.map((cipherType) => (
                    <button
                        key={cipherType}
                        onClick={() => setActiveCipher(cipherType)}
                        className={`${mainStyles['cipher-tab']} ${activeCipher === cipherType ? mainStyles['active'] : ''}`}
                    >
                        {cipherLabels[cipherType]}
                    </button>
                ))}
            </nav>

            <div className={mainStyles['cipher-content']}>
                <div className={mainStyles['cipher-stats']}>
                    <div className={mainStyles['stat-group']}>
                        <span>Solved</span>
                        <strong>{activeCipherStats.total_solved}</strong>
                    </div>
                    <div className={mainStyles['stat-group']}>
                        <span>Total</span>
                        <strong>{activeCipherStats.total_played}</strong>
                    </div>
                    <div className={mainStyles['stat-group']}>
                        <span>Rate</span>
                        <strong>
                            {activeCipherStats.total_played > 0
                                ? Math.round((activeCipherStats.total_solved / activeCipherStats.total_played) * 100) : 0} %
                        </strong>
                    </div>
                    <div className={mainStyles['stat-group']}>
                        <span>{averageMetric.label}</span>
                        <strong>{averageMetric.value.toFixed(2)} s</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}
