import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, Redirect } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { AuthProvider, useAuth } from "../context/auth-context";
import Login from "../screens/Login";
import { Slot } from "expo-router";

// export {
//   // Catch any errors thrown by the Layout component.
//   ErrorBoundary,
// } from "expo-router";

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: "(tabs)",
// };

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export function RootLayout() {
//   // const [loaded, error] = useFonts({
//   //   SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
//   //   ...FontAwesome.font,
//   // });

//   // Expo Router uses Error Boundaries to catch errors in the navigation tree.
//   // useEffect(() => {
//   //   if (error) throw error;
//   // }, [error]);

//   // useEffect(() => {
//   //   if (loaded) {
//   //     SplashScreen.hideAsync();
//   //   }
//   // }, [loaded]);

//   // if (!loaded) {
//   //   return null;
//   // }

//   return <RootLayoutNav />;
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <Slot />
//     </AuthProvider>
//   );
// }

// function RootLayoutNav() {
//   const colorScheme = useColorScheme();
//   const { authState } = useAuth();

//   console.log("authState", authState);

//   return (
//     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//       <Stack>
//         {authState?.authenticated ? (
//           <Stack.Screen name="login" options={{ headerShown: false }} />
//         ) : (
//           <>
//             <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//             <Stack.Screen name="modal" options={{ presentation: "modal" }} />
//           </>
//         )}
//       </Stack>
//     </ThemeProvider>
//   );
// }

import { Text } from "react-native";

export default function AppLayout() {
  const { authState } = useAuth();

  // You can keep the splash screen open, or render a loading screen like we do here.
  // if (isLoading) {
  //   return <Text>Loading...</Text>;
  // }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!authState?.authenticated) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack />;
}
