import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AppRoute } from '../../const';

import MainPage from '../../pages/MainPage/MainPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import OfferPage from '../../pages/OfferPage/OfferPage';
import FavoritesPage from '../../pages/FavoritesPage/FavoritesPage';
import PrivateRoute from '../PrivateRote/PrivateRoute';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoute.Main} element={<MainPage />} />
      <Route path={AppRoute.Login} element={<LoginPage />} />
      <Route path={AppRoute.Favorites}
        element={
          <PrivateRoute>
            <FavoritesPage />
          </PrivateRoute>
        }
      />
      <Route path={AppRoute.Offer} element={<OfferPage/>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <ToastContainer />
  </BrowserRouter>
);

export default App;
