import { getData } from './api.js';
import { showAlert, sortByComments, sortByRandom, debounce } from './utils.js';
import { openPicturePreview } from './picture-preview.js';
import { createFormView } from './form-view.js';

const RERENDER_DELAY = 500;
const MAX_RANDOM_PICTURES_COUNT = 10;
const imgFiltersElement = document.querySelector('.img-filters');
const picturesElement = document.querySelector('.pictures');
const picturesFragment = document.querySelector('#picture');
const pictureFragment = document.createDocumentFragment();
const allElementsAvailable = picturesFragment &&
  picturesElement &&
  pictureFragment &&
  imgFiltersElement;
let allPictures = [];

const renderPicturesView = (pictures) => {
  document.querySelectorAll('.picture').forEach((element) => element.remove());
  pictures.forEach(({ id, url, likes, comments, description }) => {
    const pictureTemplate = picturesFragment.content.querySelector('.picture');
    if (pictureTemplate) {
      const pictureElement = pictureTemplate.cloneNode(true);
      pictureElement.querySelector('.picture__img').src = url;
      pictureElement.querySelector('.picture__img').alt = description;
      pictureElement.querySelector('.picture__likes').textContent = likes;
      pictureElement.querySelector('.picture__comments').textContent = comments.length;
      pictureElement.dataset.id = id;

      picturesElement.appendChild(pictureElement);
    }
  });
};

const setFilterClick = (cb) => {
  imgFiltersElement.addEventListener('click', (evt) => {
    if (evt.target.matches('.img-filters__button')) {
      const currentFilterButton = evt.target;
      let sortedPictures = allPictures;
      if (currentFilterButton.matches('#filter-random')) {
        sortedPictures = allPictures.slice(0, MAX_RANDOM_PICTURES_COUNT).sort(sortByRandom);
      } else if (currentFilterButton.matches('#filter-discussed')) {
        sortedPictures = allPictures.slice().sort(sortByComments);
      }

      const activeButton = document.querySelector('.img-filters__button--active');
      if (currentFilterButton !== activeButton) {
        activeButton.classList.remove('img-filters__button--active');
        currentFilterButton.classList.add('img-filters__button--active');
        cb(sortedPictures);
      }
    }
  });
};

const fillPicturesView = (pictures) => {
  if (!allElementsAvailable) {
    return;
  }

  allPictures = pictures;
  renderPicturesView(pictures);
  imgFiltersElement.classList.remove('img-filters--inactive');
  setFilterClick(debounce((pics) => renderPicturesView(pics), RERENDER_DELAY));

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
};

async function createMainView() {
  try {
    const pictures = await getData();
    fillPicturesView(pictures);
  } catch(err) {
    showAlert(err.message);
  } finally {
    createFormView();
  }
}

export { createMainView };
