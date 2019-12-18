import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import { Link } from 'dva/router';
const Tip = DataTable.Tip; //打开列提示宽度
// eslint-disable-next-line no-sparse-arrays
export default (self) => [
  {
    title: '用户名',
    name: 'uname',
    tableItem: {
      width: 120,
      fixed: 'left',
      render: text => <Tip>{text }</Tip>
    },
    formItem: {},
    searchItem: {}
  },
  {
    title: '密码',
    name: 'upwd',
    tableItem: { width: 200,},
    formItem: {},
    searchItem: {}
  },
  {
    title: '邮箱',
    name: 'email',
    tableItem: { width: 200,},
    formItem: {},
    searchItem: {}
  },
  {
    title: '手机号',
    name: 'phone',
    tableItem: { width: 200,},
    formItem: {},
    searchItem: {}
  },
  {
    title: '图片',
    name: 'avatar',
    tableItem: { width: 200,},
    formItem: {},
    searchItem: {}
  },
  {
    title: '姓名',
    name: 'user_name',
    tableItem: { width: 200,},
    formItem: {},
    searchItem: {}
  },
  ,
  {
    title: '性别',
    name: 'gender',
    dict: [
      {code: 1, codeName: '男'},
      {code: 0, codeName: '女'}
  ],
    tableItem: { width: 200,},
    formItem: { type: 'radio'},
    searchItem: {}
  },
  {
    title: '操作',
    tableItem: {
      width: 200,
      fixed: 'right',
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
