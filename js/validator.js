let pristine = {};

const createValidator = (formView, validators) => {
  pristine = new Pristine(formView, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'p',
    errorTextClass: 'input__error'
  });

  validators.forEach(({ input, fc, text }) => {
    pristine.addValidator(input, fc, text);
  });
};

const destroyValidator = () => {
  if (pristine) {
    pristine.destroy();
  }
};

const validate = () => pristine && pristine.validate();

export { createValidator, validate, destroyValidator };
