/* eslint-disable no-unused-vars */
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const names = [
  'Артём',
  'Дарья',
  'Тимур',
  'Кристина',
  'Алексей',
  'Максим'
];
const descriptions = [
  'Я на море',
  'Чилю',
  'Привет всем =)',
  'Я устал',
  'Какое красивое место',
  'Ужасный ужас!'
];
const SIMILAR_OBJECTS_COUNT = 25;
let objectIdCounter = 1, commentIdCounter = 1;

const getRandomPostiveInteger = (a, b) => {
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomArrayElement = (elements) => elements[getRandomPostiveInteger(0, elements.length - 1)];

const createComment = () => ({
  id: commentIdCounter++,
  avatar: `img/avatar-${ getRandomPostiveInteger(1, 6) }.svg`,
  message: getRandomArrayElement(messages),
  name: getRandomArrayElement(names),
});

const createObject = () => ({
  id: objectIdCounter,
  url: `photos/${ objectIdCounter++ }.jpg`,
  description: getRandomArrayElement(descriptions),
  likes: getRandomPostiveInteger(15, 200),
  comments: Array.from({ length: getRandomPostiveInteger(1, 2) }, createComment)
});

//const objects = Array.from({ length: SIMILAR_OBJECTS_COUNT }, createObject);

