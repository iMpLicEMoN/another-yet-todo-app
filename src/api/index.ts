import { DirectionTypes, DirectionTypesShort, Task, Credentials } from '../types'
import { getTasksAction, createTaskAction, editTaskAction, loginAction } from '../store/actions'

const beType = 'https';
const beIPAddress = 'uxcandy.com';
export const beEnv = 'development'
export const bePort = '443';
export const beServiceNames = {
	getTasks: '/',
	createTask: '/create',
	editTask: '/edit',
	login: '/login',
};
export const beString = `${beType}://${beIPAddress}:${bePort}/~shapoval/test-task-backend/v2`;
export const config = {
	beString: beString,
	bePort: bePort,
	beServiceNames: beServiceNames
};

export const getTasks = (page: number=1, field: string="id", direction:DirectionTypes=DirectionTypes.asc, callback?:any):any => {
	return (dispatch: any) => {
		fetch(`${beString}${beServiceNames.getTasks}?developer=Name&page=${page}&sort_field=${field}&sort_direction=${DirectionTypesShort[direction]}`, {
			method: 'GET',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer'
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				dispatch(getTasksAction({...data.message, page:page}))
				callback();
			})
	}
}

export const createTask = (task:Task):any => {
	return (dispatch: any) => {

	}
}

export const editTask = (task:Task):any => {
	return (dispatch: any) => {

	}
}

export const login = (credentials:Credentials):any => {
	return (dispatch: any) => {

	}
}