import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/reducers'
import { Table, Avatar } from 'antd';
import { ColumnsType } from 'antd/es/table';
import 'antd/dist/antd.css';
import { Task, DirectionTypes } from '../../types'
import { getTasks } from '../../api'


const columns: ColumnsType<Task> = [
  {
    key: 'id',
    title: '№',
    dataIndex: 'id',
    sorter: true
  },
  {
    key: 'username',
    title: 'User',
    dataIndex: 'username',
    sorter: true,
    render: (prop, item) =>
      <div><Avatar
        shape="square"
        size={64}
        style={{ margin: 10 }}
        src={item.image_path} />{prop}</div>
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sorter: true
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
    sorter: true
  }
];

function TaskTable() {
  const dispatch = useDispatch();
  const $tasks = useSelector<RootState, Task[]>((state) => state.taskState.tasks);
  const $page = useSelector<RootState, number>((state) => state.taskState.page);
  const $total = useSelector<RootState, number>((state) => state.taskState.total_task_count);

  const onTableChange = (pagination: any, filters: any, sorter: any) => {
    const newPage: number = pagination.current || 1,
      newField: string = sorter.field || "id",
      newDirection: DirectionTypes = sorter.order?
        sorter.order.includes(DirectionTypes.asc)
         ? DirectionTypes.asc 
         : DirectionTypes.desc
         : DirectionTypes.asc
    setBusy(true);
    dispatch(getTasks(newPage, newField, newDirection,()=>{setBusy(false)}));
  }

  let [busy, setBusy] = useState<boolean>(false);

  useEffect(() => {
    setBusy(true);
    dispatch(getTasks(1,"id",DirectionTypes.asc,()=>{setBusy(false)}))
  }, [])

  return (
    <Table<Task>
      columns={columns}
      size="small"
      onChange={onTableChange}
      pagination={{
        defaultPageSize: 3,
        current: $page,
        total: $total,
        hideOnSinglePage: true,
        showQuickJumper: true,
        showSizeChanger: false,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
      }}
      bordered
      loading={busy}
      sortDirections={['ascend', 'descend', 'ascend']}
      dataSource={$tasks} >
    </Table>
  );
}

export default TaskTable;
