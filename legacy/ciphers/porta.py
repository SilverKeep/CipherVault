def encode_porta(plaintext, keyword):
    mapping = {
        "A": ("ABCDEFGHIJKLM", "NOPQRSTUVWXYZ"),
        "B": ("ABCDEFGHIJKLM", "NOPQRSTUVWXYZ"),
        "C": ("ABCDEFGHIJKLM", "ZNOPQRSTUVWXY"),
        "D": ("ABCDEFGHIJKLM", "ZNOPQRSTUVWXY"),
        "E": ("ABCDEFGHIJKLM", "YZNOPQRSTUVWX"),
        "F": ("ABCDEFGHIJKLM", "YZNOPQRSTUVWX"),
        "G": ("ABCDEFGHIJKLM", "XYZNOPQRSTUVW"),
        "H": ("ABCDEFGHIJKLM", "XYZNOPQRSTUVW"),
        "I": ("ABCDEFGHIJKLM", "WXYZNOPQRSTUV"),
        "J": ("ABCDEFGHIJKLM", "WXYZNOPQRSTUV"),
        "K": ("ABCDEFGHIJKLM", "VWXYZNOPQRSTU"),
        "L": ("ABCDEFGHIJKLM", "VWXYZNOPQRSTU"),
        "M": ("ABCDEFGHIJKLM", "UVWXYZNOPQRST"),
        "N": ("ABCDEFGHIJKLM", "UVWXYZNOPQRST"),
        "O": ("ABCDEFGHIJKLM", "TUVWXYZNOPQRS"),
        "P": ("ABCDEFGHIJKLM", "TUVWXYZNOPQRS"),
        "Q": ("ABCDEFGHIJKLM", "STUVWXYZNOPQR"),
        "R": ("ABCDEFGHIJKLM", "STUVWXYZNOPQR"),
        "S": ("ABCDEFGHIJKLM", "RSTUVWXYZNOPQ"),
        "T": ("ABCDEFGHIJKLM", "RSTUVWXYZNOPQ"),
        "U": ("ABCDEFGHIJKLM", "QRSTUVWXYZNOP"),
        "V": ("ABCDEFGHIJKLM", "QRSTUVWXYZNOP"),
        "W": ("ABCDEFGHIJKLM", "PQRSTUVWXYZNO"),
        "X": ("ABCDEFGHIJKLM", "PQRSTUVWXYZNO"),
        "Y": ("ABCDEFGHIJKLM", "OPQRSTUVWXYZN"),
        "Z": ("ABCDEFGHIJKLM", "OPQRSTUVWXYZN")
    }
    
    alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"
    
    plaintext = plaintext.upper()
    plaintext = [i for i in plaintext if i in alphabet]
    keyword = keyword.upper()
    
    result = []
    for i in range(len(plaintext)):
        keyletter = keyword[i % len(keyword)]
        if plaintext[i] in mapping[keyletter][0]:
            result.append(mapping[keyletter][1][mapping[keyletter][0].index(plaintext[i])])
        else:
            result.append(mapping[keyletter][0][mapping[keyletter][1].index(plaintext[i])])
    
    return result
    

print(encode_porta("My wife dresses to kill. She cooks the same way.", "jfdiogji"))