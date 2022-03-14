const validateForm = () => {
  const form = document.querySelector('.ad-form');
  const pristine = new Pristine(form, {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    successClass: 'ad-form__element--valid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'div',
    errorTextClass: 'form__error'
  }, false);
  const roomsField = form.querySelector('#room_number');
  const guestsField = form.querySelector('#capacity');
  const capacityOption = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  const validateCapacity = () => capacityOption[roomsField.value].includes(guestsField.value);

  pristine.addValidator(
    roomsField,
    validateCapacity,
    'Выберите другое значение'
  );

  pristine.addValidator(
    guestsField,
    validateCapacity,
    'Выберите другое значение'
  );

  form.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (!isValid) {
      evt.preventDefault();
    }
  });
};

export {validateForm};
