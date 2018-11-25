import axios from 'axios';


// Creating a new user and adding it to the database
export const CreateUser = (email, password) => dispatch => {
    const user = {
        email,
        password
    };
    axios.post(`api/users/signup`, user)
        .then((res) => {
            dispatch({
                type: "CREATE_USER_SUCCESS",
                payload: res.data
            })
        }).catch(err => {
        dispatch({
            type: 'CREATE_USER_ERROR',
            payload: err.response.data
        })
    })
};

//Signing an existing user to the application, so that they can view their favorite movies
export const SignInUser = (email, password) => dispatch => {
    const user = {
        email,
        password,
    };
    axios.post('api/users/signin', user)
        .then(res => {
            dispatch({
                type: 'SIGNIN_USER_SUCCESS',
                payload: res.data,
            })
            return res.data
        }).catch(err => {
        console.log(err.response);
        dispatch({
            type: 'USER_SIGNIN_ERROR',
            payload: err.response
        })
    })
};

// Changing favorite movies. If isDelete is true, you are deleting a movie from your list, opposite if false
export const ChangeFavoriteMovies = (userId, movieId, isDelete) => dispatch => {
    const body = {
        movieId,
        isDelete
    };

    axios.post(`/api/users/${userId}/favorites`, body)
        .then((res) => {
            dispatch({
                type: 'FAVORITES_CHANGED',
                payload: res.data,
            })
        }).catch(err => {
        console.log(err)
    })
};


export const FetchFavoriteMovies = (userId, pageNumber) => dispatch => {
    dispatch({
        type: "INITIATE_SEARCH",
        payload: true,
    });
    return axios.get(`/api/users/${userId}/favorites?page=${pageNumber}&limit=10`)
        .then(res => {
            if (pageNumber <= 1) {
                dispatch({
                    type: 'GET_FAVORITE_MOVIES',
                    payload: {
                        movies: res.data.movies,
                        loading: false,
                    }
                });
                return res.data.movies.length
            } else {
                console.log(res.data.movies);
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
