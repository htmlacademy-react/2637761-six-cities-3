import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';

import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/user/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

const PrivateRoute = ({children}: PrivateRouteProps) => {

  const authStatus = useAppSelector(getAuthStatus);

  return (
    authStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
};

export default PrivateRoute;
