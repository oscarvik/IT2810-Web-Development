const initState = {
    user: null,
    message: null,
    loggedIn: false,
    token: null
};

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_USER_SUCCESS':
            return {
                ...state,
                user: action.payload.user,
                loggedIn: true
            };
        case 'CREATE_USER_ERROR':
            return {
                ...state,
                user: null,
                message: action.payload.message,
            };
        case 'SIGNIN_USER_SUCCESS':
            return {
                ...state,
                user: action.payload.user,
                loggedIn: true,
                token: action.payload.token,

            };
        case 'USER_SIGNIN_ERROR':
            return {
                ...state,
                user: null,
                message: action.payload.data.message,
                loggedIn: false,
            };
        case 'FAVORITES_CHANGED':
            return {
                ...state,
                user: action.payload.user
            };
        default:
            return state
    }
};

export default AuthReducer