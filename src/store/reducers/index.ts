import { combineReducers } from "redux";
import { taskReducer } from "./taskReducer"
import { loginReducer } from "./loginReducer"

export const rootReducer = combineReducers({
    taskState: taskReducer,
    loginState: loginReducer
})

export type RootState = ReturnType<typeof rootReducer>