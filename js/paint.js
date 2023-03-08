import { createObject } from './data.js';

const SIMILAR_PICTURE_COUNT = 6;
const similarListElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarPictureFragment = document.createDocumentFragment();
const similarPictures = (Array.from({ length: SIMILAR_PICTURE_COUNT }, (_, index) => createObject(index + 1)));

similarPictures.forEach(({ url, likes, comments }) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  similarPictureFragment.appendChild(pictureElement);
});

similarListElement.appendChild(similarPictureFragment);
