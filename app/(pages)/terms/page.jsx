import Link from 'next/link';
import NavBar from '../../components/NavBar';
import genStyles from '../../styles/general.module.css';
import blogStyles from '../../styles/blog.module.css';

export const metadata = {
    title: 'Terms of Service | Ciphervault',
};

export default function TermsPage() {
  return (
    <div className={genStyles['general-body']}>
      <NavBar />
      <main className={blogStyles['article-shell']}>
        <Link className={blogStyles['back-link']} href="/">&lt;- Back to home</Link>
        <article className={blogStyles['article-page']}>
          <header className={blogStyles['article-header']}>
            <p className={blogStyles['eyebrow']}>LEGAL / TERMS</p>
            <h1>Terms of Service</h1>
            <p className={blogStyles['article-date']}>Last updated: September 15, 2026</p>
          </header>

          <div className={blogStyles['article-body']}>
            <p className={blogStyles['article-lede']}>
              These Terms of Service govern your use of Ciphervault, an educational cipher-practice website.
            </p>

            <h2>Using Ciphervault</h2>
            <p>
              You may use Ciphervault only in compliance with these Terms and applicable law. You are responsible for the activity that occurs through your account and for keeping your login credentials secure.
            </p>

            <h2>Accounts</h2>
            <p>
              Some features require an account. You agree to provide accurate information and notify me if you believe your account has been accessed without permission. I may suspend or close accounts that are used to abuse, disrupt, or compromise the service.
            </p>

            <h2>Educational use</h2>
            <p>
              Ciphervault is provided for practice and educational purposes. Puzzle results, timing, rankings, and statistics may not be perfectly accurate. The site does not guarantee performance in a competition or any particular learning outcome.
            </p>

            <h2>Acceptable use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>interfere with or attempt to gain unauthorized access to the service or another account;</li>
              <li>use the service to distribute malware, spam, or unlawful material;</li>
              <li>scrape, overload, or reverse engineer the service except where applicable law permits it;</li>
              <li>submit content that infringes another person&apos;s rights; or</li>
              <li>misrepresent your identity or use the service for harmful or fraudulent purposes.</li>
            </ul>

            <h2>Your content</h2>
            <p>
              You retain rights to content you submit, such as feature suggestions. By submitting content, you give Ciphervault a non-exclusive, worldwide, royalty-free license to use, reproduce, and adapt it as needed to operate, improve, or promote the service. Do not submit confidential information or material you do not have permission to share.
            </p>

            <h2>Intellectual property</h2>
            <p>
              Ciphervault, its software, design, branding, and original materials are owned by me, Jason Shnaper. These Terms give you permission to use the service, not ownership of those materials. Third-party names and services remain the property of their respective owners.
            </p>

            <h2>Third-party services</h2>
            <p>
              Ciphervault relies on third-party services for authentication, hosting, databases, and forms. These are Supabase, Vercel, Cloudflare, and Resent. I am not responsible for third-party services, content, policies, or availability. Your use of them may be subject to separate terms.
            </p>

            <h2>Availability and disclaimers</h2>
            <p>
              The service is provided on an &quot;as is&quot; and &quot;as available&quot; basis. To the maximum extent permitted by law, Ciphervault disclaims warranties of merchantability, fitness for a particular purpose, non-infringement, accuracy, and uninterrupted availability.
            </p>

            <h2>Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, Ciphervault and I will not be liable for indirect, incidental, special, consequential, exemplary, or loss-of-data damages arising from your use of the service. Where liability cannot be excluded, it will be limited to the amount you paid to use the service during the twelve months before the event giving rise to the claim, or the minimum amount permitted by law if greater.
            </p>

            <h2>Changes and termination</h2>
            <p>
              I may change these Terms as the service develops. Continued use after an updated version is posted means you accept the revised Terms. You may stop using the service at any time, and we may suspend or terminate access when reasonably necessary to protect the service, users, or comply with law.
            </p>

            <h2>Contact</h2>
            <p>
              Questions to these terms should be routed to Jason Shnaper via email at jason.shnaper@gmail.com.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}