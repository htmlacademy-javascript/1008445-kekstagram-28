import { isEscapeKey } from './utils.js';

const COMMENT_COUNT_PART = 5;
const bigPictureView = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img img');
const bigPictureLikesCount = document.querySelector('.likes-count');
const bigPictureCaption = document.querySelector('.social__caption');
const bigPictureCommentCount = document.querySelector('.comments-count');
const visibleCommentCount = document.querySelector('.social__comment-count');
const commentLoaderButton = document.querySelector('.comments-loader');
const cancelButton = document.querySelector('.big-picture__cancel');
const socialCommentElement = document.querySelector('.social__comment');
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
let currentVisibleCommentsCount = 0;
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
    visibleCommentCount.firstChild.textContent = `${ currentVisibleCommentsCount } из `;
  }

  const commentsElement = bigPictureView.querySelector('.social__comments');
  if (commentsElement) {
    const createdComments = pictureComments.slice(0, currentVisibleCommentsCount).map(createCommentElement);
    commentsElement.replaceChildren(...createdComments);
  }
};

const onCommentLoaderButtonClick = () => {
  if (currentVisibleCommentsCount + COMMENT_COUNT_PART >= pictureComments.length) {
    commentLoaderButton.classList.add('hidden');
    commentLoaderButton.removeEventListener('click', onCommentLoaderButtonClick);
    currentVisibleCommentsCount = pictureComments.length;
  } else {
    currentVisibleCommentsCount += COMMENT_COUNT_PART;
  }

  fillComments();
};

function openView() {
  document.body.classList.add('modal-open');
  visibleCommentCount.classList.remove('hidden');
  cancelButton.addEventListener('click', onCloseEvent);
  document.addEventListener('keydown', onCloseEvent);

  if (isCommentLoaderButtonVisible) {
    commentLoaderButton.classList.remove('hidden');
    commentLoaderButton.addEventListener('click', onCommentLoaderButtonClick);
  } else {
    commentLoaderButton.classList.add('hidden');
  }

  bigPictureView.classList.remove('hidden');
}

function closeView() {
  if (!allElementsAvailable) {
    return;
  }
  document.body.classList.remove('modal-open');
  visibleCommentCount.classList.add('hidden');
  document.removeEventListener('keydown', onCloseEvent);
  cancelButton.removeEventListener('click', onCloseEvent);

  if (!commentLoaderButton.classList.contains('hidden')) {
    commentLoaderButton.classList.add('hidden');
    commentLoaderButton.removeEventListener('click', onCommentLoaderButtonClick);
  }

  bigPictureView.classList.add('hidden');
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
  currentVisibleCommentsCount = isCommentLoaderButtonVisible ? COMMENT_COUNT_PART : commentsCount;

  fillComments();
  openView();
}

export { openPicturePreview };
