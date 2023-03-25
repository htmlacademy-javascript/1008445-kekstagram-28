import { getData } from './api.js';
import { showAlert } from './utils.js';
import { openPicturePreview } from './picture-preview.js';
import { createFormView } from './form-view.js';

const picturesElement = document.querySelector('.pictures');
const picturesFragment = document.querySelector('#picture');
const pictureFragment = document.createDocumentFragment();
const allElementsOnPageAvailable = picturesFragment && picturesElement && pictureFragment;

const fillPicturesView = (pictures) => {
  if (allElementsOnPageAvailable) {
    pictures.forEach(({ id, url, likes, comments, description }) => {
      const pictureTemplate = picturesFragment.content.querySelector('.picture');
      if (pictureTemplate) {
        const pictureElement = pictureTemplate.cloneNode(true);
        pictureElement.querySelector('.picture__img').src = url;
        pictureElement.querySelector('.picture__img').alt = description;
        pictureElement.querySelector('.picture__likes').textContent = likes;
        pictureElement.querySelector('.picture__comments').textContent = comments.length;
        pictureElement.dataset.id = id;
        pictureFragment.appendChild(pictureElement);
      }
    });

    picturesElement.appendChild(pictureFragment);

    picturesElement.addEventListener('click', (evt) => {
      if (evt.target.matches('.picture__img')) {
        const currentPictureElement = evt.target.closest('.picture');
        if (currentPictureElement && currentPictureElement.dataset && currentPictureElement.dataset.id) {
          const currentPictureId = +currentPictureElement.dataset.id;
          const currentPictureObject = pictures.find((pic) => pic.id === currentPictureId);
          if (currentPictureObject) {
            openPicturePreview(currentPictureObject);
          }
        }
      }
    });

    createFormView();
  }
};

function createMainView() {
  getData()
    .then((pictures) => {
      fillPicturesView(pictures);
    })
    .catch((e) => {
      showAlert(e.message);
    });
}

export { createMainView };
