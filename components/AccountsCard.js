import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
import { BASE_URL } from "../src/api";

const AccountCard = ({ account }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("AccountDetails", { userID: account._id });
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
      <Image
        source={{
          uri: `${BASE_URL}/${account.profileImage.replace("\\", "//")}`,
        }}
        style={styles.profileImage}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.username}>{account.username}</Text>
        <Text style={styles.email}>{account.email}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#454545",
    backgroundColor: "#252423",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  email: {
    fontSize: 14,
    color: "#689bf7",
  },
});

export default AccountCard;
