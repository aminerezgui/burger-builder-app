import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('reducer', () => {
    it('should return the initial state when any action passed', () => {
        const initialState = {
            idToken: null,
            userId: null,
            error: null,
            loading: false,
            logged: false
        };

        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should set the idToken when AUTH_SUCCESS action is passed', () => {
        const action = {
            type: actionTypes.AUTH_SUCCESS,
            idToken: "some-idToken",
            localId: 'some-localId'
        };

        const stateAfter = {
            idToken: "some-idToken",
            userId: "some-localId",
            error: null,
            loading: false,
            logged: false
        };

        expect(reducer(undefined, action)).toEqual(stateAfter);
    });
});
