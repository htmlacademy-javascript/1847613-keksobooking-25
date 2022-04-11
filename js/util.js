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

const setDebounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {createImage, createListItem, getElement, showAlert, setDebounce};
