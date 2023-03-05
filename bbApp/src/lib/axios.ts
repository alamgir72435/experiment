import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

// axios interceptor
axios.interceptors.request.use(async function (config) {
  // Do something before request is sent

  // set base url
  config.baseURL = "https://api2.binarybunon.com/somity/api/v1";
  
  // set token with request
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export { axios }