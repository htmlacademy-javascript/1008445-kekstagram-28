const createComment = (comment) => {
  const commentElement = document.querySelector('.social__comment').cloneNode(true);
  commentElement.querySelector('img').src = comment.avatar;
  commentElement.querySelector('img').alt = comment.name;
  commentElement.querySelector('p').textContent = comment.message;
  return commentElement;
};

const fillBigPictureView = (pictureObject) => {
  const bigPicture = document.querySelector('.big-picture');
  bigPicture.querySelector('.big-picture__img img').src = pictureObject.url;
  bigPicture.querySelector('.likes-count').textContent = pictureObject.likes;
  bigPicture.querySelector('.comments-count').textContent = pictureObject.comments;
  bigPicture.querySelector('.social__caption').textContent = pictureObject.description;

  const comments = bigPicture.querySelector('.social__comments');
  const createdComments = pictureObject.comments.map(createComment);
  comments.replaceChildren(...createdComments);
};

export { fillBigPictureView };
