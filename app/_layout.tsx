import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "@/hooks/useColorScheme";
import { createContext, useContext } from "react";

SplashScreen.preventAutoHideAsync();

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

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const segments = useSegments();

  // Check initial auth state
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (token: string) => {
    try {
      await AsyncStorage.setItem("userToken", token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error during sign in:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error during sign out:", error);
      throw error;
    }
  };

  // Show loading screen while checking auth status
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

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

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
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
              // Prevent going back to auth screens once logged in
              gestureEnabled: false,
            }}
          />

          {/* Protected Routes - Only accessible after login */}
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              // Prevent going back to login screen
              gestureEnabled: false,
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
