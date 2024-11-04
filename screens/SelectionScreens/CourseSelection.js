// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
// } from "react-native";
// import { useQuery } from "@tanstack/react-query";
// import { getAllCourses } from "../../src/api/courses";
// import { useNavigation } from "@react-navigation/native";

// const CourseSelectionScreen = () => {
//   const navigation = useNavigation();
//   const [selectedCourses, setSelectedCourses] = useState([]);

//   const {
//     data: courses,
//     isLoading,
//     isError,
//   } = useQuery({ queryKey: ["allCourses"], queryFn: getAllCourses });

//   if (isLoading) return <Text>Loading courses...</Text>;
//   if (isError) return <Text>Error loading courses</Text>;

//   const toggleCourseSelection = (courseId) => {
//     setSelectedCourses((prevSelected) =>
//       prevSelected.includes(courseId)
//         ? prevSelected.filter((id) => id !== courseId)
//         : [...prevSelected, courseId]
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>
//         Select courses you've taken or are currently taking
//       </Text>
//       <FlatList
//         data={courses}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[
//               styles.courseItem,
//               selectedCourses.includes(item._id) && styles.selectedCourse,
//             ]}
//             onPress={() => toggleCourseSelection(item._id)}
//           >
//             <Text style={styles.courseText}>{item.name}</Text>
//           </TouchableOpacity>
//         )}
//       />
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           onPress={() => navigation.navigate("selectProfessors")}
//         >
//           <Text style={styles.buttonText}>Skip</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() =>
//             navigation.navigate("selectProfessors", { selectedCourses })
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
//   courseItem: {
//     backgroundColor: "#333",
//     padding: 15,
//     borderRadius: 10,
//     marginVertical: 5,
//   },
//   selectedCourse: {
//     backgroundColor: "#4b3f72",
//   },
//   courseText: {
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

// export default CourseSelectionScreen;

///////////////////////////////////////////////////////////////////////////////

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   TextInput,
// } from "react-native";
// import { useQuery } from "@tanstack/react-query";
// import { getAllCourses } from "../../src/api/courses";
// import { useNavigation } from "@react-navigation/native";

// const CourseSelectionScreen = () => {
//   const navigation = useNavigation();
//   const [selectedCourses, setSelectedCourses] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   const {
//     data: courses,
//     isLoading,
//     isError,
//   } = useQuery({ queryKey: ["allCourses"], queryFn: getAllCourses });

//   if (isLoading) return <Text>Loading courses...</Text>;
//   if (isError) return <Text>Error loading courses</Text>;

//   const toggleCourseSelection = (courseId) => {
//     setSelectedCourses((prevSelected) =>
//       prevSelected.includes(courseId)
//         ? prevSelected.filter((id) => id !== courseId)
//         : [...prevSelected, courseId]
//     );
//   };

//   // Filter courses based on the search query
//   const filteredCourses = courses.filter((course) =>
//     course.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <View style={styles.container}>
//       {/* Search Bar */}
//       <TextInput
//         style={styles.searchBar}
//         placeholder="Search courses"
//         placeholderTextColor="#ccc"
//         value={searchQuery}
//         onChangeText={(text) => setSearchQuery(text)}
//       />

//       {/* Subtitle */}
//       <Text style={styles.subtitle}>
//         Select courses you've taken or are currently taking
//       </Text>

//       <FlatList
//         data={filteredCourses}
//         keyExtractor={(item) => item._id}
//         numColumns={2}
//         columnWrapperStyle={styles.row}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[
//               styles.courseItem,
//               selectedCourses.includes(item._id) && styles.selectedCourse,
//             ]}
//             onPress={() => toggleCourseSelection(item._id)}
//           >
//             <Text style={styles.courseText}>{item.name}</Text>
//           </TouchableOpacity>
//         )}
//       />

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           onPress={() =>
//             navigation.navigate("selectProfessors", { selectedCourses })
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
//   courseItem: {
//     backgroundColor: "#333",
//     padding: 15,
//     borderRadius: 10,
//     marginVertical: 5,
//     width: "48%",
//   },
//   selectedCourse: {
//     backgroundColor: "#4b3f72",
//   },
//   courseText: {
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

// export default CourseSelectionScreen;

import React, { useState } from "react";
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
import { getAllCourses } from "../../src/api/courses";
import { useNavigation } from "@react-navigation/native";

const CourseSelectionScreen = () => {
  const navigation = useNavigation();
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: courses,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["allCourses"], queryFn: getAllCourses });

  const toggleCourseSelection = (courseId) => {
    setSelectedCourses((prevSelected) =>
      prevSelected.includes(courseId)
        ? prevSelected.filter((id) => id !== courseId)
        : [...prevSelected, courseId]
    );
  };

  const filteredCourses = courses?.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search courses"
        placeholderTextColor="#ccc"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <Text style={styles.subtitle}>
        Select courses you've taken or are currently taking
      </Text>
      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.courseItem,
              selectedCourses.includes(item._id) && styles.selectedCourse,
            ]}
            onPress={() => toggleCourseSelection(item._id)}
          >
            <Text style={styles.courseText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("selectProfessors", { selectedCourses })
          }
        >
          <Text style={styles.buttonText}>Next</Text>
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
  row: { justifyContent: "space-between" },
  courseItem: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: "48%",
  },
  selectedCourse: { backgroundColor: "#4b3f72" },
  courseText: { color: "#ccc", fontSize: 16, textAlign: "center" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  buttonText: { color: "#f0a500", fontSize: 16 },
});

export default CourseSelectionScreen;
