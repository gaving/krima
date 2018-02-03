import React from "react";
import { Dimensions, ScrollView, View, StyleSheet } from "react-native";
import { MapView } from "expo";

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE = 55.953056;
const LONGITUDE = -3.188889;
const LATITUDE_DELTA = 0.0322;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <MapView
            style={styles.map}
            scrollEnabled={true}
            zoomEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true}
            initialRegion={this.state.region}
          >
            <MapView.Marker
              title="This is a title"
              description="This is a description"
              coordinate={this.state.region}
            />
          </MapView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "center"
  },
  scrollView: {
    alignItems: "center"
  },
  map: {
    width: SCREEN_WIDTH,
    height: 350
  }
});
