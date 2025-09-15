import { useMemo } from 'react';
import { MapViewType } from '../../types/types';
import { PlaceViewType } from '../../types/place';
import PlaceSorting from '../../components/PlaceSorting';
import PlaceCard from '../../components/PlaceCard';
import PlaceMap from '../../components/PlaceMap';
import Loader from '../../components/Loader';

import { useAppSelector } from '../../hooks';
import useSort from '../../hooks/useSort';
import { cityPlacesSelector } from '../../store/offers/selectors';

const CityPlaces = () => {
  const { dataIsLoading, city, unsortedPlaces, cityPlacesCount } = useAppSelector(cityPlacesSelector);

  const cityPlaces = useSort(unsortedPlaces);

  const placesText = useMemo(() =>
    `${cityPlacesCount} place${cityPlacesCount !== 1 ? 's' : ''} to stay in ${city.name}`,
  [cityPlacesCount, city]
  );

  const placesList = useMemo(() =>
    cityPlaces.map((place) => (
      <PlaceCard
        key={place.id}
        viewType={PlaceViewType.Cities}
        place={place}
      />
    )),
  [cityPlaces]
  );

  if (dataIsLoading){
    return (
      <Loader />
    );
  }

  if (cityPlacesCount === 0) {
    return (
      <>
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <p className="cities__status">No places to stay available</p>
            <p className="cities__status-description">We could not find any property available at the moment in {city.name}</p>
          </div>
        </section>
        <div className="cities__right-section">
        </div>
      </>
    );
  }

  return (
    <>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <span className="places__found">{placesText}</span>
        <PlaceSorting/>
        <div className="cities__places-list places__list tabs__content">
          {placesList}
        </div>
      </section>
      <div className="cities__right-section">
        <PlaceMap
          viewType={MapViewType.Cities}
          city={city}
          places={cityPlaces}
        />
      </div>
    </>
  );
};

export default CityPlaces;
