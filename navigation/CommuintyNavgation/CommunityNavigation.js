import CommunityDetails from "../../components/CommunityDetails";
import CommunityList from "../../components/CommunityList";
import CommunityCard from "../../components/CommunityCard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home/home";
import PostDetail from "../../components/PostDetail";
import Communities from "../../screens/Communities/Commuinties";
import CreateCommunity from "../../screens/Communities/CreateCommunity";
import ResourceList from "../../components/ResourceList";
import ResourceDetail from "../../components/ResourceDetail";
import AccountDetails from "../../components/AccountDetails";
const Stack = createNativeStackNavigator();

const CommunityNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Communities"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Communities" component={Communities} />
      <Stack.Screen name="CommunityList" component={CommunityList} />
      <Stack.Screen name="CommunityDetails" component={CommunityDetails} />
      <Stack.Screen name="CommunityCard" component={CommunityCard} />
      <Stack.Screen name="PostDetail" component={PostDetail} />
      <Stack.Screen name="CreateCommunity" component={CreateCommunity} />
      <Stack.Screen name="ResourceList" component={ResourceList} />
      <Stack.Screen name="ResourceDetail" component={ResourceDetail} />
      <Stack.Screen name="AccountDetails" component={AccountDetails} />
    </Stack.Navigator>
  );
};

export default CommunityNavigation;
