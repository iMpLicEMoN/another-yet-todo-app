import { ReduxAction, ActionTypes, AlertState} from '../../types';

const initState:AlertState = {
  message: '',
  type: undefined,
  description: '',
};

export const alertReducer = (state = initState, action:ReduxAction):AlertState => {
  switch (action.type) {   
  case ActionTypes.ALERT_SHOW: return {
    ...state,
    ...action.payload,
  };

  default: 
    return state;
  }
};