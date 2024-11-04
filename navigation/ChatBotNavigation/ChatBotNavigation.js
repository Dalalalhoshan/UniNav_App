import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chatbot from "../../components/Chatbot";
import ProfessorDetail from "../../components/ProfessorDetail";
import CourseDetail from "../../components/CourseDetails";
import CourseCard from "../../components/CourseCard";
import Bot from "../../screens/Bot/Bot";
import { Ionicons } from "@expo/vector-icons";
import ChatbotVoice from "../../components/ChatbotVoice";
const Stack = createNativeStackNavigator();

const ChatBotNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Bot">
      <Stack.Screen
        name="Bot"
        component={Bot}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Chatbot"
        component={Chatbot}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              color="#e8b800"
              onPress={() => navigation.goBack()}
            />
          ),
          headerStyle: {
            backgroundColor: "#1E1E1E",
          },
          headerTitle: "",
        })}
      />

      <Stack.Screen
        name="ChatbotVoice"
        component={ChatbotVoice}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ChatBotNavigation;
