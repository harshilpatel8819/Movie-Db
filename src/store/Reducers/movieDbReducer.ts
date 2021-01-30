import { IMovie } from '../../common/CommonInterfaces';
import {
  ADD_MOVIE_AS_UNWATCH,
  ADD_MOVIE_AS_WATCH,
  REMOVE_MOVIE_FROM_WATCH,
  SEARCH_MOVIE_ACTION,
  SEARCH_MOVIE_ACTION_FAILURE,
  SEARCH_MOVIE_ACTION_SUCCESS,
  SEARCH_MY_MOVIE,
} from '../ActionTypes/movieDbTypes';
import { IAction } from '../IAction';

export interface IMovieReducerState {
  error: string;
  loading: boolean;
  movieList: IMovie[];
  searchMovieList: IMovie[];
  searchValue: string;
}

const initialMovieState: IMovieReducerState = {
  error: '',
  loading: false,
  movieList: [],
  searchMovieList: [],
  searchValue: '',
};

/**
 * reducer for movieDb
 * @param state
 * @param action
 */
const movieReducer = (state: IMovieReducerState = initialMovieState, action: IAction): IMovieReducerState => {
  switch (action.type) {
    case ADD_MOVIE_AS_UNWATCH:
      const movie = state.searchMovieList.find((movie: IMovie) => movie.id === action.payload);
      let newMovieList = [...state.movieList];
      if (movie)
        newMovieList = [...state.movieList, { ...movie, isWatched: false }]
      return {
        ...state,
        movieList: newMovieList,
      };
    case ADD_MOVIE_AS_WATCH:
      const movieIndex = state.movieList.findIndex((movie: IMovie) => movie.id === action.payload);
      const currentMovieList = JSON.parse(JSON.stringify(state.movieList));
      if (movieIndex > -1)
        currentMovieList[movieIndex].isWatched = true;
      return {
        ...state,
        movieList: currentMovieList,
      };
    case REMOVE_MOVIE_FROM_WATCH:
      const removeMovieIndex = state.movieList.findIndex((movie: IMovie) => movie.id === action.payload);
      const removeMovieList = JSON.parse(JSON.stringify(state.movieList));
      if (removeMovieIndex > -1)
        removeMovieList[removeMovieIndex].isWatched = false;
      return {
        ...state,
        movieList: removeMovieList,
      };
    case SEARCH_MY_MOVIE:
      return {
        ...state,
        searchValue: action.payload,
      };
    case SEARCH_MOVIE_ACTION:
      return {
        ...state,
        error: '',
        loading: true,
        searchValue: '',
        searchMovieList: initialMovieState.searchMovieList,
      };
    case SEARCH_MOVIE_ACTION_SUCCESS:
      return {
        ...state,
        error: '',
        loading: false,
        searchValue: '',
        searchMovieList: action.payload,
      };
    case SEARCH_MOVIE_ACTION_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        searchValue: '',
        searchMovieList: initialMovieState.searchMovieList,
      };
    default:
      return state;
  }
};

export default movieReducer;
