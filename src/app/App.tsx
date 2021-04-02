import React, { useEffect, useState } from "react";
import { Layout, Alert, Button, Menu } from "antd";
import TaskTable from "../components/TaskTable";
import AlertMessage from "../components/AlertMessage";
import NewTaskForm from "../components/NewTaskForm";
import EditTaskForm from "../components/EditTaskForm";
import LoginForm from "../components/LoginForm"
import { getTasks, createTask, editTask, login, logout, tokenLifeTime } from '../api'
import { loginAction, editTaskAction, alertAction } from '../store/actions'
import { Task, DirectionTypes, NewTaskValues } from '../types'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/reducers'
import { loadState, saveState } from "../utils/localStorage";

function App() {
  const { Header, Content } = Layout;
  const dispatch = useDispatch();
  const $tasks = useSelector<RootState, Task[]>((state) => state.taskState.tasks);
  const $page = useSelector<RootState, number>((state) => state.taskState.page);
  const $total = useSelector<RootState, number>((state) => state.taskState.total_task_count);
  const $loginState = useSelector<RootState, any>((state) => state.loginState);
  const $editState = useSelector<RootState, any>((state) => state.editState);
  const $alertState = useSelector<RootState, any>((state) => state.alertState);

  let [busy, setBusy] = useState<boolean>(false);
  let [loginModal, setLoginModal] = useState<boolean>(false);
  let [newTaskModal, setNewTaskModal] = useState<boolean>(false);
  let [editTaskModal, setEditTaskModal] = useState<boolean>(false);

  const onTableChange = (pagination: any, filters: any, sorter: any) => {
    const newPage: number = pagination.current || 1,
      newField: string = sorter.field || "id",
      newDirection: DirectionTypes = sorter.order ?
        sorter.order.includes(DirectionTypes.asc)
          ? DirectionTypes.asc
          : DirectionTypes.desc
        : DirectionTypes.asc
    setBusy(true);
    dispatch(getTasks(newPage, newField, newDirection, () => {
      setBusy(false);
    }));
  }

  const onCreateTask = ({username, email, text}:NewTaskValues)=>{
    setBusy(true);
    setNewTaskModal(false);
    const form = new FormData();
    form.append("username", username);
    form.append("email", email);
    form.append("text", text);
    dispatch(createTask(form,()=>{
      dispatch(getTasks($page));
      setBusy(false);
    }));
  }

  const onEditTask = ({text, status}:any)=>{
    setBusy(true);
    setEditTaskModal(false);
    const form = new FormData();
    form.append("text", text);
    form.append("status", status);
    form.append("token", $loginState.token);
    dispatch(editTask($editState.id,form,()=>{
      dispatch(getTasks($page));
      setBusy(false);
    }));
  }

  const onLogin = (values:any) => {
    const form = new FormData();
    form.append("username", values.username);
    form.append("password", values.password);
    dispatch(login(form, (data:any)=>{
      setLoginModal(false);
    }))
  }

  const tokenChecking = () => {
    setBusy(true);
    dispatch(getTasks(1, "id", DirectionTypes.asc, () => {
      setBusy(false);
    }))
    const localStorage = loadState();
    console.log(localStorage)
    if (localStorage) {
      const now = new Date().getTime();
      if (now-localStorage.timeStamp<tokenLifeTime){
        dispatch(loginAction(localStorage));
      } else {
        saveState({});
      }
    }
  }

  useEffect(() => {
    tokenChecking();
  }, [])

  return (
    <Layout>

      <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
       {$loginState.login ? 
        <Menu.Item key="1">{$loginState.login}</Menu.Item>
        :<Menu.Item key="1" onClick={()=>{setLoginModal(true)}}>{"Sign Up"}</Menu.Item>}
        {$loginState.login && 
          <Menu.Item key="2" 
            onClick={()=>{
              dispatch(logout(()=>{
                setLoginModal(false)
              }))}}>
            Logout
          </Menu.Item>}
       </Menu>
      </Header>

      <Content style={{ margin: "20px 20px" }}>

        <Button
          style={{ margin: "10px 10px" }}
          type="primary"
          onClick={() => {
            setNewTaskModal(true);
          }}>
          Create Task
        </Button>

        <NewTaskForm 
          visible={newTaskModal} 
          onCreate={onCreateTask} 
          onCancel={() => {
            setNewTaskModal(false);
            }} />

        <LoginForm 
          visible={loginModal} 
          onLogin={onLogin} 
          onCancel={() => {
            setLoginModal(false);
            }} />

        <EditTaskForm 
          visible={ editTaskModal }
          data={$editState}
          onSubmit={onEditTask}
          busy={busy}
          onCancel={() => {
            setEditTaskModal(false);
            }} />

        <TaskTable
          tasks={$tasks}
          page={$page}
          total={$total}
          busy={busy}
          onRow={(record, rowIndex)=>{
            return {
              onClick: (event:Event)=>{
                if ($loginState.login){
                  dispatch(editTaskAction(record));
                  setEditTaskModal(true);
                } else {
                  dispatch(alertAction({
                    message: "Information", 
                    type: "info", 
                    description: "You are not allowed to edit tasks. Please Log in."}));
                }
              }
            }
          }}
          onTableChange={onTableChange} />

        {$alertState.message &&
          <AlertMessage
          message={$alertState.message}
          type={$alertState.type}
          description={$alertState.description}

        />}
      </Content>
    </Layout>
  );
}

export default App;
