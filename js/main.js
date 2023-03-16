/* eslint-disable no-unused-vars */
import { openBigPictureView } from './big-picture-view.js';
import { openFormView } from './form-view.js';
import { similarPictures } from './main-pictures-view.js';

const pictures = document.querySelector('.pictures');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadPreView = document.querySelector('.img-upload__preview img');

pictures.addEventListener('click', (evt) => {
  if (evt.target.matches('.picture__img')) {
    const currentPictureElement = evt.target.closest('.picture');
    const currentPictureId = parseInt(currentPictureElement.dataset.id, 10);
    const currentPictureObject = similarPictures.find((pic) => pic.id === currentPictureId);
    openBigPictureView(currentPictureObject);
  }
});

imgUploadInput.addEventListener('change', (evt) => {
  openFormView();

  const [ file ] = evt.target.files;
  imgUploadPreView.src = URL.createObjectURL(file);
});
