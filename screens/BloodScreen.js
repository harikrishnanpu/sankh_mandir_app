import {
  Alert,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import MaterialsIcon from "react-native-vector-icons/MaterialCommunityIcons";

const BloodScreen = () => {
  const [snap, setSnap] = useState([]);

  useEffect(() => {
    const getSnap = async () => {
      const querySnapshot = await getDocs(collection(db, "Users"));
      querySnapshot.forEach((doc) => {
        setSnap((prev) => [...prev, doc.data()]);
      });
    };
    getSnap();
  }, []);

  const needBlood = () => {
    Alert.alert(
      "Are You Sure Want Blood",
      "Namaste, Click Want Blood Button To Continue",
      [
        {
          text: "Want Blood",
          onPress: () => Linking.openURL("tel:7306899364"),
        },
        { text: "Cancel", onPress: () => console.log("Cancel Pressed") },
      ]
    );
  };

  return (
    <SafeAreaView style={{ height: "98%" }}>
      <View style={styles.container}>
        <Image style={styles.image} source={require("../assets/logo1`.png")} />
        <Text style={styles.title}>Swayam Sewakers Tvndr</Text>
        <Text style={styles.subTitle}>
          Contact Our HelpLine Number:{" "}
          <Text
            onPress={() => Linking.openURL("tel:7306899364")}
            style={{ color: "orange" }}
          >
            7306899364
          </Text>
        </Text>
        <Text style={styles.subTitle}>
          Rss Thiruvanvandoor Blood Donating Programme. You Can Directly Contact
          The Blood Donater By Clicking The Status Button{" "}
        </Text>
        <Image
          style={styles.image1}
          source={require("../assets/blood12.png")}
        />
        <MaterialsIcon
          name="heart-pulse"
          size={40}
          color="red"
          style={{ position: "absolute", left: "16%", top: "32%" }}
        />
        <MaterialsIcon
          name="heart-circle-outline"
          size={40}
          color="#fa5a5b"
          style={{ position: "absolute", right: 8, top: 8 }}
        />
      </View>
      <View style={styles.donatersBanner}>
        <Text style={styles.text}>Name</Text>
        <Text style={styles.text}>Phone Number</Text>
        <Text style={styles.text}>Blood Group</Text>
        <Text style={styles.text}>Status</Text>
      </View>
      <ScrollView style={styles.scroll}>
        {snap.map((doc) => (
          <View style={styles.donaters}>
            <Text style={styles.text} key={Date.now()}>
              {doc.name}
            </Text>
            <Text style={styles.text} key={Date.now()}>
              {doc.phone.slice(3, -6)}XXXXX
            </Text>
            <Text style={styles.text} key={Date.now()}>
              {doc.blood}
            </Text>
            {doc.status == "Active" ? (
              <Text
                style={styles.status}
                key={Date.now()}
                onPress={() => needBlood()}
              >
                <MaterialsIcon color={"green"} name="heart-plus" size={30} />
              </Text>
            ) : (
              <Text
                style={styles.status}
                key={Date.now()}
                onPress={() =>
                  Alert.alert(
                    "Not Active",
                    "Sorry, This Person's Status Is Not Active.You Can Contact Another Person Or Our Helpline For More Details...",
                    [
                      {
                        text: "Contact",
                        onPress: () => Linking.openURL("tel:7306899364"),
                      },
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                      },
                    ]
                  )
                }
              >
                <MaterialsIcon color={"red"} name="heart-off" size={30} />
              </Text>
            )}
          </View>
        ))}
        <View style={styles.donaters}>
          <Text style={styles.subTitle}>
            Do Not See Blood Group Contact Our HelpLine For More Informations{" "}
            <Text
              onPress={() => Linking.openURL("tel:7306899364")}
              style={{ color: "orange" }}
            >
              Contact Now
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BloodScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
    height: "auto",
    width: "96%",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    borderRadius: 10,
    padding: 20,
  },
  image: {
    width: 200,
    height: 90,
    margin: 5,
  },
  image1: {
    width: 50,
    height: 130,
    margin: 5,
    position: "absolute",
    left: 5,
    top: "25%",
    zIndex: 1000,
  },
  title: {
    color: "#fa5a5a",
    fontSize: 18,
    fontWeight: "600",
    margin: 6,
    textAlign: "center",
  },
  subTitle: {
    color: "white",
    fontSize: 10,
    fontWeight: "400",
    margin: 3,
    textAlign: "center",
  },
  text: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    margin: 4,
    textAlign: "center",
  },
  donaters: {
    backgroundColor: "grey",
    margin: 3,
    borderRadius: 8,
    padding: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  donatersBanner: {
    backgroundColor: "grey",
    margin: 8,
    borderRadius: 8,
    padding: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scroll: {
    margin: 5,
    height: "75%",
  },
  status: {
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    padding: 2,
  },
});
