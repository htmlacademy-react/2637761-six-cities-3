import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import '../../styles/main.css';

import { FavoriteButtonViewType, MapViewType } from '../../types/types';
import { PlaceViewType } from '../../types/place';
import { fetchOfferViewAction } from '../../store/apiActions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { offerPageSelector } from '../../store/offers/selectors';
import Header from '../../components/Header';
import UserReviews from '../../components/UserReviews';
import PlaceCard from '../../components/PlaceCard';
import NotFoundPage from '../../pages/NotFoundPage';
import PlaceMap from '../../components/PlaceMap';
import FavoriteButton from '../../components/FavoriteButton';
import Loader from '../../components/Loader';
import ImageWithFallback from '../../components/ImageWithFallback';
import { AppRoute } from '../../const';
import { setActivePlaceId } from '../../store/offers/offers';


type OfferRouteParams = {
  id: string;
};

const OfferPage = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const { currentOffer, nearPlaces } = useAppSelector(offerPageSelector);

  const urlParams = useParams<OfferRouteParams>();
  const placeId = urlParams.id ?? '';

  useEffect(() => {
    dispatch(fetchOfferViewAction(placeId)).then(() => {
      dispatch(setActivePlaceId(placeId));
      setIsLoading(false);
    });
  }, [dispatch, placeId]);

  if (isLoading) {
    return (
      <Loader />
    );
  }

  if (!currentOffer) {
    return <NotFoundPage />;
  }

  const { images, isPremium, title, rating, price, type, bedrooms, maxAdults, goods, host, description, city } = currentOffer;

  const starClassName = classNames(`raiting-${Math.round(rating)}-star`);

  const bedroomsText = `${bedrooms} Bedroom${bedrooms !== 1 ? 's' : ''}`;
  const adultsText = `Max ${maxAdults} adult${maxAdults !== 1 ? 's' : ''}`;
  const redirectNavigation = AppRoute.Offer.replace(':id', placeId);
  const mapNearPlaces = [...nearPlaces];
  mapNearPlaces.push(currentOffer);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.slice(0, 6).map((url) => (
                <div key={url} className="offer__image-wrapper">
                  <ImageWithFallback
                    className="offer__image"
                    src={url}
                    fallbackSrc={'img/placeholder.png'}
                    alt="Фото отеля"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <FavoriteButton
                  placeId={placeId}
                  viewType={FavoriteButtonViewType.Offer}
                  redirectNavigation={redirectNavigation}
                />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span className={starClassName}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedroomsText}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {adultsText}
                </li>
              </ul>
              <div className="offer__price">
                <span className="offer__price-value">&euro;{price}</span>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((item) => (
                    <li key={item} className="offer__inside-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <ImageWithFallback
                      className="offer__avatar user__avatar"
                      src={host.avatarUrl}
                      fallbackSrc={'img/avatar.svg'}
                      width="74"
                      height="74"
                      alt="Аватар владельца"
                    />
                  </div>
                  <span className="offer__user-name">
                    {host.name}
                  </span>
                  <span className="offer__user-status">
                    {host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {description}
                  </p>
                  <p className="offer__text">
                    An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <UserReviews/>
            </div>
          </div>
          <PlaceMap viewType={MapViewType.Offer} city={city} places={mapNearPlaces}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearPlaces.map((place) => <PlaceCard key={place.id} viewType={PlaceViewType.NearPlaces} place={place}></PlaceCard>)}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default OfferPage;
