import React from 'react';
// import moment from 'moment';
import { Input } from 'antd';
const { TextArea } = Input;
export default (self) => [
  {
    title: '标题',
    name: 'article_title',
    tableItem: {
      width: 120,
      fixed: 'left',
    },
    formItem: {},
    searchItem: {}
  },
  {
    title: '操作',
    tableItem: {
      width: 180,
      render: (text, record) => (
        <DataTable.Oper>
          <Button tooltip="修改" onClick={e => self.onUpdate(record)}>
            <Icon type="edit" />
          </Button>
          <Button tooltip="删除" onClick={e => self.onDelete(record)}>
            <Icon type="trash" />
          </Button>
          <Button tooltip="跳转到新路由">
            <Link to={"/crud/detail?id=" + record.id}>
              <Icon type="link" antd />
            </Link>
          </Button>
        </DataTable.Oper>
      )
    }
  }
];