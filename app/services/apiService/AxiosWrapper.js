import axios from 'axios';
import { BASE_URL, TIMEOUT } from '../config/index.dev';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAxiosInstance = async(contenType) => {
  let userToken = await AsyncStorage.getItem('USER_TOKEN');
  console.log('@@@ Axios Token ============', userToken);

  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: userToken ? {
                'content-type': contenType,
                'Authorization': 'Bearer ' + userToken
              } : {
                'content-type': contenType,
              }
  });

  return instance;
}