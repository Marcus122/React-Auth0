import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_POSTS, FETCH_USER_POSTS, GET_PROFILE, PROFILE_UPDATED, POST_CREATED } from './types';
import Auth0Lock from 'auth0-lock';

const clientId ='7kXfnR65i6pMiRPN7N7fWLAjlqlCflqZ';
const domain = 'marcusatty.eu.auth0.com';
const ROOT_URL = 'http://localhost:3090';
const lock = new Auth0Lock(clientId, domain, {
    auth: {
        redirectUrl: 'http://localhost:8080',
        responseType: 'token'
    }
});

export function authInit(){
    return function(dispatch){
        lock.on('authenticated', function(authResult){
            localStorage.setItem('token', authResult.idToken);
            dispatch({type:AUTH_USER});
            browserHistory.push('/profile');
        });
    }
}

export function signinUser(){
    lock.show();
    return {type:UNAUTH_USER};
}

export function getProfile(){
    return function(dispatch){
        lock.getProfile(localStorage.getItem('token'), (error, profile) => {
            dispatch({type:GET_PROFILE,payload:profile});
        });
    }
}

export function authError(error){
    return{
        type:AUTH_ERROR,
        payload:error
    }
}

export function signoutUser(){
    localStorage.removeItem('token');
    return {type:UNAUTH_USER}
}

export function fetchUserPosts(){
    return function(dispatch){
        axios.get(`${ROOT_URL}/api/userPosts`,{
            headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}
        })
        .then(response => {
            dispatch({
                type: FETCH_USER_POSTS,
                payload: response.data
            })
        })
        .catch(response => {
            dispatch(authError(response.response.data.error));
            if(response.response.status === 401){
                dispatch({
                    type: UNAUTH_USER
                });
            }
        });
    }
}

export function fetchPosts(){
    return function(dispatch){
        axios.get(`${ROOT_URL}/api/posts`)
        .then(response => {
            dispatch({
                type: FETCH_POSTS,
                payload: response.data
            })
        });
    }
}

export function createPost(){
    return function(dispatch){
        var title = new Date().toLocaleTimeString();
        axios({
            method:"post",
            url:`${ROOT_URL}/api/posts`,
            headers:{Authorization: 'Bearer ' + localStorage.getItem('token')},
            data:{title:"Test " + title ,content:"Testing"}
        })
        .then(response => {
            dispatch(fetchUserPosts());
        })
        .catch(response => {
            dispatch(authError(response.message));
            if(response.response.status === 401){
                dispatch({
                    type: UNAUTH_USER
                });
            }
        });
    }
}

export function updateProfile(userId, data){
    return function(dispatch){
        axios({
            method:"patch",
            url:`https://${domain}/api/v2/users/${userId}`,
            headers:{Authorization: 'Bearer ' + localStorage.getItem('token'),Accept:'application/json',"Content-Type":"application/json"},
            data:{user_metadata:data}
        })
        .then(response => {
            dispatch({
                type: PROFILE_UPDATED,
                payload:response.data
            });
        })
        .catch(response => {
            dispatch(authError(response.message));
            if(response.response.status === 401){
                dispatch({
                    type: UNAUTH_USER
                });
            }
        });
    }
}