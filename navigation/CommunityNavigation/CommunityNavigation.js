import CommunityDetails from "../../components/CommunityDetails";
import CommunityList from "../../components/CommunityList";
import CommunityCard from "../../components/CommunityCard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home/home";
import PostDetail from "../../components/PostDetail";

const Stack = createNativeStackNavigator();

const CommunityNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CommunityList" component={CommunityList} />
      <Stack.Screen name="CommunityDetails" component={CommunityDetails} />
      <Stack.Screen name="CommunityCard" component={CommunityCard} />
      <Stack.Screen name="PostDetail" component={PostDetail} />
    </Stack.Navigator>
  );
};

export default CommunityNavigation;
