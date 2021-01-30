import { IMovieReducerState } from './Reducers/movieDbReducer';

export interface IRootReducer {
  movieReducer: IMovieReducerState;
}
