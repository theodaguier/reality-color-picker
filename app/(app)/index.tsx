// import { StyleSheet } from "react-native";

// import EditScreenInfo from "../../components/EditScreenInfo";
// import { Text, View } from "../../components/Themed";

// export default function TabOneScreen() {
//   return (
//     <View className="flex-1 items-center justify-center">
//       <Text>Tab One</Text>
//       <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
//       <EditScreenInfo path="app/(tabs)/index.tsx" />
//     </View>
//   );
// }

import { Text, View } from "react-native";

import { AuthProvider, useAuth } from "../context/auth-context";

export default function Index() {
  const { onLogout } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          onLogout();
        }}
      >
        Sign Out
      </Text>
    </View>
  );
}
