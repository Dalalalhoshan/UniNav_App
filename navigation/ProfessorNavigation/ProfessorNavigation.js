import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfessorDetail from "../../components/ProfessorDetail";
import ProfessorList from "../../components/ProfessorList";
import ProfessorCard from "../../components/ProfessorCard";
import Explore from "../../screens/Explore/Explore";
import CourseDetails from "../../components/CourseDetails";
import CommunityList from "../../components/CommunityList";
import CommunityDetails from "../../components/CommunityDetails";
import ResourceDetail from "../../components/ResourceDetail";
import PostDetail from "../../components/PostDetail";
import AccountDetails from "../../components/AccountDetails";
const Stack = createNativeStackNavigator();

const ProfessorNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Explore"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Explore" component={Explore} />
      <Stack.Screen name="ProfessorList" component={ProfessorList} />
      <Stack.Screen name="ProfessorDetail" component={ProfessorDetail} />
      <Stack.Screen name="ResourceDetailIndex" component={ResourceDetail} />
      <Stack.Screen name="CommunityList" component={CommunityList} />
      <Stack.Screen name="CommunityDetail" component={CommunityDetails} />
      <Stack.Screen name="ProfessorCard" component={ProfessorCard} />
      <Stack.Screen name="CourseDetail" component={CourseDetails} />
      <Stack.Screen name="CommunityDetails" component={CommunityDetails} />
      <Stack.Screen name="CourseDetails" component={CourseDetails} />
      <Stack.Screen name="PostDetailIndex" component={PostDetail} />
      <Stack.Screen name="AccountDetails" component={AccountDetails} />
    </Stack.Navigator>
  );
};

export default ProfessorNavigation;
