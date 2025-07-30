import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';

import MainPage from '../../pages/MainPage/MainPage';
import { MainPageProps } from '../../pages/MainPage/MainPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import OfferPage from '../../pages/OfferPage/OfferPage';
import FavoritesPage from '../../pages/FavoritesPage/FavoritesPage';
import PrivateRoute from '../PrivateRote/PrivateRoute';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';

function App({ mainPageData, authStatus }: MainPageProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage mainPageData={mainPageData} authStatus={authStatus}/>} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Favorites}
          element={
            <PrivateRoute authStatus={authStatus}>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Offer} element={<OfferPage authStatus={authStatus}/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
