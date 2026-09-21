'use server'

import { createClient } from '../../utils/supabase/server';
import { revalidatePath } from 'next/cache';

function encodeAristocrat(plaintext) {
  const alphabetStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const alphabet = alphabetStr.split('');

  const deranged = alphabet.slice();
  const n = deranged.length;
  for (let i = 0; i < n - 1; i++) {
    const j = i + 1 + Math.floor(Math.random() * (n - (i + 1)));
    [deranged[i], deranged[j]] = [deranged[j], deranged[i]];
  }
  const secondAlphabet = deranged.join('');

  const charMap = {};
  for (let i = 0; i < alphabet.length; i++) {
    charMap[alphabet[i]] = secondAlphabet[i];
  }

  plaintext = String(plaintext).toUpperCase();
  return plaintext.split('').map(ch => {
    return charMap[ch] || ch;
  }).join('');
}

function encodePatristocrat(plaintext) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letters = alphabet.split('');

  const deranged = letters.slice();
  const n = deranged.length;
  for (let i = 0; i < n - 1; i++) {
    const j = i + 1 + Math.floor(Math.random() * (n - (i + 1)));
    [deranged[i], deranged[j]] = [deranged[j], deranged[i]];
  }
  const secondAlphabet = deranged.join('');

  const charMap = {};
  for (let i = 0; i < letters.length; i++) {
    charMap[letters[i]] = secondAlphabet[i];
  }

  plaintext = String(plaintext).toUpperCase();
  const lettersOnly = Array.from(plaintext).filter(ch => alphabet.includes(ch));

  const groups = new Array(Math.ceil(lettersOnly.length / 5)).fill("");
  for (let i = 0; i < lettersOnly.length; i++) {
    groups[Math.floor(i / 5)] += charMap[lettersOnly[i]];
  }

  return groups.join(' ');
}

function encodeHill2x2(plaintext, keyword) {
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

function encodeHill3x3(plaintext, keyword) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    plaintext = plaintext.toUpperCase().split('').filter(i => alphabet.includes(i));
    keyword = keyword.toUpperCase();
    
    const charMap = {};
    for (let i = 0; i < alphabet.length; i++) {
        charMap[alphabet[i]] = i;
    }

    const encryptMatrix = [
        [charMap[keyword[0]], charMap[keyword[1]], charMap[keyword[2]]],
        [charMap[keyword[3]], charMap[keyword[4]], charMap[keyword[5]]],
        [charMap[keyword[6]], charMap[keyword[7]], charMap[keyword[8]]]
    ];
    
    while (plaintext.length % 3 !== 0) { 
        plaintext.push("Z");
    }
        
    const ans = [];
    for (let i = 0; i < plaintext.length; i += 3) {
        const p1 = charMap[plaintext[i]];
        const p2 = charMap[plaintext[i + 1]];
        const p3 = charMap[plaintext[i + 2]];
        
        ans.push((encryptMatrix[0][0] * p1 + encryptMatrix[0][1] * p2 + encryptMatrix[0][2] * p3) % 26);
        ans.push((encryptMatrix[1][0] * p1 + encryptMatrix[1][1] * p2 + encryptMatrix[1][2] * p3) % 26);
        ans.push((encryptMatrix[2][0] * p1 + encryptMatrix[2][1] * p2 + encryptMatrix[2][2] * p3) % 26);
    }

    return ans.map(i => alphabet[i]);
}

