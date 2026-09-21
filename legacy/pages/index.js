'use server';

import getQuote from './functions/getQuote.js';

import NavBar from './components/NavBar.js';

import PortaPage from './components/ciphers/PortaPage.js';
import HillPage from './components/ciphers/HillPage.js';
import AristocratPage from './components/ciphers/AristocratPage.js';

import mainStyles from './styles/main.module.css';
import genStyles from './styles/general.module.css';

export default async function InteractiveCipher() {
    const quote = await getQuote();

    if (!quote) {
        return <div>Error loading quote</div>;
    }

    return (
        <div className={genStyles['general-body']}>
            <NavBar />
            <div className={mainStyles['main-container']}>
                <main className={genStyles['general-main']}>
                    <AristocratPage quote="the real sigma alpha is hungry please give him some food to eat" />
                    <PortaPage quote={quote} keyword="feet" />
                    <HillPage quote="the real sigma alpha is hungry please give him some food to eat" keyword="feet" />
                </main>
            </div>
        </div>
    );
}