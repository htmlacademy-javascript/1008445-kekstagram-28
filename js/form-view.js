import { isEscapeKey, SubmitButtonTexts } from './utils.js';
import { sendData } from './api.js';
import { checkIfImg } from './utils.js';
import { showSuccessMessage, showErrorMessage } from './message-view.js';
import { createSlider, destroySlider } from './effects-slider.js';
import { createScale, destroyScale } from './scale.js';
import { createValidator, validate, destroyValidator } from './validator.js';

const formView = document.querySelector('.img-upload__form');
const formSubmitButton = document.querySelector('.img-upload__submit');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadCancelButton = document.querySelector('.img-upload__cancel');
const imgUploadFormView = document.querySelector('.img-upload__overlay');
const imgUploadPreView = document.querySelector('.img-upload__preview img');
const allElementsAvailable = formView &&
  imgUploadInput &&
  imgUploadFormView &&
  imgUploadPreView &&
  imgUploadCancelButton &&
  formSubmitButton;

const blockSubmitButton = () => {
  formSubmitButton.disabled = true;
  formSubmitButton.textContent = SubmitButtonTexts.SENDING;
};

const unblockSubmitButton = () => {
  formSubmitButton.disabled = false;
  formSubmitButton.textContent = SubmitButtonTexts.IDLE;
};

const onFormSubmitEvent = async (evt) => {
  evt.preventDefault();

  if (validate()) {
    blockSubmitButton();
    try {
      await sendData(new FormData(evt.target));
      closeView();
      showSuccessMessage();
    } catch (err) {
      showErrorMessage(err);
    } finally {
      unblockSubmitButton();
    }
  }
};

const onFormCloseEvent = (evt) => {
  if (evt.target.matches('.text__hashtags') || evt.target.matches('.text__description')) {
    return;
  }
  const errorMessageElement = document.querySelector('.error');
  if ((isEscapeKey(evt) && !errorMessageElement) || evt.target.matches('.img-upload__cancel')) {
    closeView();
  }
};

function openView(fileUrl) {
  imgUploadPreView.src = fileUrl;
  formView.addEventListener('submit', onFormSubmitEvent);
  imgUploadCancelButton.addEventListener('click', onFormCloseEvent);
  document.addEventListener('keydown', onFormCloseEvent);
  document.body.classList.add('modal-open');

  createScale();
  createSlider(fileUrl);
  createValidator();

  imgUploadFormView.classList.remove('hidden');
}

function closeView() {
  if (!allElementsAvailable) {
    return;
  }

  formView.removeEventListener('submit', onFormSubmitEvent);
  imgUploadCancelButton.removeEventListener('click', onFormCloseEvent);
  document.removeEventListener('keydown', onFormCloseEvent);
  document.body.classList.remove('modal-open');

  formView.reset();
  imgUploadInput.value = '';

  destroyScale();
  destroySlider();
  destroyValidator();

  imgUploadFormView.classList.add('hidden');
}

const createFormView = () => {
  if (!allElementsAvailable) {
    return;
  }

  imgUploadInput.addEventListener('change', (evt) => {
    const [ file ] = evt.target.files;
    if (file && checkIfImg(file)) {
      openView(URL.createObjectURL(file));
    }
  });
};

export { createFormView };
