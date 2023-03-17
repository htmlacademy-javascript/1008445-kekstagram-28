import { isEscapeKey } from './utils.js';

const formView = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadCancelButton = document.querySelector('.img-upload__cancel');
const imgUploadFormView = document.querySelector('.img-upload__overlay');
const ERROR_TEXT_TAG = 'p';
const MAX_HASHTAG_COUNT = 5;
const HASHTAG_REG_EXP = /^#[a-zа-яё0-9]{1,19}$/i;
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

function openView() {
  if (imgUploadFormView && formView && imgUploadCancelButton) {
    imgUploadFormView.classList.remove('hidden');
    imgUploadCancelButton.addEventListener('click', onCloseEvent);
    document.addEventListener('keydown', onCloseEvent);
    document.body.classList.add('modal-open');
    formView.addEventListener('submit', onSubmitEvent);

    pristine = new Pristine(formView, {
      classTo: 'img-upload__field-wrapper',
      errorClass: 'img-upload__field-wrapper--invalid',
      successClass: 'img-upload__field-wrapper--valid',
      errorTextParent: 'img-upload__field-wrapper',
      errorTextTag: ERROR_TEXT_TAG,
      errorTextClass: 'input__error'
    });

    pristine.addValidator(hashtagsInput, validateHashtag, 'Хэш тэг или список хэш-тегов не соответствует правилам');
    pristine.addValidator(commentInput, validateComment, 'Длина комментария не может составлять больше 140 символов');
  }
}

function closeView() {
  if (imgUploadFormView && formView && imgUploadCancelButton && pristine) {
    imgUploadFormView.classList.add('hidden');
    document.removeEventListener('keydown', onCloseEvent);
    imgUploadCancelButton.removeEventListener('click', onCloseEvent);
    document.body.classList.remove('modal-open');
    formView.removeEventListener('submit', onSubmitEvent);
    imgUploadInput.value = '';
    pristine.destroy();
  }
}

export { openView as openFormView };
