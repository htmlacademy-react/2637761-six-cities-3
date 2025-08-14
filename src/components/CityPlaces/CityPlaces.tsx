import { useState } from 'react';
import {IPlace, PlaceViewType, MapViewType} from '../../types/types';
import PlaceSorting from '../../components/PlaceSorting/PlaceSorting';
import PlaceCard from '../../components/PlaceCard/PlaceCard';
import PlaceMap from '../../components/PlaceMap/PlaceMap';

import { useAppSelector } from '../../hooks';
import useSort from '../../hooks/useSort';
import { selectCity, selectCityPlaces } from '../../store/selectors';


const CityPlaces = () => {
  const city = useAppSelector(selectCity);
  const cityPlaces = useSort(useAppSelector(selectCityPlaces));

  const [activeCard, setActiveCard] = useState<IPlace>();

  if (cityPlaces.length === 0) {
    return (
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <p className="cities__status">No places to stay available</p>
          <p className="cities__status-description">We could not find any property available at the moment in {city.name}</p>
        </div>
      </section>
    );
  }

  const handlePlaceCardHover = (place?: IPlace) => {
    setActiveCard(place);
  };

  return (
    <>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <span className="places__found">{cityPlaces.length} places to stay in {city.name}</span>
        <PlaceSorting/>
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
