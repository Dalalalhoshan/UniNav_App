import { StyleSheet, Text, View, TouchableOpacity , Image} from 'react-native'
import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { getAllCourses } from '../../src/api/courses'

// import { getAllCommunities } from '../../src/api/community'
const Home = () => {
    const {data: courses} = useQuery({
        queryKey: ["courses"],
        queryFn: getAllCourses
    })
    // const {data: community} = useQuery({
    //     queryKey: ["community"],
    //     queryFn: () => getAllCommunities()
    // })
  return (
    <View >  
        <Text style={{fontSize: 20, fontWeight: "bold", color: "white"}}>Courses</Text>
      {courses?.map((course) => (
        <TouchableOpacity style={{flexDirection: "row", alignItems: "center", gap: 10}}>
     
        <Text style={{fontSize: 20, fontWeight: "bold", color: "white"}}>{course.name}</Text>
        </TouchableOpacity>
      ))}
      {/* <Text>Community</Text>
        {community?.map((community) => (
            <View style={{flexDirection: "row", alignItems: "center", gap: 10}}  >
                <Text>{community.name}</Text>
                <Image source={{uri:"http://192.168.1.10:10000/api/" + community.image}} style={{width: 100, height: 100}}/>
            </View>
        ))} */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
