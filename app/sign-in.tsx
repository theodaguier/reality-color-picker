import { View, Text, Button, TextInput } from "react-native";
import { useState } from "react";
import { useAuth } from "./context/auth-context";
import { router } from "expo-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("Login", { username, email, password });

  const { onLogin, onRegister } = useAuth();

  const login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.msg);
    }

    router.replace("/");
  };

  const register = async () => {
    const result = await onRegister!(username, email, password);
    if (result && result.error) {
      alert(result.msg);
    } else {
      alert("Registered!");
    }
  };

  return (
    <View className="flex flex-col items-center justify-center w-full h-full">
      <Text className="text-4xl">Login</Text>
      <TextInput
        className="w-full p-2 my-2 border border-gray-400 rounded"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="w-full p-2 my-2 border border-gray-400 rounded"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={login} />
      <Text className="text-4xl">Register</Text>
      <TextInput
        className="w-full p-2 my-2 border border-gray-400 rounded"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        className="w-full p-2 my-2 border border-gray-400 rounded"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="w-full p-2 my-2 border border-gray-400 rounded"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Register" onPress={register} />
    </View>
  );
};

export default Login;
