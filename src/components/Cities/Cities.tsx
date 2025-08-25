import { type MouseEvent } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllCities, getCity } from '../../store/offers/selectors';
import { setCity } from '../../store/offers/offers';

const Cities = () => {

  const dispatch = useAppDispatch();

  const cities = useAppSelector(getAllCities);
  const city = useAppSelector(getCity);

  const handleCityClick = (event: MouseEvent<HTMLElement>) => {
    const element = event.target as HTMLElement;
    dispatch(setCity(element.textContent ?? ''));
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((item) => {
          const tabClass = classNames(
            'locations__item-link',
            'tabs__item',
            {
              'tabs__item--active': item.name === city.name
            }
          );

          return (
            <li key={`${item.id}-${item.name}`} className="locations__item" onClick={handleCityClick}>
              <a className={tabClass} href="#">
                <span>{item.name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Cities;
