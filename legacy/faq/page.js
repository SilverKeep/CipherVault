'use client';

import NavBar from '../../components/NavBar';
import mainStyles from '../../styles/main.module.css';
import genStyles from '../../styles/general.module.css';

export default function FAQPage() {
    return (
        <div className={`${genStyles['general-body']} ${mainStyles['play-stage']}`}>
            <NavBar />
            <main className={mainStyles['main-container']}>
                <div className={genStyles['general-main']}>
                    <div className={mainStyles['faq-container']}>
                        <div className={mainStyles['faq-header']}>
                            <p className={mainStyles.eyebrow}>FIELD NOTES / FAQ</p>
                            <h1>Frequently Asked Questions</h1>
                            <p>Find answers to common questions about our platform and cryptography</p>
                        </div>

                        <div className={mainStyles['faq-section']}>
                    <div className={mainStyles['faq-group']}>
                        <div className={mainStyles['faq-group-header']}>
                            {/* <div className={mainStyles['faq-icon']}>🚀</div> */}
                            <h2>Getting Started</h2>
                        </div>
                        <div className={mainStyles['faq-item']}>
                            <h3>What is cryptography?</h3>
                            <p>Cryptography is the practice and study of techniques for secure communication in the presence of adversaries. It involves creating and analyzing protocols that prevent third parties from reading private messages.</p>
                        </div>
                        <div className={mainStyles['faq-item']}>
                            <h3>How do I start learning cryptography?</h3>
                            <p>Start with our beginner-friendly tutorials and practice with simple ciphers like the Aristocrat. Focus on understanding basic concepts like substitution and frequency analysis before moving to more complex ciphers.</p>
                        </div>
                        <div className={mainStyles['faq-item']}>
                            <h3>Do I need any special knowledge to use this platform?</h3>
                            <p>No special knowledge is required to start. Basic English language skills and pattern recognition abilities are helpful. For advanced ciphers like Hill, some mathematical background may be beneficial.</p>
                        </div>
                    </div>

                    <div className={mainStyles['faq-group']}>
                        <div className={mainStyles['faq-group-header']}>
                            {/* <div className={mainStyles['faq-icon']}>🔐</div> */}
                            <h2>About the Ciphers</h2>
                        </div>
                        <div className={mainStyles['faq-item']}>
                            <h3>What is an Aristocrat cipher?</h3>
                            <p>An Aristocrat cipher is a monoalphabetic substitution cipher where word boundaries are preserved. Each letter in the plaintext is replaced by a different letter consistently throughout the message.</p>
                        </div>
                        <div className={mainStyles['faq-item']}>
                            <h3>What's the difference between Aristocrat and Patristocrat?</h3>
                            <p>The main difference is that Patristocrat ciphers remove word boundaries, making them more challenging to solve. Both use the same substitution method, but Patristocrats require additional pattern recognition skills.</p>
                        </div>
                        <div className={mainStyles['faq-item']}>
                            <h3>How does the Hill cipher work?</h3>
                            <p>The Hill cipher is a polygraphic substitution cipher based on linear algebra. It uses matrices to encrypt blocks of letters at once, making it more complex than simple substitution ciphers.</p>
                        </div>
                    </div>

                    <div className={mainStyles['faq-group']}>
                        <div className={mainStyles['faq-group-header']}>
                            {/* <div className={mainStyles['faq-icon']}>📈</div> */}
                            <h2>Practice and Progress</h2>
                        </div>
                        <div className={mainStyles['faq-item']}>
                            <h3>How can I track my progress?</h3>
                            <p>Our platform tracks your solving times, success rates, and difficulty progression. You can view your statistics in your profile page to monitor improvement over time.</p>
                        </div>
                        <div className={mainStyles['faq-item']}>
                            <h3>What should I do if I'm stuck?</h3>
                            <p>Try using the frequency analysis tools provided, look for common patterns, and start with short words. Our system also provides hints if you need them.</p>
                        </div>
                        <div className={mainStyles['faq-item']}>
                            <h3>How often should I practice?</h3>
                            <p>Regular practice is key to improvement. We recommend starting with 15-30 minutes daily, focusing on one type of cipher until you feel comfortable before moving to more challenging ones.</p>
                        </div>
                    </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
