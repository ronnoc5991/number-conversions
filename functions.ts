type NumberSystem = 'decimal' | 'hexadecimal' | 'binary';

const numberSystemBases: Record<NumberSystem, number> = {
  decimal: 10,
  hexadecimal: 16,
  binary: 2,
};

const digitConversions: Array<Record<NumberSystem, string>> = [
  { decimal: '0', binary: '0000', hexadecimal: '0' },
  { decimal: '1', binary: '0001', hexadecimal: '1' },
  { decimal: '2', binary: '0010', hexadecimal: '2' },
  { decimal: '3', binary: '0011', hexadecimal: '3' },
  { decimal: '4', binary: '0100', hexadecimal: '4' },
  { decimal: '5', binary: '0101', hexadecimal: '5' },
  { decimal: '6', binary: '0110', hexadecimal: '6' },
  { decimal: '7', binary: '0111', hexadecimal: '7' },
  { decimal: '8', binary: '1000', hexadecimal: '8' },
  { decimal: '9', binary:  '1001', hexadecimal: '9' },
  { decimal: '10', binary: '1010', hexadecimal: 'A' },
  { decimal: '11', binary:  '1011', hexadecimal: 'B' },
  { decimal: '12', binary: '1100', hexadecimal: 'C' },
  { decimal: '13', binary: '1101', hexadecimal: 'D' },
  { decimal: '14', binary: '1110', hexadecimal: 'E' },
  { decimal: '15', binary: '1111', hexadecimal: 'F' },
];

function convertDigit(digit: string, fromNumberSystem: NumberSystem, toNumberSystem: NumberSystem) {
  return digitConversions.find((digits) => digits[fromNumberSystem] === digit)[toNumberSystem];
}

function convertBinaryToDecimal(binaryNumberAsString: string): number {
  const digits = binaryNumberAsString.split('');
  return digits.reduce((sum, currentBit, index, array) => {
    const currentBitValue = parseInt(currentBit);
    const placeValue = Math.pow(numberSystemBases.binary, array.length - 1 - index);
    return sum + currentBitValue * placeValue;
  }, 0);
};

function convertBinaryToHexadecimal(binaryNumberAsString: string): string {
  const digits = binaryNumberAsString.split('');
  const nibbles = [''];

  while (digits.length % 4 > 0) {
    digits.unshift('0');
  }

  digits.forEach((digit) => {
    if (nibbles[nibbles.length - 1].length < 4) {
      nibbles[nibbles.length - 1] = nibbles[nibbles.length -1] + digit;
    } else {
      nibbles[nibbles.length] = digit;
    }
  });

  return nibbles.reduce((result, currentNibble) => {
    return result + convertDigit(currentNibble, 'binary', 'hexadecimal')
  }, '');
};

function convertNumberFromDecimal(decimalNumber: number, toNumberSystem: 'binary' | 'hexadecimal') {
  const base = numberSystemBases[toNumberSystem];
  let quotient = decimalNumber;
  const digits: Array<string> = [];

  while (quotient > 0) {
    let remainder = quotient % base;
    const newDigit = toNumberSystem === 'binary' ? `${remainder}` : convertDigit(`${remainder}`, 'decimal', toNumberSystem);
    digits.unshift(`${newDigit}`);
    quotient = Math.floor(quotient / base);
  }

  return digits.join('');
};

function convertDecimalToBinary(decimalNumber: number) {
  return convertNumberFromDecimal(decimalNumber, 'binary');
}

function convertDecimalToHexadecimal(decimalNumber: number) {
  return convertNumberFromDecimal(decimalNumber, 'hexadecimal');
}

function convertHexadecimalToBinary(hexadecimalNumberAsString: string) {
  const digits = hexadecimalNumberAsString.split('');
  return digits.map((digit) => convertDigit(digit, 'hexadecimal', 'binary')).join('');
}

function convertHexadecimalToDecimal(hexadecimalNumberAsString: string): number {
  const digits = hexadecimalNumberAsString.split('');
  return digits.reduce((sum, digit, index, array) => {
    const digitInDecimal = convertDigit(digit, 'hexadecimal', 'decimal');
    const placeValue = Math.pow(numberSystemBases.hexadecimal, array.length - 1 - index);
    const result = Number(digitInDecimal) * placeValue;
    return sum + result;
  }, 0)
}
