// import React, { useContext, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   TextInput,
// } from "react-native";
// import { useQuery } from "@tanstack/react-query";
// import { getAllCommunities } from "../../src/api/Community";
// import { useNavigation } from "@react-navigation/native";
// import NAVIGATION from "../../src/navigation";
// import UserContext from "../../context/UserContext";

// const CommunitySelectionScreen = ({ route }) => {
//   const navigation = useNavigation();
//   const { selectedProfessors } = route.params || {};
//   const [selectedCommunities, setSelectedCommunities] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const { user, setUser } = useContext(UserContext);

//   const {
//     data: communities,
//     isLoading,
//     isError,
//   } = useQuery({ queryKey: ["allCommunities"], queryFn: getAllCommunities });

//   if (isLoading) return <Text>Loading communities...</Text>;
//   if (isError) return <Text>Error loading communities</Text>;

//   const toggleCommunitySelection = (communityId) => {
//     setSelectedCommunities((prevSelected) =>
//       prevSelected.includes(communityId)
//         ? prevSelected.filter((id) => id !== communityId)
//         : [...prevSelected, communityId]
//     );
//   };

//   // Filter communities based on search query
//   const filteredCommunities = communities.filter((community) =>
//     community.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//   console.log(user, "he");
//   return (
//     <View style={styles.container}>
//       {/* Search Bar */}
//       <TextInput
//         style={styles.searchBar}
//         placeholder="Search communities"
//         placeholderTextColor="#ccc"
//         value={searchQuery}
//         onChangeText={(text) => setSearchQuery(text)}
//       />

//       {/* Subtitle */}
//       <Text style={styles.subtitle}>Be part of a Community</Text>

//       <FlatList
//         data={filteredCommunities}
//         keyExtractor={(item) => item._id}
//         numColumns={2}
//         columnWrapperStyle={styles.row}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[
//               styles.communityItem,
//               selectedCommunities.includes(item._id) &&
//                 styles.selectedCommunity,
//             ]}
//             onPress={() => toggleCommunitySelection(item._id)}
//           >
//             <Text style={styles.communityText}>{item.name}</Text>
//           </TouchableOpacity>
//         )}
//       />

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Text style={styles.buttonText}>Skip</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={
//             // here before this step you should send the data aquired to the backend to proceed !!!!!!!
//             () => setUser(true)

//             // navigation.navigate(NAVIGATION.HOME.HOME, {
//             //   screen: NAVIGATION.HOME.HOME,
//             //   params: {
//             //     selectedProfessors,
//             //     selectedCommunities,
//             //   },
//             // })
//           }
//         >
//           <Text style={styles.buttonText}>Finish</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#1a1a1a",
//     padding: 20,
//   },
//   searchBar: {
//     backgroundColor: "#333",
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 10,
//     color: "#fff",
//   },
//   subtitle: {
//     fontSize: 18,
//     color: "#fff",
//     marginBottom: 10,
//   },
//   row: {
//     justifyContent: "space-between",
//   },
//   communityItem: {
//     backgroundColor: "#333",
//     padding: 15,
//     borderRadius: 10,
//     marginVertical: 5,
//     width: "48%",
//   },
//   selectedCommunity: {
//     backgroundColor: "#4b3f72",
//   },
//   communityText: {
//     color: "#ccc",
//     fontSize: 16,
//     textAlign: "center",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
//   buttonText: {
//     color: "#f0a500",
//     fontSize: 16,
//   },
// });

// export default CommunitySelectionScreen;

import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { getAllCommunities } from "../../src/api/Community";
import { useNavigation } from "@react-navigation/native";
import UserContext from "../../context/UserContext";
import { updateUser } from "../../src/api/auth";

const CommunitySelectionScreen = ({ route }) => {
  const navigation = useNavigation();
  const { selectedCourses, selectedProfessors } = route.params || {};
  const [selectedCommunities, setSelectedCommunities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, setUser } = useContext(UserContext);

  const {
    data: communities,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["allCommunities"], queryFn: getAllCommunities });

  const requestData = {
    userId: user._id,
    selectedCourses,
    selectedProfessors,
    selectedCommunities,
  };
  const { mutate: saveSelectionsMutation } = useMutation({
    mutationKey: ["selectedCommunities"],
    mutationFn: () => updateUser(requestData),
    onSuccess: () => {
      setUser(true);
      navigation.navigate("HomeScreen", {
        selectedCourses,
        selectedProfessors,
        selectedCommunities,
      });
    },
    onError: (error) => {
      console.error("Error sending data to backend:", error);
      alert("Failed to submit data. Please try again.");
    },
  });

  const toggleCommunitySelection = (communityId) => {
    setSelectedCommunities((prevSelected) =>
      prevSelected.includes(communityId)
        ? prevSelected.filter((id) => id !== communityId)
        : [...prevSelected, communityId]
    );
  };

  const filteredCommunities = communities?.filter((community) =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(filteredCommunities);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search communities"
        placeholderTextColor="#ccc"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <Text style={styles.subtitle}>Be part of a Community</Text>
      {isLoading && <Text style={styles.loadingText}>Loading...</Text>}
      {isError && (
        <Text style={styles.errorText}>Error loading communities</Text>
      )}
      <FlatList
        data={filteredCommunities}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.communityItem,
              selectedCommunities.includes(item._id) &&
                styles.selectedCommunity,
            ]}
            onPress={() => toggleCommunitySelection(item._id)}
          >
            <Text style={styles.communityText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={saveSelectionsMutation}>
          <Text style={styles.buttonText}>Finish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a1a1a", padding: 20 },
  searchBar: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    color: "#fff",
  },
  subtitle: { fontSize: 18, color: "#fff", marginBottom: 10 },
  loadingText: { color: "#ccc", textAlign: "center", marginVertical: 10 },
  errorText: { color: "#f00", textAlign: "center", marginVertical: 10 },
  row: { justifyContent: "space-between" },
  communityItem: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: "48%",
  },
  selectedCommunity: { backgroundColor: "#4b3f72" },
  communityText: { color: "#ccc", fontSize: 16, textAlign: "center" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonText: { color: "#f0a500", fontSize: 16 },
});

export default CommunitySelectionScreen;
