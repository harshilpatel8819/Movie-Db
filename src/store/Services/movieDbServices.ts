import axios, { AxiosResponse } from 'axios';
import { searchMovieAction, searchMovieActionFailure, searchMovieActionSuccess} from '../Actions/movieDbActions';

/**
 * search service movie
 */
export const searchMovieService = (searchValue: string) => {
  return (dispatch) => {
    dispatch(searchMovieAction());
    axios
      .get(
        `${process.env.REACT_APP_BASEURL_ENDPOINT}search/movie?api_key=fdfd0d827c39546189c3e53964ee2b8c&language=en-US&query=${searchValue}&page=1&include_adult=false`
      )
      .then((response: AxiosResponse) => {
        dispatch(searchMovieActionSuccess(response.data.results));
      })
      .catch((error) => {
        dispatch(searchMovieActionFailure(error.response.data.error));
      });
  };
};
