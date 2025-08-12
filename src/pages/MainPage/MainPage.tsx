import classNames from 'classnames';
import Header from '../../components/Header/Header';
import Cities from '../../components/Cities/Cities';
import CityPlaces from '../../components/CityPlaces/CityPlaces';

import { useAppSelector } from '../../hooks';
import { selectCityPlacesCount } from '../../store/selectors';

const MainPage = () => {

  const cityOffersEmpty = useAppSelector(selectCityPlacesCount) === 0;

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
          <Cities />
        </div>
        <div className="cities">
          <div className={placeContainerClass}>
            <CityPlaces />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
