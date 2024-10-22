import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Register from "./screens/Auth/Register";
import Login from "./screens/Auth/Login";
import { SafeAreaView } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export default function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#454545" }}>
          <Register />
          {/* <Login /> */}
        </SafeAreaView>
      </QueryClientProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#454545",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    // width: "100%",
  },
});
