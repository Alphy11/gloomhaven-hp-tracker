export function camelToSpaces(str) {
  return (str.length < 1
  ? str
  : str[0] + Array(26).fill(65)
    .map((val, idx) =>
      String.fromCharCode(val + idx))
        .reduce((newStr, char) =>
          newStr.replace(new RegExp(char, 'g'), ` ${char}`)
          , str.slice(1)));
}

export default camelToSpaces;
