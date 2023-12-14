import { View, Text, Button, TextInput } from "react-native";
import { useState } from "react";
import { useAuth } from "./context/auth-context";
import { router } from "expo-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { onLogin, onRegister } = useAuth();

  const login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.msg);
    }
    router.replace("/(app)/index");
  };

  const register = async () => {
    const result = await onRegister!(email, password);
    if (result && result.error) {
      alert(result.msg);
    } else {
      alert("Registered!");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => {
          register();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace("/");
        }}
      >
        Sign In
      </Text>
    </View>
  );
};

export default Login;
