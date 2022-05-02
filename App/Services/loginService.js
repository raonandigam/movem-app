import {get_URL_Headers} from './const';

const {URL, headers} = get_URL_Headers();

export const authLogin = async data => {
  try {
    const APIresponse = await fetch(`${URL}/auth/login`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    }).then(res =>
      res.json().then(body => ({
        headers: res.headers,
        status: res.status,
        body,
      })),
    );

    return APIresponse;
  } catch (error) {
    return 'error';
  }
};

export const authRegister = async data => {
  try {
    const APIresponse = await fetch(`${URL}/auth/register`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    }).then(res =>
      res.json().then(body => ({
        headers: res.headers,
        status: res.status,
        body,
      })),
    );

    return APIresponse;
  } catch (error) {
    return 'error';
  }
};
