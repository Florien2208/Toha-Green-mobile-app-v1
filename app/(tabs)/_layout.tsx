import { Tabs } from "expo-router";
import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth } from "../_layout";
// import { useAuth } from "./_layout"; // Import the auth context

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { signOut } = useAuth(); // Get the signOut function from auth context

  const handleLogout = async () => {
    await signOut();
    router.replace("/(auth)/login");
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
        headerStyle: {
          backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
        },
        headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitle: () => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
            }}
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
              placeholderTextColor={colorScheme === "dark" ? "#ccc" : "#888"}
              style={{
                width: 190,
                height: 30,
                backgroundColor: colorScheme === "dark" ? "#333" : "#f0f0f0",
                color: colorScheme === "dark" ? "#fff" : "#000",
                paddingHorizontal: 15,
                borderRadius: 25,
              }}
            />
          </View>
        ),
        headerRight: () => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => router.push("/pages/notifications")}
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color={colorScheme === "dark" ? "#fff" : "#000"}
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/pages/profile-settings")}
            >
              <FontAwesome
                name="user"
                size={24}
                color={colorScheme === "dark" ? "#fff" : "#000"}
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <Ionicons
                name="log-out-outline"
                size={24}
                color={colorScheme === "dark" ? "#fff" : "#000"}
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "search" : "search-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "add-circle" : "add-circle-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="helpcenter"
        options={{
          title: "HelpCenter",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "help-circle" : "help-circle-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
