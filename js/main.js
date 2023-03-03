/* eslint-disable no-unused-vars */
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Артём',
  'Дарья',
  'Тимур',
  'Кристина',
  'Алексей',
  'Максим'
];
const DESCRIPTIONS = [
  'Я на море',
  'Чилю',
  'Привет всем =)',
  'Я устал',
  'Какое красивое место',
  'Ужасный ужас!'
];
const SIMILAR_OBJECTS_COUNT = 25;
const AVATAR_COUNT = 6;
const MAX_COMMENT_COUNT = 2;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;

const getRandomPostiveInteger = (a, b) => {
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generatorId = () => {
  let id = 1;
  return () => id++;
};

const getRandomArrayElement = (elements) => elements[getRandomPostiveInteger(0, elements.length - 1)];
const commentIdGen = generatorId();

const createComment = () => ({
  id: commentIdGen(),
  avatar: `img/avatar-${ getRandomPostiveInteger(1, AVATAR_COUNT) }.svg`,
  message: Array.from({ length: getRandomPostiveInteger(1, 2)}, () => getRandomArrayElement(MESSAGES)).join(' '),
  name: getRandomArrayElement(NAMES),
});

const createObject = (index) => ({
  id: index,
  url: `photos/${ index }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPostiveInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
  comments: Array.from({ length: getRandomPostiveInteger(1, MAX_COMMENT_COUNT) }, createComment)
});
