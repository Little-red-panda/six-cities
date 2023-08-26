import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';

export function LoginForm() {
	const [AuthInfo, setAuthInfo] = useState({ login: '', password: '' });
	const dispatch = useAppDispatch();

	const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]+$/;
	const isValidPassword = passwordRegex.test(AuthInfo.password);
	const isNeedDisable = !AuthInfo.login || !isValidPassword;

	const handleLoginChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setAuthInfo({ ...AuthInfo, login: evt.target.value });
	};

	const handlePasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setAuthInfo({ ...AuthInfo, password: evt.target.value });
	};

	const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		dispatch(
			loginAction({
				login: AuthInfo.login,
				password: AuthInfo.password,
			})
		);
	};

	return (
		<form
			className="login__form form"
			action=""
			method="post"
			onSubmit={handleSubmit}
		>
			<div className="login__input-wrapper form__input-wrapper">
				<label className="visually-hidden">E-mail</label>
				<input
					value={AuthInfo.login}
					onChange={handleLoginChange}
					className="login__input form__input"
					type="email"
					name="email"
					placeholder="Email"
					required
				/>
			</div>
			<div className="login__input-wrapper form__input-wrapper">
				<label className="visually-hidden">Password</label>
				<input
					value={AuthInfo.password}
					onChange={handlePasswordChange}
					className="login__input form__input"
					type="password"
					name="password"
					placeholder="Password"
					required
				/>
			</div>
			<button
				className="login__submit form__submit button"
				type="submit"
				disabled={isNeedDisable}
			>
				Sign in
			</button>
			{isNeedDisable && AuthInfo.password !== '' && (
				<p style={{ color: 'red' }}>
					Password must contain at least one number and one letter
				</p>
			)}
		</form>
	);
}