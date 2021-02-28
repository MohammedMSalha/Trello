import { initialState } from '../initialState';
import * as t from '../actions/actionTypes';

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case t.SET_LOGIN_STATE:
        return {
          ...state,
          ...action.payload, // this is what we expect to get back from API call and login page input
          isLoggedIn: true, // we set this as true on login
        };
    case t.SET_LOGOUT_STATE:
        return {
          initialState, 
          isLoggedIn: false
        };
    default:
      return state;
  }
};