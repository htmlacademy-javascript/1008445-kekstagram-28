import { isEscapeKey } from './utils.js';

const bigPictureView = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img img');
const bigPictureLikesCount = document.querySelector('.likes-count');
const bigPictureCaption = document.querySelector('.social__caption');
const bigPictureCommentCount = document.querySelector('.comments-count');
const visibleCommentCount = document.querySelector('.social__comment-count');
const commentLoaderButton = document.querySelector('.comments-loader');
const cancelButton = document.querySelector('.big-picture__cancel');
const socialCommentElement = document.querySelector('.social__comment');
const COMMENT_COUNT_PART = 5;
const allElementsAvailable = bigPictureView &&
  bigPictureImg &&
  bigPictureLikesCount &&
  bigPictureCaption &&
  bigPictureCommentCount &&
  visibleCommentCount &&
  commentLoaderButton &&
  cancelButton &&
  socialCommentElement;
let isCommentLoaderButtonVisible = false;
let visibleComments = 0;
let pictureComments = [];

const onCloseEvent = (evt) => {
  if (isEscapeKey(evt) || evt.target.matches('.big-picture__cancel')) {
    evt.preventDefault();
    closeView();
  }
};

const createCommentElement = ({ avatar, name, message }) => {
  const commentElement = socialCommentElement.cloneNode(true);
  commentElement.querySelector('img').src = avatar;
  commentElement.querySelector('img').alt = name;
  commentElement.querySelector('p').textContent = message;
  return commentElement;
};

const fillComments = () => {
  if (visibleCommentCount && visibleCommentCount.firstChild) {
    visibleCommentCount.firstChild.textContent = `${ visibleComments } из `;
  }

  const commentsElement = bigPictureView.querySelector('.social__comments');
  if (commentsElement) {
    const createdComments = pictureComments.slice(0, visibleComments).map(createCommentElement);
    commentsElement.replaceChildren(...createdComments);
  }
};

const commentLoaderButtonOnClick = () => {
  if (visibleComments + COMMENT_COUNT_PART >= pictureComments.length) {
    commentLoaderButton.classList.add('hidden');
    commentLoaderButton.removeEventListener('click', commentLoaderButtonOnClick);
    visibleComments = pictureComments.length;
  } else {
    visibleComments += COMMENT_COUNT_PART;
  }

  fillComments();
};

function openView() {
  bigPictureView.classList.remove('hidden');
  visibleCommentCount.classList.remove('hidden');
  cancelButton.addEventListener('click', onCloseEvent);
  document.addEventListener('keydown', onCloseEvent);

  if (isCommentLoaderButtonVisible) {
    commentLoaderButton.classList.remove('hidden');
    commentLoaderButton.addEventListener('click', commentLoaderButtonOnClick);
  } else {
    commentLoaderButton.classList.add('hidden');
  }
  document.body.classList.add('modal-open');
}

function closeView() {
  if (!allElementsAvailable) {
    return;
  }

  bigPictureView.classList.add('hidden');
  visibleCommentCount.classList.add('hidden');
  document.removeEventListener('keydown', onCloseEvent);
  cancelButton.removeEventListener('click', onCloseEvent);

  if (!commentLoaderButton.classList.contains('hidden')) {
    commentLoaderButton.classList.add('hidden');
    commentLoaderButton.removeEventListener('click', commentLoaderButtonOnClick);
  }
  document.body.classList.remove('modal-open');
}

function openPicturePreview ({ url, likes, description, comments }) {
  if (!allElementsAvailable) {
    return;
  }

  pictureComments = comments;
  const commentsCount = pictureComments.length;

  bigPictureImg.src = url;
  bigPictureLikesCount.textContent = likes;
  bigPictureCaption.textContent = description;
  bigPictureCommentCount.textContent = commentsCount;

  isCommentLoaderButtonVisible = commentsCount > COMMENT_COUNT_PART;
  visibleComments = isCommentLoaderButtonVisible ? COMMENT_COUNT_PART : commentsCount;

  fillComments();
  openView();
}

export { openPicturePreview };
