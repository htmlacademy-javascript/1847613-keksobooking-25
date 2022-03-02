const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomFloatNumber = (a, b, decimals = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(decimals);
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getRandomAvatarImage = () => {
  let i = 1;
  return function() {
    let str = '';
    if (i < 10) {
      str = `img/avatars/user0${i}.png`;
    } else {
      str = `img/avatars/user${i}.png`;
    }
    i++;
    return str;
  };
};

const randomAvatar = getRandomAvatarImage();

const getRandomArray = (elements) => {
  const lengthOfArray = getRandomNumber(1, elements.length);
  const array = [];

  while (array.length < lengthOfArray) {
    const element = getRandomArrayElement(elements);

    if (!array.includes(element)) {
      array.push(element);
    }
  }
  return array;
};

export {getRandomNumber, getRandomFloatNumber, getRandomArrayElement, randomAvatar, getRandomArray};
