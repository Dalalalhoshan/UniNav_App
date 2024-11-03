import {
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  FontAwesome,
  AntDesign,
  MaterialIcons,
} from "react-native-vector-icons";
import { Audio } from "expo-av";
import axios from "axios";
import * as Speech from "expo-speech";
import LottieView from "lottie-react-native";

export default function ChatbotVoice() {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState();
  const [AIResponse, setAIResponse] = useState(false);
  const [AISpeaking, setAISpeaking] = useState(false);
  const lottieRef = useRef(null);

  const getMicrophonePermission = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        Alert.alert(
          "Permission",
          "Please grant permission to access microphone"
        );
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const recordingOptions = {
    android: {
      extension: ".wav",
      outPutFormat: Audio.AndroidOutputFormat.MPEG_4,
      androidEncoder: Audio.AndroidAudioEncoder.AAC,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
    ios: {
      extension: ".wav",
      audioQuality: Audio.IOSAudioQuality.HIGH,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
  };

  const startRecording = async () => {
    const hasPermission = await getMicrophonePermission();
    if (!hasPermission) return;
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      setIsRecording(true);
      const { recording } = await Audio.Recording.createAsync(recordingOptions);
      setRecording(recording);
    } catch (error) {
      console.log("Failed to start Recording", error);
      Alert.alert("Error", "Failed to start recording");
    }
  };
  console.log(isRecording);
  const stopRecording = async () => {
    try {
      setIsRecording(false);
      setLoading(true);
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      const uri = recording.getURI();
      const transcript = await sendAudioToWhisper(uri);
      setText(transcript);
      await sendToGpt(transcript);
    } catch (error) {
      console.log("Failed to stop Recording", error);
      Alert.alert("Error", "Failed to stop recording");
    }
  };

  const sendAudioToWhisper = async (uri) => {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri,
        type: "audio/wav",
        name: "recording.wav",
      });
      formData.append("model", "whisper-1");
      const apikey = process.env.EXPO_PUBLIC_API_KEY;
      const response = await axios.post(
        "https://api.openai.com/v1/audio/transcriptions",
        formData,
        {
          headers: {
            Authorization: `Bearer ${apikey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.text;
    } catch (error) {
      console.log(error);
    }
  };

  const sendToGpt = async (text) => {
    try {
      const apikey = process.env.EXPO_PUBLIC_API_KEY;
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content:
                "You are Artifonia, a friendly AI assistant who responds naturally and refers to yourself as Artifonia when asked for your name. You are a helpful assistant who can answer questions and help with tasks. You must always respond in English, no matter the input language, and provide helpful, clear answers",
            },
            {
              role: "user",
              content: text,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${apikey}`,
            "Content-Type": "application/json",
          },
        }
      );
      setText(response.data.choices[0].message.content);
      setLoading(false);
      setAIResponse(true);
      await speakText(response.data.choices[0].message.content);
      return response.data.choices[0].message.content;
    } catch (error) {
      console.log("Error sending text to GPT-4", error);
    }
  };

  const speakText = async (text) => {
    setAISpeaking(true);
    const options = {
      voice: "com.apple.ttsbundle.Samantha-compact",
      language: "en-US",
      pitch: 1.5,
      rate: 1,
      onDone: () => {
        setAISpeaking(false);
      },
    };
    Speech.speak(text, options);
  };

  useEffect(() => {
    if (AISpeaking) {
      lottieRef.current?.play();
    } else {
      lottieRef.current?.reset();
    }
  }, [AISpeaking]);

  return (
    <LinearGradient
      colors={["#250152", "#000"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle={"light-content"} />
      {AIResponse && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            setIsRecording(false);
            setAIResponse(false);
            setText("");
          }}
        >
          <AntDesign name="arrowleft" size={20} color="#fff" />
        </TouchableOpacity>
      )}
      <View style={styles.recordingContainer}>
        {loading ? (
          <TouchableOpacity>
            <LottieView
              source={require("../assets/animations/loading.json")}
              autoPlay
              loop
              speed={1.3}
              style={{ width: 270, height: 270 }}
            />
          </TouchableOpacity>
        ) : (
          <>
            {!isRecording ? (
              <>
                {AIResponse ? (
                  <View>
                    <LottieView
                      ref={lottieRef}
                      source={require("../assets/animations/ai-speaking.json")}
                      autoPlay={false}
                      loop={false}
                      style={{ width: 250, height: 250 }}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.microphoneButton}
                    onPress={startRecording}
                  >
                    <FontAwesome name="microphone" size={50} color="#2b3356" />
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <TouchableOpacity onPress={stopRecording}>
                <LottieView
                  source={require("../assets/animations/animation.json")}
                  autoPlay
                  loop
                  speed={1.3}
                  style={{ width: 250, height: 250 }}
                />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {loading ? "..." : text || "Press the microphone to start recording!"}
        </Text>
      </View>
      {AIResponse && (
        <View style={styles.responseContainer}>
          <TouchableOpacity onPress={() => sendToGpt(text)}>
            <MaterialIcons name="autorenew" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => speakText(text)}>
            <MaterialIcons name="replay" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#131313",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  recordingContainer: {
    marginTop: -40,
  },
  microphoneButton: {
    width: 110,
    height: 110,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  textContainer: {
    alignItems: "center",
    width: 350,
    position: "absolute",
    bottom: 90,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    width: 269,
    textAlign: "center",
    lineHeight: 25,
  },
  responseContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 360,
  },
});
