import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chatbot from "../../components/Chatbot";
const Stack = createNativeStackNavigator();

const ChatBotNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chatbot" component={Chatbot} />
    </Stack.Navigator>
  );
};

export default ChatBotNavigation;
