import { isEscapeKey } from './utils.js';

const formView = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadCancelButton = document.querySelector('.img-upload__cancel');
const imgUploadFormView = document.querySelector('.img-upload__overlay');

const pristine = new Pristine(formView, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'input__error'
});

const validateHashtag = (hashtags) => {
  if (!hashtags) {
    return true;
  }
  const parsedHashtags = hashtags.split(' ');
  const parsedHashtagsSet = new Set(parsedHashtags);

  return (parsedHashtagsSet.size === parsedHashtags.length || parsedHashtags.length <= 5)
              && parsedHashtags.every((hashtag) => /^#[a-zа-яё0-9]{1,19}$/i.test(hashtag));

};
const validateComment = (comment) => comment.length <= 140;

pristine.addValidator(hashtagsInput, validateHashtag, 'Хэш тэг или список хэш-тегов не соответствует правилам');
pristine.addValidator(commentInput, validateComment, 'Длина комментария не может составлять больше 140 символов');

const onSubmitEvent = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
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
  imgUploadFormView.classList.remove('hidden');
  imgUploadCancelButton.addEventListener('click', onCloseEvent);
  document.addEventListener('keydown', onCloseEvent);
  document.body.classList.add('modal-open');
  formView.addEventListener('submit', onSubmitEvent);
}

function closeView() {
  imgUploadFormView.classList.add('hidden');
  document.removeEventListener('keydown', onCloseEvent);
  imgUploadCancelButton.removeEventListener('click', onCloseEvent);
  document.body.classList.remove('modal-open');
  formView.removeEventListener('submit', onSubmitEvent);
  imgUploadInput.value = '';
}

export { openView as openFormView };
