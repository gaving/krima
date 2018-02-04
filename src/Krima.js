import React, { Component } from "react";

import { StackNavigator, TabNavigator } from "react-navigation";
import { Platform } from "react-native";

import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

import { ListScreen } from "./screens/list";

import { SearchScreen } from "./screens/search";
import { ProfileScreen } from "./screens/profile";
import { bootstrap } from "./theme/bootstrap";
import cacheAssetsAsync from "./utilities/cacheAssetsAsync";

import { AppLoading } from "expo";

const client = new ApolloClient({
  link: createHttpLink({ uri: "http://192.168.1.107:3000/graphql" }),
  cache: new InMemoryCache()
});

const MainNavigator = TabNavigator(
  {
    Search: {
      screen: SearchScreen,
      path: "search",
      params: { id: 0 }
    },
    Profile: {
      screen: ProfileScreen,
      path: "profile/:id",
      params: { id: 100 },
      navigationOptions: {
        header: null
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? "#e91e63" : "#fff"
    },
    initialRouteName: "Profile",
    lazy: true
  }
);

const Navigator = StackNavigator({
  MainNavigator: { screen: MainNavigator },
  List: {
    screen: ListScreen,
    path: "/list/:id"
  }
});

export default class Krima extends Component {
  state = {
    isReady: false
  };
  async _loadAssetsAsync() {
    bootstrap();
    await cacheAssetsAsync({
      images: [],
      fonts: [
        { icomoon: require("../assets/fonts/icomoon.ttf") },
        { "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf") },
        { "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf") },
        { "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf") },
        {
          "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf")
        },
        {
          "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf")
        }
      ]
    });
  }
  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <ApolloProvider client={client}>
        <Navigator
          ref={nav => {
            this.navigator = nav;
          }}
        />
      </ApolloProvider>
    );
  }
}
