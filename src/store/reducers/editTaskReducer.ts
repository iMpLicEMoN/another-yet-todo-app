import { ActionTypes, EditTaskState, ReduxAction } from '../../types';

const initState:EditTaskState = {
  id: '',
  text: '',
  status: 0,
};

export const editTaskReducer = (state = initState, action:ReduxAction):EditTaskState => {
  switch (action.type) {   
  case ActionTypes.TASK_EDIT: return {
    ...state,
    ...action.payload,
  };

  default: 
    return state;
  }
};