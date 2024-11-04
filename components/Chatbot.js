import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { getProfessors } from "../src/api/proffesors";
import { getAllCourses, getCourseById } from "../src/api/courses";
import { getMe } from "../src/api/user";
import { getResources, getResourceById } from "../src/api/resource"; // Adjust the path as necessary

const Chatbot = () => {
  const apikey = process.env.EXPO_PUBLIC_API_KEY;
  const apiurl = process.env.EXPO_PUBLIC_API_URL;
  const [data, setData] = useState([]);
  const [suggestedCourseIds, setSuggestedCourseIds] = useState([]);
  const navigation = useNavigation();
  const [textInput, setTextInput] = useState("");
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [showResources, setShowResources] = useState(false);

  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: getMe,
  });
  const {
    data: professorsData,
    error: professorsError,
    isLoading: professorsLoading,
  } = useQuery({
    queryKey: ["professorsData"],
    queryFn: getProfessors,
  });
  const {
    data: coursesData,
    error: coursesError,
    isLoading: coursesLoading,
  } = useQuery({
    queryKey: ["coursesData"],
    queryFn: getAllCourses,
  });
  const {
    data: resourceData,
    error: resourceError,
    isLoading: resourceLoading,
  } = useQuery({
    queryKey: ["resources"],
    queryFn: getResources,
    onSuccess: (data) => setResources(data),
  });
  const toggleResourceList = () => {
    setShowResources(!showResources);
  };

  const findBestProfessorForCourse = (courseName) => {
    if (!coursesData || !professorsData) {
      return { message: "Loading data..." };
    }

    // Find all courses matching the courseName
    const matchingCourses = coursesData.filter(
      (c) => c.name.toLowerCase() === courseName.toLowerCase()
    );

    console.log("Matching courses:", matchingCourses);

    if (matchingCourses.length === 0) {
      return { message: `Course ${courseName} not found.` };
    }

    // Initialize variables to track the best professor
    let bestProfessor = null;
    let highestRating = -Infinity;

    // Iterate through all matching courses
    matchingCourses.forEach((course) => {
      // Access the professor directly from the course object
      const professor = course.professor; // Adjusted to get the professor directly
      console.log("Checking professor:", professor);

      if (professor) {
        if (professor.avgRating > highestRating) {
          // Use avgRating for comparison
          highestRating = professor.avgRating;
          bestProfessor = professor;
        }
      }
    });

    if (!bestProfessor) {
      return { message: `No professor found for course ${courseName}.` };
    }

    return {
      message: `The best professor for ${courseName} is ${bestProfessor.name} with a rating of ${highestRating}.`,
      professor: bestProfessor,
      course: matchingCourses,
    };
  };

  const suggestCourses = () => {
    if (!userData || !coursesData) return [];

    const userCourses = userData.courses.map((course) => course.id);
    const availableCourses = coursesData.filter(
      (course) => !userCourses.includes(course.id)
    );

    const suggestedCourses = availableCourses.slice(0, 5);
    setSuggestedCourseIds(suggestedCourses.map((course) => course.id));
    return availableCourses;
  };
  const renderResources = () => {
    return resourceData.map((resource) => (
      <TouchableOpacity
        key={resource.id}
        style={styles.resourceItem}
        onPress={() => setSelectedResource(resource)}
      >
        <Text style={styles.resourceText}>{resource.title}</Text>
      </TouchableOpacity>
    ));
  };

  const handleSend = async () => {
    if (userLoading || professorsLoading || coursesLoading) {
      setData([
        ...data,
        { type: "user", text: textInput },
        { type: "bot", text: "Loading data, please wait..." },
      ]);
      return;
    }

    // Check if a resource is selected
    if (selectedResource) {
      const resourceMessage = `I selected the resource titled "${selectedResource.title}". Here is the URL: ${selectedResource.url}`;

      // Show the user's selected resource message
      setData([
        ...data,
        { type: "user", text: resourceMessage },
        { type: "bot", text: "Sending resource to the bot..." },
      ]);

      try {
        const response = await axios.post(
          apiurl,
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: `You are a helpful assistant with access to user data: ${JSON.stringify(
                  userData
                )}`,
              },
              { role: "user", content: resourceMessage },
            ],
            max_tokens: 1024,
            temperature: 0.5,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apikey}`,
            },
          }
        );

        const botResponse = response.data.choices[0].message.content;

        // Update the chat with the bot's response
        setData([...data, { type: "bot", text: botResponse }]);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          alert("Too many requests. Please try again later.");
        } else {
          console.error(error);
        }
      } finally {
        setSelectedResource(null); // Reset after sending
        return; // Exit early to avoid further processing
      }
    }

    // Process regular text input if no resource is selected
    try {
      const response = await axios.post(
        apiurl,
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are a helpful assistant with access to user data: ${JSON.stringify(
                userData
              )}`,
            },
            { role: "user", content: textInput },
          ],
          max_tokens: 1024,
          temperature: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apikey}`,
          },
        }
      );

      const userMessage = response.data.choices[0].message.content;
      let botMessage = userMessage;

      // Check if the user message contains information about the best professor
      if (userMessage.toLowerCase().includes("best professor for")) {
        const courseNameMatch = userMessage.match(
          /best professor for\s+(.+?)(?:\s+is|\?|\.|$)/i
        );
        const courseName = courseNameMatch ? courseNameMatch[1].trim() : null;

        if (courseName) {
          const result = findBestProfessorForCourse(courseName);
          if (result && result.message) {
            botMessage = result.message;
          } else {
            botMessage = `Sorry, I couldn't find a professor for the course "${courseName}".`;
          }
        } else {
          botMessage = "Please specify a course name.";
        }
      } else if (
        userMessage.toLowerCase().includes("suggest courses") ||
        userMessage.toLowerCase().includes("generate course plan")
      ) {
        const suggestedCourses = suggestCourses();
        botMessage = "Suggested courses:";
        // Handle additional data if necessary
      }

      setData([
        ...data,
        { type: "user", text: textInput },
        { type: "bot", text: botMessage },
      ]);
      setTextInput("");
    } catch (error) {
      if (error.response && error.response.status === 429) {
        alert("Too many requests. Please try again later.");
      } else {
        console.error(error);
      }
    }
  };

  const renderSuggestedCourses = () => {
    return suggestedCourseIds.map((courseId) => {
      const course = coursesData.find((c) => c.id === courseId);
      {
        console.log(course);
      }
      return renderCourseName(course);
    });
  };

  if (userError || professorsError || coursesError || resourceError) {
    return <Text>Error loading data</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fahim</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        style={styles.body}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Image
              source={
                item.type === "user"
                  ? "../../assets/user-avatar.png"
                  : "../../assets/bot-avatar.png"
              }
              style={styles.avatar}
            />
            <View style={styles.messageBubble}>
              <Text style={styles.messageText}>{item.text}</Text>
              <View style={styles.messageBubble}>
                {renderSuggestedCourses()}
              </View>
            </View>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        value={textInput}
        onChangeText={(text) => setTextInput(text)}
        placeholder="Type your message..."
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleResourceList}>
        <Text style={styles.resourceTitle}>Select a Resource:</Text>
      </TouchableOpacity>
      {showResources && (
        <View style={styles.resourceContainer}>{renderResources()}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#1E1E1E",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
  },
  body: {
    flex: 1,
    width: "100%",
  },
  messageContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageBubble: {
    backgroundColor: "#333",
    borderRadius: 20,
    padding: 10,
    maxWidth: "80%",
  },
  messageText: {
    color: "#FFF",
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    backgroundColor: "#2C2C2C",
    color: "#FFF",
    width: "70%",
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    width: "90%",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  courseNameContainer: {
    marginTop: 10,
  },
  courseName: {
    color: "#FFF",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  resourceContainer: {
    marginTop: 10,
    width: "100%",
  },
  resourceItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  resourceText: {
    color: "#FFF",
    fontSize: 16,
  },
  resourceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginVertical: 15,
    textAlign: "center",
  },

  resourceContainer: {
    marginTop: 10,
    width: "100%",
    paddingHorizontal: 15, // Add some horizontal padding
    backgroundColor: "#2C2C2C", // Background color to distinguish the section
    borderRadius: 10, // Rounded corners for the container
    paddingVertical: 10, // Vertical padding for spacing
    elevation: 2, // Add a shadow effect (for Android)
    shadowColor: "#000", // Shadow color (for iOS)
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 5, // Shadow blur radius
  },
});

export default Chatbot;
