import { View, Text } from 'react-native'
import { Button, Box } from "native-base"
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

const AboutScreen = ({ navigation }:any) => {
  return (
    <Box style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.navigate('Home')}>Go To Home</Button>
    </Box>
  )
}

export default AboutScreen