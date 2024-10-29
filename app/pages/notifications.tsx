import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "alert" | "message" | "update";
}

export default function NotificationsScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const isDark = colorScheme === "dark";

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Welcome to MyToha!",
      message: "Thanks for joining our community. Start exploring now!",
      timestamp: "2m ago",
      read: false,
      type: "message",
    },
    {
      id: "2",
      title: "New Feature Available",
      message: "Check out our new messaging system.",
      timestamp: "1h ago",
      read: true,
      type: "update",
    },
    {
      id: "3",
      title: "Security Alert",
      message: "New login detected from your device.",
      timestamp: "2h ago",
      read: false,
      type: "alert",
    },
    // Add more notifications as needed
  ]);

  const getIconName = (type: string) => {
    switch (type) {
      case "alert":
        return "warning";
      case "message":
        return "chatbox";
      case "update":
        return "refresh-circle";
      default:
        return "notifications";
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "alert":
        return "#ff4444";
      case "message":
        return "#33b5e5";
      case "update":
        return "#00C851";
      default:
        return "#ffbb33";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        { backgroundColor: isDark ? "#1a1a1a" : "#fff" },
        !item.read && {
          borderLeftColor: getIconColor(item.type),
          borderLeftWidth: 4,
        },
      ]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={getIconName(item.type) as any}
          size={24}
          color={getIconColor(item.type)}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
          {item.title}
        </Text>
        <Text style={[styles.message, { color: isDark ? "#ccc" : "#666" }]}>
          {item.message}
        </Text>
        <Text style={[styles.timestamp, { color: isDark ? "#888" : "#999" }]}>
          {item.timestamp}
        </Text>
      </View>
      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#000" : "#f5f5f5" },
      ]}
    >
      {notifications.length > 0 ? (
        <>
          <View style={styles.header}>
            <Text
              style={[styles.headerText, { color: isDark ? "#fff" : "#000" }]}
            >
              {notifications.filter((n) => !n.read).length} unread notifications
            </Text>
            <TouchableOpacity onPress={clearAll}>
              <Text
                style={[styles.clearAll, { color: isDark ? "#fff" : "#000" }]}
              >
                Clear all
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={notifications}
            renderItem={renderNotification}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="notifications-off-outline"
            size={64}
            color={isDark ? "#444" : "#ccc"}
          />
          <Text style={[styles.emptyText, { color: isDark ? "#fff" : "#000" }]}>
            No notifications yet
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
  },
  clearAll: {
    fontSize: 14,
    color: "#007AFF",
  },
  listContainer: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: "row",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 16,
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#007AFF",
    position: "absolute",
    top: 16,
    right: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "500",
  },
});
