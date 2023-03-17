/* eslint-disable no-unused-vars */
const IMG_EXTENTIONS = ['jpg', 'bmp', 'png'];

const getRandomPostiveInteger = (a, b) => {
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generatorId = () => {
  let id = 1;
  return () => id++;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const getExtension = (file) => {
  const fileParts = file.name.split('.');
  if (fileParts.length) {
    return fileParts.pop();
  }
};

const checkIfImg = (file) => {
  const ext = getExtension(file);
  return ext && IMG_EXTENTIONS.includes(ext);
};


export { getRandomPostiveInteger, generatorId, isEscapeKey, checkIfImg };
