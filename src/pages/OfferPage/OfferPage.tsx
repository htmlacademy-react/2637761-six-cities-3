import '../../styles/main.css';
import Header from '../../components/Header/Header';
import {PlaceViewType} from '../../types/types';
import PlaceCard from '../../components/PlaceCard/PlaceCard';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import {AuthorizationStatus} from '../../const';
import {useParams} from 'react-router-dom';

import {placeData} from '../../mocks/mocks';

type OfferRouteParams = {
  id: string;
};

type OfferPageProps = {
  authStatus: AuthorizationStatus;
}

function OfferPage({ authStatus }: OfferPageProps) {
  const urlParams = useParams<OfferRouteParams>();
  const placeId = urlParams.id ? parseFloat(urlParams.id) : null;
  const offer = placeData.find((r) => r.id === placeId);
  const nearPlaces = placeData.slice(0, 3);

  const userLogged = authStatus === AuthorizationStatus.Auth;

  return (
    offer ?
      <div className="page">
        <Header authStatus={authStatus}/>

        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                <div className="offer__image-wrapper">
                  <img className="offer__image" src="img/room.jpg" alt="Photo studio"/>
                </div>
                <div className="offer__image-wrapper">
                  <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio"/>
                </div>
                <div className="offer__image-wrapper">
                  <img className="offer__image" src="img/apartment-02.jpg" alt="Photo studio"/>
                </div>
                <div className="offer__image-wrapper">
                  <img className="offer__image" src="img/apartment-03.jpg" alt="Photo studio"/>
                </div>
                <div className="offer__image-wrapper">
                  <img className="offer__image" src="img/studio-01.jpg" alt="Photo studio"/>
                </div>
                <div className="offer__image-wrapper">
                  <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio"/>
                </div>
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {offer.isPremium &&
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {offer.title}
                  </h1>
                  <button className={`offer__bookmark-button button ${offer.isFavorite ? 'offer__bookmark-button--active' : ''} button`} type="button">
                    <svg className="offer__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">${offer.isFavorite ? 'In' : 'To'}To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span className={`raiting-${Math.round(offer.rating)}-star`}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{offer.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    Apartment
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    3 Bedrooms
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max 4 adults
                  </li>
                </ul>
                <div className="offer__price">
                  <span className="offer__price-value">&euro;{offer.price}</span>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    <li className="offer__inside-item">
                      Wi-Fi
                    </li>
                    <li className="offer__inside-item">
                      Washing machine
                    </li>
                    <li className="offer__inside-item">
                      Towels
                    </li>
                    <li className="offer__inside-item">
                      Heating
                    </li>
                    <li className="offer__inside-item">
                      Coffee machine
                    </li>
                    <li className="offer__inside-item">
                      Baby seat
                    </li>
                    <li className="offer__inside-item">
                      Kitchen
                    </li>
                    <li className="offer__inside-item">
                      Dishwasher
                    </li>
                    <li className="offer__inside-item">
                      Cabel TV
                    </li>
                    <li className="offer__inside-item">
                      Fridge
                    </li>
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar"/>
                    </div>
                    <span className="offer__user-name">
                      Angelina
                    </span>
                    <span className="offer__user-status">
                      Pro
                    </span>
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                    </p>
                    <p className="offer__text">
                      An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                    </p>
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
                  <ul className="reviews__list">
                    <li className="reviews__item">
                      <div className="reviews__user user">
                        <div className="reviews__avatar-wrapper user__avatar-wrapper">
                          <img className="reviews__avatar user__avatar" src="img/avatar-max.jpg" width="54" height="54" alt="Reviews avatar"/>
                        </div>
                        <span className="reviews__user-name">
                          Max
                        </span>
                      </div>
                      <div className="reviews__info">
                        <div className="reviews__rating rating">
                          <div className="reviews__stars rating__stars">
                            <span className="raiting-4-star"></span>
                            <span className="visually-hidden">Rating</span>
                          </div>
                        </div>
                        <p className="reviews__text">
                          A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                        </p>
                        <time className="reviews__time" dateTime="2019-04-24">April 2019</time>
                      </div>
                    </li>
                  </ul>
                  {userLogged &&
                    <form className="reviews__form form" action="#" method="post">
                      <label className="reviews__label form__label" htmlFor="review">Your review</label>
                      <div className="reviews__rating-form form__rating">
                        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"/>
                        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                          <svg className="form__star-image" width="37" height="33">
                            <use xlinkHref="#icon-star"></use>
                          </svg>
                        </label>

                        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"/>
                        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
                          <svg className="form__star-image" width="37" height="33">
                            <use xlinkHref="#icon-star"></use>
                          </svg>
                        </label>

                        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"/>
                        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
                          <svg className="form__star-image" width="37" height="33">
                            <use xlinkHref="#icon-star"></use>
                          </svg>
                        </label>

                        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"/>
                        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
                          <svg className="form__star-image" width="37" height="33">
                            <use xlinkHref="#icon-star"></use>
                          </svg>
                        </label>

                        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"/>
                        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
                          <svg className="form__star-image" width="37" height="33">
                            <use xlinkHref="#icon-star"></use>
                          </svg>
                        </label>
                      </div>
                      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
                      <div className="reviews__button-wrapper">
                        <p className="reviews__help">
                          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                        </p>
                        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
                      </div>
                    </form>}
                </section>
              </div>
            </div>
            <section className="offer__map map"></section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                {nearPlaces.map((place) => <PlaceCard key={`${place.id}_${place.cityId}`} viewType={PlaceViewType.NearPlaces} place={place}></PlaceCard>)}
              </div>
            </section>
          </div>
        </main>
      </div>
      : <NotFoundPage />
  );
}

export default OfferPage;
