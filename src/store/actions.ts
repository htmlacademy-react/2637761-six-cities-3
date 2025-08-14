import { createAction } from '@reduxjs/toolkit';
import { SortType } from '../const';

const setCity = createAction<string>('setCity');
const setSortType = createAction<SortType>('setSortType');

export { setCity, setSortType };
