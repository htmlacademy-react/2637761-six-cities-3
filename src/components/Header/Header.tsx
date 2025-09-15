import { useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUser, getUserLogged } from '../../store/user/selectors';
import { getFavoritesCount } from '../../store/favorites/selectors';
import { logoutAction } from '../../store/apiActions';
import ImageWithFallback from '../ImageWithFallback';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const favoriteCount = useAppSelector(getFavoritesCount);
  const user = useAppSelector(getUser);
  const userLogged = useAppSelector(getUserLogged);

  const { email, avatarUrl } = useMemo(() => ({
    email: userLogged && user ? user.email : '<empty>',
    avatarUrl: userLogged && user ? user.avatarUrl : undefined
  }), [userLogged, user]);

  const handleLogout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  const handleNavigateToFavorites = useCallback(() => {
    navigate(AppRoute.Favorites);
  }, [navigate]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
              <img className="header__logo" src="img/logo.svg" alt="Логотип сайта 6 cities" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {userLogged ? (
                  <a
                    className="header__nav-link header__nav-link--profile"
                    onClick={handleNavigateToFavorites}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                      <ImageWithFallback
                        className="header__avatar-wrapper user__avatar"
                        src={avatarUrl}
                        fallbackSrc={'img/avatar.svg'}
                        alt="Аватар пользователя"
                        width="54"
                        height="54"
                      />
                    </div>
                    <span className="header__user-name user__name">{email}</span>
                    <span className="header__favorite-count">{favoriteCount}</span>
                  </a>)
                  : (
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  )}
              </li>
              {userLogged &&
                <li className="header__nav-item">
                  <a
                    className="header__nav-link"
                    onClick={handleLogout}
                    role="button"
                  >
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
