import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { getProfessors } from "../src/api/proffesors";
import { getAllCourses, getCourseById } from "../src/api/courses";
import { getMe } from "../src/api/user";
import { getResources, getResourceById } from "../src/api/resource"; // Adjust the path as necessary
import { getAllCommunities } from "../src/api/Community";

import { BASE_URL } from "../src/api";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
    data: communitiesData,
    error: communitiesError,
    isLoading: communitiesLoading,
  } = useQuery({
    queryKey: ["communitiesData"],
    queryFn: getAllCommunities,
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

  const handleSend = async () => {
    if (
      userLoading ||
      professorsLoading ||
      coursesLoading ||
      communitiesLoading
    ) {
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
                content: `You are Fahim, an AI bot designed to help students at UniNav. You have access to the following data: 
    - User data: ${JSON.stringify(userData)}
                -  Resources data: ${JSON.stringify(resourceData)}`,
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
              content: `You are Fahim, an AI bot designed to help students at UniNav. You have access to the following data: 
    
    - communities data: ${JSON.stringify(communitiesData)}
    - Courses data: ${JSON.stringify(coursesData)}`,
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
        console.error("error", error);
      }
    }
  };

  if (
    userError ||
    professorsError ||
    coursesError ||
    resourceError ||
    communitiesError
  ) {
    return <Text>Error loading data</Text>;
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.title}>Fahim</Text>

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        style={styles.body}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.type === "user" ? styles.userMessage : styles.systemMessage,
            ]}
          >
            <View style={styles.messageBubble}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
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
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1E1E1E",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
  },
  introduction: {
    fontSize: 16,
    color: "#FFF",
    textAlign: "center",
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
  userMessage: {
    justifyContent: "flex-end",
  },
  systemMessage: {
    justifyContent: "flex-start",
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    // marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    backgroundColor: "#2C2C2C",
    color: "#FFF",
    flex: 1,
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#0C70FF",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default Chatbot;
