import { Form, Input, Button, Modal } from 'antd';

interface LoginFormType {
  visible: boolean;
  onLogin: (values:any) => void;
  onCancel: () => void;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const LoginForm:React.FC<LoginFormType> = ({
  visible,
  onLogin,
  onCancel,
}) => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Login"
      cancelText="Cancel"
      width={350}
      okButtonProps={{form:'login-form', htmlType: 'submit'}}
      onCancel={onCancel}
      footer={[
        <Button key="submit" type="primary" loading={false} onClick={(event) => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onLogin(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}>
        Login
        </Button>,
      ]}
    >
      <Form
        {...layout}
        form={form}
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

      </Form>
    </Modal>
  );
};



export default LoginForm;
