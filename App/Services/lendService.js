import {get_Auth_URL_Headers} from './const';

export const getPendingRequests = async token => {
  const {URL, headers} = get_Auth_URL_Headers(token);
  try {
    const APIresponse = await fetch(`${URL}/loans/get-pending-requests`, {
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

export const createLendRequest = async (token, data) => {
  const {URL, headers} = get_Auth_URL_Headers(token);
  try {
    const APIresponse = await fetch(`${URL}/loans/lend`, {
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
    return error;
  }
};
