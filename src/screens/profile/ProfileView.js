import React, { Component } from "react";
import PropTypes from "prop-types";

import Config from "../../../config.json";
import { Query } from "react-apollo";
import { Ionicons } from "@expo/vector-icons";

import { FontIcons } from "../../../assets/icons";

import { Avatar } from "../../components";
import { Map } from "../../components";

import { RkCard, RkStyleSheet, RkText, RkButton } from "react-native-ui-kitten";

import {
  AsyncStorage,
  ScrollView,
  ActivityIndicator,
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";

import { AppLoading } from "expo";

import gql from "graphql-tag";

const userQuery = gql`
  query findPersonById($id: Int!) {
    person: findPersonById(id: $id) {
      id
      forename
      surname
      city
      latitude
      longitude
      children {
        id
      }
      accomplices {
        id
      }
      totalOffended
      totalWitnessed
      totalSuspected
      totalReported
      totalChildren
      totalAccomplices
    }
  }
`;

class ProfileView extends Component {
  static propTypes = {
    focused: PropTypes.bool
  };
  state = {
    isReady: false
  };

  render() {
    const { id = 100 } = this.props;

    const photo = require("../../../assets/img/photo.jpg");

    return (
      <Query query={userQuery} variables={{ id }}>
        {result => {
          if (!result || result.loading) {
            return <ActivityIndicator />;
          }
          if (result.error) {
            return <ActivityIndicator />;
          }
          if (!result.error) {
            const { data } = result;
            return (
              <ScrollView style={styles.root}>
                <View style={[styles.header, styles.bordered]}>
                  <View style={styles.row}>
                    <View style={styles.buttons}>
                      <RkButton style={styles.button} rkType="icon circle">
                        <RkText rkType="moon large primary">
                          {FontIcons.profile}
                        </RkText>
                      </RkButton>
                    </View>
                    <Avatar img={photo} rkType="big" />
                    <View style={styles.buttons}>
                      <RkButton style={styles.button} rkType="icon circle">
                        <RkText rkType="moon large primary">
                          {FontIcons.mail}
                        </RkText>
                      </RkButton>
                    </View>
                  </View>
                  <View style={styles.section}>
                    <RkText rkType="header2">{`${data.person.forename} ${
                      data.person.surname
                    }`}</RkText>
                  </View>
                </View>
                <View style={styles.userInfo}>
                  <View style={styles.section}>
                    <TouchableOpacity
                      onPress={this.props.onPress.bind(
                        this,
                        data.person.id,
                        "children"
                      )}
                    >
                      <RkText rkType="header3" style={styles.space}>
                        {data.person.totalChildren}
                      </RkText>
                    </TouchableOpacity>
                    <RkText rkType="secondary1 hintColor">Reported</RkText>
                  </View>
                  <View style={styles.section}>
                    <TouchableOpacity
                      onPress={this.props.onPress.bind(
                        this,
                        data.person.id,
                        "accomplices"
                      )}
                    >
                      <RkText rkType="header3" style={styles.space}>
                        {data.person.totalAccomplices}
                      </RkText>
                    </TouchableOpacity>
                    <RkText rkType="secondary1 hintColor">Accomplices</RkText>
                  </View>
                  <View style={styles.section}>
                    <TouchableOpacity onPress={this.props.onPress.bind(this)}>
                      <RkText rkType="header3" style={styles.space}>
                        {data.person.totalWitnessed}
                      </RkText>
                    </TouchableOpacity>
                    <RkText rkType="secondary1 hintColor">Witnessed</RkText>
                  </View>
                </View>
                <Map
                  latitude={data.person.latitude}
                  longitude={data.person.longitude}
                />
              </ScrollView>
            );
          }
        }}
      </Query>
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
