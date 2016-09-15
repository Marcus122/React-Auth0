import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import postsReducer from './posts_reducer';

const rootReducer = combineReducers({
    form,
    auth:authReducer,
    posts:postsReducer
});

export default rootReducer;
