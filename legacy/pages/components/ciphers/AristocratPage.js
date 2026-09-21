'use client';

import { useState, useEffect, useRef } from 'react';
import mainStyles from '../../styles/main.module.css';
import genStyles from '../../styles/general.module.css';

function encodeAristocrat(plaintext) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let secondAlphabet = Array.from(alphabet);
  plaintext = plaintext.toUpperCase();
  const charMap = {};
  for (let letter of alphabet) {
    let char = secondAlphabet[Math.floor(Math.random() * secondAlphabet.length)];
    while (char === letter && secondAlphabet.length > 1) {
      char = secondAlphabet[Math.floor(Math.random() * secondAlphabet.length)];
    }
    charMap[letter] = char;
    secondAlphabet = secondAlphabet.filter(c => c !== char);
  }
  return plaintext.split(/(\s+)/).map(segment => {
    if (/^[A-Z]+$/.test(segment)) {
      return segment.split('').map(char => charMap[char] || char).join('');
    }
    return segment;
  }).join('');
}

export default function AristocratPage(props) {
  const [quote, setQuote] = useState(props.quote || "");
  const [ciphertext, setCiphertext] = useState("");
  const [words, setWords] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (quote) {
      const encoded = encodeAristocrat(quote);
      setCiphertext(encoded);
      const wordStrings = encoded.split(/\s+/);
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
      setAnswer(Array(globalCounter).fill(""));
      setActiveIndex(0);
    }
  }, [quote]);

  const findCellByGlobalIndex = (gIdx) => {
    for (let word of words) {
      for (let cell of word) {
        if (cell.type === 'input' && cell.globalIndex === gIdx) return cell;
      }
    }
    return null;
  };

  const activeCell = findCellByGlobalIndex(activeIndex);

  const getNextIndex = () => {
    if (!activeCell) return activeIndex;
    for (let i = activeIndex + 1; i < answer.length; i++) {
      const cell = findCellByGlobalIndex(i);
      if (cell && cell.cipher === activeCell.cipher && answer[i] === "") {
        return i;
      }
    }
    for (let i = 0; i < activeIndex; i++) {
      const cell = findCellByGlobalIndex(i);
      if (cell && cell.cipher === activeCell.cipher && answer[i] === "") {
        return i;
      }
    }
    return activeIndex;
  };

  const handleKeyDown = (e, cellGlobalIndex) => {
    const key = e.key.toUpperCase();
    const validLetter = /^[A-Z]$/;
    if (validLetter.test(key)) {
      if (!activeCell) return;
      setAnswer(prev => {
        const newAnswer = [...prev];
        for (let i = 0; i < newAnswer.length; i++) {
          const cell = findCellByGlobalIndex(i);
          if (cell && cell.cipher === activeCell.cipher) {
            newAnswer[i] = key;
          }
        }
        return newAnswer;
      });
      const next = getNextIndex();
      setActiveIndex(next);
      inputRefs.current[next]?.focus();
      e.preventDefault();
      return;
    }
    if (e.key === "Backspace") {
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
      e.preventDefault();
      return;
    }
    if (e.key === "ArrowRight") {
      let next = activeIndex + 1;
      if (next >= answer.length) next = 0;
      setActiveIndex(next);
      inputRefs.current[next]?.focus();
      e.preventDefault();
      return;
    }
    if (e.key === "ArrowLeft") {
      let prev = activeIndex - 1;
      if (prev < 0) prev = answer.length - 1;
      setActiveIndex(prev);
      inputRefs.current[prev]?.focus();
      e.preventDefault();
      return;
    }
  };

  const handleClick = (globalIndex) => {
    setActiveIndex(globalIndex);
    inputRefs.current[globalIndex]?.focus();
  };

  return (
    <div>
      <div className={mainStyles["main-description"]}>Solve this aristocrat cipher</div>
      <div className={mainStyles["main-monosubstitution-output"]}>
        {words.map((word, wIdx) => (
          <div key={wIdx} className={mainStyles["main-word-item"]}>
            {word.map((cell, idx) => {
              if (cell.type === 'input') {
                const isSubfocused = activeCell && cell.cipher === activeCell.cipher;
                const cellClass =
                  mainStyles["main-monosubstitution-grid-item"] +
                  (isSubfocused ? " " + mainStyles["main-subfocused"] : "");
                return (
                  <div
                    key={cell.globalIndex}
                    tabIndex={0}
                    onClick={() => handleClick(cell.globalIndex)}
                    onKeyDown={(e) => handleKeyDown(e, cell.globalIndex)}
                    ref={el => { inputRefs.current[cell.globalIndex] = el; }}
                    className={cellClass}
                    style={{ display: 'inline-block' }}
                  >
                    <div className={mainStyles["main-cipher-letter"]}>{cell.cipher}</div>
                    <div className={mainStyles["main-plain-letter"]}>{answer[cell.globalIndex] || " "}</div>
                  </div>
                );
              } else {
                return (
                  <div key={idx} className={mainStyles["special-letter"]} style={{ display: 'inline-block' }}>
                    {cell.cipher}
                  </div>
                );
              }
            })}
          </div>
        ))}
      </div>
      <div className={mainStyles["main-button-container"]}>
        <div className={mainStyles["main-input-container"]}>
          <button
            className={genStyles["general-button"]}
            onClick={() => {
              const userAnswer = answer.join('');
              const comp = quote.replace(/\s+/g, '');
              alert(userAnswer === comp.toUpperCase() ? "Correct!" : "Incorrect, try again.");
            }}
          >
            Check Input
          </button>
        </div>
      </div>
    </div>
  );
}