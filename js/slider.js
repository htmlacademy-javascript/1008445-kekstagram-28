const createSlider = (sliderElement, onUpdateEventListener) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', onUpdateEventListener);
};

const destroySlider = (sliderElement) => {
  sliderElement.noUiSlider.off('update');
  sliderElement.noUiSlider.destroy();
};


export { createSlider, destroySlider };
