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

  config.headers['request-startTime'] = new Date().getTime();

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  const endTime = new Date().getTime();
  const start = response.config.headers['request-startTime'];
  // const milliseconds = Math.round((end[0] * 1000) + (end[1] / 1000000))
  
  const milliseconds = endTime - start;
  AsyncStorage.setItem('request-duration', String(milliseconds))
  
  
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});



export { axios }