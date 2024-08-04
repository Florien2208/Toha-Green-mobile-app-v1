import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

type InfoItemProps = {
  icon: string;
  label: string;
  value?: string;
};
const ProfilePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileImageContainer}>
          <Image
            source={require("../../assets/blog-1.jpg")}
            style={styles.profileImage}
          />
        </View>

        <View style={styles.infoContainer}>
          <InfoItem icon="person" label="Name" value="John Doe" />
          <InfoItem icon="place" label="Place" value="Coimbatore, Tamil Nadu" />
          <InfoItem icon="water-drop" label="Blood Group" value="O+" />
          <InfoItem icon="person" label="User Type" value="Admin" />
          <InfoItem icon="phone" label="Phone Number" value="+91 99887 76655" />
          <InfoItem
            icon="email"
            label="Email Address"
            value="arjundas@mail.com"
          />
          <InfoItem
            icon="credit-card"
            label="Payment Details"
            value="Visa •••• 8897"
          />
          <InfoItem
            icon="home"
            label="Address"
            value="33, Vikram anand street, Madukkarai, Coimbatore - 632 995 Tamil Nadu"
          />
          <InfoItem icon="person" label="Name" value="John Doe" />
          <InfoItem icon="place" label="Place" value="Coimbatore, Tamil Nadu" />
          <InfoItem icon="water-drop" label="Blood Group" value="O+" />
          <InfoItem icon="person" label="User Type" value="Admin" />
          <InfoItem icon="phone" label="Phone Number" value="+91 99887 76655" />
          <InfoItem
            icon="email"
            label="Email Address"
            value="arjundas@mail.com"
          />
          <InfoItem
            icon="credit-card"
            label="Payment Details"
            value="Visa •••• 8897"
          />
          <InfoItem
            icon="home"
            label="Address"
            value="33, Vikram anand street, Madukkarai, Coimbatore - 632 995 Tamil Nadu"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
  <View style={styles.infoItem}>
    <Icon name={icon} size={24} color="#4CAF50" style={styles.infoIcon} />
    <View style={styles.infoTextContainer}>
      <Text style={styles.infoLabel}>{label}</Text>
      {value && <Text style={styles.infoValue}>{value}</Text>}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    padding: 45,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  editButtonText: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  scrollContent: {
    flexGrow: 1,
  },
  profileImageContainer: {
    marginLeft: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  profileImage: {
    width: 110,
    height: 90,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "white",
  },
  infoContainer: {
    padding: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  infoIcon: {
    marginTop: 2,
  },
  infoTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  infoLabel: {
    color: "#757575",
    fontSize: 14,
  },
  infoValue: {
    color: "#212121",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default ProfilePage;
