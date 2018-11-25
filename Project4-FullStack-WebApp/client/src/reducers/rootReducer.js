import AuthReducer from './authReducer';
import MovieReducer from './movieReducer';
import OptionReducer from './optionReducer'
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    auth: AuthReducer,
    movie: MovieReducer,
    options: OptionReducer,
});

export default rootReducer;