import { isEscapeKey } from './utils.js';

const formView = document.querySelector('.img-upload__form');
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
const EFFECTS_LIST = [
  { filterClass: 'effects__preview--chrome', filterName: 'grayscale', min: 0, max: 1, step: 0.1, dimention: '' },
  { filterClass: 'effects__preview--sepia', filterName: 'sepia', min: 0, max: 1, step: 0.1, dimention: '' },
  { filterClass: 'effects__preview--marvin', filterName: 'invert', min: 0, max: 100, step: 1, dimention: '%' },
  { filterClass: 'effects__preview--phobos', filterName: 'blur', min: 0, max: 3, step: 0.1, dimention: 'px' },
  { filterClass: 'effects__preview--heat', filterName: 'brightness', min: 1, max: 3, step: 0.1, dimention: '' }
];
const ERROR_TEXT_TAG = 'p';
const MAX_HASHTAG_COUNT = 5;
const HASHTAG_REG_EXP = /^#[a-zа-яё0-9]{1,19}$/i;
const allElementsAvailable = formView &&
  imgUploadFormView &&
  imgUploadCancelButton &&
  effectLevelSliderElement &&
  effectLevelValueElement &&
  scaleControlValuelement &&
  scaleControlSmallerButton &&
  scaleControlBiggerBitton;
let pristine;

const validateHashtag = (hashtags) => {
  if (!hashtags) {
    return true;
  }
  const parsedHashtags = hashtags.split(' ');
  const parsedHashtagsSet = new Set(parsedHashtags);
  if (parsedHashtagsSet.size === parsedHashtags.length && parsedHashtags.length <= MAX_HASHTAG_COUNT) {
    return parsedHashtags.every((hashtag) => HASHTAG_REG_EXP.test(hashtag));
  }
};
const validateComment = (comment) => comment.length <= 140;


const onSubmitEvent = (evt) => {
  evt.preventDefault();
  if (pristine && pristine.validate()) {
    evt.currentTarget.submit();
  }
};

const onCloseEvent = (evt) => {
  if (evt.target.matches('.text__hashtags') || evt.target.matches('.text__description')) {
    return;
  }

  if (isEscapeKey(evt) || evt.target.matches('.img-upload__cancel')) {
    closeView();
  }
};

const onClickEvent = (evt) => {
  if (evt.target.matches('.effects__preview--none')) {
    effectLevelContainerlement.classList.add('hidden');
    imgUploadPreView.className = '';
    imgUploadPreView.style = '';
    scaleControlValuelement.value = '100%';
  } else if (evt.target.matches('.effects__preview')) {
    effectLevelContainerlement.classList.remove('hidden');
    imgUploadPreView.className = '';
    const currentEffect = EFFECTS_LIST.find((effect) => evt.target.matches(`.${ effect.filterClass }`));
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

const onChangeScaleEvent = (evt) => {
  let scale = parseInt(scaleControlValuelement.value, 10);
  if (evt.target.matches('.scale__control--smaller') && scale >= 50) {
    scale -= 25;
  } else if (evt.target.matches('.scale__control--bigger') && scale <= 75){
    scale += 25;
  }
  scaleControlValuelement.value = `${ scale }%`;
  imgUploadPreView.style.transform = `scale(${ scale / 100 })`;
};

const createPristineValidator = () => {
  pristine = new Pristine(formView, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--invalid',
    successClass: 'img-upload__field-wrapper--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: ERROR_TEXT_TAG,
    errorTextClass: 'input__error'
  });


  if (hashtagsInput) {
    pristine.addValidator(hashtagsInput, validateHashtag, 'Хэш тэг или список хэш-тегов не соответствует правилам');
  }
  if (commentInput) {
    pristine.addValidator(commentInput, validateComment, 'Длина комментария не может составлять больше 140 символов');
  }
};

function createSlider() {
  noUiSlider.create(effectLevelSliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });

  effectLevelSliderElement.noUiSlider.on('update', () => {
    const sliderValue = effectLevelSliderElement.noUiSlider.get();
    effectLevelValueElement.value = sliderValue;
    const currentEffectClass = document.querySelector('.img-upload__preview img').className;
    const currentEffect = EFFECTS_LIST.find((effect) => effect.filterClass === currentEffectClass);
    if (currentEffect) {
      imgUploadPreView.style.filter = `${ currentEffect.filterName }(${ sliderValue }${ currentEffect.dimention })`;
    }
  });
}

function openView() {
  if (allElementsAvailable) {
    formView.addEventListener('submit', onSubmitEvent);
    imgUploadFormView.classList.remove('hidden');
    imgUploadCancelButton.addEventListener('click', onCloseEvent);
    scaleControlSmallerButton.addEventListener('click', onChangeScaleEvent);
    scaleControlBiggerBitton.addEventListener('click', onChangeScaleEvent);
    effectLevelContainerlement.classList.add('hidden');
    document.addEventListener('keydown', onCloseEvent);
    document.body.classList.add('modal-open');

    createSlider();
    createPristineValidator();

    effectsListElement.addEventListener('click', onClickEvent);
  }
}

function closeView() {
  if (allElementsAvailable && pristine) {
    formView.removeEventListener('submit', onSubmitEvent);
    imgUploadFormView.classList.add('hidden');
    imgUploadCancelButton.removeEventListener('click', onCloseEvent);
    scaleControlSmallerButton.removeEventListener('click', onChangeScaleEvent);
    scaleControlBiggerBitton.removeEventListener('click', onChangeScaleEvent);
    effectsListElement.removeEventListener('click', onClickEvent);
    document.removeEventListener('keydown', onCloseEvent);
    document.body.classList.remove('modal-open');

    imgUploadInput.value = '';
    effectLevelSliderElement.noUiSlider.off('update');
    effectLevelSliderElement.noUiSlider.destroy();
    pristine.destroy();
  }
}

export { openView as openFormView };
