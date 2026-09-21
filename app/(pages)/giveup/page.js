'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { getQuoteStats } from '../../functions/actions.js'

import genStyles from '../../styles/general.module.css';
import mainStyles from '../../styles/main.module.css';

export default function SolvedPage() {
  const [solvedData, setSolvedData] = useState(null);
  const [quoteStats, setQuoteStats] = useState(null);
  const [isStatsLoading, setIsStatsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const dataString = localStorage.getItem('lastSolve');
    if (!dataString) return;

    const parsedData = JSON.parse(dataString);
    setSolvedData(parsedData);
    localStorage.removeItem('lastSolve');

    const getStats = async () => {
      setIsStatsLoading(true);
      const stats = await getQuoteStats(parsedData.quoteID, parsedData.type);
      setQuoteStats(stats);
      setIsStatsLoading(false);
    };

    getStats();
  }, []);

  if (!solvedData) {
    return (
      <div className={mainStyles['loading-container']}>
        <div className={mainStyles['loading-spinner']}></div>
        <p>Loading results...</p>
      </div>
    );
  }

  const avgTime = Number(quoteStats?.avg_time_seconds);
  const userTime = Number(solvedData.time);
  const hasAverage = Number.isFinite(avgTime) && avgTime > 0;
  const hasUserTime = Number.isFinite(userTime);

  let comparisonLabel = 'Average time unavailable';
  let comparisonClass = mainStyles['comparison-neutral'];
//   let comparisonDetail = '';

  if (hasAverage && hasUserTime) {
    const delta = userTime - avgTime;
    if (Math.abs(delta) < 0.5) {
      comparisonLabel = 'Right on average time';
      comparisonClass = mainStyles['comparison-neutral'];
    //   comparisonDetail = 'You matched the community average before giving up.';
    } else if (delta < 0) {
      comparisonLabel = 'Below average time';
      comparisonClass = mainStyles['comparison-good'];
    //   comparisonDetail = `${Math.abs(delta).toFixed(1)}s faster than average`;
    } else {
      comparisonLabel = 'Above average time';
      comparisonClass = mainStyles['comparison-bad'];
    //   comparisonDetail = `${delta.toFixed(1)}s slower than average`;
    }
  }

  const performancePercent = hasAverage && hasUserTime
    ? Math.min((userTime / avgTime) * 100, 200)
    : 100;

  return (
    <div className={`${genStyles['general-body']} ${mainStyles['result-stage']}`}>
      <div className={mainStyles['success-container']}>
        <div className={mainStyles['success-header']}>
          <h1>Maybe next time!</h1>
        </div>

        <div className={mainStyles['solved-panel']}>
          <div className={mainStyles['solved-top-grid']}>
            <div className={mainStyles['stats-card']}>
              <div className={mainStyles['stat-item']}>
                <label>Cipher Type</label>
                <div className={mainStyles['stat-value']}>{solvedData.type}</div>
              </div>

              <div className={mainStyles['stat-item']}>
                <label>Time</label>
                <div className={mainStyles['stat-value']}>
                  <span className={mainStyles['time-value']}>-</span>
                  <span className={mainStyles['time-unit']}>seconds</span>
                </div>
              </div>
            </div>

            <div className={mainStyles['insights-card']}>
              <div className={mainStyles['insights-title']}>Cipher Performance</div>

              {isStatsLoading && (
                <div className={mainStyles['insights-loading']}>
                  <div className={mainStyles['loading-spinner']}></div>
                  <p>Loading quote stats...</p>
                </div>
              )}

              {!isStatsLoading && quoteStats && (
                <>
                  <div className={mainStyles['insights-user-row']}>
                    <span>Fastest Solver</span>
                    <strong>{quoteStats.fastest_username || 'n/a'}</strong>
                  </div>

                  <div className={mainStyles['insights-grid-four']}>
                    <div className={mainStyles['insight-item']}>
                      <span>Total Played</span>
                      <strong>{quoteStats.total_played ?? 0}</strong>
                    </div>
                    <div className={mainStyles['insight-item']}>
                      <span>Fastest Time</span>
                      <strong>{quoteStats.fastest_time_seconds ?? 'n/a'}s</strong>
                    </div>
                    <div className={mainStyles['insight-item']}>
                      <span>Solve Rate</span>
                      <strong>{quoteStats.solve_rate_percent ?? 'n/a'}%</strong>
                    </div>
                    <div className={mainStyles['insight-item']}>
                      <span>Average Time</span>
                      <strong>{quoteStats.avg_time_seconds ?? 'n/a'}s</strong>
                    </div>
                  </div>

                  <div className={`${mainStyles['comparison-pill']} ${comparisonClass}`}>
                    <span>{comparisonLabel}</span>
                    {/* {comparisonDetail && <small>{comparisonDetail}</small>} */}
                  </div>

                  {hasAverage && hasUserTime && (
                    <div className={mainStyles['comparison-visual']}>
                      <div className={mainStyles['comparison-labels']}>
                        <span>Your Time: {userTime}s</span>
                        <span>Average: {avgTime}s</span>
                      </div>
                      <div className={mainStyles['comparison-track']}>
                        <div
                          className={mainStyles['comparison-marker']}
                          style={{ left: `${performancePercent / 2}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {!isStatsLoading && !quoteStats && (
                <div className={mainStyles['insights-loading']}>
                  <p>Stats are unavailable for this solve. Please log in.</p>
                </div>
              )}
            </div>
          </div>

          <div className={mainStyles['quote-section']}>
            <div style={{ marginBottom: '15px' }}>Decoded Message</div>
            <div className={mainStyles['quote-box']}>
              "{solvedData.quote}" - {solvedData.author}
            </div>
          </div>
        </div>

        <div className={mainStyles['action-buttons']}>
          <button 
            className={genStyles['primary-button']} 
            onClick={() => router.push('/play')}>
            Solve Another Cipher
          </button>
          <button 
            className={genStyles['secondary-button']} 
            onClick={() => router.push('/practice')}>
            Practice More
          </button>
        </div>
      </div>
    </div>
  );
}