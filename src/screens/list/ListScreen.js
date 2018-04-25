import React, { Component } from "react";

import {
  ActivityIndicator,
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import { RkText, RkTextInput, RkStyleSheet } from "react-native-ui-kitten";
import { Avatar } from "../../components";

import { Ionicons } from "@expo/vector-icons";
import { Query } from "react-apollo";

import gql from "graphql-tag";

const childrenQuery = gql`
  query findPersonById($id: Int!) {
    person: findPersonById(id: $id) {
      id
      results: children {
        id
        forename
        surname
        city
        latitude
        longitude
      }
    }
  }
`;
const accompliceQuery = gql`
  query findPersonById($id: Int!) {
    person: findPersonById(id: $id) {
      id
      results: accomplices {
        id
        forename
        surname
        city
        latitude
        longitude
      }
    }
  }
`;
class ListScreen extends Component {
  static navigationOptions = {
    title: "List",
    tabBarLabel: "List",
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? "ios-paper" : "ios-paper-outline"}
        size={26}
        style={{ color: tintColor }}
      />
    )
  };
  state = {
    words: [],
    loading: true
  };

  constructor(props) {
    super(props);
    this.renderItem = this._renderItem.bind(this);
  }

  _keyExtractor(item, index) {
    return item.id;
  }

  _renderSeparator() {
    return <View style={styles.separator} />;
  }

  onPress(user) {
    this.props.navigation.navigate("Profile", { id: user.id });
  }

  _renderItem(obj) {
    const user = obj.item;
    let name = `${user.forename} ${user.surname}`;
    let photo = require("../../../assets/img/photo.jpg");
    return (
      <TouchableOpacity onPress={this.onPress.bind(this, user)}>
        <View style={styles.container}>
          <Avatar rkType="circle" style={styles.avatar} img={photo} />
          <View style={styles.content}>
            <View style={styles.contentHeader}>
              <RkText rkType="header5">{name}</RkText>
              <RkText rkType="secondary4 hintColor">{user.country}</RkText>
            </View>
            <RkText
              numberOfLines={2}
              rkType="primary3 mediumLine"
              style={{ paddingTop: 5 }}
            >
              {user.city}
            </RkText>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    // const { id = 100, type = "children" } = this.props;
    const { id, type } = this.props.navigation.state.params;
    const query = type === "children" ? childrenQuery : accompliceQuery;
    console.log(id, type, query);
    return (
      <View>
        <Query query={query} variables={{ id }}>
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
                <FlatList
                  style={styles.root}
                  data={data.person.results}
                  extraData={this.state}
                  ListHeaderComponent={<View />}
                  ItemSeparatorComponent={this._renderSeparator}
                  keyExtractor={this._keyExtractor}
                  renderItem={this.renderItem}
                />
              );
            }
          }}
        </Query>
      </View>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  searchContainer: {
    backgroundColor: theme.colors.screen.bold,
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 60,
    alignItems: "center"
  },
  container: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center"
  },
  avatar: {
    marginRight: 16
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.border.base
  },
  attachment: {
    position: "absolute",
    right: 10
  }
}));

export default ListScreen;
