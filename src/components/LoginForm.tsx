import { Form, Input, Button, Checkbox, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

interface LoginForm {
  visible: boolean;
  onCreate: () => void;
  onCancel: () => void;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const LoginForm:React.FC<LoginForm> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
    visible={visible}
    title="Login"
    cancelText="Cancel"
    width={350}
    okButtonProps={{form:'login-form', htmlType: 'submit'}}
    onCancel={() => {
        
    }}
    footer={[
      <Button key="submit" type="primary" loading={true} onClick={()=>{}}>
        Login
      </Button>,
    ]}
  >
    <Form
      {...layout}
      id="login-form"
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>


      {/* <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> */}
    </Form>
    </Modal>
  );
};



export default LoginForm;
