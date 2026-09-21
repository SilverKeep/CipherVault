function encodePatristocrat(plaintext) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let secondAlphabet = Array.from(alphabet);
    
    plaintext = plaintext.toUpperCase();
    plaintext = Array.from(plaintext).filter(i => alphabet.includes(i));
    
    let charMap = {};
    for (let i of alphabet) {
        let character = secondAlphabet[Math.floor(Math.random() * secondAlphabet.length)];
        while (character === i) {
            character = secondAlphabet[Math.floor(Math.random() * secondAlphabet.length)];
        }
        
        charMap[i] = character;
        secondAlphabet = secondAlphabet.filter(c => c !== character);
    }
    
    let result = new Array(Math.ceil(plaintext.length / 5)).fill("");
    for (let i = 0; i < plaintext.length; i++) {
        result[Math.floor(i / 5)] += charMap[plaintext[i]];
    }
    
    return result;
}

function toggleClass(plainObjects, cipherObjects, cipherCharacter) {
    for (let i = 0; i < plainObjects.length; i++) {
        plainObjects[i].classList.remove('subfocused');
        if (cipherObjects[i].innerHTML === cipherCharacter) {
            plainObjects[i].classList.add('subfocused');
        }
    }
}

function addLetter(plainObjects, cipherObjects, character, cipherCharacter, letterArray, pushChar) {
    if (character !== ' ') {

        if (letterArray.includes(character)) {
            letterArray.splice(letterArray.findIndex(element => element === character), 1);
        }

        if (pushChar !== ' ' && !letterArray.includes(pushChar)) {
            letterArray.push(pushChar);
            letterArray.sort();
        }

    } else {

        if (pushChar !== ' ' && !letterArray.includes(pushChar)) {
            letterArray.push(pushChar);
            letterArray.sort();
        }

    }

    for (let i = 0; i < plainObjects.length; i++) {
        if (cipherObjects[i].innerHTML === cipherCharacter) {
            plainObjects[i].innerHTML = character;
        }
    }
}

function getNextIndex(plainObjects, index) {
    for (let i = index + 1; i < plainObjects.length; i++) {
        if (plainObjects[i].innerHTML === ' ') {
            return i;
        }
    }
    for (let i = 0; i < index + 1; i++) {
        if (plainObjects[i].innerHTML === ' ') {
            return i;
        }
    }
    return index;
}

function getFrequency(wordArray, target) {
    let res = 0;
    for (let i = 0; i < wordArray.length; i++) {
        for (let j = 0; j < wordArray[i].length; j++) {
            if (wordArray[i][j] === target) {
                res++;
            }
        }
    }
    return res;
}

export function patristocratSession(quote) {
    let ciphertext = encodePatristocrat(quote);
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    console.log(quote);

    let frequencies = [];
    for (let i = 0; i < 26; i++) {
        frequencies.push(getFrequency(ciphertext, alphabet[i]));
    }

    let lettersleft = alphabet.split('');

    const output = document.getElementById('check');
    output.innerHTML = 'Check';

    const grid = document.getElementById('grid');
    grid.innerHTML = ''; 

    const monosubstitution = document.getElementById('monosubstitution-output');
    monosubstitution.innerHTML = '';

    const desc = document.getElementById('description');
    desc.innerHTML = `Solve this patristocrat`;

    ciphertext.forEach((word) => {

        let group = document.createElement('div');
        group.className = 'word-item';

        for (let i = 0; i < word.length; i++) {

            let div = document.createElement('div');
            // div.className = 'grid-item';
            div.className = 'monosubstitution-grid-item';
        
            let inner_cipher_div = document.createElement('div');
            inner_cipher_div.className = 'cipher-letter';
            inner_cipher_div.innerText = word[i];
    
            let inner_plain_div = document.createElement('div');
            inner_plain_div.className = 'plain-letter';
            inner_plain_div.tabIndex = '0';
            inner_plain_div.innerText = ' ';
            
            div.appendChild(inner_cipher_div);
            div.appendChild(inner_plain_div);
            
            group.appendChild(div);

        }
        
        monosubstitution.appendChild(group);
        
    });

    let chart = document.getElementById('frequency-output');
    chart.innerHTML = '';

    let leftOutput = document.getElementById('letters-left-output');
    leftOutput.innerHTML = lettersleft.join(' ');

    let frequencyChart = document.createElement('div');
    frequencyChart.className = 'frequency-chart';

    for (let i = 0; i < 26; i++) {

        let letter = document.createElement('div');
        letter.innerHTML = alphabet[i];

        let frequency = document.createElement('div');
        frequency.innerHTML = frequencies[i];

        let container = document.createElement('div');
        container.className = 'chart-container';
        container.appendChild(letter);
        container.appendChild(frequency);

        frequencyChart.appendChild(container);

    }   

    chart.appendChild(frequencyChart);

    let part = document.querySelectorAll('.plain-letter');
    let letters = document.querySelectorAll('.cipher-letter');
    part.forEach((div, index) => {
        div.addEventListener('keydown', (event) => {
            const validKey = /^[a-zA-Z]$/;
            const pressed_key = event.key.toUpperCase();

            let nextIndex = getNextIndex(part, index);

            if (validKey.test(pressed_key)) {
                addLetter(part, letters, pressed_key, letters[index].innerHTML, lettersleft, part[index].innerHTML);
                leftOutput.innerHTML = lettersleft.join(' ');
                // console.log(lettersleft);
                nextIndex = getNextIndex(part, index);
                // if (index < part.length - 1) {
                    part[nextIndex].focus();
                    toggleClass(part, letters, letters[nextIndex].innerHTML);
                // }
            }

            if (event.key === 'Backspace') {
                addLetter(part, letters, ' ', letters[index].innerHTML, lettersleft, part[index].innerHTML);
                leftOutput.innerHTML = lettersleft.join(' ');
                toggleClass(part, letters, letters[index].innerHTML);
            } else if (event.key === 'ArrowLeft') {
                if (index > 0) {
                    part[index - 1].focus();
                    toggleClass(part, letters, letters[index - 1].innerHTML);
                }
            } else if (event.key === 'ArrowRight') {
                if (index < part.length - 1) {
                    part[index + 1].focus();
                    toggleClass(part, letters, letters[index + 1].innerHTML);
                }
            } else if (event.key === " ") {
                addLetter(part, letters, pressed_key, letters[index].innerHTML, lettersleft, part[index].innerHTML);
                leftOutput.innerHTML = lettersleft.join(' ');
                toggleClass(part, letters, letters[index].innerHTML);
                if (index < part.length - 1) {
                    part[index + 1].focus();
                }
            }
        });

        div.addEventListener('focus', () => {
            toggleClass(part, letters, letters[index].innerHTML);
        });
    });

}