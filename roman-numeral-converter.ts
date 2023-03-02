// Convert the given number into a roman numeral.

// Roman numerals /	Arabic numerals
// M	1000
// CM	900
// D	500
// CD	400
// C	100
// XC	90
// ...

// All roman numerals answers should be provided in upper-case.

function convertToRoman(num: number): string { 
  const romanNumerals: [number, string][] = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
  ];

  let result = '';
  for (const [arabicNum, romanNum] of romanNumerals) {
    while (num >= arabicNum) {
      result += romanNum;
      num -= arabicNum;
    }
  }

  return result;
 }
 
 convertToRoman(36);