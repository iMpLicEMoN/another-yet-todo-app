import { combineReducers } from 'redux';
import { taskReducer } from './tasksReducer';
import { loginReducer } from './loginReducer';
import { editTaskReducer } from './editTaskReducer';
import { alertReducer } from './alertReducer';

export const rootReducer = combineReducers({
  taskState: taskReducer,
  loginState: loginReducer,
  editState: editTaskReducer,
  alertState: alertReducer,
});

export type RootState = ReturnType<typeof rootReducer>