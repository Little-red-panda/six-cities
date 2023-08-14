import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { ServerOffer } from '../types/offer';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { loadOffers, requireAuthorization, setError, setOffersLoadingStatus } from './actions';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { store } from './';

export const clearErrorAction = createAsyncThunk(
	'game/clearError',
	() => {
		setTimeout(
			() => store.dispatch(setError(null)),
			TIMEOUT_SHOW_ERROR,
		);
	},
);

export const fetchOffersAction = createAsyncThunk<
	void,
	undefined,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>('data/fetchOffersAction', async (_arg, { dispatch, extra: api }) => {
	dispatch(setOffersLoadingStatus(true));
	const { data } = await api.get<ServerOffer[]>(APIRoute.Offers);
	dispatch(setOffersLoadingStatus(false));
	dispatch(loadOffers(data));
});

export const checkAuthAction = createAsyncThunk<void, undefined, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	'user/checkAuth',
	async (_arg, {dispatch, extra: api}) => {
		try {
			await api.get(APIRoute.Login);
			dispatch(requireAuthorization(AuthorizationStatus.Auth));
		} catch {
			dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
		}
	},
);

export const loginAction = createAsyncThunk<void, AuthData, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	'user/login',
	async ({login: email, password}, {dispatch, extra: api}) => {
		const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
		saveToken(token);
		dispatch(requireAuthorization(AuthorizationStatus.Auth));
	},
);

export const logoutAction = createAsyncThunk<void, undefined, {
	dispatch: AppDispatch;
	state: State;
	extra: AxiosInstance;
}>(
	'user/logout',
	async (_arg, {dispatch, extra: api}) => {
		await api.delete(APIRoute.Logout);
		dropToken();
		dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
	},
);