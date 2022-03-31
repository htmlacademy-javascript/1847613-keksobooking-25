const body = document.querySelector('body');
let messageTemplate;
let messageElement;

const deleteMessage = () => {
  messageElement.remove();
};

const pressEscKeydown = (evt) => {
  if (evt.code === 'Escape') {
    deleteMessage();
    body.removeEventListener('keydown', pressEscKeydown);
  }
};

const showSuccessMessage = () => {
  messageTemplate = document.querySelector('#success').content.querySelector('.success');
  messageElement = messageTemplate.cloneNode(true);

  body.append(messageElement);
  body.addEventListener('click', deleteMessage, {once: true});
  body.addEventListener('keydown', pressEscKeydown);
};

const showErrorMessage = () => {
  const errorButton = document.querySelector('.error__button');
  messageTemplate = document.querySelector('#error').content.querySelector('.error');
  messageElement = messageTemplate.cloneNode(true);

  body.append(messageElement);
  body.addEventListener('click', deleteMessage, {once: true});
  body.addEventListener('keydown', pressEscKeydown);
  errorButton.addEventListener('click', deleteMessage, {once: true});
};

export {showSuccessMessage, showErrorMessage};
