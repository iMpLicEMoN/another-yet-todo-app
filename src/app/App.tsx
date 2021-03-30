import React, { useEffect, useState } from "react";
import { Layout, Menu, Alert, Button } from "antd";
import TaskTable from "../components/TaskTable";
import AlertMessage from "../components/AlertMessage";
import NewTaskForm from "../components/NewTaskForm";
import LoginForm from "../components/LoginForm"
import { getTasks, createTask, editTask, login, tokenLifeTime } from '../api'
import { loginAction } from '../store/actions'
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
  let [busy, setBusy] = useState<boolean>(false);
  let [loginModal, setLoginModal] = useState<boolean>(false);
  let [newTaskModal, setNewTaskModal] = useState<boolean>(false);

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
      setBusy(false)
    }));
  }

  const onCreateTask = ({username, email, text}:NewTaskValues)=>{
    setBusy(true);
    const form = new FormData();
    form.append("username", username);
    form.append("email", email);
    form.append("text", text);
    dispatch(createTask(form,()=>{dispatch(getTasks($page));setBusy(false)}));
  }

  const onLogin = (values:any) => {
    const form = new FormData();
    form.append("username", values.username);
    form.append("password", values.password);
    dispatch(login(form, (data:any)=>{
      saveState({username: values.username, token: data.message.token, timeStamp: new Date().getTime()})
    }))
  }

  useEffect(() => {
    setBusy(true);
    dispatch(getTasks(1, "id", DirectionTypes.asc, () => {setBusy(false)}))
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
    
  }, [])

  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1" onClick={()=>{setLoginModal(true)}}>{$loginState.login||"Sign Up"}</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ margin: "20px 20px" }}>
        <Button
          style={{ margin: "10px 10px" }}
          type="primary"
          onClick={() => {setNewTaskModal(true)}}
        >
          Create Task
        </Button>
        <NewTaskForm 
          visible={newTaskModal} 
          onCreate={onCreateTask} 
          onCancel={() => {setNewTaskModal(false)}} />
        <LoginForm 
          visible={loginModal} 
          onLogin={onLogin} 
          onCancel={() => {setLoginModal(false)}} />

        <TaskTable
          tasks={$tasks}
          page={$page}
          total={$total}
          busy={busy}
          onTableChange={onTableChange} />
        {/* <Alert
          style={{
            position: "fixed",
            top: "80px",
            left: "33%",
            width: "33%"
          }}
          message="Success"
          type="success"
          showIcon={true}
        /> */}
      </Content>
    </Layout>
  );
}

export default App;
