import { useState } from 'react';
import { type MouseEvent } from 'react';
import classNames from 'classnames';

import { SortTypes, isSortType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectSortType } from '../../store/selectors';
import { setSortType } from '../../store/actions';

const PlaceSorting = () => {

  const dispatch = useAppDispatch();

  const [isFiltersHovered, setIsFiltersHovered] = useState(false);
  const sortType = useAppSelector(selectSortType);

  const handleSortTypeClick = (event: MouseEvent<HTMLElement>) => {
    const element = event.target as HTMLElement;
    const content = element.textContent ?? '';
    if (isSortType(content)) {
      dispatch(setSortType(content));
      setIsFiltersHovered(false);
    }
  };

  const filtersClass = classNames(
    'places__options',
    'places__options--custom',
    {
      'places__options--opened': isFiltersHovered
    }
  );

  return (
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
      <ul className={filtersClass}>
        {SortTypes.map((item, index) => {
          const itemClass = classNames(
            'places__option',
            {
              'places__option--active': item === sortType
            }
          );

          const itemKey = `key-${index}-${item}`;

          return (
            <li key={itemKey} className={itemClass} onClick={handleSortTypeClick} tabIndex={0}>{item}</li>
          );
        })}
      </ul>
    </form>
  );
};

export default PlaceSorting;
