import { ActionTypes, ReduxAction, LoginState } from '../../types';

const initState:LoginState = {
  username: '',
  token: '',
  timeStamp: 0,
};

export const loginReducer = (state = initState, action:ReduxAction):LoginState => {
  switch (action.type) {   
  case ActionTypes.USER_LOGIN: return {
    ...state,
    ...action.payload,
  };

  case ActionTypes.USER_LOGOUT: return {
    ...initState,
  };

  default: 
    return state;
  }
	
};