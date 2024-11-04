import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  FlatList,
  Text,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProfessorList from "../../components/ProfessorList";
import CommunityList from "../../components/CommunityList";
import CourseList from "../../components/CourseList";
import { getAllUsers } from "../../src/api/user";
import { useQuery } from "@tanstack/react-query";
import { Portal } from "react-native-portalize";
import NAVIGATION from "../../navigation";
import { useNavigation } from "@react-navigation/native";

const Explore = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  // Define your data source - replace this with your actual data array
  const { data, isLoading } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: () => getAllUsers(),
  });

  if (isLoading) {
    return <ActivityIndicator size="large" color="#E94560" />;
  }

  const filteredData = data?.filter((item) =>
    item?.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log("Data:", data);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#E94560"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search professors..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && filteredData.length > 0 && (
          <View style={styles.resultsContainer}>
            {filteredData.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.resultItem}
                onPress={() => {
                  setSelectedItem(item);
                  navigation.navigate(NAVIGATION.HOME.INDEX, {
                    screen: "AccountDetails",
                    params: {
                      userID: item._id,
                    },
                  });

                  console.log(item._id);
                }}
              >
                <Text style={styles.resultText}>{item.username}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <View style={{ flex: 1, zIndex: 1 }}>
        <ScrollView>
          <ProfessorList />
          <CommunityList />
          <CourseList />
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    padding: 20,
    flexGrow: 1,
  },
  searchContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E2E3E",
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 8,
    padding: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 2, // Ensure the search bar and results are on top
  },
  searchIcon: {
    marginRight: 10,
    color: "#e8b800",
  },
  searchInput: {
    flex: 1,
    color: "white",
    fontSize: 16,
    marginLeft: 8,
  },
  resultsContainer: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: "#2E2E3E",
    borderRadius: 5,
    zIndex: 3,
    maxHeight: 200,
    overflow: "hidden",
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  resultText: {
    color: "white",
  },
});
export default Explore;
