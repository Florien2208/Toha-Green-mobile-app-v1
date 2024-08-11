import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: true,
            title: "",
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
            },
            headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitle: () => (
              <View
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: colorScheme === "dark" ? "#fff" : "#000",
                    marginRight: 10,
                  }}
                >
                  My Toha
                </Text>
                <TextInput
                  placeholder="Search"
                  placeholderTextColor={
                    colorScheme === "dark" ? "#ccc" : "#888"
                  }
                  style={{
                    width: 190,
                    height: 30,
                    backgroundColor:
                      colorScheme === "dark" ? "#333" : "#f0f0f0",
                    color: colorScheme === "dark" ? "#fff" : "#000",
                    paddingHorizontal: 15,
                    borderRadius: 25,
                  }}
                />
              </View>
            ),
            headerRight: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => router.push("/pages/login")}>
                  <Ionicons
                    name="notifications-outline"
                    size={24}
                    color={colorScheme === "dark" ? "#fff" : "#000"}
                    style={{ marginRight: 15 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/pages/signup")}>
                  <FontAwesome
                    name="user"
                    size={24}
                    color={colorScheme === "dark" ? "#fff" : "#000"}
                    style={{ marginRight: 15 }}
                  />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Stack.Screen name="pages/signup" options={{ presentation: "modal" }} />
        <Stack.Screen name="pages/login" options={{ presentation: "modal" }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
