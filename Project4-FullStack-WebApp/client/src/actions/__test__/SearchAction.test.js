import mockAxios from 'axios/index';
import { Search, OptionSearch} from '../SearchActions';

import configureMockStore from 'redux-mock-store' //A mock store for testing Redux async action creators and middleware.
import thunk from 'redux-thunk'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)



test('Test Search. Dispatches INITIATE_SEARCH and MOVIE_SEARCH actions. Uses mockAxios.get and returns length of movie in response', async () => {
  // SETUP
  // mock-implementation we want to be used one time when axios is called
  mockAxios.get.mockImplementationOnce(() =>
  Promise.resolve({
    data: {
      movies: ["first.movie", "second.movie", "third.movie", "fourth.movie"]
    }
  })
  );

  // The mock store will create an array of dispatched actions which serve as an action log for tests.
  const store = mockStore();
  const expectedActionLog = [
    {"payload": true, "type": "INITIATE_SEARCH"},
    {"payload": {"loading": false, "movies": ["first.movie", "second.movie", "third.movie", "fourth.movie"]}, "type": "MOVIE_SEARCH"}
  ];


  // ACTUAL WORK - INCLUDING TEST OF RESPONSE movie.length
  await store.dispatch(Search("mock-query",1)).then( getResult_length => {
    //Test that Search returns the length of our provided mockAxios.get movie list
    expect(getResult_length).toEqual(4);
  })

  //TESTS
  // Test that the actual dispatched actions match what we expected
  expect(store.getActions()).toEqual(expectedActionLog);
  // make sure axios was called the correct amount of times
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  // make sure axios was called with the correct url/argument
  expect(mockAxios.get).toHaveBeenCalledWith("/api/mock-query")
});

test("Test OptionSearch", async () => {
  // SETUP
  // mock-implementation we want to be used one time when axios is called
  mockAxios.get.mockImplementation(() =>
  Promise.resolve({
    data: {
      movies: ["first.movie", "second.movie", "third.movie", "fourth.movie"],
      genres: ["Action", "Drama", "Horror"]
    }
  })
  );

  const store = mockStore();
  const expectedActionLog_genres = [ {type: "FETCH_OPTIONS", payload: ["Action", "Drama", "Horror"]} ];
  const expectedActionLog_movies = [ {type: "FETCH_OPTIONS", payload: ["first.movie", "second.movie", "third.movie", "fourth.movie"]} ];

  // ACTUAL WORK AND TESTS
  await store.dispatch(OptionSearch("genres","mock-searchName"));
  expect(store.getActions()).toEqual(expectedActionLog_genres);
  expect(mockAxios.get).toHaveBeenCalledWith("/api/genres/search?genreName=mock-searchName&sortOn=popularity&desc=true&page=1&limit=6");
  store.clearActions();

  await store.dispatch(OptionSearch("movies","mock-searchName"));
  expect(store.getActions()).toEqual(expectedActionLog_movies);
  expect(mockAxios.get).toHaveBeenCalledWith("/api/movies/search?movieTitle=mock-searchName&sortOn=popularity&desc=true&page=1&limit=6");

  // make sure axios was called the correct amount of times
  expect(mockAxios.get).toHaveBeenCalledTimes(3);

});
