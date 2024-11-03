import CommunityDetails from "../../components/CommunityDetails";
import CommunityList from "../../components/CommunityList";
import CommunityCard from "../../components/CommunityCard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home/home";
import PostDetail from "../../components/PostDetail";
import AccountDetails from "../../components/AccountDetails";
import AccountCard from "../../components/AccountsCard";
import AccountList from "../../components/AccountsList";

const Stack = createNativeStackNavigator();

const CommunityNavigation1 = () => {
  return (
    <Stack.Navigator initialRouteName="AccountList">
      {/* {/* <Stack.Screen name="Home" component={Home} /> */}
      {/* <Stack.Screen name="CommunityList" component={CommunityList} />
      <Stack.Screen name="CommunityDetails" component={CommunityDetails} />
      <Stack.Screen name="CommunityCard" component={CommunityCard} />
      <Stack.Screen name="PostDetail" component={PostDetail} /> */}
      <Stack.Screen name="AccountCard" component={AccountCard} />
      <Stack.Screen name="AccountDetails" component={AccountDetails} />
      <Stack.Screen name="AccountList" component={AccountList} />
    </Stack.Navigator>
  );
};

export default CommunityNavigation1;