function encodePorta(plaintext, keyword) {
    const mapping = {
        "A": ["ABCDEFGHIJKLM", "NOPQRSTUVWXYZ"],
        "B": ["ABCDEFGHIJKLM", "NOPQRSTUVWXYZ"],
        "C": ["ABCDEFGHIJKLM", "OPQRSTUVWXYZN"],
        "D": ["ABCDEFGHIJKLM", "OPQRSTUVWXYZN"],
        "E": ["ABCDEFGHIJKLM", "PQRSTUVWXYZNO"],
        "F": ["ABCDEFGHIJKLM", "PQRSTUVWXYZNO"],
        "G": ["ABCDEFGHIJKLM", "QRSTUVWXYZNOP"],
        "H": ["ABCDEFGHIJKLM", "QRSTUVWXYZNOP"],
        "I": ["ABCDEFGHIJKLM", "RSTUVWXYZNOPQ"],
        "J": ["ABCDEFGHIJKLM", "RSTUVWXYZNOPQ"],
        "K": ["ABCDEFGHIJKLM", "STUVWXYZNOPQR"],
        "L": ["ABCDEFGHIJKLM", "STUVWXYZNOPQR"],
        "M": ["ABCDEFGHIJKLM", "TUVWXYZNOPQRS"],
        "N": ["ABCDEFGHIJKLM", "TUVWXYZNOPQRS"],
        "O": ["ABCDEFGHIJKLM", "UVWXYZNOPQRST"],
        "P": ["ABCDEFGHIJKLM", "UVWXYZNOPQRST"],
        "Q": ["ABCDEFGHIJKLM", "VWXYZNOPQRSTU"],
        "R": ["ABCDEFGHIJKLM", "VWXYZNOPQRSTU"],
        "S": ["ABCDEFGHIJKLM", "WXYZNOPQRSTUV"],
        "T": ["ABCDEFGHIJKLM", "WXYZNOPQRSTUV"],
        "U": ["ABCDEFGHIJKLM", "XYZNOPQRSTUVW"],
        "V": ["ABCDEFGHIJKLM", "XYZNOPQRSTUVW"],
        "W": ["ABCDEFGHIJKLM", "YZNOPQRSTUVWX"],
        "X": ["ABCDEFGHIJKLM", "YZNOPQRSTUVWX"],
        "Y": ["ABCDEFGHIJKLM", "ZNOPQRSTUVWXY"],
        "Z": ["ABCDEFGHIJKLM", "ZNOPQRSTUVWXY"]
    };

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const plainLetters = plaintext.toUpperCase().split('').filter(ch => alphabet.includes(ch));
  const key = keyword.toUpperCase().split('').filter(ch => alphabet.includes(ch));
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

export async function getQuote(cipherType) {
    const supabase = await createClient();

    const { data: quoteData, error: quoteError } = await supabase.from('random_quote').select('id, text, author').single();

    let keywordData = null;
    let keywordError = null;
    if (cipherType === 'porta') {
        ({ data: keywordData, error: keywordError } = await supabase.from('random_porta_keyword').select('id, text').single());
    } else if (cipherType === 'hill2x2') {
        ({ data: keywordData, error: keywordError } = await supabase.from('random_hill_2x2_keyword').select('id, text').single());
    } else if (cipherType === 'hill3x3') {
        ({ data: keywordData, error: keywordError } = await supabase.from('random_hill_3x3_keyword').select('id, text').single());
    }

    if (quoteError || !quoteData) {
        // console.error('Error fetching random quote:', quoteError);
        return null;
    }
    if ((cipherType === 'porta' || cipherType === 'hill') && (keywordError || !keywordData)) {
        // console.error('Error fetching random keyword:', keywordError);
        return null;
    }

    // console.log(`Fetched quote: ${quoteData.text}, keyword: ${keywordData?.text}`);

    if (cipherType === 'aristocrat') {quoteData.text = encodeAristocrat(quoteData.text);}
    else if (cipherType === 'hill2x2') {quoteData.text = encodeHill2x2(quoteData.text, keywordData.text);}
    else if (cipherType === 'hill3x3') {quoteData.text = encodeHill3x3(quoteData.text, keywordData.text);}
    else if (cipherType === 'patristocrat') {quoteData.text = encodePatristocrat(quoteData.text);}
    else if (cipherType === 'porta') {quoteData.text = encodePorta(quoteData.text, keywordData.text);}
    else return;

    // returns [ { id: 500, text: ... }, { id: 12, text: ... } ]
    return [quoteData, keywordData];
}

// time can be spoofed
// can also WA, and quote is exposed to frontend
export async function submit(quoteID, cipher, time, attempt) {
    const supabase = await createClient();

    const { data: quote } = await supabase.from('quotes').select('text').eq('id', quoteID).single();

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const answer = quote.text.toUpperCase().split('').filter(ch => alphabet.includes(ch));

    if (answer.join('') === attempt.join('')) {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            // console.error("Auth Error: User not logged in", authError);
            // return [false, null];

            // user still solved, just anon
            return [true, quote.text]
        }

        const { error: insertError } = await supabase.from('attempts').insert({
            user_id: user.id,
            quote_id: quoteID,
            cipher_type: cipher,
            time_seconds: time,
            is_solved: true
        });

        if (insertError) {
            if (insertError.code === 'SPAM1') {
                // console.log("Spam click caught and ignored.");
                return [true, quote.text]; 
            }
            
            // console.error("Database Insert Failed:", insertError.message, insertError.details);
            return [false, null];
        }

        revalidatePath('/', 'layout');

        return [true, quote.text];
    }

    return [false, null];
}

export async function giveup(quoteID, cipher) {
    const supabase = await createClient();

    const { data: quote } = await supabase.from('quotes').select('text').eq('id', quoteID).single();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        // console.error("Auth Error in giveup(): User not logged in", authError);
        return quote.text;
    }

    const { error: insertError } = await supabase.from('attempts').insert({
        user_id: user.id,
        quote_id: quoteID,
        cipher_type: cipher,
        time_seconds: 0,
        is_solved: false
    });

    if (insertError) {
        if (insertError.code === 'SPAM1') {
            // console.log("Spam give-up caught and ignored.");
            return quote.text;
        }

        // console.error("Database Insert Failed in giveup():", insertError.message, insertError.details);
        return;
    }

    revalidatePath('/', 'layout');

    return quote.text;
}

export async function getQuoteStats(quoteID, cipherType) {
    const supabase = await createClient();

    const { data: quoteStats, error } = await supabase.rpc('get_quote_stats', {p_quote_id: quoteID, p_cipher_type: cipherType}).maybeSingle();

    if (error) {
        // console.error('RPC Error:', error);
        return null;
    }

    return quoteStats;
}