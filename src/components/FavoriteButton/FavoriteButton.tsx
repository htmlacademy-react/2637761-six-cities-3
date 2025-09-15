import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import '../../styles/main.css';

import { getIsFavorite } from '../../store/favorites/selectors';
import { getUserLogged } from '../../store/user/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFavoriteAction } from '../../store/apiActions';
import { FavoriteStatus } from '../../types/place';
import { FavoriteButtonViewType } from '../../types/types';
import { State } from '../../types/store';
import { AppRoute, ICON_SIZES } from '../../const';

type FavoriteButtonProps = {
  placeId: string;
  viewType: FavoriteButtonViewType;
  redirectNavigation?: string;
}

const FavoriteButton = ({ placeId, viewType, redirectNavigation }: FavoriteButtonProps) => {
  const userLogged = useAppSelector(getUserLogged);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const selectIsFavorite = useCallback(
    (state: State) => getIsFavorite(state, placeId),
    [placeId]
  );
  const isFavorite = useSelector(selectIsFavorite);

  const handleChangeFavorite = useCallback(() => {
    if (!userLogged){
      navigate(AppRoute.Login, { state: { from: redirectNavigation } });
    } else {
      setIsLoading(true);

      dispatch(changeFavoriteAction({
        placeId: placeId,
        status: isFavorite ? FavoriteStatus.Removed : FavoriteStatus.Added
      })).then(() => {
        setIsLoading(false);
      });
    }
  }, [dispatch, navigate, placeId, isFavorite, userLogged, redirectNavigation]);

  const { bookmarkClassName: bookmarkClass, iconClassName: iconClass, width: iconWidth, height: iconHeight, buttonLabelText: buttonLabel } = useMemo(() => {
    const bookmarkClassName = classNames(
      'button',
      `${viewType}__bookmark-button`,
      { [`${viewType}__bookmark-button--active`]: isFavorite }
    );

    const iconClassName = `${viewType}__bookmark-icon`;
    const { width, height } = ICON_SIZES[viewType];
    const buttonLabelText = `${isFavorite ? 'In' : 'To'} bookmarks`;

    return {
      bookmarkClassName,
      iconClassName,
      width,
      height,
      buttonLabelText
    };
  }, [viewType, isFavorite]);

  return (
    <button
      className={bookmarkClass}
      type="button"
      disabled={isLoading}
      onClick={handleChangeFavorite}
    >
      <svg
        className={iconClass}
        width={iconWidth}
        height={iconHeight}
        aria-hidden="true"
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{buttonLabel}</span>
    </button>
  );
};

export default FavoriteButton;
