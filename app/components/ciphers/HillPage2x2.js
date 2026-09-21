'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getQuote, submit, giveup } from '../../functions/actions.js';

import mainStyles from '../../styles/main.module.css';
import genStyles from '../../styles/general.module.css';

export default function HillPage2x2() {
  const [keyword, setKeyword] = useState('');
  const [ciphertext, setCiphertext] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [checkResult, setCheckResult] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [quoteID, setQuoteID] = useState(null);
  const [author, setAuthor] = useState(null);

  const router = useRouter();
  const inputRefs = useRef([]);

  // Initialize data from props, encode the quote, set up answer array, and increment games played
  useEffect(() => {
    const setup = async () => {
        const [quote, keyword] = await getQuote('hill2x2');
        setCiphertext(quote.text);
        setQuoteID(quote.id);
        setKeyword(keyword.text);
        setAnswer(Array(quote.text.length).fill(""));
        setAuthor(quote.author);
    };

    setup();

    setStartTime(Date.now());
    setActiveIndex(0);
  }, []);
  //-----//

  // Handle letter input and navigation
  const handleLetterInput = (e, index) => {
    const key = e.key.toUpperCase();
    const validLetter = /^[A-Z]$/;
  
    if (validLetter.test(key)) {
      const newAnswer = [...answer];
      newAnswer[index] = key;

      // find next empty index
      let nextIndex = newAnswer.findIndex((letter, i) => i > index && letter === "");
      if (nextIndex === -1) nextIndex = index;

      setAnswer(newAnswer);
      setActiveIndex(nextIndex);
      inputRefs.current[nextIndex]?.focus();
      e.preventDefault();

      return;
    }

    const navKeys = {
      Backspace: Math.max(index - 1, 0),
      ArrowRight: index < answer.length - 1 ? index + 1 : index,
      ArrowLeft: index > 0 ? index - 1 : index,
    };
  
    if (e.key === "Backspace") {
      const newAnswer = [...answer];
      newAnswer[index] = "";
      setAnswer(newAnswer);
    }
  
    if (navKeys.hasOwnProperty(e.key)) {
      const newIndex = navKeys[e.key];

      setActiveIndex(newIndex);
      inputRefs.current[newIndex]?.focus();
      e.preventDefault();
    }
  };
  //-----//

  // Give up on solving the cipher
  const giveupInput = async () => {
    const solveTime = Math.floor((Date.now() - startTime) / 1000);
    const quote = await giveup(quoteID, "hill");

    const solveData = {
        quote: quote,
        quoteID: quoteID,
        type: 'hill',
        time: solveTime,
        author: author
    };

    localStorage.setItem('lastSolve', JSON.stringify(solveData));
    router.push('/giveup');
  }
  //-----//

  // Clear all input
  const clearInput = () => {
    setAnswer(Array(answer.length).fill(""));
    // setLettersLeft(alphabet.split(''));
  }
  //-----//

  // Check input against the answer
  const checkInput = async () => {
    const solveTime = Math.floor((Date.now() - startTime) / 1000);
    const [result, quote] = await submit(quoteID, "hill", solveTime, answer);

    if (result) {
      setCheckResult("Correct!");

      const solveData = {
        quote: quote,
        quoteID: quoteID,
        type: 'hill',
        time: solveTime,
        author: author
      };

      localStorage.setItem('lastSolve', JSON.stringify(solveData));
      router.push('/solved');
      
    } else {
      setCheckResult("Incorrect, try again.");
    }
  };
  //-----//

  return (
    <div>
      <div id={mainStyles["main-description"]}>Solve this hill cipher with keyword {keyword} by {author}</div>
      <div id={mainStyles["main-grid"]}>
        {ciphertext.map((letter, idx) => (
          <div key={idx} className={mainStyles["main-grid-item"]}>
            <div className={mainStyles["main-cipher-letter"]}>{letter}</div>
            <div
                tabIndex={0}
                onKeyDown={(e) => handleLetterInput(e, idx)}
                ref={(el) => (inputRefs.current[idx] = el)}
                className = {mainStyles["main-plain-letter"]}>{answer[idx] || ''}
            </div>
          </div>
        ))}
      </div>
      <div className={mainStyles["main-button-container"]}>
        <div className={mainStyles["main-input-container"]}>
          <button className={genStyles["general-button"]} onClick={giveupInput}>Give Up</button>
        </div>
      </div>
      <div className={mainStyles["main-button-container"]}>
        <div className={mainStyles["main-input-container"]}>
          <button className={genStyles["general-button"]} onClick={clearInput}>Clear</button>
        </div>
      </div>
      <div className={mainStyles["main-button-container"]}>
        <div className={mainStyles["main-input-container"]}>
          <button className={genStyles["general-button"]} onClick={checkInput}>Submit</button>
        </div>
      </div>
      {checkResult && (<div id={mainStyles["main-result-output"]}>{checkResult}</div>)}
    </div>
  );
}