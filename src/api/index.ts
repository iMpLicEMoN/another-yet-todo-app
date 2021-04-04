import { DirectionTypes, DirectionTypesShort } from '../types';
import { getTasksAction, loginAction, logoutAction, alertAction } from '../store/actions';
import { saveState } from '../utils/localStorage';
import { Dispatch } from 'react';
import { AnyAction } from 'redux';
 
const beType = 'https';
const beIPAddress = 'uxcandy.com';
export const beEnv = 'development';
export const bePort = '443';
const beDevName = 'Name';
export const beServiceNames = {
  getTasks: '/',
  createTask: '/create',
  editTask: '/edit',
  login: '/login',
};
export const tokenLifeTime = 86400000;
export const beString = `${beType}://${beIPAddress}:${bePort}/~shapoval/test-task-backend/v2`;
export const config = {
  beString: beString,
  bePort: bePort,
  beServiceNames: beServiceNames
};

export const getTasks = (page = 1, field = 'id', direction: DirectionTypes = DirectionTypes.asc, callback?:CallableFunction):CallableFunction => {
  return (dispatch:Dispatch<AnyAction>) => {
    fetch(`${beString}${beServiceNames.getTasks}?developer=${beDevName}&page=${page}&sort_field=${field}&sort_direction=${DirectionTypesShort[direction]}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    }).then((res) => {return res.json();})
      .then((data) => {
        dispatch(getTasksAction({ ...data.message, page: page, sorter:{field:field, direction:direction} }));
        if (callback) callback(data);
      });
  };
};

export const createTask = (form:FormData, callback?:CallableFunction):CallableFunction => {
  return (dispatch:Dispatch<AnyAction>) => {
    fetch(`${beString}${beServiceNames.createTask}?developer=${beDevName}`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: form
    }).then((res) => {return res.json();})
      .then((data) => {
        dispatch(alertAction({
          message: 'Success', 
          type: 'success', 
          description: 'New task was created'}));
        if (callback) callback(data);
      });
  };
};

export const editTask = (id:string, form:FormData, callback?:CallableFunction):CallableFunction => {
  return (dispatch:Dispatch<AnyAction>) => {
    fetch(`${beString}${beServiceNames.editTask}/${id}?developer=${beDevName}`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: form
    }).then((res) => {return res.json();})
      .then((data) => {
        dispatch(alertAction({
          message: 'Success', 
          type: 'success', 
          description: 'Task was successfully edited'}));
        if (callback) callback(data);
      });
  };
};

export const login = (form: FormData, callback?:CallableFunction):CallableFunction => {
  const username = form.get('username')?.toString()||'';
  return (dispatch:Dispatch<AnyAction>) => {
    fetch(`${beString}${beServiceNames.login}?developer=${beDevName}`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: form
    }).then((res) => {return res.json();})
      .then((data) => {
        if (data.message.token){
          saveState({username: username, token: data.message.token, timeStamp: new Date().getTime()});
          dispatch(alertAction({
            message: 'Success', 
            type: 'success', 
            description: 'You are logged in'}));
          dispatch(loginAction({token: data.message.token, username: username}));
        } else {
          dispatch(alertAction({
            message: 'Error', 
            type: 'error', 
            description: 'User not exist or password not match'}));
        }
        if (callback) callback(data);
      });
  };
};

export const logout = (callback?:CallableFunction):CallableFunction => {
  return (dispatch:Dispatch<AnyAction>) => {
    dispatch(logoutAction());
    dispatch(alertAction({
      message: 'Success', 
      type: 'success', 
      description: 'Logging out. Goodbye'}));
    saveState({});
    if (callback) callback();
  };
};