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

/**
 * Add movie as unwatch based on movieId
 * @param movieId
 */
export const addMovieAsUnwatchAction = (movieId: number): IAction => {
  return {
    type: ADD_MOVIE_AS_UNWATCH,
    payload: movieId,
  };
};

/**
 * Add movie as watch based on movieId
 * @param movieId
 */
export const addMovieAsWatchAction = (movieId: number): IAction => {
  return {
    type: ADD_MOVIE_AS_WATCH,
    payload: movieId,
  };
};

/**
 * Remove movie as unwatch based on movieId
 * @param movieId
 */
export const removeMovieFromWatchAction = (movieId: number): IAction => {
  return {
    type: REMOVE_MOVIE_FROM_WATCH,
    payload: movieId,
  };
};

/**
 * Search movie list
 * @param filter
 */
export const searchMyMovieAction = (searchValue: string): IAction => {
  return {
    type: SEARCH_MY_MOVIE,
    payload: searchValue,
  };
};

/**
 * Call on search movie.
 */
export const searchMovieAction = (): IAction => {
  return {
    type: SEARCH_MOVIE_ACTION,
  };
};

/**
 * Call on search movie success.
 */
export const searchMovieActionSuccess = (movieList: IMovie[]): IAction => {
  return {
    type: SEARCH_MOVIE_ACTION_SUCCESS,
    payload: movieList,
  };
};

/**
 * Call on search movie failure.
 */
export const searchMovieActionFailure = (error: string): IAction => {
  return {
    type: SEARCH_MOVIE_ACTION_FAILURE,
    payload: error,
  };
};
