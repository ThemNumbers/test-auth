// @flow
import * as React from "react";
import {  } from "native-base";
import { observer, inject } from "mobx-react/native";
import { Platform } from "react-native";
import {
  Container,
  Content,
  Header,
  Body,
  Title,
  Button,
  Text,
  View,
  Icon,
  Item, 
  Input, 
  Form, 
  Toast
} from "native-base";

export interface Props {
	navigation: any;
	loginForm: any;
}
export interface State {}

@inject("loginForm")
@observer
export default class LoginScreen extends React.Component<Props, State> {
	emailInput: any;
	pwdinput: any;
	login() {
		this.props.loginForm.validateForm();
		if (this.props.loginForm.isValid) {
			this.props.loginForm.loginWithFireBase();
			this.props.navigation.navigate("Main");
		} else {
			Toast.show({
				text: "Введите корректный логин и пароль!",
				duration: 2000,
				position: "top",
				textStyle: { textAlign: "center" },
			});
		}
	}

	loginSocials(type) {
		type === 'vk'
		 ? this.props.loginForm.loginWithVK().then(r => {
			if (r) this.props.navigation.navigate("Main")
		 })
		: type === 'fb'
		 ? this.props.loginForm.loginWithFB().then(r => {
			if (r) this.props.navigation.navigate("Main")
		 })
		: type === 'google'
		 ? this.props.loginForm.loginWithGoogle().then(r => {
			if (r) this.props.navigation.navigate("Main")
		 })
		: undefined 
	}

	render() {
		const form = this.props.loginForm;
		return (
			<Container>
			<Header style={{ height: 200 }}>
			<Body style={{ alignItems: "center" }}>
				<Title>Test Auth App</Title>
				<View padder>
				<Text
					style={{ color: Platform.OS === "ios" ? "#000" : "#FFF" }}
				/>
				</View>
			</Body>
			</Header>
			<Content>
			<Form>
			<Item error={form.emailError ? true : false}>
				<Icon active name="person" />
				<Input
				placeholder="Email"
				keyboardType="email-address"
				ref={c => (this.emailInput = c)}
				value={form.email}
				onBlur={() => form.validateEmail()}
				onChangeText={e => form.emailOnChange(e)}
				/>
			</Item>
			<Item error={form.passwordError ? true : false}>
				<Icon active name="unlock" />
				<Input
				placeholder="Password"
				ref={c => (this.pwdinput = c)}
				value={form.password}
				onBlur={() => form.validatePassword()}
				onChangeText={e => form.passwordOnChange(e)}
				secureTextEntry={true}
				/>
			</Item>
			</Form>
			<View padder>
				<Button block onPress={() => this.login()}>
				<Text>Login</Text>
				</Button>
			</View>
			<View style={{ marginTop: 40, flexDirection: 'row', justifyContent: 'center'}}>
				<Icon 
				  onPress={() => this.loginSocials('vk')}
				  style={{
					backgroundColor: '#4a76a8', 
					paddingBottom: 13, 
					paddingTop: 13, 
					marginRight: 20, 
					paddingLeft: 15, 
					paddingRight: 15, 
					alignSelf: 'center', 
					borderRadius: 100, 
					color: 'white'
				  }}
				  name="logo-vk" />
				<Icon 
				  onPress={() => this.loginSocials('fb')}
				  style={{
					backgroundColor: '#4267b2', 
					paddingBottom: 13, 
					paddingTop: 13, 
					marginRight: 20, 
					paddingLeft: 16, 
					paddingRight: 16, 
					alignSelf: 'center', 
					borderRadius: 100, 
					color: 'white'
				  }}
				  name="logo-facebook" />
				<Icon 
				  onPress={() => this.loginSocials('google')}
				  style={{
					backgroundColor: 'red', 
					paddingBottom: 13, 
					paddingTop: 13, 
					paddingLeft: 16, 
					paddingRight: 16, 
					alignSelf: 'center',
					borderRadius: 100, 
					color: 'white'
				  }}
				  name="logo-google" />
			</View>
			</Content>
		</Container>
		)
	}
}
