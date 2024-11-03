// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
// } from "react-native";
// import { useQuery } from "@tanstack/react-query";
// import { getProfessors } from "../../src/api/proffesors";
// import { useNavigation } from "@react-navigation/native";

// const ProfessorSelectionScreen = ({ route }) => {
//   const navigation = useNavigation();
//   const { selectedCourses } = route.params || {};
//   const [selectedProfessors, setSelectedProfessors] = useState([]);

//   const {
//     data: professors,
//     isLoading,
//     isError,
//   } = useQuery({ queryKey: ["allProfessors"], queryFn: getProfessors });

//   if (isLoading) return <Text>Loading professors...</Text>;
//   if (isError) return <Text>Error loading professors</Text>;

//   const toggleProfessorSelection = (professorId) => {
//     setSelectedProfessors((prevSelected) =>
//       prevSelected.includes(professorId)
//         ? prevSelected.filter((id) => id !== professorId)
//         : [...prevSelected, professorId]
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Select professor for each course</Text>
//       <FlatList
//         data={professors}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[
//               styles.professorItem,
//               selectedProfessors.includes(item._id) && styles.selectedProfessor,
//             ]}
//             onPress={() => toggleProfessorSelection(item._id)}
//           >
//             <Text style={styles.professorText}>{item.name}</Text>
//           </TouchableOpacity>
//         )}
//       />
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           onPress={() => navigation.navigate("selectCommunity")}
//         >
//           <Text style={styles.buttonText}>Skip</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() =>
//             navigation.navigate("selectCommunity", {
//               selectedProfessors,
//             })
//           }
//         >
//           <Text style={styles.buttonText}>Next</Text>
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
//   title: {
//     fontSize: 18,
//     color: "#fff",
//     marginBottom: 10,
//   },
//   professorItem: {
//     backgroundColor: "#333",
//     padding: 15,
//     borderRadius: 10,
//     marginVertical: 5,
//   },
//   selectedProfessor: {
//     backgroundColor: "#4b3f72",
//   },
//   professorText: {
//     color: "#ccc",
//     fontSize: 16,
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

// export default ProfessorSelectionScreen;

/////////////////////////////////////////////////////////////////////////////////////////

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
// import { getProfessors } from "../../src/api/proffesors";
// import { useNavigation } from "@react-navigation/native";
// import UserContext from "../../context/UserContext";

// const ProfessorSelectionScreen = ({ route }) => {
//   const navigation = useNavigation();
//   const { selectedCourses } = route.params || {};
//   const [selectedProfessors, setSelectedProfessors] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   const {
//     data: professors,
//     isLoading,
//     isError,
//   } = useQuery({ queryKey: ["allProfessors"], queryFn: getProfessors });

//   if (isLoading) return <Text>Loading professors...</Text>;
//   if (isError) return <Text>Error loading professors</Text>;

//   const toggleProfessorSelection = (professorId) => {
//     setSelectedProfessors((prevSelected) =>
//       prevSelected.includes(professorId)
//         ? prevSelected.filter((id) => id !== professorId)
//         : [...prevSelected, professorId]
//     );
//   };

//   // Filter professors based on the search query
//   const filteredProfessors = professors.filter((professor) =>
//     professor.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//   return (
//     <View style={styles.container}>
//       {/* Search Bar */}
//       <TextInput
//         style={styles.searchBar}
//         placeholder="Search professors"
//         placeholderTextColor="#ccc"
//         value={searchQuery}
//         onChangeText={(text) => setSearchQuery(text)}
//       />

//       {/* Subtitle */}
//       <Text style={styles.subtitle}>Select your professors</Text>

//       <FlatList
//         data={filteredProfessors}
//         keyExtractor={(item) => item._id}
//         numColumns={2}
//         columnWrapperStyle={styles.row}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[
//               styles.professorItem,
//               selectedProfessors.includes(item._id) && styles.selectedProfessor,
//             ]}
//             onPress={() => toggleProfessorSelection(item._id)}
//           >
//             <Text style={styles.professorText}>{item.name}</Text>
//           </TouchableOpacity>
//         )}
//       />

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           onPress={() =>
//             navigation.navigate("selectCommunity", {
//               selectedProfessors,
//             })
//           }
//         >
//           <Text style={styles.buttonText}>Next</Text>
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
//   professorItem: {
//     backgroundColor: "#333",
//     padding: 15,
//     borderRadius: 10,
//     marginVertical: 5,
//     width: "48%",
//   },
//   selectedProfessor: {
//     backgroundColor: "#4b3f72",
//   },
//   professorText: {
//     color: "#ccc",
//     fontSize: 16,
//     textAlign: "center",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     marginTop: 20,
//   },
//   buttonText: {
//     color: "#f0a500",
//     fontSize: 16,
//   },
// });

// export default ProfessorSelectionScreen;

import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getProfessors } from "../../src/api/proffesors";

import { useNavigation } from "@react-navigation/native";
import UserContext from "../../context/UserContext";

const ProfessorSelectionScreen = ({ route }) => {
  const navigation = useNavigation();
  const { selectedCourses } = route.params || {};
  const [selectedProfessors, setSelectedProfessors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: professors,
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ["allProfessors"], queryFn: getProfessors });

  if (isLoading) return <Text>Loading professors...</Text>;
  if (isError) {
    console.error("Error fetching professors:", error.message);
    return <Text>Error loading professors: {error.message}</Text>;
  }

  const toggleProfessorSelection = (professorId) => {
    setSelectedProfessors((prevSelected) =>
      prevSelected.includes(professorId)
        ? prevSelected.filter((id) => id !== professorId)
        : [...prevSelected, professorId]
    );
  };

  // Filter professors based on the search query
  const filteredProfessors = professors.filter((professor) =>
    professor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search professors"
        placeholderTextColor="#ccc"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      {/* Subtitle */}
      <Text style={styles.subtitle}>Select your professors</Text>

      <FlatList
        data={filteredProfessors}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.professorItem,
              selectedProfessors.includes(item._id) && styles.selectedProfessor,
            ]}
            onPress={() => toggleProfessorSelection(item._id)}
          >
            <Text style={styles.professorText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("selectCommunity", {
              selectedCourses,
              selectedProfessors,
            })
          }
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    padding: 20,
  },
  searchBar: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    color: "#fff",
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
  },
  row: {
    justifyContent: "space-between",
  },
  professorItem: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: "48%",
  },
  selectedProfessor: {
    backgroundColor: "#4b3f72",
  },
  professorText: {
    color: "#ccc",
    fontSize: 16,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  buttonText: {
    color: "#f0a500",
    fontSize: 16,
  },
});

export default ProfessorSelectionScreen;
