import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import Home from "../../screens/Home/home";
import ChatList from "../../components/ChatList";
import ChatDetails from "../../components/ChatDetails";
import ChatCard from "../../components/ChatCard";
import Chat from "../../screens/Chat/Chat";
import { colors } from "../../Colors";

const Stack = createNativeStackNavigator();

const ChatNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Chat">
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChatList"
        component={ChatList}
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
            backgroundColor: "transparent",
          },
          headerTitle: "",
        })}
      />
      <Stack.Screen
        name="ChatDetails"
        component={ChatDetails}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              style={{ margin: 5 }}
              color={colors.white}
              onPress={() => navigation.goBack()}
            />
          ),
          headerStyle: {
            backgroundColor: "#121212",
          },
          headerTitle: "",
        })}
      />
      <Stack.Screen
        name="ChatCard"
        component={ChatCard}
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
            backgroundColor: "#121212",
          },
          headerTitle: "",
        })}
      />
    </Stack.Navigator>
  );
};

export default ChatNavigation;
