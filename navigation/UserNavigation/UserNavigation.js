import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserList from "../../components/UserList";
import UserDetail from "../../components/UserDetail";
const Stack = createNativeStackNavigator();

const UserNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserList" component={UserList} />
      <Stack.Screen name="UserDetail" component={UserDetail} />
    </Stack.Navigator>
  );
};

export default UserNavigation;
