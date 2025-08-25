import {State} from '../../types/store';
import { AuthorizationStatus } from '../../const';
import {SliceSpace} from '../../types/types';

const getAuthStatus = (state: State): AuthorizationStatus => state[SliceSpace.User].authStatus;

export { getAuthStatus };
