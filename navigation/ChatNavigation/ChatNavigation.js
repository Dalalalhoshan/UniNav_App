import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home/home";
import ChatList from "../../components/ChatList";
import ChatDetails from "../../components/ChatDetails";
import ChatCard from "../../components/ChatCard";
import Chat from "../../screens/Chat/Chat";

const Stack = createNativeStackNavigator();

const ChatNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Chat">
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ChatList" component={ChatList} />
      <Stack.Screen name="ChatDetails" component={ChatDetails} />
      <Stack.Screen name="ChatCard" component={ChatCard} />
    </Stack.Navigator>
  );
};

export default ChatNavigation;
