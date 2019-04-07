import React from "react";
import { createStackNavigator } from "react-navigation";
import { Root } from "native-base";

import LoginScreen from "./screens/Login";
import MainScreen from "./screens/Main";

const App = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    Main: { screen: MainScreen }
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);

export default () => (
  <Root>
    <App />
  </Root>
);
