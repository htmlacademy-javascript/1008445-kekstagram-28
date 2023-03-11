/* eslint-disable no-unused-vars */
import { openBigPictureView } from './big-picture-view.js';
import { similarPictures } from './main-pictures-view.js';

const pictures = document.querySelector('.pictures');

pictures.addEventListener('click', (evt) => {
  if (evt.target.matches('.picture__img')) {
    const currentPictureElement = evt.target.closest('.picture');
    const currentPictureId = parseInt(currentPictureElement.dataset.id, 10);
    const currentPictureObject = similarPictures.find((pic) => pic.id === currentPictureId);
    openBigPictureView(currentPictureObject);
  }
});
