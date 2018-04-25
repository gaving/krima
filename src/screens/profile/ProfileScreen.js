import React, { Component } from "react";

import { View } from "react-native";

import { RkStyleSheet } from "react-native-ui-kitten";

import { Ionicons } from "@expo/vector-icons";

import ProfileView from "./ProfileView";

class ProfileScreen extends Component {
  static navigationOptions = {
    tabBarLabel: "Me",
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? "ios-person" : "ios-person-outline"}
        size={26}
        style={{ color: tintColor }}
      />
    )
  };
  onPress(id, type) {
    this.props.navigation.navigate("List", { id, type });
  }
  render() {
    const { params } = this.props.navigation.state;

    return (
      <View style={styles.container}>
        <ProfileView {...params} onPress={this.onPress.bind(this)} />
      </View>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.screen.base
  }
}));

export default ProfileScreen;
