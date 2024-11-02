import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfessorDetail from "../../components/ProfessorDetail";
import ProfessorList from "../../components/ProfessorList";
import ProfessorCard from "../../components/ProfessorCard";
import Explore from "../../screens/Explore/Explore";
import CourseDetails from "../../components/CourseDetails";
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
      <Stack.Screen name="ProfessorCard" component={ProfessorCard} />
      <Stack.Screen name="CourseDetail" component={CourseDetails} />
    </Stack.Navigator>
  );
};

export default ProfessorNavigation;
