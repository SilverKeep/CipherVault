import Link from 'next/link';
import NavBar from '../../components/NavBar';
import genStyles from '../../styles/general.module.css';
import blogStyles from '../../styles/blog.module.css';
import { articles } from './articles';

export const metadata = {
    title: 'Codebusters Resources and Updates',
};

export default function BlogPage() {
    return (
        <div className={genStyles['general-body']}>
            <NavBar />
            <main className={blogStyles['blog-shell']}>
                <header className={blogStyles['blog-header']}>
                    <p className={blogStyles['eyebrow']}>FIELD NOTES / BLOG</p>
                    <h1>For all updates.</h1>
                    <p>I will post relevant resources, credits, and updates here.</p>
                </header>

                <section className={blogStyles['article-list']} aria-label="Articles">
                    {articles.map((article, index) => (
                        <Link className={blogStyles['article-card']} href={`/blog/${article.slug}`} key={article.slug}>
                            <span className={blogStyles['article-number']}>0{index + 1}</span>
                            <div className={blogStyles['article-content']}>
                                <div className={blogStyles['article-meta']}>
                                    <span>{article.category}</span>
                                    <span>{article.date} / {article.readTime}</span>
                                </div>
                                <h2>{article.title}</h2>
                                <p>{article.excerpt}</p>
                            </div>
                            <span className={blogStyles['article-arrow']} aria-hidden="true">-&gt;</span>
                        </Link>
                    ))}
                </section>
            </main>
        </div>
    );
}