import { View, Vibration } from 'react-native'
import React from 'react'
import BackgroundService from 'react-native-background-actions';
// import { Button } from 'native-base';
import { axios } from "./../../lib/axios";
import { useFocusEffect } from '@react-navigation/native'

const BackgroundProcess = ({ _n }: { _n:number }) => {

  const sleep = (time:number) => new Promise((resolve) => setTimeout(() => resolve({}), time));


  function bibrateTheSound(){
    const bibrate =  Vibration.vibrate(200);
   }


  const veryIntensiveTask = async (taskDataArguments:any) => {
    // Example of an infinite loop task
    const { delay } = taskDataArguments;
    await new Promise( async (resolve) => {
        for (let i = 0; BackgroundService.isRunning(); i++) {
            // console.log('Background Service',i);
            // updateBackgroundService({ data:i });
            let startTime = new Date().getTime();
            await axios.get('/administrator/request-latency', {
              params:{
                page:1,
                pageSize:10,
                largeReq:false
              }
            });

            const endTime = new Date().getTime();
            const timeElapsed = endTime - startTime;

            if(timeElapsed > 2000){
              // Play Bibrator
              bibrateTheSound();
            }

            updateBackgroundService({ data:`${timeElapsed}ms` });


            await sleep(delay);
        }
    });
};

const options = {
  taskName: 'ServerStatus',
  taskTitle: 'Server Status (Binary Bunon)',
  taskDesc: 'Latency : 0',
  taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
  },
  color: '#fff',
  linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  parameters: {
      delay: 1000,
  },
};


async function StartBackgroundService(){
  await BackgroundService.start(veryIntensiveTask, options);
}

async function updateBackgroundService({ data }: any){
  await BackgroundService.updateNotification({taskDesc: `Latency : ${data}`}); 
  // Only Android, iOS will ignore this call
}



useFocusEffect(
  React.useCallback(() => {
    StartBackgroundService();
    console.log('Start Background Service')
  }, [_n])
);





  return (
    <View>
      {/* <Button onPress={() => StartBackgroundService()}>BackgroundProcess</Button> */}
    </View>
  )
}

export default BackgroundProcess