import {Link} from 'react-router-dom';
import {UserData} from '../../types/types.ts';
import {AppRoute, AuthorizationStatus} from '../../const';

type HeaderProps = {
  authStatus: AuthorizationStatus;
  userData?: UserData;
}

function Header({ authStatus, userData }: HeaderProps) {
  let defaultUserData: UserData = {
    favoriteCount: 3,
    userEmail: 'Oliver.conner@gmail.com'
  };

  const userLogged = authStatus === AuthorizationStatus.Auth;

  if (userLogged && userData){
    defaultUserData = userData;
  }

  const { favoriteCount, userEmail } = defaultUserData;

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
                    </div>
                    <span className="header__user-name user__name">{userEmail}</span>
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
}

export default Header;
