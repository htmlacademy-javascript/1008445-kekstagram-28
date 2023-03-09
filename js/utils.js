/* eslint-disable no-unused-vars */
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

export { getRandomPostiveInteger, generatorId, isEscapeKey };
