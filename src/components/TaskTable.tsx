import React from 'react';
import { Table, Avatar, Badge } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';
import 'antd/dist/antd.css';
import { Task } from '../types';
import { StatusText, StatusColor } from '../types';

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
    responsive: ['sm'],
    render: (prop, item) =>
      <div><Avatar
        shape="square"
        size={64}
        style={{ margin: 10 }}
        src={item.image_path} />
      <div style={{ margin: '0 10px' }}>
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
    responsive: ['sm'],
  },
  {
    key: 'text',
    title: 'Task',
    dataIndex: 'text',
    sorter: true,
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

interface TaskTableType extends TableProps<Task> {
  tasks: Task[];
  page: number;
  total: number;
  busy: boolean;
}

const TaskTable: React.FC<TaskTableType> = ({
  tasks,
  page,
  total,
  busy,
  onChange,
  onRow,
}) => {

  return (
    <Table<Task>
      rowKey='id'
      columns={columns}
      size="small"
      onRow={onRow}
      onChange={onChange}
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
};

export default TaskTable;
