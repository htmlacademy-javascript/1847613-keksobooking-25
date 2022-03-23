const getSlider = () => {
  const sliderElement = document.querySelector('.ad-form__slider');
  const element = document.querySelector('#price');

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100000,
    },
    start: 0,
    step: 10,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return value;
      },
    }
  });

  sliderElement.noUiSlider.on('update', () => {
    element.value = sliderElement.noUiSlider.get();
  });
};

export {getSlider};
