import { observable, action } from "mobx";
import * as firebase from 'firebase'
import Expo from "expo"
import { Facebook } from 'expo';

class LoginStore {
  @observable email = "";
  @observable password = "";
  @observable isValid = false;
  @observable emailError = "";
  @observable passwordError = "";
  @observable name = '';
  @observable photoUrl = '';
  @observable loggedIn = false;

  @action
  emailOnChange(id) {
    this.email = id;
    this.validateEmail();
  }

  @action
  validateEmail() {
    const emailPatter = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const required = this.email ? undefined : "Required";
    this.emailError = required
      ? required
      : emailPatter.test(this.email) ? undefined : "Invalid email address";
  }

  @action
  passwordOnChange(pwd) {
    this.password = pwd;
    this.validatePassword();
  }

  @action
  validatePassword() {
    const alphaNumeric = /[^a-zA-Z0-9 ]/i.test(this.password)
      ? "Only alphanumeric characters"
      : undefined;
    const maxLength =
      this.password.length > 15 ? "Must be 15 characters or less" : undefined;
    const minLength =
      this.password.length < 8 ? "Must be 8 characters or more" : undefined;
    const required = this.password ? undefined : "Required";
    this.passwordError = required
      ? required
      : alphaNumeric ? alphaNumeric : maxLength ? maxLength : minLength;
  }

  @action
  validateForm() {
    if (this.emailError === undefined && this.passwordError === undefined) {
      this.isValid = true;
    }
  }

  @action
  loginWithFireBase() {

    const firebaseConfig = {
      apiKey: "AIzaSyCOroDOzuLCbqAwcoRz-LeVk_QqP4pLNuY",
      authDomain: "test-auth-71147",
      databaseURL: "https://test-auth-71147.firebaseio.com",
      storageBucket: "test-auth-71147.appspot.com"
    };
    
    firebase.initializeApp(firebaseConfig);

    this.name = this.email

    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)

  }

  @action
  loginWithVK() {
    console.log('login vk')
  }

  @action
  loginWithFB = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('278792199722618', {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        const userInfo = await response.json()
        this.name = userInfo.name
        this.photoUrl = userInfo.picture.data.url
        this.loggedIn = true
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      console.log('Error')
    }
    if (this.name.length > 0) return 'success'
    else return null
  }

  @action
  loginWithGoogle = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: '780661611757-cihhhp32qjp8kh2veqmkr8bifkpaf7h8.apps.googleusercontent.com',
        scopes: ["profile", "email"]
      })
      if (result.type === "success") {
          this.name = result.user.name,
          this.photoUrl = result.user.photoUrl
          this.loggedIn = true
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
    if (this.name.length > 0) return 'success'
    else return null
  }
  

  @action
  clearStore() {
    this.email = "";
    this.isValid = false;
    this.emailError = "";
    this.password = "";
    this.passwordError = "";
    this.name = ""
    this.photoUrl = ""
    this.loggedIn = false
  }
}

export default LoginStore;
