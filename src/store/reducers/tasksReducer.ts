import {TasksState, ReduxAction, ActionTypes, DirectionTypes} from '../../types';

const initState:TasksState = {
  total_task_count: 0,
  page: 1,
  sorter:{
    field:'id', 
    direction:DirectionTypes.asc,
  },
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