import {
  TasksState, 
  LoginState, 
  EditTaskState, 
  AlertState, 
  ReduxAction, 
  ActionTypes
} from '../../types';

export const getTasksAction = (payload:TasksState):ReduxAction => {
  return {
    type: ActionTypes.TASKS_GET,
    payload: payload
  };
};

export const editTaskAction = (payload:EditTaskState):ReduxAction => {
  return {
    type: ActionTypes.TASK_EDIT,
    payload: payload
  };
};

export const loginAction = (payload:LoginState):ReduxAction => {
  return {
    type: ActionTypes.USER_LOGIN,
    payload: payload
  };
};

export const logoutAction = (payload?:LoginState):ReduxAction => {
  return {
    type: ActionTypes.USER_LOGOUT,
    payload: payload
  };
};

export const alertAction = (payload?:AlertState):ReduxAction => {
  return {
    type: ActionTypes.ALERT_SHOW,
    payload: payload
  };
};