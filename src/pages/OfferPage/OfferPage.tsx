import '../../styles/main.css';
import Header from '../../components/Header/Header';
import {PlaceViewType} from '../../types/types';
import UserReviews from '../../components/UserReviews/UserReviews';
import PlaceCard from '../../components/PlaceCard/PlaceCard';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';

import {useParams} from 'react-router-dom';

import {getNearPlaces} from '../../mocks/Offers';
import {getOfferDescription} from '../../mocks/OfferDescription';

type OfferRouteParams = {
  id: string;
};

const OfferPage = () => {
  const urlParams = useParams<OfferRouteParams>();
  const placeId = urlParams.id ?? '';

  const currentOffer = getOfferDescription(placeId);
  const nearPlaces = getNearPlaces(placeId);

  const { id, images, isPremium, title, isFavorite, rating, price, type, bedrooms, maxAdults, goods, host, description } = currentOffer!;

  return (
    currentOffer ?
      <div className="page">
        <Header />

        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {images.map((url) => (
                  <div key={url} className="offer__image-wrapper">
                    <img className="offer__image" src={url} alt="Фото отеля"/>
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
                  <button className={`offer__bookmark-button button ${isFavorite ? 'offer__bookmark-button--active' : ''} button`} type="button">
                    <svg className="offer__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">${isFavorite ? 'In' : 'To'}To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span className={`raiting-${Math.round(rating)}-star`}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {maxAdults} adults
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
                      <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Аватар владельца"/>
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
                <UserReviews offerId={id}></UserReviews>
              </div>
            </div>
            <section className="offer__map map"></section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                {nearPlaces.map((place) => <PlaceCard key={place.id} viewType={PlaceViewType.NearPlaces} place={place} onHover={() => {}}></PlaceCard>)}
              </div>
            </section>
          </div>
        </main>
      </div>
      : <NotFoundPage />
  );
};

export default OfferPage;
