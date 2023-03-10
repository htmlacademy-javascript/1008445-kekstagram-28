/* eslint-disable no-unused-vars */
import { fillBigPictureView } from './big-picture-view.js';
import { similarPictures } from './main-pictures-view.js';
import { isEscapeKey } from './utils.js';

const bigPictureView = document.querySelector('.big-picture');
const pictures = document.querySelector('.pictures');
const cancelButton = bigPictureView.querySelector('.big-picture__cancel');
const commentCount = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.comments-loader');

const onCloseEvent = (evt) => {
  if (isEscapeKey(evt) || evt.target.matches('.big-picture__cancel')) {
    evt.preventDefault();
    closeView();
  }
};

pictures.addEventListener('click', (evt) => {
  if (evt.target.matches('.picture__img')) {
    openView();
    const currentPictureElement = evt.target.closest('.picture');
    const currentPictureId = parseInt(currentPictureElement.dataset.id, 10);
    const currentPictureObject = similarPictures.find((pic) => pic.id === currentPictureId);
    fillBigPictureView(currentPictureObject);
  }
});


function openView() {
  bigPictureView.classList.remove('hidden');
  cancelButton.addEventListener('click', onCloseEvent);
  document.addEventListener('keydown', onCloseEvent);
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
}

function closeView() {
  bigPictureView.classList.add('hidden');
  document.removeEventListener('keydown', onCloseEvent);
  cancelButton.removeEventListener('click', onCloseEvent);
  commentCount.classList.remove('hidden');
  commentLoader.classList.remove('hidden');
  document.body.classList.remove('modal-open');
}
