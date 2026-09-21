import random

def encode_patristocrat(plaintext):
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    second_alphabet = list(alphabet)
    
    plaintext = plaintext.upper()
    plaintext = [i for i in plaintext if i in alphabet]
    
    char_map = {}
    for i in alphabet:
        character = random.choice(second_alphabet)
        while character == i:
            character = random.choice(second_alphabet)
        
        char_map[i] = character
        second_alphabet.remove(character)
    
    result = [""] * ((len(plaintext) + 4) // 5)
    for i in range(len(plaintext)):
        result[i // 5] += char_map[plaintext[i]]
    
    return result
        
    
print(encode_patristocrat("My wife dresses to kill. She cooks the same way."))