'use client';

import { useState, useEffect, useRef } from 'react';
import mainStyles from '../../styles/main.module.css';
import genStyles from '../../styles/general.module.css';

function encodePorta(plaintext, keyword) {
  // copied mapping from your original porta.js – adjust as needed
  const mapping = {
    "A": ["ABCDEFGHIJKLM", "NOPQRSTUVWXYZ"],
    "B": ["ABCDEFGHIJKLM", "NOPQRSTUVWXYZ"],
    "C": ["ABCDEFGHIJKLM", "ZNOPQRSTUVWXY"],
    "D": ["ABCDEFGHIJKLM", "ZNOPQRSTUVWXY"],
    "E": ["ABCDEFGHIJKLM", "YZNOPQRSTUVWX"],
    "F": ["ABCDEFGHIJKLM", "YZNOPQRSTUVWX"],
    "G": ["ABCDEFGHIJKLM", "XYZNOPQRSTUVW"],
    "H": ["ABCDEFGHIJKLM", "XYZNOPQRSTUVW"],
    "I": ["ABCDEFGHIJKLM", "WXYZNOPQRSTUV"],
    "J": ["ABCDEFGHIJKLM", "WXYZNOPQRSTUV"],
    "K": ["ABCDEFGHIJKLM", "VWXYZNOPQRSTU"],
    "L": ["ABCDEFGHIJKLM", "VWXYZNOPQRSTU"],
    "M": ["ABCDEFGHIJKLM", "UVWXYZNOPQRST"],
    "N": ["ABCDEFGHIJKLM", "UVWXYZNOPQRST"],
    "O": ["ABCDEFGHIJKLM", "TUVWXYZNOPQRS"],
    "P": ["ABCDEFGHIJKLM", "TUVWXYZNOPQRS"],
    "Q": ["ABCDEFGHIJKLM", "STUVWXYZNOPQR"],
    "R": ["ABCDEFGHIJKLM", "STUVWXYZNOPQR"],
    "S": ["ABCDEFGHIJKLM", "RSTUVWXYZNOPQ"],
    "T": ["ABCDEFGHIJKLM", "RSTUVWXYZNOPQ"],
    "U": ["ABCDEFGHIJKLM", "QRSTUVWXYZNOP"],
    "V": ["ABCDEFGHIJKLM", "QRSTUVWXYZNOP"],
    "W": ["ABCDEFGHIJKLM", "PQRSTUVWXYZNO"],
    "X": ["ABCDEFGHIJKLM", "PQRSTUVWXYZNO"],
    "Y": ["ABCDEFGHIJKLM", "OPQRSTUVWXYZN"],
    "Z": ["ABCDEFGHIJKLM", "OPQRSTUVWXYZN"]
  };

  const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
  const plainLetters = plaintext.toUpperCase().split('').filter(ch => alphabet.includes(ch));
  const key = keyword.toUpperCase();
  const result = [];
  for (let i = 0; i < plainLetters.length; i++) {
    const keyletter = key[i % key.length];
    if (mapping[keyletter][0].includes(plainLetters[i])) {
      result.push(mapping[keyletter][1][mapping[keyletter][0].indexOf(plainLetters[i])]);
    } else {
      result.push(mapping[keyletter][0][mapping[keyletter][1].indexOf(plainLetters[i])]);
    }
  }
  return result;
}

export default function PortaPage(props) {
  const [quote, setQuote] = useState('');
  const [keyword, setKeyword] = useState('');
  const [ciphertext, setCiphertext] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [checkResult, setCheckResult] = useState(null);

  const inputRefs = useRef([]);

  useEffect(() => {
    setQuote(props.quote);
    setKeyword(props.keyword);
  }, [props.quote, props.keyword]);

  useEffect(() => {
    if (quote && keyword) {
      const encoded = encodePorta(quote, keyword);
      setCiphertext(encoded);
      setAnswer(Array(encoded.length).fill(""));
      setActiveIndex(0);
    }
  }, [quote, keyword]);

  const handleLetterInput = (e, index) => {
    const key = e.key.toUpperCase();
    const validLetter = /^[A-Z]$/;
  
    if (validLetter.test(key)) {
      const newAnswer = [...answer];
      newAnswer[index] = key;
      const nextIndex = newAnswer.findIndex((letter, i) => i > index && letter === "") === -1 
        ? index : newAnswer.findIndex((letter, i) => i > index && letter === "");
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

  const checkInput = () => {
    const comp = quote.replace(/\s+/g, '');
    if (answer.join('') === comp.toUpperCase()) setCheckResult("Correct!");
    else setCheckResult("Incorrect, try again.");
  };

  return (
    <div>
      <div id={mainStyles["main-description"]}>Solve this porta cipher with keyword {keyword}</div>
      <div id={mainStyles["main-grid"]}>
        {ciphertext.map((letter, idx) => (
          <div key={idx} className={mainStyles["main-grid-item"]}>
            <div className={mainStyles["main-cipher-letter"]}>{letter}</div>
            <div
                tabIndex={0}
                onKeyDown={(e) => handleLetterInput(e, idx)}
                ref={(el) => (inputRefs.current[idx] = el)}
                className = {mainStyles["main-plain-letter"]}>{answer[idx] || ''}</div>
          </div>))}
      </div>
      <div className={mainStyles["main-button-container"]}>
        <div className={mainStyles["main-input-container"]}>
          <button className={genStyles["general-button"]} onClick={checkInput}>Check Input</button>
        </div>
      </div>
      {checkResult && (<div id={mainStyles["main-result-output"]}>{checkResult}</div>)}
    </div>
  );
}