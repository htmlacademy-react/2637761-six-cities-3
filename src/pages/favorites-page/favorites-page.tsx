import Header from '../../components/header/header.tsx';
import Footer from '../../components/footer/footer.tsx';

import {City, IOffer} from '../../types/types.ts';
import {cityData} from '../../store/city-data/city-data.ts';
import {offerData} from '../../store/offer-data/offer-data.ts';
import FavoriteCard from '../../components/favorite-card/favorite-card.tsx';

type FavoriteCityOffers = {
  city: City;
  offers: IOffer[];
}

const mapFavorites = (offers: IOffer[]) => offers.map((offer) => FavoriteCard(offer));

const emptyFavorites = () => (
  <section className="favorites favorites--empty">
    <h1 className="visually-hidden">Favorites (empty)</h1>
    <div className="favorites__status-wrapper">
      <b className="favorites__status">Nothing yet saved.</b>
      <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
    </div>
  </section>
);

const existingFavorites = (favorites: FavoriteCityOffers[]) => (
  <section className="favorites">
    <h1 className="favorites__title">Saved listing</h1>
    <ul className="favorites__list">
      {favorites.map(({city, offers}) => (
        <li key={city.cityId} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city.cityName}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">{mapFavorites(offers)}</div>
        </li>
      ))}
    </ul>
  </section>
);

function FavoritesPage() {

  const userLogged = false;

  const favorites: FavoriteCityOffers[] = cityData
    .map((city) => {
      const matchingItem = offerData.filter((offer) => offer.cityId === city.cityId && offer.isFavorite);
      return matchingItem.length > 0 ? { city: city, offers: matchingItem } : null;
    })
    .filter((item): item is FavoriteCityOffers => item !== null);

  const favoritesEmpty = favorites.length === 0;

  return (
    <div className="page">
      <Header userLogged={userLogged}/>

      <main className={`page__main page__main--favorites ${favoritesEmpty ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          {favoritesEmpty ? emptyFavorites() : existingFavorites(favorites)}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default FavoritesPage;
