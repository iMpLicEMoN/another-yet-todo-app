import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio } from "antd";

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface NewTaskForm {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const NewTaskForm: React.FC<NewTaskForm> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new task"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please input Username" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },{ required: true, message: "Please input Email" }]}>
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="text" label="Text" rules={[{ required: true, message: "Please input task description" }]}>
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewTaskForm;
