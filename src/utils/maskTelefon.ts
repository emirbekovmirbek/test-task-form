const prefixNumber = (str: string) => {
  if (str === '7') {
    return '7 (';
  }
  if (str === '9') {
    return '7 (9';
  }
  return '7 (';
};

export const onMaskTelephone = (str: string): string => {
  const value = str.replace(/\D+/g, '');
  const numberLength = 11;
  let result = '+';
  for (let i = 0; i < value.length && i < numberLength; i++) {
    switch (i) {
      case 0:
        result += prefixNumber(value[i]);
        continue;
      case 4:
        result += ') ';
        break;
      case 7:
        result += '-';
        break;
      case 9:
        result += '-';
        break;
      default:
        break;
    }
    result += value[i];
  }
  return result
}