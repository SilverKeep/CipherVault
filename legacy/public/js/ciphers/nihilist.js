export function encodeNihilist(plaintext, polybiusKeyword, keyword) {
    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
    
    plaintext = plaintext.toUpperCase().split('').filter(i => alphabet.includes(i));
    polybiusKeyword = polybiusKeyword.toUpperCase();
    keyword = keyword.toUpperCase();
    
    const valMap = {};
    let index = 1;
    for (let letter of polybiusKeyword) {
        if (!(letter in valMap) && letter !== 'J') {
            valMap[letter] = index;
            index++;
        }
    }
    
    for (let letter of alphabet) {
        if (!(letter in valMap)) {
            valMap[letter] = index;
            index++;
        }
    }
    
    const result = [];
    for (let i = 0; i < plaintext.length; i++) {
        if (!alphabet.includes(plaintext[i])) {
            continue;
        }
        const in1 = valMap[plaintext[i]];
        const in2 = valMap[keyword[i % keyword.length]];
        result.push(10 * Math.floor((in1 + 4) / 5) + (in1 - 1) % 5 + 1 +
                    10 * Math.floor((in2 + 4) / 5) + (in2 - 1) % 5 + 1);
    }
    
    return result;
}

export function decodeNihilist(ciphertext, polybiusKeyword, keyword) {
    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
    
    polybiusKeyword = polybiusKeyword.toUpperCase();
    keyword = keyword.toUpperCase();
    
    const valMap = {};
    const charMap = {};
    let index = 1;
    for (let letter of polybiusKeyword) {
        if (!(letter in valMap) && letter !== 'J') {
            valMap[letter] = index;
            charMap[10 * Math.floor((index + 4) / 5) + (index - 1) % 5 + 1] = letter;
            index++;
        }
    }
    
    for (let letter of alphabet) {
        if (!(letter in valMap)) {
            valMap[letter] = index;
            charMap[10 * Math.floor((index + 4) / 5) + (index - 1) % 5 + 1] = letter;
            index++;
        }
    }
    
    const result = [];
    for (let i = 0; i < ciphertext.length; i++) {
        const in1 = ciphertext[i];
        const in2 = valMap[keyword[i % keyword.length]];
        result.push(in1 - 10 * Math.floor((in2 + 4) / 5) - (in2 - 1) % 5 - 1);
    }
    
    return result.map(index => charMap[index]);
}

export function nihilistSession(quote, polybiusKeyword, keyword) {
    const ciphertext = encodeNihilist(quote, polybiusKeyword, keyword);
    console.log(quote);

    const output = document.getElementById('check');
    output.innerHTML = 'Check';

    const grid = document.getElementById('grid');
    grid.innerHTML = ''; 

    const monosubstitution = document.getElementById('monosubstitution-output');
    monosubstitution.innerHTML = '';

    let chart = document.getElementById('frequency-output');
    chart.innerHTML = '';

    let leftOutput = document.getElementById('letters-left-output');
    leftOutput.innerHTML = '';

    const desc = document.getElementById('description');
    desc.innerHTML = `Solve this nihilist cipher with keyword ${keyword} and polybius keyword ${polybiusKeyword}`;

    ciphertext.forEach((letter) => {
        let div = document.createElement('div');
        div.className = 'grid-item';

        let inner_cipher_div = document.createElement('div');
        inner_cipher_div.className = 'cipher-letter';
        inner_cipher_div.innerText = letter;

        let inner_plain_div = document.createElement('div');
        inner_plain_div.className = 'plain-letter';
        inner_plain_div.tabIndex = '0';
        inner_plain_div.innerText = ' ';
        
        div.appendChild(inner_cipher_div);
        div.appendChild(inner_plain_div);
        grid.appendChild(div);
    });
}