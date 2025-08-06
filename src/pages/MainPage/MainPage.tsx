import { useState } from 'react';
import { type MouseEvent } from 'react';
import Header from '../../components/Header/Header';
import {City, IPlace, PlaceViewType} from '../../types/types';
import {cityData} from '../../store/CityData/CityData';
import PlaceCard from '../../components/PlaceCard/PlaceCard';

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

  const cityOffers = getPlaces(currentCity);

  const handlePlaceCardHover = (place?: IPlace | undefined) => {
    setActiveCard(place);
  };


  const existingCityOffers = (cityName: string, places: IPlace[]) => (
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
          className={`places__options places__options--custom ${isFiltersHovered ? 'places__options--opened' : ''}`}
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

  const cityOffersEmpty = cityOffers.length === 0;
  const renderCityOffers = cityOffersEmpty ? emptyCityOffers(currentCity) : existingCityOffers(currentCity, cityOffers);

  const handleCityClick = (event: MouseEvent<HTMLElement>) => {
    const element = event.target as HTMLElement;
    setCurrentCity(element.textContent ?? '');
  };

  const mapCities = (city: City[]) => city.map((item) => (
    <li key={item.id} className="locations__item">
      <a className={`locations__item-link tabs__item ${(item.name === currentCity ? 'tabs__item--active' : '')}`} href="#">
        <span onClick={handleCityClick}>{item.name}</span>
      </a>
    </li>
  ));

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className={`page__main page__main--index ${cityOffersEmpty ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">{mapCities(cityData)}</ul>
          </section>
        </div>
        <div className="cities">
          <div className={`cities__places-container ${cityOffersEmpty ? 'cities__places-container--empty' : ''} container`}>
            {renderCityOffers}
            <div className="cities__right-section">
              {!cityOffersEmpty && <section className="cities__map map">{activeCard?.id ?? 'unknown'}</section>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
