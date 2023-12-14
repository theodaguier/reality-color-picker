import { View, Text, Button, TextInput } from "react-native";
import { useState } from "react";
import { useAuth } from "../context/auth-context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { onLogin, onRegister } = useAuth();

  const login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.msg);
    }
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
    <View>
      <Text>Login</Text>
      <Text>Email</Text>
      <TextInput
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Email"
      />
      <Text>Password</Text>
      <TextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Password"
      />
      <Button onPress={login} title="Login" />
      <Button onPress={register} title="Register" />
    </View>
  );
};

export default Login;
