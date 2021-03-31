import { ActionTypes } from '../../types';

const initState = {
	id: "",
	text: "",
	status: 0,
}

export const editTaskReducer = (state = initState, action:any) => {
	console.log(action)
	switch (action.type) {   
		case ActionTypes.TASK_EDIT: return {
			...state,
			id: action.payload?.id,
			text: action.payload?.text,
			status: action.payload?.status,
		}

		default: 
			return state;
	}
	
}