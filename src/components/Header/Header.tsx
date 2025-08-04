import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {getAuthStatus} from '../../mocks/mocks';
import {User} from '../../mocks/User';

const Header = () => {
  let email = '';
  let favoriteCount = 0;
  let avatarUrl = '';

  const authStatus = getAuthStatus();
  const userLogged = authStatus === AuthorizationStatus.Auth;

  if (userLogged){
    email = User.email;
    favoriteCount = User.favoriteCount;
    avatarUrl = User.avatarUrl;
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {userLogged ? (
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                      <img className="header__avatar-wrapper user__avatar" src={avatarUrl} width="54" height="54" alt="Avatar"/>
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
                  <a className="header__nav-link" href="#">
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
