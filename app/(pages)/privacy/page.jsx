import Link from 'next/link';
import NavBar from '../../components/NavBar';
import genStyles from '../../styles/general.module.css';
import blogStyles from '../../styles/blog.module.css';

export const metadata = {
  title: 'Privacy Policy | Ciphervault',
};

export default function PrivacyPolicyPage() {
  return (
    <div className={genStyles['general-body']}>
      <NavBar />
      <main className={blogStyles['article-shell']}>
        <Link className={blogStyles['back-link']} href="/">&lt;- Back to home</Link>
        <article className={blogStyles['article-page']}>
          <header className={blogStyles['article-header']}>
            <p className={blogStyles['eyebrow']}>LEGAL / PRIVACY</p>
            <h1>Privacy Policy</h1>
            <p className={blogStyles['article-date']}>Last updated: September 15, 2026</p>
          </header>

          <div className={blogStyles['article-body']}>
            <p className={blogStyles['article-lede']}>
              This Privacy Policy explains how Ciphervault collects, uses, and protects information when you use the website.
            </p>

            <h2>Information I collect</h2>
            <p>
              When you create or use an account, I receive the email address and authentication information you provide. Your account includes the username that you provide.
            </p>
            <p>
              When you practice, I store activity connected to your account, such as cipher type, puzzle identifier, solve status, and time statistics.Practice preferences and temporary game state are stored in your browser&apos;s local storage.
            </p>
            <p>
              I may receive information you submit through third-party services linked from the site, such as the feature-request form. That information is handled under the third party&apos;s privacy policy.
            </p>

            <h2>How I use information</h2>
            <p>I use information to:</p>
            <ul>
              <li>create and secure accounts;</li>
              <li>provide password resets and account-related messages;</li>
              <li>save solve history and display practice statistics;</li>
              <li>operate, maintain, and improve Ciphervault; and</li>
              <li>respond to requests or investigate misuse of the service.</li>
            </ul>

            <h2>Service providers</h2>
            <p>
              Ciphervault uses Supabase for authentication, database, and related infrastructure. Supabase may process information on our behalf to provide those services. I may use Cloudflare and Vercel for protection and hosting and Resend for email routing. I may also use other infrastructure or form providers as the site evolves.
            </p>

            <h2>Cookies and local storage</h2>
            <p>
              Authentication cookies are used to keep you signed in and protect account sessions. The site also uses browser local storage for temporary practice preferences and game state. You can clear cookies or local storage through your browser, but some account or practice features may stop working.
            </p>

            <h2>Data retention and deletion</h2>
            <p>
              I retain account and solve information while it is needed to provide the service or meet legitimate operational requirements. To request account or personal-data deletion, contact me using the contact details published with this policy. I may retain limited information where required for security, fraud prevention, or legal obligations.
            </p>

            <h2>Your choices</h2>
            <p>
              You may stop using the site, clear local storage, or request access, correction, or deletion of account information. Depending on where you live, you may have additional privacy rights. I will try to verify requests as reasonably necessary to protect accounts.
            </p>

            <h2>Children&apos;s privacy</h2>
            <p>
              Ciphervault is intended for educational practice and is not knowingly directed to children under 13. If you believe a child has provided personal information, please contact me so it can be reviewed and removed where appropriate.
            </p>

            <h2>Security</h2>
            <p>
              I use reasonable technical and organizational measures to protect information. No internet service can guarantee absolute security, so please use a unique password and notify me of suspected unauthorized access.
            </p>

            <h2>Changes and contact</h2>
            <p>
              I may update this policy when the service or applicable requirements change. The date above identifies the latest version. Questions to these terms should be routed to Jason Shnaper via email at <strong>jason.shnaper@gmail.com</strong>.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}