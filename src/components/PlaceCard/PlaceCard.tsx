import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import '../../styles/main.css';

import { AppRoute } from '../../const';
import { PlaceCardProps, PlaceViewType } from '../../types/place';
import FavoriteButton from '../FavoriteButton';
import { FavoriteButtonViewType } from '../../types/types';
import { useAppDispatch } from '../../hooks';
import { setActivePlaceId } from '../../store/offers/offers';
import ImageWithFallback from '../ImageWithFallback';


const PlaceCard = ({ viewType, place }: PlaceCardProps) => {
  const dispatch = useAppDispatch();
  const { id, isPremium, rating, previewImage, price, type, title } = place;

  const linkRoute = AppRoute.Offer.replace(':id', id.toString());

  const handleMouseEnter = useCallback(() => {
    if (viewType === PlaceViewType.Cities) {
      dispatch(setActivePlaceId(id));
    }
  }, [dispatch, id, viewType]);

  const handleMouseLeave = useCallback(() => {
    if (viewType === PlaceViewType.Cities) {
      dispatch(setActivePlaceId());
    }
  }, [dispatch, viewType]);

  const favoritesClass = useMemo(() => classNames(
    'place-card__info',
    {
      'favorites__card-info': viewType === PlaceViewType.Favorite
    }
  ), [viewType]);

  const starClassName = classNames(`raiting-${Math.round(rating)}-star`);

  return (
    <article
      className={`${viewType}__card place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={`${viewType}__image-wrapper place-card__image-wrapper`}>
        <Link to={linkRoute}>
          <ImageWithFallback
            className="place-card__image"
            src={previewImage}
            fallbackSrc={'img/placeholder.png'}
            width="260"
            height="200"
            alt="Фото отеля"
          />
        </Link>
      </div>
      <div className={favoritesClass}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <span className="place-card__price-value">&euro;{price}</span>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton placeId={id} viewType={FavoriteButtonViewType.PlaceCard}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span className={starClassName}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={linkRoute}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

export default PlaceCard;
