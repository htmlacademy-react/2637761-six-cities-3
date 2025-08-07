import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';

import {getAuthStatus} from '../../mocks/mocks';

type PrivateRouteProps = {
  children: JSX.Element;
}

const PrivateRoute = ({children}: PrivateRouteProps) => {

  const authStatus = getAuthStatus();

  return (
    authStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
};

export default PrivateRoute;
