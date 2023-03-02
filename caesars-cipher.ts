// Caesars Cipher

// One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. In a shift cipher the meanings of the letters are shifted by some set amount.

// A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus A ↔ N, B ↔ O and so on.

// Write a function which takes a ROT13 encoded string as input and returns a decoded string.

// All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.

function rot13(str: string): string {
  // Defining the alphabet and the shift value
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const shift = 13;
  // Defining a helper function to handle individual characters
  const convertChar = (char: string): string => {
    const index = alphabet.indexOf(char);
    if (index === -1) {
      // Character is not in the alphabet, return it unchanged
      return char;
    }
    const newIndex = (index + shift) % alphabet.length;
    return alphabet[newIndex];
  };

  // Step 3: Applying the helper function to each character in the input string
  const decodedArray = str.split('').map(convertChar);

  // Step 4: Convert the array back into a string and return it
  return decodedArray.join('');
}

rot13("SERR PBQR PNZC");