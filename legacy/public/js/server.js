import { nihilistSession } from './ciphers/nihilist.js';
import { hillSession, keywordWorks } from './ciphers/hill.js';
import { aristocratSession } from './ciphers/aristocrat.js';
import { patristocratSession } from './ciphers/patristocrat.js';
import { portaSession } from './ciphers/porta.js';

let curr_problem = 50;
let quotes = [];
let words = [];

let keyword = "HENNY";
let polybiusKeyword = "YOUNGMAN";

fetch('text/quotes.txt')
  .then(response => response.text())
  .then(data => {
    quotes = data.split('\n');
    for (let i = 0; i < quotes.length; i++) {
        quotes[i] = quotes[i].slice(0, -1);
    }
  });

fetch('text/words.txt')
  .then(response => response.text())
  .then(data => {
    words = data.split('\n');
    keyword = words[Math.floor(Math.random() * (words.length - 1))].replace(/\s/g, "");
    polybiusKeyword = words[Math.floor(Math.random() * (words.length - 1))].replace(/\s/g, "");
  });

function check() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    //issue with decode(encode())
    // const plaintext = decodeNihilist(encodeNihilist(quotes[curr_problem - 1], polybiusKeyword, keyword), polybiusKeyword, keyword);
    const plaintext = quotes[curr_problem - 1].toUpperCase().split('').filter(i => alphabet.includes(i));

    const answers = document.querySelectorAll('.plain-letter');

    let ans = 'Correct';
    let i = 0;

    const validKey = /^[a-zA-Z]$/;

    answers.forEach((letter) => {
        if (validKey.test(letter.innerHTML) || letter.innerHTML === ' ') {

            // console.log(letter.innerHTML, plaintext[i]);

            if (letter.innerHTML !== plaintext[i]) {
                ans = 'Incorrect';
                letter.style.borderColor = 'red';
            } else {
                letter.style.borderColor = 'green';
            }
            i++;

        }
    });

    if (ans === 'Correct') {
        keyword = words[Math.floor(Math.random() * (words.length - 1))].replace(/\s/g, "");
        polybiusKeyword = words[Math.floor(Math.random() * (words.length - 1))].replace(/\s/g, "");
    }

    const output = document.getElementById('check');
    output.innerHTML = ans;
}

document.getElementById('fetchCipher').addEventListener('click', () => {

    const type = document.getElementsByClassName('selected')[0];

    if (type.innerHTML === 'Nihilist') {

        nihilistSession(quotes[curr_problem++], polybiusKeyword, keyword);

    } else if (type.innerHTML === 'Hill') {

        while (!keywordWorks(keyword.substring(0, 4))) {keyword = words[Math.floor(Math.random() * (words.length - 1))];}
        hillSession(quotes[curr_problem++], keyword.substring(0, 4));

    } else if (type.innerHTML === 'Patristocrat') {

        patristocratSession(quotes[curr_problem++]);

    } else if (type.innerHTML === 'Porta') {

        portaSession(quotes[curr_problem++], keyword);

    } else {

        aristocratSession(quotes[curr_problem++]);
        
    }

    if (type.innerHTML !== 'Aristocrat' && type.innerHTML !== 'Patristocrat') {
        let part = document.querySelectorAll('.plain-letter');
        part.forEach((div, index) => {
            div.addEventListener('keydown', (event) => {
                const validKey = /^[a-zA-Z]$/;
                const pressed_key = event.key.toUpperCase();

                if (validKey.test(pressed_key)) {
                    div.innerHTML = pressed_key;
                    if (index < part.length - 1) {
                        part[index + 1].focus();
                    }
                }

                if (event.key === 'Backspace') {
                    div.innerHTML = ' ';
                } else if (event.key === 'ArrowLeft') {
                    if (index > 0) {
                        part[index - 1].focus();
                    }
                } else if (event.key === 'ArrowRight') {
                    if (index < part.length - 1) {
                        part[index + 1].focus();
                    }
                } else if (event.key === " ") {
                    div.innerHTML = ' ';
                    if (index < part.length - 1) {
                        part[index + 1].focus();
                    }
                }
            });
        });
    }  
});

document.getElementById('check').addEventListener('click', check);