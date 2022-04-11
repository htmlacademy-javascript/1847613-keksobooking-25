const body = document.querySelector('body');
let messageTemplate;
let messageElement;

const onDeleteMessage = () => {
  messageElement.remove();
};

const onPressEscKeydown = (evt) => {
  if (evt.code === 'Escape') {
    onDeleteMessage();
    body.removeEventListener('keydown', onPressEscKeydown);
  }
};

const showSuccessMessage = () => {
  messageTemplate = document.querySelector('#success').content.querySelector('.success');
  messageElement = messageTemplate.cloneNode(true);

  body.append(messageElement);
  body.addEventListener('click', onDeleteMessage, {once: true});
  body.addEventListener('keydown', onPressEscKeydown);
};

const showErrorMessage = () => {
  const errorButton = document.querySelector('.error__button');
  messageTemplate = document.querySelector('#error').content.querySelector('.error');
  messageElement = messageTemplate.cloneNode(true);

  body.append(messageElement);
  body.addEventListener('click', onDeleteMessage, {once: true});
  body.addEventListener('keydown', onPressEscKeydown);
  errorButton.addEventListener('click', onDeleteMessage, {once: true});
};

export {showSuccessMessage, showErrorMessage};
