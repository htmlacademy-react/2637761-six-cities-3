import classNames from 'classnames';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import {PlaceViewType} from '../../types/place';
import PlaceCard from '../../components/PlaceCard/PlaceCard';
import { City } from '../../types/city';
import { IPlace } from '../../types/place';

import { useAppSelector } from '../../hooks';
import { getAllCities, getFavorites } from '../../store/offers/selectors';

type FavoriteCityPlaces = {
  city: City;
  places: IPlace[];
}

const emptyFavorites = () => (
  <section className="favorites favorites--empty">
    <h1 className="visually-hidden">Favorites (empty)</h1>
    <div className="favorites__status-wrapper">
      <b className="favorites__status">Nothing yet saved.</b>
      <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
    </div>
  </section>
);

const existingFavorites = (favorites: FavoriteCityPlaces[]) => (
  <section className="favorites">
    <h1 className="favorites__title">Saved listing</h1>
    <ul className="favorites__list">
      {favorites.map(({city, places}) => (
        <li key={`${city.id}-${city.name}`} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city.name}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {places.map((place) => <PlaceCard key={place.id} viewType={PlaceViewType.Favorite} place={place}></PlaceCard>)}
          </div>
        </li>
      ))}
    </ul>
  </section>
);

const FavoritesPage = () => {
  const cityData = useAppSelector(getAllCities);
  const favoritePlaces = useAppSelector(getFavorites);

  const favorites: FavoriteCityPlaces[] = cityData
    .map((city) => {
      const matchingItem = favoritePlaces.filter((place) => place.city.name === city.name);
      return matchingItem.length > 0 ? { city: city, places: matchingItem } : null;
    })
    .filter((item): item is FavoriteCityPlaces => item !== null);

  const favoritesEmpty = favorites.length === 0;

  const renderFavorites = favoritesEmpty ? emptyFavorites() : existingFavorites(favorites);

  const favoritesClass = classNames(
    'page__main',
    'page__main--favorites',
    {
      'page__main--favorites-empty': favoritesEmpty
    }
  );

  return (
    <div className="page">
      <Header/>

      <main className={favoritesClass}>
        <div className="page__favorites-container container">
          {renderFavorites}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FavoritesPage;
