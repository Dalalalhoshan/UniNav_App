import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CommunityList from "../../components/CommunityList";
const Commuinties = () => {
  return (
    <View style={styles.container}>
      <CommunityList />
    </View>
  );
};
export default Commuinties;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
