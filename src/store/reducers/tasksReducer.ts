import {TasksState, TaskAction, ActionTypes} from '../../types';

const initState = {
  total_task_count: 0,
  page: 1,
  tasks: [],
} as TasksState;

export const taskReducer = (state = initState, action:TaskAction):TasksState => {
  console.log(action);
  switch (action.type) {   
  case ActionTypes.TASKS_GET: return {
    ...state,
    tasks: action.payload?.tasks,
    total_task_count: action.payload?.total_task_count,
    page: action.payload?.page,
  } as TasksState;

  default: 
    return state;
  }
	
};