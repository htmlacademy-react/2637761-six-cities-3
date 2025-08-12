import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';

import { useAppSelector } from '../../hooks';
import { selectAuthStatus } from '../../store/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

const PrivateRoute = ({children}: PrivateRouteProps) => {

  const authStatus = useAppSelector(selectAuthStatus);

  return (
    authStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
};

export default PrivateRoute;
