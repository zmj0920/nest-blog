import React, { Fragment } from 'react';
import DataTable, { EditableOper }from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import { Link } from 'dva/router';

export default (self) => [

  {
    title: '用户名',
    name: 'uname',
    tableItem: {},
    formItem: {},
    searchItem: {}
  },
  {
    title: '密码',
    name: 'upwd',
    tableItem: {},
    formItem: {},
    searchItem: {}
  },
  {
    title: '邮箱',
    name: 'email',
    tableItem: {},
    formItem: {},
    searchItem: {}
  },
  // {
  //   title: '手机号',
  //   name: 'phone',
  //   tableItem: {},
  //   formItem: {},
  //   searchItem: {}
  // },
  // {
  //   title: '图片',
  //   name: 'avatar',
  //   tableItem: {},
  //   formItem: {},
  //   searchItem: {}
  // },
  // {
  //   title: '姓名',
  //   name: 'user_name',
  //   tableItem: {},
  //   formItem: {},
  //   searchItem: {}
  // },
  ,
  {
    title: '性别',
    name: 'gender',
    dict: [
      {code: 1, codeName: '男'},
      {code: 0, codeName: '女'}
  ],
    tableItem: {},
    formItem: { type: 'radio'},
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


export const columns5 = (self, editingKey) => [
  {
    title: '用户名',
    name: 'uname',
    tableItem: {
      type: 'input',
      editing: (text, record) => record.id === editingKey,
      rules: [{ required: true, message: '请输入名称！' }]
    }
  },
  {
    title: '密码',
    name: 'upwd',
    tableItem: {
      type: 'input',
      editing: (text, record) => record.id === editingKey
    }
  },
  {
    title: '邮箱',
    name: 'email',
    tableItem: {
      type: 'input',
      editing: (text, record) => record.id === editingKey
    }
  },
  {
    title: '操作',
    tableItem: {
      width: 180,
      render: (text, record) => (
        <EditableOper>
          {form =>
            record.id === editingKey ? (
              <Fragment>
                <a onClick={e => self.onSave(record, form)}>保存</a>
                <a onClick={e => self.onCancelEdit()}>取消</a>
              </Fragment>
            ) : (
                <a onClick={e => self.onEdit(record)}>修改</a>
              )
          }
        </EditableOper>
      )
    }
  }
];
