import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { getProfessors } from "../src/api/proffesors";
import { getAllCourses } from "../src/api/courses";
import { getMe } from "../src/api/user";

const Chatbot = () => {
  const [data, setData] = useState([]);
  const apikey = `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`;
  const apiurl = `https://api.openai.com/v1/chat/completions`;
  const [textInput, setTextInput] = useState("");

  const { data: userData, error: userError } = useQuery({
    queryKey: ["userData"],
    queryFn: getMe,
  });
  const { data: professorsData, error: professorsError } = useQuery({
    queryKey: ["professorsData"],
    queryFn: getProfessors,
  });
  const { data: coursesData, error: coursesError } = useQuery({
    queryKey: ["coursesData"],
    queryFn: getAllCourses,
  });

  const findBestProfessorForCourse = (courseName) => {
    if (!coursesData || !professorsData) return "Loading data...";

    const course = coursesData.find(
      (c) => c.name.toLowerCase() === courseName.toLowerCase()
    );
    if (!course) {
      return `Course ${courseName} not found.`;
    }

    const professor = professorsData.find((p) => p.id === course.professorId);
    if (!professor) {
      return `No professor found for course ${courseName}.`;
    }

    return `The best professor for ${courseName} is ${
      professor.name
    }. Course details: ${JSON.stringify(course)}`;
  };

  const handlesend = async () => {
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

      if (userMessage.toLowerCase().includes("best professor for")) {
        const courseName = userMessage.split("best professor for")[1].trim();
        botMessage = findBestProfessorForCourse(courseName);
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

  if (userError || professorsError || coursesError) {
    return <Text>Error loading data</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Chatbot</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        style={styles.body}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Image
              source={{
                uri:
                  item.type === "user"
                    ? "https://example.com/user-avatar.png"
                    : "https://example.com/bot-avatar.png",
              }}
              style={styles.avatar}
            />
            <View style={styles.messageBubble}>
              <Text style={styles.messageText}>{item.text}</Text>
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
      <TouchableOpacity style={styles.button} onPress={handlesend}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Chatbot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    alignItems: "center",
    paddingTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#BB86FC",
    marginBottom: 20,
  },
  body: {
    width: "100%",
    paddingHorizontal: 20,
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
    width: "90%",
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#BB86FC",
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
});
