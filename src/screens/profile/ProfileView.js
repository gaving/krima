import React, { Component } from "react";
import PropTypes from "prop-types";

import Config from "../../../config.json";
import { Ionicons } from "@expo/vector-icons";

import { FontIcons } from "../../../assets/icons";

import { Avatar } from "../../components";
import { Map } from "../../components";

import { RkCard, RkStyleSheet, RkText, RkButton } from "react-native-ui-kitten";

import {
  AsyncStorage,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";

import { AppLoading } from "expo";

class ProfileView extends Component {
  static propTypes = {
    focused: PropTypes.bool
  };
  state = {
    isReady: false
  };

  render() {
    const photo = require("../../../assets/img/photo.jpg");

    return (
      <ScrollView style={styles.root}>
        <View style={[styles.header, styles.bordered]}>
          <View style={styles.row}>
            <View style={styles.buttons}>
              <RkButton style={styles.button} rkType="icon circle">
                <RkText rkType="moon large primary">{FontIcons.profile}</RkText>
              </RkButton>
            </View>
            <Avatar img={photo} rkType="big" />
            <View style={styles.buttons}>
              <RkButton style={styles.button} rkType="icon circle">
                <RkText rkType="moon large primary">{FontIcons.mail}</RkText>
              </RkButton>
            </View>
          </View>
          <View style={styles.section}>
            <RkText rkType="header2">Tyler Durden</RkText>
          </View>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.section}>
            <TouchableOpacity onPress={this.props.onPress.bind(this)}>
              <RkText rkType="header3" style={styles.space}>
                4
              </RkText>
            </TouchableOpacity>
            <RkText rkType="secondary1 hintColor">Family</RkText>
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={this.props.onPress.bind(this)}>
              <RkText rkType="header3" style={styles.space}>
                16
              </RkText>
            </TouchableOpacity>
            <RkText rkType="secondary1 hintColor">Associates</RkText>
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={this.props.onPress.bind(this)}>
              <RkText rkType="header3" style={styles.space}>
                3
              </RkText>
            </TouchableOpacity>
            <RkText rkType="secondary1 hintColor">Accomplices</RkText>
          </View>
        </View>
        <Map />
      </ScrollView>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  header: {
    paddingTop: 25,
    paddingBottom: 17
  },
  row: {
    flexDirection: "row"
  },
  userInfo: {
    flexDirection: "row",
    paddingVertical: 18
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base
  },
  section: {
    flex: 1,
    alignItems: "center"
  },
  space: {
    marginBottom: 3
  },
  separator: {
    backgroundColor: theme.colors.border.base,
    alignSelf: "center",
    flexDirection: "row",
    flex: 0,
    width: 1,
    height: 42
  },
  buttons: {
    flex: 1
  },
  button: {
    marginTop: 27.5,
    alignSelf: "center"
  }
}));

export default ProfileView;
