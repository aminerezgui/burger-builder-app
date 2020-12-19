import * as actionTypes from './actionTypes';

import axios from 'axios';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (idToken, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        localId: localId
    };
};

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authLogout = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

const authLogged = () => {
    return {
        type: actionTypes.AUTH_LOGGED
    };
};

const authExpiresIn = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime);
    };
};

export const auth = (email, password, signup) => {
    return dispatch => {
        dispatch(authStart());
        
        const dataToPost = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        const sign = signup ? 'signUp' : 'signInWithPassword';

        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:' + sign + '?key=AIzaSyAvsAQEw-whhVHwOIsUo7PLTu0ud4bApFE';

        axios.post(url, dataToPost)
            .then(response => {
                // console.log(response.data);

                const expirationTime = response.data.expiresIn * 1000;

                const expirationDate = new Date(new Date().getTime() + expirationTime);
                
                localStorage.setItem('idToken', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expirationDate', expirationDate);


                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(authExpiresIn(expirationTime));
                dispatch(authLogged());
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error.message));
            });

    };
};

export const checkAuthState = () => {
    return dispatch => {
        const idToken = localStorage.getItem('idToken');

        if(!idToken){
            dispatch(authLogout());
        }
        else{
            const expirationDate = localStorage.getItem('expirationDate');

            if(new Date() < new Date(expirationDate)){
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(idToken, userId));
                dispatch(authExpiresIn(new Date(expirationDate).getTime() - new Date().getTime()));
                dispatch(authLogged());
            }
            else{
                dispatch(authLogout());
            }
        }
    };
};
