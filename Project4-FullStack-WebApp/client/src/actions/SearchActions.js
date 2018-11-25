import axios from "axios/index";

export const Search = (query, pageNumber) => dispatch => {
    dispatch({
        type: "INITIATE_SEARCH",    // tells the reducer that we are now initiating a new search
        payload: true,
    });
    return axios.get(`/api/${query}`)
        .then(res => {
            if (pageNumber <= 1) {
                dispatch({
                    type: "MOVIE_SEARCH",
                    payload: {
                        movies: res.data.movies,
                        loading: false,
                    }
                });
                // returns the length just to know if we are at the bottom of the collection or not.
                return res.data.movies.length
            } else {
                dispatch({
                    type: "LOAD_NEW_PAGE",
                    payload: {
                        movies: res.data.movies,
                        loading: false,
                    }
                });
                return res.data.movies.length
            }
        })
};

export const OptionSearch = (index, searchName) => dispatch => {
    let queryTerm = index === 'movies' ? "movieTitle" : "genreName";
    const url = `/api/${index}/search?${queryTerm}=${searchName}&sortOn=popularity&desc=true&page=1&limit=6`;
    return axios.get(url)
        .then((res) => {
            dispatch({
                type: "FETCH_OPTIONS",
                payload: res.data[index]
            });
        })
};
