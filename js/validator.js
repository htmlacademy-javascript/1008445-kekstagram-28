const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REG_EXP = /^#[a-zа-яё0-9]{1,19}$/i;
const formView = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const allElementsAvailable = formView &&
  hashtagsInput &&
  commentInput;
let pristine = {};

function validateHashtag (hashtags) {
  if (!hashtags) {
    return true;
  }
  const parsedHashtags = hashtags.trim().split(' ');
  const parsedHashtagsSet = new Set(parsedHashtags);
  if (parsedHashtagsSet.size === parsedHashtags.length && parsedHashtags.length <= MAX_HASHTAG_COUNT) {
    return parsedHashtags.every((hashtag) => HASHTAG_REG_EXP.test(hashtag));
  }
}

function validateComment(comment) {
  return comment.length <= MAX_COMMENT_LENGTH;
}

const createValidator = () => {
  if (!allElementsAvailable) {
    return;
  }

  pristine = new Pristine(formView, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'p',
    errorTextClass: 'input__error'
  });

  pristine.addValidator(hashtagsInput, validateHashtag, 'Хэш тэг или список хэш-тегов не соответствует правилам');
  pristine.addValidator(commentInput, validateComment, 'Длина комментария не может составлять больше 140 символов');
};

const destroyValidator = () => {
  if (pristine) {
    pristine.destroy();
  }
};

const validate = () => pristine && pristine.validate();

export { createValidator, validate, destroyValidator };
