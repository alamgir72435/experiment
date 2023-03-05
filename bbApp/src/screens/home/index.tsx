import React, { useState } from 'react'

import { Button, Text, HStack, ScrollView } from "native-base";
import {  axios } from "../../lib/axios"
import AsyncStorage from '@react-native-async-storage/async-storage';


import { useFocusEffect } from '@react-navigation/native'
import { View,  } from 'react-native';
import { useLatency } from '../../apis/core';
import { useAdminLogin } from '../../apis/auth';

import moment from "moment"



function HomeScreen(props:any) {

  const { navigation  } = props;
  const [randomNum, setRandomNum] = useState(new Date().getTime());


  // Login First
  const { mutate:adminLogin } = useAdminLogin();


  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const { data } = useLatency({ i:randomNum, page, pageSize });

  useFocusEffect(
    React.useCallback(() => {
      setRandomNum(new Date().getTime());

      //check if already logged in
      AsyncStorage.getItem('token').then(token => {
        if(!token){
          adminLogin(); // Login 
        }
      }).catch(err => {
        console.log('Initial Token not Found')
      })
    }, [navigation])
  );


  


  // send request to api in every  2 seconds

  return (
    <View> 
      {/* <Button onPress={() => navigation.navigate('About')}> Go About</Button> */}
      <Button onPress={() => {
        setRandomNum(new Date().getTime());
      }}> Refetch</Button>
      
      <ScrollView>
        {data && Array.isArray(data?.requests) && data?.requests.map((x:any) => 
          <HStack borderBottomWidth={1} borderBottomColor={'#ddd'} paddingLeft={1} paddingRight={1} paddingBottom={2} space={2} w="100%" justifyContent="space-between" alignItems="center" key={x?._id}>
              <View>
                <Text color={"primary.600"}>{String(x?.path).replace('/somity/api/v1', '').slice(0, 30)}</Text>
                <Text color={"primary.600"}>Time : {moment(new Date()).format('h:mm:ss a')} / {String(x?.note).trim().replace('Admin:', '').slice(0,15)}</Text>
              </View>
              <View>
                <Text color={"primary.600"}>{parseFloat(x?.time).toFixed(2)}ms</Text>
              </View>
          </HStack>
        )}

      </ScrollView>


    </View>
  );
}

export default HomeScreen