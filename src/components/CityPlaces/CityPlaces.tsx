import { useState } from 'react';
import classNames from 'classnames';
import {IPlace, PlaceViewType, MapViewType} from '../../types/types';
import PlaceCard from '../../components/PlaceCard/PlaceCard';
import PlaceMap from '../../components/PlaceMap/PlaceMap';

import { useAppSelector } from '../../hooks';
import { selectCity, selectCityPlaces } from '../../store/selectors';


const CityPlaces = () => {
  const city = useAppSelector(selectCity);
  const cityPlaces = useAppSelector(selectCityPlaces);

  const [activeCard, setActiveCard] = useState<IPlace>();
  const [isFiltersHovered, setIsFiltersHovered] = useState(false);

  if (cityPlaces.length === 0) {
    return (
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">We could not find any property available at the moment in {city.name}</p>
        </div>
      </section>
    );
  }

  const handlePlaceCardHover = (place?: IPlace | undefined) => {
    setActiveCard(place);
  };

  const filtersClass = classNames(
    'places__options',
    'places__options--custom',
    {
      'places__options--opened': isFiltersHovered
    }
  );

  return (
    <>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <span className="places__found">{cityPlaces.length} places to stay in {city.name}</span>
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
          {cityPlaces.map((place) => <PlaceCard key={place.id} viewType={PlaceViewType.Cities} place={place} onHover={handlePlaceCardHover} />)}
        </div>
      </section>
      <div className="cities__right-section">
        <PlaceMap viewType={MapViewType.Cities} city={city} places={cityPlaces} selectedPlace={activeCard?.id ?? 'unknown'}/>
      </div>
    </>
  );
};

export default CityPlaces;
