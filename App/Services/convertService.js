import {get_Auth_URL_Headers} from './const';

export const convertNUSDtoNINR = async (token, body) => {
  const {URL, headers} = get_Auth_URL_Headers(token);
  try {
    const APIresponse = await fetch(`${URL}/transfers/convert-nusd-to-ninr`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
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
