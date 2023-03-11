import { isEscapeKey } from './utils.js';

const bigPictureView = document.querySelector('.big-picture');
const visibleCommentCount = document.querySelector('.social__comment-count');
const commentLoaderButton = document.querySelector('.comments-loader');
const cancelButton = document.querySelector('.big-picture__cancel');
const COMMENT_COUNT_PART = 5;
const currentPictureStore = {};

const onCloseEvent = (evt) => {
  if (isEscapeKey(evt) || evt.target.matches('.big-picture__cancel')) {
    evt.preventDefault();
    closeView();
  }
};

const createCommentElement = (comment) => {
  const commentElement = document.querySelector('.social__comment').cloneNode(true);
  commentElement.querySelector('img').src = comment.avatar;
  commentElement.querySelector('img').alt = comment.name;
  commentElement.querySelector('p').textContent = comment.message;
  return commentElement;
};

const fillComments = (comments, commentsCount) => {
  visibleCommentCount.firstChild.textContent = `${ commentsCount } из `;

  const commentsElement = bigPictureView.querySelector('.social__comments');
  const createdComments = comments.slice(0, commentsCount).map(createCommentElement);
  commentsElement.replaceChildren(...createdComments);
};

const commentLoaderButtonOnClick = () => {
  if (currentPictureStore.totalVisibleComments + COMMENT_COUNT_PART >= currentPictureStore.picture.comments.length) {
    commentLoaderButton.classList.add('hidden');
    commentLoaderButton.removeEventListener('click', commentLoaderButtonOnClick);
    currentPictureStore.totalVisibleComments = currentPictureStore.picture.comments.length;
  } else {
    currentPictureStore.totalVisibleComments += COMMENT_COUNT_PART;
  }

  fillComments(currentPictureStore.picture.comments, currentPictureStore.totalVisibleComments);
};

function openView(isCommentLoaderButtonVisible) {
  bigPictureView.classList.remove('hidden');
  cancelButton.addEventListener('click', onCloseEvent);
  document.addEventListener('keydown', onCloseEvent);
  visibleCommentCount.classList.remove('hidden');
  if (isCommentLoaderButtonVisible) {
    commentLoaderButton.classList.remove('hidden');
    commentLoaderButton.addEventListener('click', commentLoaderButtonOnClick);
  } else {
    commentLoaderButton.classList.add('hidden');
  }
  document.body.classList.add('modal-open');
}

function closeView() {
  bigPictureView.classList.add('hidden');
  document.removeEventListener('keydown', onCloseEvent);
  cancelButton.removeEventListener('click', onCloseEvent);
  visibleCommentCount.classList.add('hidden');
  if (!commentLoaderButton.classList.contains('hidden')) {
    commentLoaderButton.classList.add('hidden');
    commentLoaderButton.removeEventListener('click', commentLoaderButtonOnClick);
  }
  document.body.classList.remove('modal-open');
}

const openBigPictureView = (pictureObject) => {
  currentPictureStore.picture = pictureObject;
  const commentsCount = pictureObject.comments.length;
  bigPictureView.querySelector('.big-picture__img img').src = pictureObject.url;
  bigPictureView.querySelector('.likes-count').textContent = pictureObject.likes;
  bigPictureView.querySelector('.comments-count').textContent = commentsCount;
  bigPictureView.querySelector('.social__caption').textContent = pictureObject.description;

  const isCommentLoaderButtonVisible = commentsCount > COMMENT_COUNT_PART;
  currentPictureStore.totalVisibleComments = isCommentLoaderButtonVisible ? COMMENT_COUNT_PART : commentsCount;

  fillComments(pictureObject.comments, currentPictureStore.totalVisibleComments);
  openView(isCommentLoaderButtonVisible);
};


export { openBigPictureView };
