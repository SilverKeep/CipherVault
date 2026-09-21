function encodePorta(plaintext, keyword) {
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
    
    plaintext = plaintext.toUpperCase().split('').filter(i => alphabet.includes(i));
    keyword = keyword.toUpperCase();
    
    const result = [];
    for (let i = 0; i < plaintext.length; i++) {
        const keyletter = keyword[i % keyword.length];
        if (mapping[keyletter][0].includes(plaintext[i])) {
            result.push(mapping[keyletter][1][mapping[keyletter][0].indexOf(plaintext[i])]);
        } else {
            result.push(mapping[keyletter][0][mapping[keyletter][1].indexOf(plaintext[i])]);
        }
    }
    
    return result;
}

export function portaSession(quote, keyword) {
    const ciphertext = encodePorta(quote, keyword);
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
    desc.innerHTML = `Solve this porta cipher with keyword ${keyword}`;

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