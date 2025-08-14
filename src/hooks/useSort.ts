import {IPlace} from '../types/types';
import { useAppSelector } from '../hooks';
import { selectSortType } from '../store/selectors';

function useSort(places: IPlace[]): IPlace[] {
  const sortType = useAppSelector(selectSortType);
  switch (sortType) {
    case 'Price: low to high':
      return [...places].sort((a, b) => a.price - b.price);
    case 'Price: high to low':
      return [...places].sort((a, b) => b.price - a.price);
    case 'Top rated first':
      return [...places].sort((a, b) => b.rating - a.rating);
    case 'Popular':
    default:
      // Возвращаем копию исходного массива без сортировки
      return [...places];
  }
}

export default useSort;
