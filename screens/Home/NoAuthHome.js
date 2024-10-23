import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const NoAuthHome = () => {
  return (
    <View>
        <Image source={require("../../assets/Conversation.gif")} style={{width: 200, height: 200}}/>
      <Text>NoAuthHome</Text>
    </View>
  )
}

export default NoAuthHome

const styles = StyleSheet.create({})