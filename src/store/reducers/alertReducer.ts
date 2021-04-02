import {TasksState, TaskAction, ActionTypes} from '../../types';

const initState = {
  message: '',
  type: '',
  description: '',
};

export const alertReducer = (state = initState, action:any) => {
  console.log(action);
  switch (action.type) {   
  case ActionTypes.ALERT_SHOW: return {
    ...state,
    message: action.payload?.message,
    type: action.payload?.type,
    description: action.payload?.description,
  };

  default: 
    return state;
  }
	
};