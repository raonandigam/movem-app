import {get_Auth_URL_Headers} from './const';

export const getUserLoans = async token => {
  const {URL, headers} = get_Auth_URL_Headers(token);
  try {
    const APIresponse = await fetch(`${URL}/loans/get-loans-for-user`, {
      method: 'GET',
      headers: headers,
    }).then(res =>
      res.json().then(body => ({
        headers: res.headers,
        status: res.status,
        body,
      })),
    );

    return APIresponse;
  } catch (error) {
    return error;
  }
};

export const getWalletToken = async token => {
  const {URL, headers} = get_Auth_URL_Headers(token);
  try {
    const APIresponse = await fetch(`${URL}/users/get-wallet-balance`, {
      method: 'GET',
      headers: headers,
    }).then(res =>
      res.json().then(body => ({
        headers: res.headers,
        status: res.status,
        body,
      })),
    );

    return APIresponse;
  } catch (error) {
    return error;
  }
};

export const createWallet = async token => {
  const {URL, headers} = get_Auth_URL_Headers(token);
  try {
    const APIresponse = await fetch(`${URL}/users/add-wallet`, {
      method: 'POST',
      headers: headers,
    }).then(res =>
      res.json().then(body => ({
        headers: res.headers,
        status: res.status,
        body,
      })),
    );

    return APIresponse;
  } catch (error) {
    return error;
  }
};

export const getUserDetails = async token => {
  const {URL, headers} = get_Auth_URL_Headers(token);
  try {
    const APIresponse = await fetch(`${URL}/users/get-user-details`, {
      method: 'GET',
      headers: headers,
    }).then(res =>
      res.json().then(body => ({
        headers: res.headers,
        status: res.status,
        body,
      })),
    );

    return APIresponse;
  } catch (error) {
    return error;
  }
};

export const getUserCircleWalletBalance = async (token, circleWalletID) => {
  const {URL, headers} = get_Auth_URL_Headers(token);
  try {
    const APIresponse = await fetch(
      `${URL}/circle/get-wallet-balance/${circleWalletID}`,
      {
        method: 'GET',
        headers: headers,
      },
    ).then(res =>
      res.json().then(body => ({
        headers: res.headers,
        status: res.status,
        body,
      })),
    );

    return APIresponse;
  } catch (error) {
    return error;
  }
};
