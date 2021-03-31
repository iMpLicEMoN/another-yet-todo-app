import { DirectionTypes, DirectionTypesShort, statusType, Credentials } from '../types'
import { getTasksAction, createTaskAction, editTaskAction, loginAction, logoutAction } from '../store/actions'

const beType = 'https';
const beIPAddress = 'uxcandy.com';
export const beEnv = 'development'
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

export const getTasks = (page: number = 1, field: string = "id", direction: DirectionTypes = DirectionTypes.asc, callback?: any): any => {
	return (dispatch: any) => {
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
			dispatch(getTasksAction({ ...data.message, page: page }))
			if (callback) callback(data);
		})
	}
}

export const createTask = (form:FormData, callback?:any): any => {
	return (dispatch: any) => {
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
			if (callback) callback(data);
		})
	}
}

export const editTask = (text:string, status:statusType, callback?:any): any => {
	return (dispatch: any) => {
		fetch(`${beString}${beServiceNames.editTask}?developer=${beDevName}`, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			redirect: 'follow',
			referrerPolicy: 'no-referrer'
		}).then((res) => {return res.json();})
		.then((data) => {
			if (callback) callback(data);
		})
	}
}

export const login = (form: FormData, callback?:any): any => {
	return (dispatch: any) => {
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
			dispatch(loginAction({token: data.message.token, username: form.get("username")}))
			if (callback) callback(data);
		})
	}
}

export const logout = (callback?:any): any => {
	return (dispatch: any) => {
		dispatch(logoutAction())
		if (callback) callback();
	}
}