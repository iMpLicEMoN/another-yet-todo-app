import {Credentials, Task, TasksState, TaskAction, ActionTypes} from '../../types';

export const getTasksAction = (payload:TasksState) => {
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

export const loginAction = (payload:any) => {
	return {
		type: ActionTypes.USER_LOGIN,
		payload: payload
	}
}