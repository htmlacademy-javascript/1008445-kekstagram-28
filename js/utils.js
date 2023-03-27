/* eslint-disable no-unused-vars */
const IMG_EXTENTIONS = ['jpg', 'bmp', 'png'];
const ALERT_SHOW_TIME = 3000;

const Effects = [
  { class: 'effects__preview--none', style: '' },
  { class: 'effects__preview--chrome', style: 'grayscale', min: 0, max: 1, step: 0.1, dimention: '' },
  { class: 'effects__preview--sepia', style: 'sepia', min: 0, max: 1, step: 0.1, dimention: '' },
  { class: 'effects__preview--marvin', style: 'invert', min: 0, max: 100, step: 1, dimention: '%' },
  { class: 'effects__preview--phobos', style: 'blur', min: 0, max: 3, step: 0.1, dimention: 'px' },
  { class: 'effects__preview--heat', style: 'brightness', min: 1, max: 3, step: 0.1, dimention: '' }
];
const SubmitButtonTexts = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const getExtension = (file) => {
  const fileParts = file.name.split('.');
  if (fileParts.length) {
    return fileParts.pop();
  }
};

const checkIfImg = (file) => {
  const ext = getExtension(file);
  return ext && IMG_EXTENTIONS.includes(ext);
};

const showAlert = (message) => {
  const alertElement = document.querySelector('.alert');
  const alertTextEelemnt = document.querySelector('.alert__message');

  alertElement.classList.add('show');
  alertTextEelemnt.textContent = message;

  setTimeout(() => {
    alertElement.classList.remove('show');
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const sortByComments = (a, b) => a.comments && b.comments && a.comments.length && b.comments.length
  ? b.comments.length - a.comments.length
  : 0;

const sortByRandom = () => 0.5 - Math.random();

export {
  isEscapeKey,
  checkIfImg,
  showAlert,
  Effects,
  SubmitButtonTexts,
  sortByComments,
  sortByRandom,
  debounce
};
