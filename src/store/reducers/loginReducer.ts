import { ActionTypes } from '../../types';

const initState = {
	username: "",
	token: "",
	timeStamp: 0,
}

export const loginReducer = (state = initState, action:any) => {
	console.log(action)
	switch (action.type) {   
		case ActionTypes.USER_LOGIN: return {
			...state,
			login: action.payload?.username,
			token: action.payload?.token,
			timeStamp: action.payload?.timeStamp,
		}

		case ActionTypes.USER_LOGOUT: return {
			...initState,
		}

		default: 
			return state;
	}
	
}