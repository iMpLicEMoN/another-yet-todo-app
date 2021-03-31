import { combineReducers } from "redux";
import { taskReducer } from "./tasksReducer"
import { loginReducer } from "./loginReducer"
import { editTaskReducer } from "./editTaskReducer"

export const rootReducer = combineReducers({
    taskState: taskReducer,
    loginState: loginReducer,
    editState: editTaskReducer,
})

export type RootState = ReturnType<typeof rootReducer>