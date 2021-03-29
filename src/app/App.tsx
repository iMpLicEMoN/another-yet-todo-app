import React from "react";
import { Layout, Menu, Space } from "antd";
import TaskTable from "../components/TaskTable";
import NewTaskForm from "../components/NewTaskForm";
import LoginForm from "../components/LoginForm"
import { Button } from "antd";

function App() {
  const { Header, Content, Footer } = Layout;
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
        {/* <NewTaskForm visible={true} onCreate={() => {}} onCancel={() => {}} />
        <LoginForm visible={true} onCreate={() => {}} onCancel={() => {}} /> */}
        <TaskTable />
        
      </Content>
    </Layout>
  );
}

export default App;
