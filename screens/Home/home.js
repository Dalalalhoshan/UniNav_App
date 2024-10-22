import { StyleSheet, Text, View } from 'react-native'
import React, {useContext} from 'react'
import UserContext from '../../context/UserContext'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
    const navigation = useNavigation()
    const {data: courses} = useQuery({
        queryKey: ["courses"],
        queryFn: () => getAllCourses()
    })
    
  return (
    <View>
      
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
