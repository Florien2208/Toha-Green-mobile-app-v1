import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="test"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="check"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// const NavigationBar = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.navItem}>
//         <Ionicons name="home" size={24} color="white" />
//         <Text style={styles.navText}>Home</Text>
//       </View>
//       <View style={styles.navItem}>
//         <Ionicons name="search" size={24} color="white" />
//         <Text style={styles.navText}>Search</Text>
//       </View>
//       <View style={styles.navItem}>
//         <Ionicons name="compass" size={24} color="white" />
//         <Text style={styles.navText}>Explore</Text>
//       </View>
//       <View style={styles.navItem}>
//         <Ionicons name="help-circle" size={24} color="white" />
//         <Text style={styles.navText}>Help center</Text>
//       </View>
//       <View style={styles.navItem}>
//         <Ionicons name="person" size={24} color="white" />
//         <Text style={styles.navText}>Profile</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     backgroundColor: "#333",
//     paddingVertical: 10,
//     borderRadius: 30,
//     margin: 10,
//   },
//   navItem: {
//     alignItems: "center",
//   },
//   navText: {
//     color: "white",
//     fontSize: 12,
//     marginTop: 5,
//   },
// });

// export default NavigationBar;