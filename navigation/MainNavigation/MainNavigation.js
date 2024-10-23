import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeNavigation from '../HomeNavigation/HomeNavigation';

const Tab = createBottomTabNavigator();
const MainNavigation = () => {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeNavigation} />
      
      {/* <Tab.Screen name="Profile" component={Profile} /> */}
     
    </Tab.Navigator>
  )
}

export default MainNavigation

const styles = StyleSheet.create({})