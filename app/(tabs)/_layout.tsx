import { Tabs } from "expo-router";
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  Pressable,
  Switch,
  ViewStyle,
} from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useRouter, Redirect } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth } from "../_layout";

// Define interface for MenuOption props
interface MenuOptionProps {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  onPress: () => void;
  rightElement?: React.ReactNode;
  showBorder?: boolean;
}

// Define interface for SettingsDropdown props
interface SettingsDropdownProps {
  visible: boolean;
  onClose: () => void;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { signOut, isAuthenticated } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await signOut();
    router.replace("/(auth)/login");
  };

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  const MenuOption: React.FC<MenuOptionProps> = ({
    icon,
    text,
    onPress,
    rightElement = null,
    showBorder = true,
  }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        borderBottomWidth: showBorder ? 1 : 0,
        borderBottomColor: colorScheme === "dark" ? "#444" : "#eee",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons
          name={icon}
          size={20}
          color={colorScheme === "dark" ? "#fff" : "#000"}
          style={{ marginRight: 10 }}
        />
        <Text
          style={{
            color: colorScheme === "dark" ? "#fff" : "#000",
            fontSize: 16,
          }}
        >
          {text}
        </Text>
      </View>
      {rightElement}
    </TouchableOpacity>
  );

  const SettingsDropdown: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
    const [currentLanguage, setCurrentLanguage] = useState("English");

    const dropdownContainerStyle: ViewStyle = {
      position: "absolute",
      top: 50,
      right: 10,
      backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
      borderRadius: 12,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
      minWidth: 200,
      overflow: "hidden",
    };

    return (
      <Modal
        transparent
        visible={showDropdown}
        onRequestClose={() => setShowDropdown(false)}
        animationType="fade"
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
          onPress={() => setShowDropdown(false)}
        >
          <View style={dropdownContainerStyle}>
            {/* Header */}
            <View
              style={{
                padding: 15,
                borderBottomWidth: 1,
                borderBottomColor: colorScheme === "dark" ? "#444" : "#eee",
                backgroundColor: colorScheme === "dark" ? "#444" : "#f8f8f8",
              }}
            >
              <Text
                style={{
                  color: colorScheme === "dark" ? "#fff" : "#000",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Settings
              </Text>
            </View>

            {/* Dark Mode Option */}
            <MenuOption
              icon="moon-outline"
              text="Dark Mode"
              onPress={() => setIsDarkMode(!isDarkMode)}
              rightElement={
                <Switch
                  value={isDarkMode}
                  onValueChange={setIsDarkMode}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
                />
              }
            />

            {/* Language Option */}
            <MenuOption
              icon="language-outline"
              text="Language"
              onPress={() => {
                console.log("Open language selection");
              }}
              rightElement={
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      color: colorScheme === "dark" ? "#999" : "#666",
                      marginRight: 5,
                      fontSize: 14,
                    }}
                  >
                    {currentLanguage}
                  </Text>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={20}
                    color={colorScheme === "dark" ? "#999" : "#666"}
                  />
                </View>
              }
            />

            {/* Settings Option */}
            <MenuOption
              icon="settings-outline"
              text="Settings"
              onPress={() => {
                setShowDropdown(false);
                router.push("/pages/profile-settings");
              }}
            />

            {/* Logout Option */}
            <MenuOption
              icon="log-out-outline"
              text="Logout"
              onPress={() => {
                setShowDropdown(false);
                handleLogout();
              }}
              showBorder={false}
            />
          </View>
        </Pressable>
      </Modal>
    );
  };

  return (
    <>
      <SettingsDropdown />
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
              <TouchableOpacity onPress={() => setShowDropdown(true)}>
                <Ionicons
                  name="settings-outline"
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
    </>
  );
}
