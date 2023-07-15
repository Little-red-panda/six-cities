import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import type { MainPageProps } from '../../pages/main-page/main-page';
import { AppRoute } from '../../const';

type AppProps = MainPageProps;

function App({offersCount}: AppProps): JSX.Element {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path={AppRoute.Root}
					element={<MainPage offersCount={offersCount} />}
				/>
				<Route
					path={AppRoute.Login}
					element={<LoginPage />}
				/>
				<Route
					path={AppRoute.Favorites}
					element={<FavoritesPage />}
				/>
				<Route
					path={`${AppRoute.Offer}/:offerd`}
					element={<OfferPage />}
				/>
				<Route
					path='*'
					element={<NotFoundPage />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;