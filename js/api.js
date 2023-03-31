const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET: '/data',
  SEND: '/'
};
const Method = {
  GET: 'GET',
  POST: 'POST'
};
const TextError = {
  GET: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const load = async (route, textError, method = Method.GET, body = null) => {
  try {
    const respone = await fetch(`${ BASE_URL }${ route }`, { method, body });
    if (!respone.ok) {
      throw new Error();
    }
    return respone.json();
  } catch (error) {
    throw new Error(textError);
  }
};

const getData = () => load(Route.GET, TextError.GET);

const sendData = (body) => load(Route.SEND, TextError.SEND, Method.POST, body);

export { getData, sendData };
