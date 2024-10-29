import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/app/_layout';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
  isDark: boolean;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children, isDark }) => (
  <View style={styles.section}>
    <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>
      {title}
    </Text>
    <View style={[styles.sectionContent, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
      {children}
    </View>
  </View>
);

export default function ProfileSettingsScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { signOut } = useAuth();
  const isDark = colorScheme === 'dark';

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(isDark);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
  });

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  const handleUpdateProfile = () => {
    Alert.alert('Success', 'Profile updated successfully!');
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: isDark ? '#000' : '#f5f5f5' }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <TouchableOpacity style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.avatar}
          />
          <View style={styles.avatarOverlay}>
            <Ionicons name="camera" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
        <Text style={[styles.profileName, { color: isDark ? '#fff' : '#000' }]}>
          {profileData.name}
        </Text>
        <Text style={[styles.profileEmail, { color: isDark ? '#ccc' : '#666' }]}>
          {profileData.email}
        </Text>
      </View>

      {/* Personal Information */}
      <SettingsSection title="Personal Information" isDark={isDark}>
        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, { color: isDark ? '#fff' : '#000' }]}>Name</Text>
          <TextInput
            value={profileData.name}
            onChangeText={(text) => setProfileData({ ...profileData, name: text })}
            style={[styles.input, { 
              color: isDark ? '#fff' : '#000',
              backgroundColor: isDark ? '#333' : '#f5f5f5'
            }]}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, { color: isDark ? '#fff' : '#000' }]}>Email</Text>
          <TextInput
            value={profileData.email}
            onChangeText={(text) => setProfileData({ ...profileData, email: text })}
            style={[styles.input, { 
              color: isDark ? '#fff' : '#000',
              backgroundColor: isDark ? '#333' : '#f5f5f5'
            }]}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, { color: isDark ? '#fff' : '#000' }]}>Phone</Text>
          <TextInput
            value={profileData.phone}
            onChangeText={(text) => setProfileData({ ...profileData, phone: text })}
            style={[styles.input, { 
              color: isDark ? '#fff' : '#000',
              backgroundColor: isDark ? '#333' : '#f5f5f5'
            }]}
          />
        </View>
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection title="Notifications" isDark={isDark}>
        <View style={styles.settingRow}>
          <Text style={[styles.settingText, { color: isDark ? '#fff' : '#000' }]}>
            Push Notifications
          </Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notificationsEnabled ? '#007AFF' : '#f4f3f4'}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={[styles.settingText, { color: isDark ? '#fff' : '#000' }]}>
            Email Notifications
          </Text>
          <Switch
            value={emailNotifications}
            onValueChange={setEmailNotifications}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={emailNotifications ? '#007AFF' : '#f4f3f4'}
          />
        </View>
      </SettingsSection>

      {/* Appearance */}
      <SettingsSection title="Appearance" isDark={isDark}>
        <View style={styles.settingRow}>
          <Text style={[styles.settingText, { color: isDark ? '#fff' : '#000' }]}>
            Dark Mode
          </Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={darkMode ? '#007AFF' : '#f4f3f4'}
          />
        </View>
      </SettingsSection>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.updateButton, { backgroundColor: '#007AFF' }]}
          onPress={handleUpdateProfile}
        >
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: isDark ? '#333' : '#f5f5f5' }]}
          onPress={handleLogout}
        >
          <Text style={[styles.logoutButtonText, { color: '#FF3B30' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: "center",
    padding: 20,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarOverlay: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#007AFF",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  sectionContent: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  settingText: {
    fontSize: 16,
  },
  actionsContainer: {
    padding: 16,
    gap: 12,
  },
  updateButton: {
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

