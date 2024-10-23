import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const NoAuthHome = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/Conversation-ezgif.com-crop.gif")}
        style={styles.background}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>UniNav</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Register")}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.buttonText}>Signin</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default NoAuthHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  headerContainer: {
    position: 'absolute',
    top: 40,
    right: 50,
  },
  headerText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    backgroundColor: 'rgba(37,36, 35, 1)',
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
