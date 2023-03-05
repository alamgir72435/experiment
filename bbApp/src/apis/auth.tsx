import { axios } from "../lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import AsyncStorage from '@react-native-async-storage/async-storage';

// admin login
export function useAdminLogin(){
  return useMutation(async () => {
    console.log('asmin Login start')
    const {data} = await axios.post('/administrator/auth', {
      password :"#NSM123#",
      username :"nsm"
    });
    return data;
  }, {
    onSuccess:res => {
      const token = res?.token;
      AsyncStorage.setItem('token', token).then(() => {
        // TOken Saved to local storage
      })
    },
    onError:(err:any) => {
      console.log('Error Login',err?.response?.data?.message )
    }
  })
}