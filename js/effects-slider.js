import { Effects } from './utils.js';

const DEFAULT_EFFECT = Effects[0];
const SLIDER_MIN = 0;
const SLIDER_MAX = 100;
const SLIDER_STEP = 1;
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelContainerlement = document.querySelector('.img-upload__effect-level');
const imgUploadPreView = document.querySelector('.img-upload__preview img');
const scaleControlValuelement = document.querySelector('.scale__control--value');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const effectsListElement = document.querySelector('.effects__list');
const imgMiniPreViews = document.querySelectorAll('.effects__preview');
const allElementsAvailable = effectLevelSliderElement &&
  effectLevelContainerlement &&
  imgUploadPreView &&
  scaleControlValuelement &&
  effectLevelValueElement &&
  effectsListElement &&
  imgMiniPreViews;

const setDefaultEffect = () => {
  imgUploadPreView.className = DEFAULT_EFFECT.class;
  imgUploadPreView.style = DEFAULT_EFFECT.style;
  scaleControlValuelement.value = '100%';
};

const onEffectClickEvent = (evt) => {
  if (evt.target.matches('.effects__preview--none')) {
    effectLevelContainerlement.classList.add('hidden');
    setDefaultEffect();
  } else if (evt.target.matches('.effects__preview')) {
    effectLevelContainerlement.classList.remove('hidden');
    const currentEffect = Effects.find((effect) => evt.target.matches(`.${ effect.class }`));
    if (currentEffect) {
      imgUploadPreView.className = currentEffect.class;
      effectLevelSliderElement.noUiSlider.updateOptions({
        range: {
          min: currentEffect.min,
          max: currentEffect.max,
        },
        step: currentEffect.step,
      });
      effectLevelSliderElement.noUiSlider.set(currentEffect.max);
    }
  }
};

const sliderOnUpdateEvent = () => {
  const sliderValue = effectLevelSliderElement.noUiSlider.get();
  effectLevelValueElement.value = sliderValue;
  const currentEffectClass = imgUploadPreView.className;
  const currentEffect = Effects.find((effect) => effect.class === currentEffectClass);
  if (currentEffect) {
    imgUploadPreView.style.filter = `${ currentEffect.style }(${ sliderValue }${ currentEffect.dimention })`;
  }
};

const createSlider = (fileUrl) => {
  if (!allElementsAvailable) {
    return;
  }

  noUiSlider.create(effectLevelSliderElement, {
    range: {
      min: SLIDER_MIN,
      max: SLIDER_MAX,
    },
    start: SLIDER_MAX,
    step: SLIDER_STEP,
    connect: 'lower',
  });

  imgMiniPreViews.forEach((miniPreview) => {
    miniPreview.style.backgroundImage = `url('${ fileUrl }')`;
  });
  effectLevelContainerlement.classList.add('hidden');
  effectLevelSliderElement.noUiSlider.on('update', sliderOnUpdateEvent);
  effectsListElement.addEventListener('click', onEffectClickEvent);
};

const destroySlider = () => {
  effectLevelSliderElement.noUiSlider.off('update');
  effectLevelSliderElement.noUiSlider.destroy();
  effectsListElement.removeEventListener('click', onEffectClickEvent);

  setDefaultEffect();
};


export { createSlider, destroySlider };
