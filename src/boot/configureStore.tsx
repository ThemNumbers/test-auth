import LoginStore from "../store/ViewStore/LoginViewStore";

export default function() {
	const loginForm = new LoginStore();

	return {
		loginForm
	};
}
