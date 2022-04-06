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

const createListItem = (featureName) => {
  const listElement = document.createElement('li');

  listElement.className = `popup__feature popup__feature--${featureName}`;

  return listElement;
};

const createImage = (source) => {
  const imageElement = document.createElement('img');

  imageElement.classList.add('popup__photo');
  imageElement.width='45';
  imageElement.height='40';
  imageElement.alt='Фотография жилья';
  imageElement.src = source;

  return imageElement;
};

const getElement = (arr, func) => {
  const fragment = document.createDocumentFragment();
  arr.forEach((element) => {
    fragment.append(func(element));
  });
  return fragment;
};

const showAlert = (message) => {
  const container = document.createElement('div');
  container.style.zIndex = 100;
  container.style.position = 'absolute';
  container.style.left = 0;
  container.style.top = 0;
  container.style.right = 0;
  container.style.padding = '10px 5px';
  container.style.fontSize = '30px';
  container.style.textAlign = 'center';
  container.style.color = 'white';
  container.style.backgroundColor = 'red';
  container.textContent = message;

  document.body.append(container);

  setTimeout(() => {
    container.remove();
  }, 5000);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomNumber, getRandomFloatNumber, getRandomArrayElement,
  randomAvatar, getRandomArray, createImage, createListItem, getElement, showAlert, debounce};
