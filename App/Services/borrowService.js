import {get_Auth_URL_Headers} from './const';

export const createNewLoan = async (token, loanData) => {
  const {URL, headers} = get_Auth_URL_Headers(token);
  try {
    const APIresponse = await fetch(`${URL}/loans`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(loanData),
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
