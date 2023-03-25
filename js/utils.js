/* eslint-disable no-unused-vars */
const IMG_EXTENTIONS = ['jpg', 'bmp', 'png'];
const ALERT_SHOW_TIME = 3000;
const MAX_HASHTAG_COUNT = 5;
const HASHTAG_REG_EXP = /^#[a-zа-яё0-9]{1,19}$/i;
const Effects = [
  { filterClass: 'effects__preview--chrome', filterName: 'grayscale', min: 0, max: 1, step: 0.1, dimention: '' },
  { filterClass: 'effects__preview--sepia', filterName: 'sepia', min: 0, max: 1, step: 0.1, dimention: '' },
  { filterClass: 'effects__preview--marvin', filterName: 'invert', min: 0, max: 100, step: 1, dimention: '%' },
  { filterClass: 'effects__preview--phobos', filterName: 'blur', min: 0, max: 3, step: 0.1, dimention: 'px' },
  { filterClass: 'effects__preview--heat', filterName: 'brightness', min: 1, max: 3, step: 0.1, dimention: '' }
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

function validateHashtag (hashtags) {
  if (!hashtags) {
    return true;
  }
  const parsedHashtags = hashtags.split(' ');
  const parsedHashtagsSet = new Set(parsedHashtags);
  if (parsedHashtagsSet.size === parsedHashtags.length && parsedHashtags.length <= MAX_HASHTAG_COUNT) {
    return parsedHashtags.every((hashtag) => HASHTAG_REG_EXP.test(hashtag));
  }
}

function validateComment(comment) {
  return comment.length <= 140;
}

export {
  isEscapeKey,
  checkIfImg,
  showAlert,
  validateComment,
  validateHashtag,
  Effects,
  SubmitButtonTexts
};
