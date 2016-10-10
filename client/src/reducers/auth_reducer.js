import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_USER_POSTS, GET_PROFILE, PROFILE_UPDATED, POST_CREATED, IMAGE_UPLOADED } from '../actions/types';

export default function(state={},action){
    switch(action.type){
        case AUTH_USER:
            return {...state, error:'',authenticated: true};
        case UNAUTH_USER:
            return {...state, error:'',authenticated: false, profile:null};
        case AUTH_ERROR:
            return {...state,error:action.payload};
        case FETCH_USER_POSTS:
            return {...state, posts:action.payload};
        case GET_PROFILE:
            return {...state, profile: action.payload}
        case PROFILE_UPDATED:
            return {...state, profile: action.payload}
        case IMAGE_UPLOADED:
            return {...state, image: action.payload}
    }
    return state;
}