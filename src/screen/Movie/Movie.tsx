import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Checkbox, Col, Collapse, Input, Row, Tabs } from 'antd';
import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IMovie } from '../../common/CommonInterfaces';
import {
  addMovieAsUnwatchAction,
  addMovieAsWatchAction,
  removeMovieFromWatchAction,
  searchMyMovieAction,
} from '../../store/Actions/movieDbActions';
import { IRootReducer } from '../../store/IRootReducer';
import { IMovieReducerState } from '../../store/Reducers/movieDbReducer';
import { searchMovieService } from '../../store/Services/movieDbServices';
import './movie.scss';

/**
 * MovieDB View
 */
const Movie: FC = () => {
  const { TabPane } = Tabs;

  const { Panel } = Collapse;

  // dispatch redux action
  const dispatch = useDispatch();

  // value state for movie auto complete
  const [movieValue, setMovieValue] = useState<string>('');

  // selected movie id state
  const [selectedMovieId, setSelectedMovieId] = useState<number>();

  // getting movie from movie reducer state
  const movieReducerState: IMovieReducerState = useSelector((state: IRootReducer) => state.movieReducer);

  // option for search movie suggestion
  const movieDbSearchOptions = (movieReducerState?.searchMovieList || []).map((movie: IMovie) => ({
    label: `${movie.title} (Release date: ${movie.release_date})`,
    value: movie.id,
  }));

  /**
   * Format movie year
   * @param releaseDate
   */
  const getMovieYear = (releaseDate: string) => (releaseDate ? releaseDate.split('-')[0] : '');

  /**
   * Set selected movie id
   * @param id
   */
  const onSelect = (id: string) => {
    setSelectedMovieId(+id);
  };

  /**
   * On Add unwatched movie
   */
  const onAddWatch = () => {
    if(selectedMovieId)
      dispatch(addMovieAsUnwatchAction(selectedMovieId));
  }

  /**
   * On movie search call action
   * @param value
   */
  const onSearch = (value: string) => {
    if (value)
      dispatch(searchMovieService(value));
    setMovieValue(value);
  };

  /**
   * On search my movies
   * @param event
   */
  const onSearchMovie = (event) => {
    dispatch(searchMyMovieAction(event.target.value));
  };

  /**
   * Reusable Movie details Component
   * @param movie
   * @param onChecked
   */
  const movieDetails = (movie: IMovie, onChange: () => {}) => {
    return (
      <div className="movieDetailsContainer">
        <div className="movieDetails">
          <div>Year: {getMovieYear(movie.release_date)}</div>
          <div>Runtime: {`${movie.id} m`}</div>
          <div>IMDB Score: {movie.vote_average}</div>
        </div>
        <Checkbox
          checked={movie.isWatched}
          onChange={onChange}
        >
          Watched
        </Checkbox>
      </div>
    )
  }

  /**
   * Return Unwatched movies
   */
 const getUnwatchedMovies = () => {
    return (movieReducerState?.movieList || []).filter((movie: IMovie) =>
      movie.title
        .toLocaleUpperCase()
        .includes(movieReducerState.searchValue.toLocaleUpperCase()) && !movie.isWatched
    ).map((movie: IMovie) => (
        <Panel header={movie.title} key={`movie_unw_${movie.id}`}>
          {movieDetails(movie, () => dispatch(addMovieAsWatchAction(movie.id)))}
        </Panel>
      ))
  }

  /**
   * Return Watched movies
   */
  const getWatchedMovies = () => {
    return (movieReducerState?.movieList || []).filter((movie: IMovie) =>
      movie.title
        .toLocaleUpperCase()
        .includes(movieReducerState.searchValue.toLocaleUpperCase()) && movie.isWatched
    ).map((movie: IMovie) => (
        <Panel header={movie.title} key={`movie_w_${movie.id}`}>
          {movieDetails(movie, () => dispatch(removeMovieFromWatchAction(movie.id)))}
        </Panel>
      ))
  }

  return (
    <>
      <Row>
        <Col md={20} xs={24}>
          <AutoComplete
            className="autoCompleteTextInput"
            options={movieDbSearchOptions}
            onSearch={onSearch}
            onSelect={onSelect}
            placeholder="Search MovieDB"
            value={movieValue}
          />
        </Col>
        <Col md={{ span: 3, offset: 1 }} xs={8}>
          <Button onClick={onAddWatch} type="primary">Add to Unwatched</Button>
        </Col>
      </Row>
        <Row>
        <Col md={{  order: 1, span: 16 }} xs={{ order: 2, span: 24 }}>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  <EyeInvisibleOutlined />
                  Unwatched
                </span>
              }
              key="1"
            >
              <Collapse>
                {getUnwatchedMovies()}
              </Collapse>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <EyeOutlined />
                  Watched
                </span>
              }
              key="2"
            >
              <Collapse>
                {getWatchedMovies()}
              </Collapse>
            </TabPane>
          </Tabs>
        </Col>
        <Col md={{ order: 2, span: 8 }} xs={{ order: 1, span: 24 }}>
          <Input
            value={movieReducerState.searchValue}
            placeholder="Search My movie"
            onChange={onSearchMovie}
          />
        </Col>
      </Row>
    </>
  );
};

export default Movie;
