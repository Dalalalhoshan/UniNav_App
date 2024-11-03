import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CourseDetails from "../../components/CourseDetails";
import CourseCard from "../../components/CourseCard";
import Explore from "../../screens/Explore/Explore";
import Home from "../../screens/Home/home";
import ProfessorDetail from "../../components/ProfessorDetail";
// import CourseList from "../../components/courseList";
const Stack = createNativeStackNavigator();

const CourseNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ProfessorDetail" component={ProfessorDetail} />
      {/* <Stack.Screen name="CourseList" component={CourseList} /> */}
      <Stack.Screen name="CourseDetails" component={CourseDetails} />
      <Stack.Screen name="CourseCard" component={CourseCard} />
    </Stack.Navigator>
  );
};

export default CourseNavigation;
