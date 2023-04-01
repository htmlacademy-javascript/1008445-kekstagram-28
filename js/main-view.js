import { getData } from './api.js';
import { showAlert, sortByComments, sortByRandom, debounce } from './utils.js';
import { openPicturePreview } from './picture-preview.js';
import { createFormView } from './form-view.js';

const RERENDER_DELAY = 500;
const MAX_RANDOM_PICTURES_COUNT = 10;
const imgFiltersElement = document.querySelector('.img-filters');
const picturesContainer = document.querySelector('.pictures');
const picturesFragment = document.querySelector('#picture');
const pictureFragment = document.createDocumentFragment();
const allElementsAvailable = picturesFragment &&
  picturesContainer &&
  pictureFragment &&
  imgFiltersElement;
let pictures = [];
let currentFilter = getCurrentFilter();

const getFilteredPictures = () => {
  switch (currentFilter) {
    case 'filter-random': return [ ...pictures ].slice(0, MAX_RANDOM_PICTURES_COUNT).sort(sortByRandom);
    case 'filter-discussed': return [ ...pictures ].slice().sort(sortByComments);
    case 'filter-default': return [ ...pictures ];
  }
};

const renderPicturesView = () => {
  document.querySelectorAll('.picture').forEach((element) => element.remove());
  const filteredPictures = getFilteredPictures();
  filteredPictures.forEach(({ id, url, likes, comments, description }) => {
    const pictureTemplate = picturesFragment.content.querySelector('.picture');
    if (pictureTemplate) {
      const pictureElement = pictureTemplate.cloneNode(true);
      pictureElement.querySelector('.picture__img').src = url;
      pictureElement.querySelector('.picture__img').alt = description;
      pictureElement.querySelector('.picture__likes').textContent = likes;
      pictureElement.querySelector('.picture__comments').textContent = comments.length;
      pictureElement.dataset.id = id;

      picturesContainer.appendChild(pictureElement);
    }
  });
};

const setFilterClick = (cb) => {
  imgFiltersElement.addEventListener('click', (evt) => {
    if (evt.target.matches('.img-filters__button')) {
      const currentFilterButton = evt.target;
      const activeButton = document.querySelector('.img-filters__button--active');

      if (currentFilterButton !== activeButton) {
        activeButton.classList.remove('img-filters__button--active');
        currentFilterButton.classList.add('img-filters__button--active');
        currentFilter = getCurrentFilter(currentFilterButton);
        cb(getFilteredPictures());
      }
    }
  });
};

const onPicturesContainerClick = (evt) => {
  if (evt.target.matches('.picture__img')) {
    const currentPictureElement = evt.target.closest('.picture');
    if (currentPictureElement && currentPictureElement.dataset && currentPictureElement.dataset.id) {
      const currentPictureId = +currentPictureElement.dataset.id;
      const currentPictureObject = pictures.find((picture) => picture.id === currentPictureId);
      if (currentPictureObject) {
        openPicturePreview(currentPictureObject);
      }
    }
  }
};

const fillPicturesView = (loadedPictures) => {
  if (!allElementsAvailable && loadedPictures && loadedPictures.length) {
    return;
  }

  pictures = [ ...loadedPictures ];
  renderPicturesView();
  picturesContainer.addEventListener('click', onPicturesContainerClick);

  setFilterClick(debounce(renderPicturesView, RERENDER_DELAY));
  imgFiltersElement.classList.remove('img-filters--inactive');
};

function getCurrentFilter(filterButton) {
  if (filterButton) {
    return filterButton.id;
  }
  return 'filter-default';
}

async function createMainView() {
  try {
    fillPicturesView(await getData());
  } catch(err) {
    showAlert(err.message);
  } finally {
    createFormView();
  }
}

export { createMainView };
