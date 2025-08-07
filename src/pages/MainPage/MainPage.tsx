import { useState, useEffect } from 'react';
import { type MouseEvent } from 'react';
import classNames from 'classnames';
import Header from '../../components/Header/Header';
import {City, IPlace, PlaceViewType, MapViewType} from '../../types/types';
import {cityData, getCityByName} from '../../store/CityData/CityData';
import PlaceCard from '../../components/PlaceCard/PlaceCard';
import PlaceMap from '../../components/PlaceMap/PlaceMap';

import {getPlaces} from '../../mocks/Offers';

type MainPageData = {
  selectedCity: string;
}

export type MainPageProps = {
  mainPageData: MainPageData;
}

const emptyCityOffers = (cityName: string) => (
  <section className="cities__no-places">
    <div className="cities__status-wrapper tabs__content">
      <b className="cities__status">No places to stay available</b>
      <p className="cities__status-description">We could not find any property available at the moment in {cityName}</p>
    </div>
  </section>
);

const MainPage = ({mainPageData}: MainPageProps) => {

  const [currentCity, setCurrentCity] = useState(mainPageData.selectedCity);
  const [activeCard, setActiveCard] = useState<IPlace>();

  const [isFiltersHovered, setIsFiltersHovered] = useState(false);

  const [city, setCity] = useState(getCityByName(currentCity)!);
  const [cityPlaces, setCityPlaces] = useState(getPlaces(currentCity));


  const handlePlaceCardHover = (place?: IPlace | undefined) => {
    setActiveCard(place);
  };

  const existingCityOffers = (cityName: string, places: IPlace[]) => {
    const filtersClass = classNames(
      'places__options',
      'places__options--custom',
      {
        'places__options--opened': isFiltersHovered
      }
    );

    return (
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <span className="places__found">{places.length} places to stay in {cityName}</span>
        <form
          className="places__sorting"
          action="#"
          method="get"
          onMouseEnter={() => setIsFiltersHovered(true)}
          onMouseLeave={() => setIsFiltersHovered(false)}
        >
          <span className="places__sorting-caption">Sort by&nbsp;</span>
          <span className="places__sorting-type" tabIndex={0}>
            Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul
            className={filtersClass}
          >
            <li className="places__option places__option--active" tabIndex={0}>Popular</li>
            <li className="places__option" tabIndex={0}>Price: low to high</li>
            <li className="places__option" tabIndex={0}>Price: high to low</li>
            <li className="places__option" tabIndex={0}>Top rated first</li>
          </ul>
        </form>
        <div className="cities__places-list places__list tabs__content">
          {places.map((place) => <PlaceCard key={place.id} viewType={PlaceViewType.Cities} place={place} onHover={handlePlaceCardHover}></PlaceCard>)}
        </div>
      </section>
    );
  };

  const cityOffersEmpty = cityPlaces.length === 0;
  const renderCityOffers = cityOffersEmpty ? emptyCityOffers(currentCity) : existingCityOffers(currentCity, cityPlaces);

  const handleCityClick = (event: MouseEvent<HTMLElement>) => {
    const element = event.target as HTMLElement;
    setCurrentCity(element.textContent ?? '');
  };

  useEffect(() => {
    setCity(getCityByName(currentCity)!);
    setCityPlaces(getPlaces(currentCity));
  }, [currentCity]);

  const mapCities = (cities: City[]) => cities.map((item) => {
    const tabClass = classNames(
      'locations__item-link',
      'tabs__item',
      {
        'tabs__item--active': item.name === currentCity
      }
    );

    return (
      <li key={`${item.id}-${item.name}`} className="locations__item">
        <a className={tabClass} href="#">
          <span onClick={handleCityClick}>{item.name}</span>
        </a>
      </li>
    );
  });

  const mainPageClass = classNames(
    'page__main',
    'page__main--index',
    {
      'page__main--index-empty': cityOffersEmpty
    }
  );
  const placeContainerClass = classNames(
    'container',
    'cities__places-container',
    {
      'cities__places-container--empty': cityOffersEmpty
    }
  );

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className={mainPageClass}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">{mapCities(cityData)}</ul>
          </section>
        </div>
        <div className="cities">
          <div className={placeContainerClass}>
            {renderCityOffers}
            <div className="cities__right-section">
              {!cityOffersEmpty && <PlaceMap viewType={MapViewType.Cities} city={city} places={cityPlaces} selectedPlace={activeCard?.id ?? 'unknown'}/>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
