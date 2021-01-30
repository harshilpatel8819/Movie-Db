import { combineReducers } from 'redux';
import { IRootReducer } from './IRootReducer';
import movieReducer from './Reducers/movieDbReducer';

const rootReducer = combineReducers<IRootReducer>({
  movieReducer,
});

export default rootReducer;
