const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;
const scaleControlValuelement = document.querySelector('.scale__control--value');
const imgUploadPreView = document.querySelector('.img-upload__preview img');
const scaleControlSmallerButton = document.querySelector('.scale__control--smaller');
const scaleControlBiggerBitton = document.querySelector('.scale__control--bigger');
const allElementsAvailable = scaleControlValuelement &&
  imgUploadPreView &&
  scaleControlSmallerButton &&
  scaleControlBiggerBitton;

const onChangeScaleClickEvent = (evt) => {
  let scale = parseInt(scaleControlValuelement.value, 10);
  if (evt.target.matches('.scale__control--smaller') && scale > SCALE_MIN) {
    scale -= SCALE_STEP;
  } else if (evt.target.matches('.scale__control--bigger') && scale < SCALE_MAX){
    scale += SCALE_STEP;
  }
  scaleControlValuelement.value = `${ scale }%`;
  imgUploadPreView.style.transform = `scale(${ scale / 100 })`;
};

const createScale = () => {
  if (!allElementsAvailable) {
    return;
  }

  scaleControlSmallerButton.addEventListener('click', onChangeScaleClickEvent);
  scaleControlBiggerBitton.addEventListener('click', onChangeScaleClickEvent);
};

const destroyScale = () => {
  if (!allElementsAvailable) {
    return;
  }

  scaleControlSmallerButton.removeEventListener('click', onChangeScaleClickEvent);
  scaleControlBiggerBitton.removeEventListener('click', onChangeScaleClickEvent);
};

export { createScale, destroyScale };
