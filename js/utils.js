/* eslint-disable no-unused-vars */
const ALERT_SHOW_TIME = 3000;
const RANDOM_VALUE = 0.5;
const ImgExtentions = ['jpg', 'bmp', 'png', 'jpeg'];
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

const showAlert = (message) => {
  const alertElement = document.querySelector('.alert');
  const alertTextEelemnt = document.querySelector('.alert__message');

  alertElement.classList.add('show');
  alertTextEelemnt.textContent = message;

  setTimeout(() => {
    alertElement.classList.remove('show');
  }, ALERT_SHOW_TIME);
};


const checkIfImg = (file) => {
  if (file.name) {
    if (ImgExtentions.some((extention) => file.name.endsWith(extention))) {
      return true;
    } else {
      return showAlert('Выбран файл с не подходящим расширением');
    }
  }
  showAlert('Что то пошло не так при загрузке файла');
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

const sortByRandom = () => RANDOM_VALUE - Math.random();

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
