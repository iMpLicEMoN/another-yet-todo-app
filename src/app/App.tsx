import React, { useEffect } from "react";
import { Layout, Menu, Alert, Button } from "antd";
import TaskTable from "../components/TaskTable";
import AlertMessage from "../components/AlertMessage";
import NewTaskForm from "../components/NewTaskForm";
import LoginForm from "../components/LoginForm"
import { getTasks, createTask, editTask, login } from '../api'
import { Task, DirectionTypes } from '../types'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/reducers'

function App() {
  const { Header, Content } = Layout;
  const dispatch = useDispatch();
  const $tasks = useSelector<RootState, Task[]>((state) => state.taskState.tasks);
  const $page = useSelector<RootState, number>((state) => state.taskState.page);
  const $total = useSelector<RootState, number>((state) => state.taskState.total_task_count);

  const onTableChange = (pagination: any, filters: any, sorter: any) => {
    const newPage: number = pagination.current || 1,
      newField: string = sorter.field || "id",
      newDirection: DirectionTypes = sorter.order ?
        sorter.order.includes(DirectionTypes.asc)
          ? DirectionTypes.asc
          : DirectionTypes.desc
        : DirectionTypes.asc
    // setBusy(true);
    dispatch(getTasks(newPage, newField, newDirection, () => {
      // setBusy(false)
    }));
  }

  // let [busy, setBusy] = useState<boolean>(false);

  useEffect(() => {
    // setBusy(true);
    dispatch(getTasks(1, "id", DirectionTypes.asc, () => {
      // setBusy(false)
    }))
  }, [])

  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">Sign Up</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ margin: "20px 20px" }}>
        <Button
          style={{ margin: "10px 10px" }}
          type="primary"
          onClick={() => {

          }}
        >
          Create Task
        </Button>
        {/* <NewTaskForm visible={true} onCreate={() => {}} onCancel={() => {}} /> */}
        {/* <LoginForm visible={true} onCreate={() => {}} onCancel={() => {}} /> */}

        <TaskTable
          tasks={$tasks}
          page={$page}
          total={$total}
          busy={false}
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
