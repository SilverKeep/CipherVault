'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getQuote, submit, giveup } from '../../functions/actions.js';

import mainStyles from '../../styles/main.module.css';
import genStyles from '../../styles/general.module.css';

export default function PatristocratPage() {
  const [ciphertext, setCiphertext] = useState("");
  const [words, setWords] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [checkResult, setCheckResult] = useState(null);
  const [startTime, setStartTime] = useState(null);
//   const [lettersLeft, setLettersLeft] = useState([]);
  const [quoteID, setQuoteID] = useState(null);
  const [author, setAuthor] = useState(null);

  const router = useRouter();
  const inputRefs = useRef([]);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Initialize data from props, encode the quote, set up answer structure, and increment games played
  useEffect(() => {
    const setup = async () => {
        const [quote, keyword] = await getQuote('patristocrat');
        setCiphertext(quote.text);
        setQuoteID(quote.id);
        setAuthor(quote.author);
    };

    setup();
  }, []);

  useEffect(() => {
    const wordStrings = ciphertext.split(/\s+/);
    let globalCounter = 0;
    const newWords = wordStrings.map(word => {
      const cells = [];
      for (let char of word) {
        if (/[A-Z]/.test(char)) {
          cells.push({ type: 'input', cipher: char, globalIndex: globalCounter });
          globalCounter++;
        } else {
          cells.push({ type: 'special', cipher: char });
        }
      }
      return cells;
    });

    setWords(newWords);
    setStartTime(Date.now());
    setAnswer(Array(globalCounter).fill(""));
    // setLettersLeft(alphabet.split(''));
    setActiveIndex(0);
  }, [ciphertext]);

  useEffect(() => {
    if (!words.length) return;

    const firstCell = inputRefs.current[0];
    if (firstCell) {
      firstCell.focus();
    }
  }, [words]);

  useEffect(() => {
    const usedLetters = new Set(answer.filter(ch => ch && /^[A-Z]$/.test(ch)).map(ch => ch.toUpperCase()));
    // setLettersLeft(alphabet.split('').filter(ch => !usedLetters.has(ch)));
  }, [answer]);
  //-----//

  // Assistance functions for navigation form inputs
  const findCellByGlobalIndex = (gIdx) => {
    for (let word of words) {
      for (let cell of word) {
        if (cell.type === 'input' && cell.globalIndex === gIdx) return cell;
      }
    }
    return null;
  };

  const activeCell = activeIndex !== null ? findCellByGlobalIndex(activeIndex) : null;

  const duplicateLetterIndices = new Set();
  const cipherChoiceByLetter = new Map();

  if (words.length) {
    const plainLetterMap = new Map();

    for (const word of words) {
      for (const cell of word) {
        if (cell.type !== 'input') continue;

        const value = answer[cell.globalIndex];
        if (!value) continue;

        const plainLetter = value.toUpperCase();
        if (!plainLetterMap.has(plainLetter)) {
          plainLetterMap.set(plainLetter, new Set());
        }

        plainLetterMap.get(plainLetter).add(cell.globalIndex);
        cipherChoiceByLetter.set(cell.cipher, plainLetter);
      }
    }

    for (const indices of plainLetterMap.values()) {
      if (indices.size <= 1) continue;

      const cipherLetters = new Set();
      for (const idx of indices) {
        const cell = findCellByGlobalIndex(idx);
        if (cell) {
          cipherLetters.add(cell.cipher);
        }
      }

      if (cipherLetters.size > 1) {
        for (const idx of indices) {
          duplicateLetterIndices.add(idx);
        }
      }
    }
  }

  const getNextIndex = (newAnswer) => {
    if (!activeCell) return activeIndex;
    for (let i = activeIndex + 1; i < newAnswer.length; i++) {
      if (newAnswer[i] === "") {
        return i;
      }
    }
    for (let i = 0; i < activeIndex; i++) {
      if (newAnswer[i] === "") {
        return i;
      }
    }
    return activeIndex;
  };
  //-----//

  // Handle letter input and navigation
  const handleKeyDown = (e) => {
    const key = e.key.toUpperCase();
    e.preventDefault();

    if (/^[A-Z]$/.test(key)) {
      if (!activeCell) return;

      // potentially optimizable
      setAnswer(prev => {
        const newAnswer = [...prev];
        for (let i = 0; i < newAnswer.length; i++) {
          const cell = findCellByGlobalIndex(i);
          if (cell && cell.cipher === activeCell.cipher) {
            newAnswer[i] = key;
          }
        }

        const next = getNextIndex(newAnswer);
        setActiveIndex(next);
        inputRefs.current[next]?.focus();

        return newAnswer;
      });
      return;
    }

    if (e.key === "Backspace" || e.key === " ") {
      setAnswer(prev => {
        const newAnswer = [...prev];
        for (let i = 0; i < newAnswer.length; i++) {
          const cell = findCellByGlobalIndex(i);
          if (cell && cell.cipher === activeCell.cipher) {
            newAnswer[i] = "";
          }
        }
        return newAnswer;
      });

      if (e.key == "Backspace") {
        let prev = activeIndex - 1;
        if (prev < 0) prev = 0;

        setActiveIndex(prev);
        inputRefs.current[prev]?.focus();
      }
      
      return;
    }

    if (e.key === "ArrowRight") {
      let next = activeIndex + 1;
      if (next >= answer.length) next = 0;

      setActiveIndex(next);
      inputRefs.current[next]?.focus();
      return;
    }

    if (e.key === "ArrowLeft") {
      let prev = activeIndex - 1;
      if (prev < 0) prev = answer.length - 1;

      setActiveIndex(prev);
      inputRefs.current[prev]?.focus();
      return;
    }
  };
  //-----//

  // Handle clicking on a cell to focus
  const handleClick = (globalIndex) => {
    setActiveIndex(globalIndex);
    inputRefs.current[globalIndex]?.focus();
  };

  const handleCellBlur = () => {
    setActiveIndex(null);
  };
  //-----//

  // Give up on solving the cipher
  const giveupInput = async () => {
    const solveTime = Math.floor((Date.now() - startTime) / 1000);
    const quote = await giveup(quoteID, "patristocrat");

    const solveData = {
        quote: quote,
        quoteID: quoteID,
        type: 'patristocrat',
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
    const [result, quote] = await submit(quoteID, "patristocrat", solveTime, answer);

    if (result) {
      setCheckResult("Correct!");

      const solveData = {
        quote: quote,
        quoteID: quoteID,
        type: 'patristocrat',
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
      <div id={mainStyles["main-description"]}>Solve this patristocrat cipher by {author}</div>
      <div className={mainStyles["main-monosubstitution-output"]}>
        {words.map((word, wIdx) => (
          <div key={wIdx} className={mainStyles["main-word-item"]}>
            {word.map((cell, idx) => {
              if (cell.type === 'input') {
                const isActive = activeIndex !== null && activeIndex === cell.globalIndex;
                const isSubfocused = activeCell && cell.cipher === activeCell.cipher;
                const isDuplicate = duplicateLetterIndices.has(cell.globalIndex);
                const cellClass = [
                  mainStyles["main-plain-letter"],
                  isSubfocused ? mainStyles["main-subfocused"] : "",
                  isActive ? mainStyles["main-active-letter"] : "",
                  isDuplicate ? mainStyles["main-duplicate-letter"] : "",
                ].filter(Boolean).join(" ");
                return (
                  <div
                    key={cell.globalIndex} tabIndex={0}
                    onClick={() => handleClick(cell.globalIndex)}
                    onFocus={() => setActiveIndex(cell.globalIndex)}
                    onBlur={handleCellBlur}
                    onKeyDown={(e) => handleKeyDown(e, cell.globalIndex)}
                    ref={el => { inputRefs.current[cell.globalIndex] = el; }}
                    className={mainStyles["main-monosubstitution-grid-item"]}>
                    <div className={cellClass}>{answer[cell.globalIndex] || " "}</div>
                    <div className={mainStyles["main-cipher-letter"]}>{cell.cipher}</div>
                  </div>
                );
              } else {
                return (
                  <div key={idx} className={mainStyles["special-letter"]}>{cell.cipher}</div>
                );
              }
            })}
          </div>
        ))}
      </div>
      <div className={mainStyles["main-frequency-chart"]}>
        <div>
          {alphabet.split('').map((letter) => {
            const count = ciphertext.split(letter).length - 1;
            if (count !== 0) {
              const chosenPlain = cipherChoiceByLetter.get(letter) || "";
              return (
                <div key={alphabet.indexOf(letter) + 30} className={mainStyles["main-chart-container"]}>
                  <div className={mainStyles["main-frequency-choice"]}>{chosenPlain || ""}</div>
                  <div>{letter}</div>
                  <div className={mainStyles["main-frequency-count"]}>{count}</div>
                </div>
              );
            } else { return }
          })}
        </div>
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