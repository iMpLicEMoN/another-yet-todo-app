import React, { useEffect } from 'react';
import { Modal, Form, Input, Radio, Badge } from 'antd';
import { StatusText, StatusColor } from '../types';

interface EditTaskFormType {
  visible: boolean;
  data:any;
  busy:boolean;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

const EditTaskForm: React.FC<EditTaskFormType> = ({
  visible,
  data,
  busy,
  onSubmit,
  onCancel,
}) => {

  const [form] = Form.useForm();
  useEffect(()=>{
    form.setFieldsValue(data);
  },[data, form]);
  
  return (
    <Modal
      visible={visible}
      title={'Edit task '+data.id}
      okText="Submit"
      confirmLoading={busy}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={(event) => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onSubmit(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select status!' }]}>
          <Radio.Group>
            <Radio style={radioStyle} value={0}>
              <Badge color={StatusColor[0]} text={StatusText[0]} />
            </Radio>
            <Radio style={radioStyle} value={1}>
              <Badge color={StatusColor[1]} text={StatusText[1]} />
            </Radio>
            <Radio style={radioStyle} value={10}>
              <Badge color={StatusColor[10]} text={StatusText[10]} />
            </Radio>
            <Radio style={radioStyle} value={11}>
              <Badge color={StatusColor[11]} text={StatusText[11]} />
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="text" label="Text" rules={[{ required: true, message: 'Please input task description' }]}>
          <Input type="textarea"/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTaskForm;
