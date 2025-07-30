import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';

type PrivateRouteProps = {
  authStatus: AuthorizationStatus;
  children: JSX.Element;
}

const PrivateRoute = ({authStatus, children}: PrivateRouteProps) => (
  authStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to={AppRoute.Login} />
);

export default PrivateRoute;
