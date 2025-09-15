import { useCallback, useMemo, useState, type MouseEvent } from 'react';
import classNames from 'classnames';
import { SORT_TYPES, isSortType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSortType } from '../../store/offers/selectors';
import { setSortType } from '../../store/offers/offers';

const PlaceSorting = () => {
  const dispatch = useAppDispatch();

  const [isOpened, setIsOpened] = useState(false);
  const sortType = useAppSelector(getSortType);

  const handleSortingTypeClick = useCallback(() => setIsOpened((prevState) => !prevState), []);

  const handleSortTypeClick = useCallback((event: MouseEvent<HTMLElement>) => {
    const element = event.target as HTMLElement;
    const content = element.textContent ?? '';
    if (isSortType(content)) {
      dispatch(setSortType(content));
      setIsOpened(false);
    }
  }, [dispatch]);

  const filtersClass = useMemo(() => classNames(
    'places__options',
    'places__options--custom',
    {
      'places__options--opened': isOpened
    }
  ), [isOpened]);

  const sortList = useMemo(() => SORT_TYPES.map((item, index) => {
    const selected = item === sortType;
    const itemClass = classNames(
      'places__option',
      {
        'places__option--active': selected
      }
    );
    const itemKey = `key-${index}-${item}`;

    return (
      <li
        key={itemKey}
        className={itemClass}
        role="button"
        aria-selected={selected}
        aria-posinset={index + 1}
        aria-setsize={SORT_TYPES.length}
        aria-label={`Сортировка по ${item}`}
        onClick={handleSortTypeClick}
        tabIndex={0}
      >
        {item}
      </li>
    );
  }), [sortType, handleSortTypeClick]);

  return (
    <form
      className="places__sorting"
    >
      <span className="places__sorting-caption">Sort by&nbsp;</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleSortingTypeClick}
      >
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={filtersClass}
        role="list"
        aria-label="Способы сортировки"
      >
        {sortList}
      </ul>
    </form>
  );
};

export default PlaceSorting;
