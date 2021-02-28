import * as t from './actionTypes';
 

// this is what our action should look like which dispatches the "payload" to reducer
const LogoutState = () => {
  return {
    type: t.SET_LOGOUT_STATE
  };
};

export default LogoutState;