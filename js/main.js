function getRandomNumber(min, max) {
  if (min < max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return 'Первый аргумент функции должен быть меньше второго';
}

function getRandomFloatNumber(min, max, decimals) {
  if (min < max) {
    return (Math.random() * (max - min + 1) + min).toFixed(decimals);
  }
  return 'Первый аргумент функции должен быть меньше второго';
}

getRandomNumber(2, 7);
getRandomFloatNumber(0, 100, 3);
