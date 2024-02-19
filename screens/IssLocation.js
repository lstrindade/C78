import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  Alert,
  Platform,
  Image,
} from "react-native";

export default class IssLocationScreen extends Component {
  getIssLocation = () => {
    axios
      .get("https://api.wheretheiss.at/v1/satellites/25544")
      .then((response) => {
        this.setState({ location: response.data });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView styles={styles.droidSafeArea} />
        <ImageBackground
          source={require("../assets/bg.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}> Tela de Localização da EEI! </Text>
          </View>

          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              region={{
                latitude: this.state.location.latitude,
                longitude: this.state.location.longitude,
              }}
            >
              <Marker
                coordinate={{
                  latitude: this.state.location.latitude,
                  longitude: this.state.location.longitude,
                }}
              >
                <Image
                  source={require("../assets/iss_icon.png")}
                  style={{ width: 50, height: 50 }}
                />
              </Marker>
            </MapView>
          </View>
          <View style={styles.infoContainer}>
            
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  titleContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },

  mapContainer: {
    flex: 0.6,
  },
  map: {
    width: "100%",
    height: "100%",
  },

  infoContainer: {
    flex: 0.2,
    backgroundColor: "white",
    marginTop: -10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
  },
  infoText: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
});
