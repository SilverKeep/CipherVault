import genStyles from '../styles/general.module.css';
import mainStyles from '../styles/main.module.css';
import navStyles from '../styles/navigation.module.css';
import { logout } from '../auth/actions';

export default function NavBar() {
    return (
        <nav className={navStyles['navigation-nav']}>
            <div className={genStyles.chloe}>
                <p className={genStyles['chloe-p']}>Chloe Approved 🎉</p>
            </div>
            <div className={mainStyles['main-dropdown-container']}>
            <div className={mainStyles['main-dropdown']}>
                <div className={mainStyles['main-select']}>
                    <span className={mainStyles['main-selected']}>Aristocrat</span>
                <div className={mainStyles['main-caret']} />
                </div>
                    <ul className={mainStyles['main-menu']}>
                        <li className={mainStyles['main-li']}>Nihilist</li>
                        <li className={mainStyles['main-li']}>Hill</li>
                        <li className={mainStyles['main-li']}>Porta</li>
                        <li className={mainStyles['main-li main-active']}>Aristocrat</li>
                        <li className={mainStyles['main-li']}>Patristocrat</li>
                    </ul>
                </div>
            </div>
            <div id={navStyles['navigation-container']}>
                <ul className={navStyles['navigation-ul']}>
                    <li className={navStyles['navigation-nav-li']}>
                        <a href="#" className={`${navStyles['navigation-nav-a']} ${navStyles['navigation-nav-underline-a']}`}>Home</a>
                    </li>
                    <li className={navStyles['navigation-nav-li']}>
                        <a href="#" className={`${navStyles['navigation-nav-a']} ${navStyles['navigation-nav-underline-a']}`}>Trainer</a>
                    </li>
                    <li className={navStyles['navigation-nav-li']}>
                        <a href="#" className={`${navStyles['navigation-nav-a']} ${navStyles['navigation-nav-underline-a']}`}>Support</a>
                    </li>
                    <li>
                        <a href="../../auth/login" className={`${navStyles['navigation-nav-a']} ${navStyles['navigation-nav-underline-a']}`}>Login</a>
                    </li>
                    <li>
                        <form action={logout}>
                            <button type="submit" className={`${navStyles['navigation-nav-a']} ${navStyles['navigation-nav-underline-a']}`}>
                                <a href="../../index.html">Logout</a>
                            </button>
                        </form>
                    </li>
                </ul>
            </div>

        </nav>
    );
}