// import axios from 'axios';

// const baseUrl = 'http://3.7.81.243/projects/plie-api/public/api/';
// //API Url
// export const apiURL = {
//   login: `${baseUrl}login`,
//   eventListing: `${baseUrl}events-listing`,
// };

// // Define a function to make API requests with dynamic headers
// const makePostApiRequest = async (url: string, payload: any) => {
//   try {
//     const res = await axios.post(url, payload, {timeout: 30000});
//     return res.data;
//   } catch (error) {
//     return error;
//   }
// };

// //Login API's start here
// type loginPayload = {
//   email: string;
//   password: string;
// };
// export const loginWithEmailAndPassword = async (payload: loginPayload) => {
//   return makePostApiRequest(apiURL.login, payload);
// };

import axios from 'axios';

const baseUrl = 'http://3.7.81.243/projects/plie-api/public/api/';

// API URLs
export const apiURL = {
  login: `${baseUrl}login`,
  eventListing: `${baseUrl}events-listing`,
};

// Define a function to make API requests with dynamic headers
const makePostApiRequest = async (
  url: string,
  payload: any = {},
  headers: any = {},
) => {
  try {
    const res = await axios.post(url, payload, {
      headers,
      timeout: 30000,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// Login API
type loginPayload = {
  email: string;
  password: string;
};

export const loginWithEmailAndPassword = async (payload: loginPayload) => {
  return makePostApiRequest(apiURL.login, payload);
};

// Event Listing API (No FormData, Only Token)
export const getEventListing = async (token: string) => {
  const headers = {
    Authorization: 'Bearer ${token}',
  };

  return makePostApiRequest(apiURL.eventListing, {}, headers);
};
