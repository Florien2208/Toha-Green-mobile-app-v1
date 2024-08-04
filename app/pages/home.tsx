import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TreeCardProps {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  isFavorite: boolean;
}
const TreeCard: React.FC<TreeCardProps> = ({
  name,
  price,
  description,
  imageUrl,
  isFavorite,
}) => (
  <View style={styles.card}>
    <Image source={{ uri: imageUrl }} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <Text style={styles.treeName}>{name}</Text>
      <Text style={styles.treePrice}>Rs.{price.toLocaleString()}</Text>
      <Text style={styles.treeDescription}>{description}</Text>
      <TouchableOpacity style={styles.moreDetailsButton}>
        <Text style={styles.moreDetailsText}>More Details</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.favoriteButton}>
      <Ionicons
        name={isFavorite ? "heart" : "heart-outline"}
        size={24}
        color={isFavorite ? "red" : "black"}
      />
    </TouchableOpacity>
  </View>
);

const IdentiTreeApp = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="leaf" size={24} color="white" />
        <Text style={styles.headerText}>IDENTI-TREE</Text>
      </View>
      <Text style={styles.subHeader}>
        Embrace the verdant revolution. Cultivate your green destiny, and join
        us in planting the seeds for a thriving eco-world.
      </Text>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={24}
          color="gray"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="gray"
        />
      </View>
      <ScrollView style={styles.cardContainer}>
        <View style={styles.row}>
          <TreeCard
            name="Hora Tree"
            price={1500}
            description="A tropical forest tree that is also known as the king's tree. It can grow up to 45 m tall with a trunk up to 40 meters tall and 2-7 meters in girth."
            imageUrl="https://www.garden.eco/wp-content/uploads/2017/12/bean-leaves.jpg"
            isFavorite={true}
          />
          <TreeCard
            name="Teak Tree"
            price={2000}
            description="It is a large, deciduous tree that occurs in mixed hardwood forests. It has small, fragrant white flowers and large papery leaves that are often hairy on the lower surface."
            imageUrl="https://www.garden.eco/wp-content/uploads/2017/12/bean-leaves.jpg"
            isFavorite={false}
          />
        </View>
        <View style={styles.row}>
          <TreeCard
            name="Mahogany"
            price={750}
            description="Straight-grained, reddish-brown timber of three tropical hardwood species of the genus Swietenia, indigenous to the Americas and part of the pantropical chinaberry family, Meliaceae."
            imageUrl="https://www.garden.eco/wp-content/uploads/2017/12/bean-leaves.jpg"
            isFavorite={false}
          />
          <TreeCard
            name="Banyan Tree"
            price={3000}
            description="A banyan, also spelled banian, is a fig that develops accessory trunks from its branches. The branches grow aerial roots that grow downward as pillar roots. These merge with the main trunk."
            imageUrl="https://www.garden.eco/wp-content/uploads/2017/12/bean-leaves.jpg"
            isFavorite={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    backgroundColor: "#2e7d32",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  subHeader: {
    padding: 15,
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
    margin: 10,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  cardContainer: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
    width: "48%", // Each card will take up half of the parent view width with some margin
  },
  cardImage: {
    width: "100%",
    height: 150,
  },
  cardContent: {
    padding: 15,
  },
  treeName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  treePrice: {
    fontSize: 16,
    color: "#2e7d32",
    marginTop: 5,
  },
  treeDescription: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  moreDetailsButton: {
    backgroundColor: "#2e7d32",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  moreDetailsText: {
    color: "white",
    fontWeight: "bold",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 5,
  },
});

export default IdentiTreeApp;
