import React, { useState, useEffect } from 'react';
import { beString, beServiceNames } from '../config';
import { Table, Avatar } from 'antd';
import { ColumnsType } from 'antd/es/table';
import 'antd/dist/antd.css';

interface Task {
  key: number;
  id: number;
  username: string;
  email: string;
  text: string,
  status: number,
  image_path: string
}

type TaskSort = {
  field: string;
  direction: string;
}

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
  let [tasks, setTasks] = useState<Task[]>([]);
  let [page, setPage] = useState<number>(1);
  let [totalPages, setTotalPages] = useState<number>(1);
  let [busy, setBusy] = useState<boolean>(false);
  let [sort, setSort] = useState<TaskSort>({ field: "id", direction: "asc" });

  useEffect(() => {
    fetch(`${beString}${beServiceNames.getTasks}&page=${page}&sort_field=${sort.field}&sort_direction=${sort.direction}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    })
      .then((res) => {
        setBusy(true);
        return res.json();
      })
      .then((data) => {
        setTasks(data.message.tasks);
        setTotalPages(data.message.total_task_count)
        setBusy(false);
      })
  }, [page, sort])

  return (
    <Table<Task>
      columns={columns}
      size="small"
      onChange={(pagination, filters, sorter: any) => {
        setSort((prev): TaskSort => ({
          field: sorter.column ? sorter.field : "id",
          direction: sorter.column ? sorter.order.includes("asc") ? "asc" : "desc" : "asc"
        }));
      }}
      pagination={{
        defaultPageSize: 3,
        current: page,
        total: totalPages,
        hideOnSinglePage: true,
        showQuickJumper: true,
        showSizeChanger: false,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        onChange: (page) => { setPage(page) }
      }}
      bordered
      sortDirections={["ascend", "descend"]}
      loading={busy}
      dataSource={tasks} >
    </Table>
  );
}

export default TaskTable;
