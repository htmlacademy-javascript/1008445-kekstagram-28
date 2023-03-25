import { validateHashtag, validateComment, isEscapeKey, Effects, SubmitButtonTexts } from './utils.js';
import { sendData } from './api.js';
import { checkIfImg } from './utils.js';
import { showSuccessMessage, showErrorMessage } from './message-view.js';
import { createSlider, destroySlider } from './slider.js';
import { createValidator, validate, destroyValidator } from './validator.js';

const formView = document.querySelector('.img-upload__form');
const formSubmitButton = document.querySelector('.img-upload__submit');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadCancelButton = document.querySelector('.img-upload__cancel');
const imgUploadFormView = document.querySelector('.img-upload__overlay');
const imgUploadPreView = document.querySelector('.img-upload__preview img');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const effectsListElement = document.querySelector('.effects__list');
const effectLevelContainerlement = document.querySelector('.img-upload__effect-level');
const scaleControlValuelement = document.querySelector('.scale__control--value');
const scaleControlSmallerButton = document.querySelector('.scale__control--smaller');
const scaleControlBiggerBitton = document.querySelector('.scale__control--bigger');

const allElementsOnPageAvailable = formView &&
  imgUploadFormView &&
  imgUploadPreView &&
  imgUploadCancelButton &&
  effectLevelSliderElement &&
  effectLevelValueElement &&
  effectsListElement &&
  effectLevelContainerlement &&
  scaleControlValuelement &&
  scaleControlSmallerButton &&
  scaleControlBiggerBitton &&
  formSubmitButton &&
  hashtagsInput &&
  commentInput;


const blockSubmitButton = () => {
  formSubmitButton.disabled = true;
  formSubmitButton.textContent = SubmitButtonTexts.SENDING;
};

const unblockSubmitButton = () => {
  formSubmitButton.disabled = false;
  formSubmitButton.textContent = SubmitButtonTexts.IDLE;
};

const onFormSubmitEvent = (evt) => {
  evt.preventDefault();

  if (validate) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => {
        closeView();
        showSuccessMessage();
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(unblockSubmitButton());
  }
};

const onFormCloseEvent = (evt) => {
  if (evt.target.matches('.text__hashtags') || evt.target.matches('.text__description')) {
    return;
  }
  const errorMessageElement = document.querySelector('.error');
  if ((isEscapeKey(evt) && !errorMessageElement) || evt.target.matches('.img-upload__cancel')) {
    closeView();
  }
};

const onEffectClickEvent = (evt) => {
  if (evt.target.matches('.effects__preview--none')) {
    effectLevelContainerlement.classList.add('hidden');
    imgUploadPreView.className = '';
    imgUploadPreView.style = '';
    scaleControlValuelement.value = '100%';
  } else if (evt.target.matches('.effects__preview')) {
    effectLevelContainerlement.classList.remove('hidden');
    imgUploadPreView.className = '';
    const currentEffect = Effects.find((effect) => evt.target.matches(`.${ effect.filterClass }`));
    imgUploadPreView.classList.add(currentEffect.filterClass);
    effectLevelSliderElement.noUiSlider.updateOptions({
      range: {
        min: currentEffect.min,
        max: currentEffect.max,
      },
      step: currentEffect.step,
    });
    effectLevelSliderElement.noUiSlider.set(currentEffect.max);
  }
};

const onChangeScaleClickEvent = (evt) => {
  let scale = parseInt(scaleControlValuelement.value, 10);
  if (evt.target.matches('.scale__control--smaller') && scale >= 50) {
    scale -= 25;
  } else if (evt.target.matches('.scale__control--bigger') && scale <= 75){
    scale += 25;
  }
  scaleControlValuelement.value = `${ scale }%`;
  imgUploadPreView.style.transform = `scale(${ scale / 100 })`;
};

const sliderOnUpdateEvent = () => {
  const sliderValue = effectLevelSliderElement.noUiSlider.get();
  effectLevelValueElement.value = sliderValue;
  const currentEffectClass = document.querySelector('.img-upload__preview img').className;
  const currentEffect = Effects.find((effect) => effect.filterClass === currentEffectClass);
  if (currentEffect) {
    imgUploadPreView.style.filter = `${ currentEffect.filterName }(${ sliderValue }${ currentEffect.dimention })`;
  }
};

function openView() {
  if (allElementsOnPageAvailable) {
    formView.addEventListener('submit', onFormSubmitEvent);
    imgUploadFormView.classList.remove('hidden');
    imgUploadCancelButton.addEventListener('click', onFormCloseEvent);
    scaleControlSmallerButton.addEventListener('click', onChangeScaleClickEvent);
    scaleControlBiggerBitton.addEventListener('click', onChangeScaleClickEvent);
    effectLevelContainerlement.classList.add('hidden');
    document.addEventListener('keydown', onFormCloseEvent);
    document.body.classList.add('modal-open');

    createSlider(effectLevelSliderElement, sliderOnUpdateEvent);
    createValidator(formView, [
      { input: hashtagsInput, fc: validateHashtag, text: 'Хэш тэг или список хэш-тегов не соответствует правилам' },
      { input: commentInput, fc: validateComment, text: 'Длина комментария не может составлять больше 140 символов' }
    ]);

    effectsListElement.addEventListener('click', onEffectClickEvent);
  }
}

function closeView() {
  if (allElementsOnPageAvailable) {
    formView.removeEventListener('submit', onFormSubmitEvent);
    imgUploadFormView.classList.add('hidden');
    imgUploadCancelButton.removeEventListener('click', onFormCloseEvent);
    scaleControlSmallerButton.removeEventListener('click', onChangeScaleClickEvent);
    scaleControlBiggerBitton.removeEventListener('click', onChangeScaleClickEvent);
    effectsListElement.removeEventListener('click', onEffectClickEvent);
    document.removeEventListener('keydown', onFormCloseEvent);
    document.body.classList.remove('modal-open');

    imgUploadInput.value = '';
    imgUploadPreView.className = '';
    imgUploadPreView.style = '';
    scaleControlValuelement.value = '100%';
    hashtagsInput.value = '';
    commentInput.value = '';

    destroySlider(effectLevelSliderElement);
    destroyValidator(effectLevelSliderElement);
  }
}

const createFormView = () => {
  if (imgUploadInput) {
    imgUploadInput.addEventListener('change', (evt) => {
      const [ file ] = evt.target.files;
      if (file && checkIfImg(file) && imgUploadPreView) {
        imgUploadPreView.src = URL.createObjectURL(file);
        openView();
      }
    });
  }
};

export { createFormView };
