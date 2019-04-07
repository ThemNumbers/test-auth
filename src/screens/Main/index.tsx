import * as React from "react";
import { observer, inject } from "mobx-react/native";
import {
  Container,
  Header,
  Title,
  Text,
  Body,
  Right,
  Content,
  Button,
  Icon,
  Left
} from "native-base";

import { Image, View } from "react-native";
import { NavigationActions } from "react-navigation";

export interface Props {
	navigation: any,
	loginForm: any,
}
export interface State {}

const resetAction = NavigationActions.navigate({ routeName: "Login" });

@inject("loginForm")
@observer
export default class MainScreen extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		console.log(this.props.loginForm.name)
		return (
			<Container>
				<Header>
					<Left>
						<Button transparent onPress={() => {
							this.props.loginForm.clearStore()
							this.props.navigation.reset([resetAction], 0)
						}}>
							<Icon name="ios-exit" />
						</Button>
					</Left>

					<Body style={{ flex: 3 }}>
						<Title>Профиль</Title>
					</Body>

					<Right />
				</Header>

				<Content padder>
					<View style={{alignItems: 'center'}}>
						<Text>{this.props.loginForm.name}</Text>
						{this.props.loginForm.photoUrl
							? <Image source={{uri: this.props.loginForm.photoUrl}} style={{height: 200, width: 200, borderRadius: 100}}/>
							: <Text style={{fontSize: 30}}>No Image</Text>}
					</View>
				</Content>
			</Container>
		)
	}
}