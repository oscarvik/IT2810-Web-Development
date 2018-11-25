import mockAxios from 'axios/index';
import { CreateUser, SignInUser, ChangeFavoriteMovies, FetchFavoriteMovies} from '../UserActions';
import configureMockStore from 'redux-mock-store' //A mock store for testing Redux async action creators and middleware.
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
// The mock store will create an array of dispatched actions which serve as an action log for tests.
const store = mockStore();

test("test CreateUser", async () =>{
  // SETUP
  // mock-implementation we want to be used one time when axios is called
  mockAxios.post.mockImplementationOnce(() =>
  Promise.resolve({
    data: {
      token: "mock-token",
      user: {
        favorites: ["favMovie1","favMovie2"],
        email: "signup-mock@email.com"
      }
    }
  })
  );
  const expectedActionLog = [{
        type: 'CREATE_USER_SUCCESS',
        payload: { token: "mock-token", user: {favorites: ["favMovie1","favMovie2"], email: "signup-mock@email.com"} }
    }];

  // ACTUAL WORK
  await store.dispatch(CreateUser("signup-mock@email.com", "mock-password"));

  // TESTS
  // Test that the actual dispatched actions match what we expected
  expect(store.getActions()).toEqual(expectedActionLog);
  // make sure axios was called with the correct url, arguments
  expect(mockAxios.post).toHaveBeenCalledWith('api/users/signup', {"email": "signup-mock@email.com", "password": "mock-password"})
  // make sure axios was called the correct amount of times
  expect(mockAxios.post).toHaveBeenCalledTimes(1);
});



test("test SignInUser", async () =>{
  // SETUP
  store.clearActions()
  // mock-implementation we want to be used one time when axios is called
  mockAxios.post.mockImplementationOnce(() =>
  Promise.resolve({
    data: {
      token: "mock-token",
      user: {
        favorites: ["favMovie1","favMovie2"],
         email: "signin-mock@email.com"
       }
    }
  })
  );
  const expectedActionLog = [{
        type: 'SIGNIN_USER_SUCCESS',
        payload: {token: "mock-token", user: {favorites: ["favMovie1","favMovie2"], email: "signin-mock@email.com"} }
    }];

  // ACTUAL WORK
  await store.dispatch(SignInUser("signin-mock@email.com", "mock-password"));

  // TESTS
  // Test that the actual dispatched actions match what we expected
  expect(store.getActions()).toEqual(expectedActionLog);
  // make sure axios was called with the correct url, arguments
  expect(mockAxios.post).toHaveBeenCalledWith('api/users/signin', {"email": "signin-mock@email.com", "password": "mock-password"})
  // make sure axios was called the correct amount of times
  expect(mockAxios.post).toHaveBeenCalledTimes(2);

});



test("test ChangeFavoriteMovies", async () =>{
  // SETUP
  store.clearActions()
  // mock-implementation we want to be used one time when axios is called
  mockAxios.post.mockImplementationOnce(() =>
  Promise.resolve({
    data: {
      token: "mock-token",
      user: {
        favorites: ["favMovie1","favMovie2"],
         email: "signin-mock@email.com"
       }
    }
  })
  );
  const expectedActionLog = [{
        type: 'FAVORITES_CHANGED',
        payload: { token: "mock-token", user: {favorites: ["favMovie1","favMovie2"], email: "signin-mock@email.com"} }
    }];

  // ACTUAL WORK
  await store.dispatch(ChangeFavoriteMovies("mock-UserID", "mock-MovieID", false));

  // TESTS
  // Test that the actual dispatched actions match what we expected
  expect(store.getActions()).toEqual(expectedActionLog);
  // make sure axios was called with the correct url, arguments
  expect(mockAxios.post).toHaveBeenCalledWith('/api/users/mock-UserID/favorites', {"movieId": "mock-MovieID", "isDelete": false})
  // make sure axios was called the correct amount of times
  expect(mockAxios.post).toHaveBeenCalledTimes(3);
});


test("test FetchFavoriteMovies", async () =>{
  // SETUP
  store.clearActions()
  // mock-implementation we want to be used one time when axios is called
  mockAxios.get.mockImplementationOnce(() =>
  Promise.resolve({
    data: {
      movies: ["favMovie1","favMovie2","favMovie3"]
    }
  })
  );
  const expectedActionLog = [
    {
        type: "INITIATE_SEARCH",
        payload: true,
    },
    {
        type: 'GET_FAVORITE_MOVIES',
        payload: {
          movies: ["favMovie1","favMovie2","favMovie3"],
          loading: false
        }
    },
    {
        type: "INITIATE_SEARCH",
        payload: true,
    },
    {
        type: "LOAD_NEW_PAGE",
        payload: {
            movies: [],
            loading: false
        }
    }];

  // ACTUAL WORK
  await store.dispatch(FetchFavoriteMovies("mock-userID",1)).then(res => {
    // length of returned movie list from mockAxios.get.mockImplementationOnce
    expect(res).toEqual(3)
  });
  // ACTUAL WORK
  await store.dispatch(FetchFavoriteMovies("mock-userID",2)).then(res => {
    // length of returned movie is 0 because we used mockImplementationOnce.
    // Now we get the default return from __mocks__/axios/index.js get function
    expect(res).toEqual(0)
  });

  // TESTS
  // Test that the actual dispatched actions match what we expected
  expect(store.getActions()).toEqual(expectedActionLog);
  // make sure axios was called with the correct url
  expect(mockAxios.get).toHaveBeenCalledWith('/api/users/mock-userID/favorites?page=1&limit=10');
  // make sure axios was called the correct amount of times
  expect(mockAxios.get).toHaveBeenCalledTimes(2);

});
