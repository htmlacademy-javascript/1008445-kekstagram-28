import { isEscapeKey } from './utils.js';

const bigPictureView = document.querySelector('.big-picture');
const visibleCommentCount = document.querySelector('.social__comment-count');
const commentLoaderButton = document.querySelector('.comments-loader');
const cancelButton = document.querySelector('.big-picture__cancel');
const COMMENT_COUNT_PART = 5;
const commentsStore = {};

const onCloseEvent = (evt) => {
  if (isEscapeKey(evt) || evt.target.matches('.big-picture__cancel')) {
    evt.preventDefault();
    closeView();
  }
};

const createCommentElement = ({ avatar, name, message }) => {
  const commentElement = document.querySelector('.social__comment').cloneNode(true);
  commentElement.querySelector('img').src = avatar;
  commentElement.querySelector('img').alt = name;
  commentElement.querySelector('p').textContent = message;
  return commentElement;
};

const fillComments = (comments, commentsCount) => {
  visibleCommentCount.firstChild.textContent = `${ commentsCount } из `;

  const commentsElement = bigPictureView.querySelector('.social__comments');
  const createdComments = comments.slice(0, commentsCount).map(createCommentElement);
  commentsElement.replaceChildren(...createdComments);
};

const commentLoaderButtonOnClick = () => {
  if (commentsStore.visibleComments + COMMENT_COUNT_PART >= commentsStore.comments.length) {
    commentLoaderButton.classList.add('hidden');
    commentLoaderButton.removeEventListener('click', commentLoaderButtonOnClick);
    commentsStore.visibleComments = commentsStore.comments.length;
  } else {
    commentsStore.visibleComments += COMMENT_COUNT_PART;
  }

  fillComments(commentsStore.comments, commentsStore.visibleComments);
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

const openBigPictureView = ({ url, likes, description, comments }) => {
  commentsStore.comments = comments;
  const commentsCount = comments.length;
  bigPictureView.querySelector('.big-picture__img img').src = url;
  bigPictureView.querySelector('.likes-count').textContent = likes;
  bigPictureView.querySelector('.social__caption').textContent = description;
  bigPictureView.querySelector('.comments-count').textContent = commentsCount;

  const isCommentLoaderButtonVisible = commentsCount > COMMENT_COUNT_PART;
  commentsStore.visibleComments = isCommentLoaderButtonVisible ? COMMENT_COUNT_PART : commentsCount;

  fillComments(comments, commentsStore.visibleComments);
  openView(isCommentLoaderButtonVisible);
};


export { openBigPictureView };
