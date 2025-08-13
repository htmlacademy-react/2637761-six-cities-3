import {IPlace} from '../types/types';
import { useAppSelector } from '../hooks';
import { selectSortType } from '../store/selectors';

function useSort(places: IPlace[]): IPlace[] {
  const sortType = useAppSelector(selectSortType);
  return [...places].sort((a, b) => {
    switch (sortType) {
      case 'Price: low to high':
        return a.price - b.price;
      case 'Price: high to low':
        return b.price - a.price;
      case 'Top rated first':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });
}

export default useSort;
