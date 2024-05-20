import { createStore } from 'redux';
import weatherReducer from './reducers';

const store = createStore(
    weatherReducer,
);

export default store;
export type AppState = ReturnType<typeof store.getState>;
