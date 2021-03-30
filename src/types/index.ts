export enum ActionTypes {
	TASK_CREATE = "TASK_CREATE",
	TASK_EDIT = "TASK_EDIT",
	TASKS_GET = "TASKS_GET",
	USER_LOGIN = "USER_LOGIN",
}

export type statusType = 0|1|10|11;

export enum DirectionTypes{
	asc = "ascend",
	desc = "descend",
}

export enum DirectionTypesShort{
	ascend = "asc",
	descend = "desc",
}

export interface TasksState {
	total_task_count: number;
	page: number;
	tasks: Task[];
}

export interface TaskAction{
	type: ActionTypes;
	payload?: any;
}

export interface Credentials{
	login: string;
	password: any;
}

export interface Task {
	key: number;
	id: number;
	username: string;
	email: string;
	text: string,
	status: number,
	image_path: string
  }
  
export type TaskSort = {
	field: string;
	direction: string;
  }

export interface NewTaskValues {
	username: string;
	email: string;
	text: string;
  }