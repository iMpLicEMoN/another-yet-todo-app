import React from 'react';
import { Table, Avatar, Badge } from 'antd';
import { ColumnsType } from 'antd/es/table';
import 'antd/dist/antd.css';
import { Task } from '../types'

const columns: ColumnsType<Task> = [
  {
    key: 'id',
    title: '№',
    dataIndex: 'id',
    sorter: true,
    width: 60,
  },
  {
    key: 'username',
    title: 'User',
    dataIndex: 'username',
    sorter: true,
    width: 100,
    render: (prop, item) =>
      <div><Avatar
        shape="square"
        size={64}
        style={{ margin: 10 }}
        src={item.image_path} />
        <div style={{ margin: "0 10px" }}>
          {prop}
        </div>
      </div>
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sorter: true,
    width: 200,
  },
  {
    key: 'text',
    title: 'Task',
    dataIndex: 'text',
    sorter: true
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    sorter: true,
    width: 150,
    render: (prop) =>
      <Badge color={StatusColor[prop]} text={StatusText[prop]} />
  }
];

enum StatusText {
  "Incomplete" = 0,
  "Incomplete, edited" = 1,
  "Done" = 10,
  "Done, edited" = 11,
}

enum StatusColor {
  "blue" = 0,
  "cyan" = 1,
  "green" = 10,
  "lime" = 11,
}

type status = 0|1|10|11;

interface TaskTableType {
  tasks: Task[];
  page: number;
  total: number;
  busy: boolean;
  onTableChange: (pagination: any, filters: any, sorter: any) => void;
}

const TaskTable: React.FC<TaskTableType> = ({
  tasks,
  page,
  total,
  busy,
  onTableChange
}) => {

  return (
    <Table<Task>
      rowKey='id'
      columns={columns}
      size="small"
      onChange={onTableChange}
      pagination={{
        defaultPageSize: 3,
        current: page,
        total: total,
        hideOnSinglePage: true,
        showQuickJumper: true,
        showSizeChanger: false,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
      }}
      bordered
      loading={busy}
      sortDirections={['ascend', 'descend', 'ascend']}
      dataSource={tasks} >
    </Table>
  );
}

export default TaskTable;
