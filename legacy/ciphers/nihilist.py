#plaintext: string
#polybius_keyword: string
#keyword: string
def encode_nilist(plaintext, polybius_keyword, keyword):
    alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"
    
    plaintext = plaintext.upper()
    plaintext = [i for i in plaintext if i in alphabet]
    polybius_keyword = polybius_keyword.upper()
    keyword = keyword.upper()
    
    val_map = {}
    index = 1
    for letter in polybius_keyword:
       if letter not in val_map and letter != 'J':
           val_map[letter] = index
           index += 1
           
    for letter in alphabet:
        if letter not in val_map:
            val_map[letter] = index
            index += 1
    
    result = []
    for i in range(len(plaintext)):
        if plaintext[i] not in alphabet:
            continue
        in1 = val_map[plaintext[i]]
        in2 = val_map[keyword[i % len(keyword)]]
        result.append(10 * ((in1 + 4) // 5) + (in1 - 1) % 5 + 1 +
                      10 * ((in2 + 4) // 5) + (in2 - 1) % 5 + 1)
    
    return result

#ciphertext: array of ints
#polybius_keyword: string
#keyword: string
def decode_nilist(ciphertext, polybius_keyword, keyword):
    alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"
    
    polybius_keyword = polybius_keyword.upper()
    keyword = keyword.upper()
    
    val_map = {}
    char_map = {}
    index = 1
    for letter in polybius_keyword:
       if letter not in val_map and letter != 'J':
           val_map[letter] = index
           char_map[10 * ((index + 4) // 5) + (index - 1) % 5 + 1] = letter
           index += 1
           
    for letter in alphabet:
        if letter not in val_map:
            val_map[letter] = index
            char_map[10 * ((index + 4) // 5) + (index - 1) % 5 + 1] = letter
            index += 1
    
    result = []
    for i in range(len(ciphertext)):
        in1 = ciphertext[i]
        in2 = val_map[keyword[i % len(keyword)]]
        result.append(in1 - 10 * ((in2 + 4) // 5) - (in2 - 1) % 5 - 1)
    
    result = [char_map[index] for index in result]
    
    return result
    
   

print(encode_nilist("My wife dresses to kill. She cooks the same way.", "youngman", "HENNY"))
       
print(decode_nilist(encode_nilist("My wife dresses to kill. She cooks the same way.", "youngman", "HENNY") , "youngman", "HENNY"))