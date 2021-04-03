import {TasksState, ReduxAction, ActionTypes} from '../../types';

const initState:TasksState = {
  total_task_count: 0,
  page: 1,
  tasks: [],
};

export const taskReducer = (state = initState, action:ReduxAction):TasksState => {
  switch (action.type) {   
  case ActionTypes.TASKS_GET: return {
    ...state,
    ...action.payload,
  };

  default: 
    return state;
  }
	
};