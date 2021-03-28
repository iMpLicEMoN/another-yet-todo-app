export enum ActionTypes {
	TASK_CREATE = "TASK_CREATE",
	TASK_EDIT = "TASK_EDIT",
	TASKS_GET = "TASKS_GET",
}

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
	payload?: TasksState;
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