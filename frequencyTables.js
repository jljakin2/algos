function sameFrequency(num1, num2) {
  if (String(num1).length !== String(num2).length) return false;

  const freq = {};

  for (let num of String(num1)) {
    if (num in freq) {
      freq[num]++;
    } else {
      freq[num] = 1;
    }
  }

  for (let num of String(num2)) {
    if (!num) {
      return false;
    } else {
      freq[num]--;
    }
  }

  return true;
}

sameFrequency(244, 442);
