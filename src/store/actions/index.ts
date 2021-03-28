import {TasksState, TaskAction, ActionTypes} from '../../types';

export const getTasksAction = (payload:TasksState):TaskAction => {
	return {
		type: ActionTypes.TASKS_GET,
		payload: payload
	} as TaskAction
}