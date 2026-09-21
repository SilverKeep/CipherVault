def keyword_works(keyword):
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    
    keyword = keyword.upper()
    char_map = {alphabet[i] : i for i in range(len(alphabet))}
    determinant = (char_map[keyword[0]] * char_map[keyword[3]] - 
                  char_map[keyword[1]] * char_map[keyword[2]]) % 26
    return determinant in [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25]

def encode_hill(plaintext, keyword):
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    
    plaintext = plaintext.upper()
    plaintext = [i for i in plaintext if i in alphabet]
    keyword = keyword.upper()
    
    char_map = {alphabet[i] : i for i in range(len(alphabet))}
    encrypt_matrix = [
        [char_map[keyword[0]], char_map[keyword[1]]],
        [char_map[keyword[2]], char_map[keyword[3]]]
    ]
    
    if (len(plaintext) % 2 == 1): 
        plaintext.append("Z")
        
    ans = []
    for i in range(0, len(plaintext), 2):
        first_char = char_map[plaintext[i]]
        second_char = char_map[plaintext[i + 1]]
        
        ans.append((encrypt_matrix[0][0] * first_char +
                   encrypt_matrix[0][1] * second_char) % 26)
        ans.append((encrypt_matrix[1][0] * first_char +
                   encrypt_matrix[1][1] * second_char) % 26)

    return [alphabet[i] for i in ans]

print(encode_hill("My wife dresses to kill. She cooks the same way.", "liff"))
print(keyword_works("life"))