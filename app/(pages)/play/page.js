'use client';

import { useState, useEffect } from 'react';

import NavBar from '../../components/NavBar.js';
import PortaPage from '../../components/ciphers/PortaPage.js';
import HillPage2x2 from '../../components/ciphers/HillPage2x2.js';
import HillPage3x3 from '../../components/ciphers/HillPage3x3.js';
import AristocratPage from '../../components/ciphers/AristocratPage.js';
import PatristocratPage from '../../components/ciphers/PatristocratPage.js';

import genStyles from '../../styles/general.module.css';
import mainStyles from '../../styles/main.module.css';

export default function PlayPage() {
  const [type, setType] = useState(null);

  useEffect(() => {
    const loadCipher = () => {
      const dataString = localStorage.getItem('gameType');
      if (!dataString) return;

      const data = JSON.parse(dataString);
      setType(data.cipher);
    };

    const handleCipherChange = (event) => setType(event.detail);

    loadCipher();
    window.addEventListener('codebusters:cipher-change', handleCipherChange);

    return () => window.removeEventListener('codebusters:cipher-change', handleCipherChange);
  }, []);

  return (
    <div className={`${genStyles['general-body']} ${mainStyles['play-stage']}`}>
        <NavBar />
        <main className={mainStyles['main-container']}>
            <div className={genStyles['general-main']}>
                {type === 'aristocrat' && <AristocratPage key={type} />}
                {type === 'patristocrat' && <PatristocratPage key={type} />}
                {type === 'hill2x2' && <HillPage2x2 key={type} />}
                {type === 'hill3x3' && <HillPage3x3 key={type} />}
                {type === 'porta' && <PortaPage key={type} />}
            </div>
        </main>
    </div>
  );
}