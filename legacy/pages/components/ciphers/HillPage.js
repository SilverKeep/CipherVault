'use client';

import { useState, useEffect, useRef } from 'react';
import mainStyles from '../../styles/main.module.css';
import genStyles from '../../styles/general.module.css';

function keywordWorks(keyword) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    keyword = keyword.toUpperCase();
    const charMap = {};
    for (let i = 0; i < alphabet.length; i++) {
        charMap[alphabet[i]] = i;
    }
    const determinant = (charMap[keyword[0]] * charMap[keyword[3]] - 
                        charMap[keyword[1]] * charMap[keyword[2]]) % 26;
    return [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25].includes(determinant);
}

function encodeHill(plaintext, keyword) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    plaintext = plaintext.toUpperCase().split('').filter(i => alphabet.includes(i));
    keyword = keyword.toUpperCase();
    
    const charMap = {};
    for (let i = 0; i < alphabet.length; i++) {
        charMap[alphabet[i]] = i;
    }
    const encryptMatrix = [
        [charMap[keyword[0]], charMap[keyword[1]]],
        [charMap[keyword[2]], charMap[keyword[3]]]
    ];
    
    if (plaintext.length % 2 === 1) { 
        plaintext.push("Z");
    }
        
    const ans = [];
    for (let i = 0; i < plaintext.length; i += 2) {
        const firstChar = charMap[plaintext[i]];
        const secondChar = charMap[plaintext[i + 1]];
        
        ans.push((encryptMatrix[0][0] * firstChar + encryptMatrix[0][1] * secondChar) % 26);
        ans.push((encryptMatrix[1][0] * firstChar + encryptMatrix[1][1] * secondChar) % 26);
    }

    return ans.map(i => alphabet[i]);
}

export default function HillPage(props) {
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
      const encoded = encodeHill(quote, keyword);
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
      <div id={mainStyles["main-description"]}>Solve this hill cipher with keyword {keyword}</div>
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
          <button className={genStyles["general-button"]} onClick={checkInput}>Check Input</button>
        </div>
      </div>
      {checkResult && (<div id={mainStyles["main-result-output"]}>{checkResult}</div>)}
    </div>
  );
}