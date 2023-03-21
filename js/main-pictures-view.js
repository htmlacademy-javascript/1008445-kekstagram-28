import { createObject } from './data.js';

const SIMILAR_PICTURE_COUNT = 16;
const similarListElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarPictureFragment = document.createDocumentFragment();
const similarPictures = (Array.from({ length: SIMILAR_PICTURE_COUNT }, (_, index) => createObject(index + 1)));

if (pictureTemplate && similarListElement) {
  similarPictures.forEach(({ id, url, likes, comments, description }) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.dataset.id = id;
    similarPictureFragment.appendChild(pictureElement);
  });

  similarListElement.appendChild(similarPictureFragment);
}

export { similarPictures };
