import { isEscapeKey } from './utils.js';

const successMessageFragment = document.querySelector('#success');
const errorMessageFragment = document.querySelector('#error');

const onMessageCloseEvent = (evt) => {
  if (isEscapeKey(evt) ||
    evt.target.matches('.success__button') ||
    evt.target.matches('.success') ||
    evt.target.matches('.error__button') ||
    evt.target.matches('.error')) {
    closeMessageView();
  }
};

const showSuccessMessage = () => {
  if (successMessageFragment) {
    const successMessageTemplate = successMessageFragment.content.querySelector('.success');
    if (successMessageTemplate) {
      const successMessageElement = successMessageTemplate.cloneNode(true);
      document.body.appendChild(successMessageElement);
      successMessageElement.addEventListener('click', onMessageCloseEvent);
      document.addEventListener('keydown', onMessageCloseEvent);
    }
  }
};

const showErrorMessage = () => {
  if (errorMessageFragment) {
    const errorMessageTemplate = errorMessageFragment.content.querySelector('.error');
    if (errorMessageTemplate) {
      const errorMessageElement = errorMessageTemplate.cloneNode(true);
      document.body.appendChild(errorMessageElement);
      errorMessageElement.addEventListener('click', onMessageCloseEvent);
      document.addEventListener('keydown', onMessageCloseEvent);
    }
  }
};

function closeMessageView() {
  const successMessageElement = document.querySelector('.success');
  const errorMessageElement = document.querySelector('.error');
  if (successMessageElement) {
    successMessageElement.remove();
  }
  if (errorMessageElement) {
    errorMessageElement.remove();
  }
  document.removeEventListener('keydown', onMessageCloseEvent);
}

export { showSuccessMessage, showErrorMessage };
