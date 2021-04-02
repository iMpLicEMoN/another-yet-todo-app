import {Task, TasksState, TaskAction, ActionTypes} from '../../types';

export const getTasksAction = (payload:TasksState):TaskAction => {
  return {
    type: ActionTypes.TASKS_GET,
    payload: payload
  };
};

export const createTaskAction = (payload:Task):TaskAction => {
  return {
    type: ActionTypes.TASK_CREATE,
    payload: payload
  };
};

export const editTaskAction = (payload:any):any => {
  return {
    type: ActionTypes.TASK_EDIT,
    payload: payload
  };
};

export const loginAction = (payload:any):any => {
  return {
    type: ActionTypes.USER_LOGIN,
    payload: payload
  };
};

export const logoutAction = (payload?:any):any => {
  return {
    type: ActionTypes.USER_LOGOUT,
    payload: payload
  };
};

export const alertAction = (payload?:any) => {
  return {
    type: ActionTypes.ALERT_SHOW,
    payload: payload
  };
};