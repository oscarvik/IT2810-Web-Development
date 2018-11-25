const initialState = {
    movies: [],
    searchMode: false,
    favoriteMode: false,
    pageNumber: 1,
    loading: false,
};

const MovieReducer = (state = initialState, action) => {
    switch (action.type) {

        case "FETCH_MOVIES":
            return {
                ...state,
                movies: [...action.payload],
            };
        case "MOVIE_SEARCH":
            return {
                ...state,
                movies: [...action.payload.movies],
                loading: action.payload.loading
            };
        case "LOAD_NEW_PAGE":
            return {
                ...state,
                movies: [...state.movies, ...action.payload.movies],
                loading: action.payload.loading,
            };
        case "SET_SEARCH_MODE":
            return {
                ...state,
                searchMode: action.payload
            };
        case 'GET_FAVORITE_MOVIES':
            return {
                ...state,
                movies: [...action.payload.movies],
                loading: action.payload.loading,
            };
        case "INITIATE_SEARCH":
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;
    }
};

export default MovieReducer