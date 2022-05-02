const URL = 'https://buddyloans.herokuapp.com';
// const URL = 'http://localhost:4000';

export const maskID = Id => {
  const formatID = Id.slice(-6);
  return `XXXX${formatID}`;
};

export const get_URL_Headers = () => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return {URL, headers};
};

export const get_Auth_URL_Headers = token => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  return {URL, headers};
};
