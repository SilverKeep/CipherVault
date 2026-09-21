export function keywordWorks(keyword) {
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

export function hillSession(quote, keyword) {
    const ciphertext = encodeHill(quote, keyword);
    console.log(quote);

    const output = document.getElementById('check');
    output.innerHTML = 'Check';

    const grid = document.getElementById('grid');
    grid.innerHTML = ''; 

    let chart = document.getElementById('frequency-output');
    chart.innerHTML = '';

    let leftOutput = document.getElementById('letters-left-output');
    leftOutput.innerHTML = '';

    const monosubstitution = document.getElementById('monosubstitution-output');
    monosubstitution.innerHTML = ''; 

    const desc = document.getElementById('description');
    desc.innerHTML = `Solve this 2x2 hill cipher with keyword ${keyword}`;

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

