import { createAction } from '@reduxjs/toolkit';

const setCity = createAction<string>('setCity');
export { setCity };
