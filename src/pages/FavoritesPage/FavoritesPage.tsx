import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import {City, IPlace, PlaceViewType} from '../../types/types';
import {cityData} from '../../store/CityData/CityData';
import PlaceCard from '../../components/PlaceCard/PlaceCard';

import {placeData} from '../../mocks/mocks';
import { AuthorizationStatus } from '../../const';

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
        <li key={city.cityId} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city.cityName}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {places.map((place) => <PlaceCard key={`${place.id}_${place.cityId}`} viewType={PlaceViewType.Favorite} place={place}></PlaceCard>)}
          </div>
        </li>
      ))}
    </ul>
  </section>
);

function FavoritesPage() {

  const favorites: FavoriteCityPlaces[] = cityData
    .map((city) => {
      const matchingItem = placeData.filter((place) => place.cityId === city.cityId && place.isFavorite);
      return matchingItem.length > 0 ? { city: city, places: matchingItem } : null;
    })
    .filter((item): item is FavoriteCityPlaces => item !== null);

  const favoritesEmpty = favorites.length === 0;

  const renderFavorites = favoritesEmpty ? emptyFavorites() : existingFavorites(favorites);

  return (
    <div className="page">
      <Header authStatus={AuthorizationStatus.Auth}/>

      <main className={`page__main page__main--favorites ${favoritesEmpty ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          {renderFavorites}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default FavoritesPage;
