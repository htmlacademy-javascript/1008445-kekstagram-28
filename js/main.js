/* eslint-disable no-unused-vars */
import { openBigPictureView } from './big-picture-view.js';
import { openFormView } from './form-view.js';
import { similarPictures } from './main-pictures-view.js';
import { checkIfImg } from './utils.js';

const pictures = document.querySelector('.pictures');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadPreView = document.querySelector('.img-upload__preview img');

if (pictures) {
  pictures.addEventListener('click', (evt) => {
    if (evt.target.matches('.picture__img')) {
      const currentPictureElement = evt.target.closest('.picture');
      if (currentPictureElement && currentPictureElement.dataset && currentPictureElement.dataset.id) {
        const currentPictureId = parseInt(currentPictureElement.dataset.id, 10);
        const currentPictureObject = similarPictures.find((pic) => pic.id === currentPictureId);
        if (currentPictureObject) {
          openBigPictureView(currentPictureObject);
        }
      }
    }
  });
}

if (imgUploadInput) {
  imgUploadInput.addEventListener('change', (evt) => {
    const [ file ] = evt.target.files;
    if (file && checkIfImg(file) && imgUploadPreView) {
      imgUploadPreView.src = URL.createObjectURL(file);
      openFormView();
    }
  });
}

