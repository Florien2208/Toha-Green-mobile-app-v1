import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import {
  router,
  Stack,
  useRouter,
  useSegments,
  useRootNavigationState,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Create a context to manage auth state globally
import { createContext, useContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Authentication provider component
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const rootSegments = useSegments();
  const navigationState = useRootNavigationState();

  const signIn = async (token: string) => {
    await AsyncStorage.setItem("userToken", token);
    setIsAuthenticated(true);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("userToken");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (!navigationState?.key) return;

    const inAuthGroup = rootSegments[0] === "(auth)";

    if (isAuthenticated && inAuthGroup) {
      router.replace("/(tabs)");
    } else if (!isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)/login");
    }
  }, [isAuthenticated, rootSegments, navigationState?.key]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkInitialAuth() {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (token) {
          router.replace("/(tabs)");
        } else {
          router.replace("/(auth)/login");
        }
      } catch (error) {
        console.error("Error checking initial auth:", error);
        router.replace("/(auth)/login");
      } finally {
        setIsLoading(false);
        SplashScreen.hideAsync();
      }
    }

    if (loaded) {
      checkInitialAuth();
    }
  }, [loaded]);

  if (!loaded || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Auth Group */}
          <Stack.Screen
            name="(auth)/login"
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="(auth)/signup"
            options={{
              headerShown: false,
            }}
          />

          {/* Main App Group */}
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />

          {/* Modal Screens */}
          <Stack.Screen
            name="pages/notifications"
            options={{
              presentation: "modal",
              headerShown: true,
              headerTitle: "Notifications",
              headerStyle: {
                backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
              },
              headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
            }}
          />
          <Stack.Screen
            name="pages/profile-settings"
            options={{
              presentation: "modal",
              headerShown: true,
              headerTitle: "Profile Settings",
              headerStyle: {
                backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
              },
              headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
            }}
          />
          <Stack.Screen
            name="+not-found"
            options={{
              headerShown: false,
              presentation: "modal",
            }}
          />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}
