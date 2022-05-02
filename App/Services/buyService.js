import {get_Auth_URL_Headers} from './const';

export const buyUSDC = async (token, buyData) => {
  const {URL, headers} = get_Auth_URL_Headers(token);
  try {
    const APIresponse = await fetch(`${URL}/circle/buy-usdc`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(buyData),
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

export const transfer = async (token, buyData) => {
  const {URL, headers} = get_Auth_URL_Headers(token);
  try {
    const APIresponse = await fetch(`${URL}/transfers/transfer`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(buyData),
    }).then(res =>
      res.json().then(body => ({
        headers: res.headers,
        status: res.status,
        body,
      })),
    );

    return APIresponse;
  } catch (error) {
    console.log(error);
    return error;
  }
};
