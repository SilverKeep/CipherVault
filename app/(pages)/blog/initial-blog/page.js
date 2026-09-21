import Link from 'next/link';
import NavBar from '../../../components/NavBar';
import genStyles from '../../../styles/general.module.css';
import blogStyles from '../../../styles/blog.module.css';

export const metadata = {
    title: 'Ciphervault Introduction',
};

export default function InitialBlogPage() {
    return (
        <div className={genStyles['general-body']}>
            <NavBar />
            <main className={blogStyles['article-shell']}>
                <Link className={blogStyles['back-link']} href="/blog">&lt;- Back to all notes</Link>
                <article className={blogStyles['article-page']}>
                    <header className={blogStyles['article-header']}>
                        <p className={blogStyles['eyebrow']}>GETTING STARTED / 3 MIN READ</p>
                        <h1>Ciphervault Introduction</h1>
                        <p className={blogStyles['article-date']}>September 13, 2026</p>
                    </header>

                    <div className={blogStyles['article-body']}>
                        <p className={blogStyles['article-lede']}>Hello, world</p>
                        <h2>Who I am and what I made.</h2>
                        <p>I am a solo developer who, as I'd assume of you, participated in the Science Olympiad codebusters event. When I was practicing, the most social platorm was the amazing cryptograms.org, though it's only limited to cryptograms. I wanted to change that by adding competitive elements to all the ciphers that anyone may be interested in (perhaps even beyond SciOly ones)! What you may see at around this time is a bare-bones website with minimal cipher selection. You may even get a record every time...thank you so much for being an early user. I'd love to add any features that have some demand! Keep reading to find out how to suggest things.</p>
                        <h2>Existing features</h2>
                        <p>The main function now is practice. You can choose any existing cipher and be given a question. In a (hopefully) aesthetic user-interface you can type in your solution. When it's correct, you will get the statistics for the cipher you just solved--fastest solver, fastest time, average time, solve rate, and total plays. You can also view your own stats for each cipher--total solved, total played, solve rate, and average time per cipher or letter (depending on cipher type).</p>
                        <h2>Acknowledgements</h2>
                        <p>I will link where I got the quotes and keywords from. Quotes <Link href="https://github.com/dwyl/quotes/">here</Link>. Porta keywords <Link href="https://gist.github.com/creikey/42d23d1eec6d764e8a1d9fe7e56915c6">here</Link>. Hill keywords <Link href="https://toebes.com/codebusters/HillKeys.html">here</Link>. </p>
                        <h2>Finances</h2>
                        <p>Running this won't be free, but it also shouldn't be expensive. It comes out of my own pocket but it's worth your enjoyment. Refer your friends or school club!</p>
                        <blockquote>Please request features <Link href="https://forms.gle/XCKsCkbJVXAawHT46">here</Link></blockquote>
                        <p>Keep an eye out for more blogs! For now, explore a cipher in <Link href="/practice">Practice</Link>!</p>
                    </div>
                </article>
            </main>
        </div>
    );
}