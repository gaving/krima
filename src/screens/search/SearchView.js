import React from "react";
import {
  Text,
  FlatList,
  ActivityIndicator,
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import _ from "lodash";
import { RkStyleSheet, RkText, RkTextInput } from "react-native-ui-kitten";
import { Avatar } from "../../components";
import { Query } from "react-apollo";
import { Ionicons } from "@expo/vector-icons";

let moment = require("moment");

import gql from "graphql-tag";

const movieQuery = gql`
  query findPerson($forename: String!) {
    people: findPerson(forename: $forename) {
      forename
      surname
      city
      country
    }
  }
`;

class SearchView extends React.Component {
  constructor(props) {
    super(props);
    this.renderItem = this._renderItem.bind(this);
    this.state = {
      text: "",
      data: []
    };
  }

  componentDidMount() {
    this.chats = [];
    this.setState({
      data: this.chats
    });
  }

  _filter(text) {
    this.setState({
      text
    });
  }

  _keyExtractor(item, index) {
    return item;
  }

  _renderSeparator() {
    return <View style={styles.separator} />;
  }

  _renderItem(obj) {
    const user = obj.item;
    let name = `${user.forename} ${user.surname}`;
    let photo = require("../../../assets/img/photo.jpg");
    return (
      <TouchableOpacity onPress={this.props.onPress.bind(this)}>
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
    const { text } = this.state;
    return (
      <View>
        <View style={styles.searchContainer}>
          <RkTextInput
            autoCapitalize="none"
            autoCorrect={false}
            onChange={event => this._filter(event.nativeEvent.text)}
            label={<Ionicons name="md-search" />}
            rkType="row"
            placeholder="Search"
          />
        </View>
        <Query query={movieQuery} variables={{ forename: text }}>
          {result => {
            console.log(result);

            if (!result || result.loading) {
              return <ActivityIndicator />;
            }

            if (!result.error) {
              const { data } = result;

              return (
                <FlatList
                  style={styles.root}
                  data={data.people}
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

let styles = RkStyleSheet.create(theme => ({
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
    paddingLeft: 19,
    paddingRight: 16,
    paddingBottom: 12,
    paddingTop: 10,
    flexDirection: "row"
  },
  content: {
    marginLeft: 16,
    flex: 1
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.border.base
  }
}));

export default SearchView;
