import {Credentials, Task, TasksState, TaskAction, ActionTypes} from '../../types';

export const getTasksAction = (payload:TasksState) => {
	console.log(payload)
	return {
		type: ActionTypes.TASKS_GET,
		payload: payload
	} as TaskAction
}

export const createTaskAction = (payload:Task) => {
	return {
		type: ActionTypes.TASK_CREATE,
		payload: payload
	} as TaskAction
}

export const editTaskAction = (payload:Task) => {
	return {
		type: ActionTypes.TASK_EDIT,
		payload: payload
	} as TaskAction
}

export const loginAction = (payload:Credentials) => {
	return {
		type: ActionTypes.USER_LOGIN,
		payload: payload
	} as TaskAction
}