// @flow


import { getAxiosInstance } from './AxiosWrapper';
import { BASE_URL } from '../config/index.dev';

export async function performPostRequest(endPoint, jsonRequest, contenType) {
  let wrapper = await getAxiosInstance(contenType);
  let API_URL = BASE_URL + endPoint
  console.log('@@@ Options ===========', wrapper)
  console.log('@@@ JSON REQUEST ===========', jsonRequest)
  console.log('@@@ URL ==============', endPoint);

  return wrapper.post(API_URL, jsonRequest).then((res) => {
    console.log('@@@ RESPONSE ==============', res);
    return res
  })
    .catch(ex => {
      throw ex
  })
}

export async function performPutRequest(endPoint, jsonRequest) {
  let wrapper = await getAxiosInstance();
  let API_URL = BASE_URL + endPoint
  console.log('@@@ Options ===========', wrapper)
  console.log('@@@ JSON REQUEST ===========', jsonRequest)
  console.log('@@@ URL ==============', endPoint);

  return wrapper.put(API_URL, jsonRequest).then((res) => {
    console.log('@@@ RESPONSE ==============', res);
    return res
  })
    .catch(ex => {
      throw ex
    })
}

export async function performDeleteRequest(endPoint, jsonRequest) {
  let wrapper = await getAxiosInstance();
  let API_URL = BASE_URL + endPoint
  console.log('@@@ Options ===========', wrapper)
  console.log('@@@ JSON REQUEST ===========', jsonRequest)
  console.log('@@@ URL ==============', endPoint);

  return wrapper.delete(API_URL, jsonRequest).then((res) => {
    console.log('@@@ RESPONSE ==============', res);
    return res
  })
    .catch(ex => {
      throw ex
  })
}

export async function performGetRequest(endPoint) {
  let wrapper = await getAxiosInstance();
  let API_URL = BASE_URL + endPoint
  console.log('@@@ Options ===========', wrapper)
  console.log('@@@ URL ==============', endPoint);

  return wrapper.get(API_URL).then((res) => {
    console.log('@@@ RESPONSE ==============', res);
    return res
  })
    .catch(ex => {
      throw ex
  })
}
