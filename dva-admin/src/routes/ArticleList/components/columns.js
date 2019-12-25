import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import { Link } from 'dva/router';
import moment from 'moment';
export default (self, article_type) => [
  {
    title: '标题',
    name: 'article_title',
    tableItem: {
      width: 250,
      fixed: 'left',
    },
    formItem: {},
    searchItem: {}
  },
  {
    title: '文章简介',
    name: 'article_introduce',
    tableItem: {
      width: 400
    },
    formItem: {},
    searchItem: {}
  },
  {
    title: '文章类型',
    name: 'article_type_typeName',
    dict: [...article_type.map(item => {
      return { code: item.id, codeName: item.typeName }
    })],
    tableItem: { width: 200 },
    formItem: {
      type: 'select'
    },
    searchItem: {
      type: 'select'
    }
  },
  {
    title: '作者',
    name: 'user_name',
    tableItem: {
      width: 200
    },
    formItem: {},
    searchItem: {}
  },
  {
    title: '点击次数',
    name: 'article_viewCount',
    tableItem: {
      width: 150
    },
    formItem: {},
    searchItem: {}
  },
  {
    title: '发布日期',
    name: 'article_addTime',
    tableItem: {
      width: 150,
      render: text => text? moment(text).format('YYYY-MM-DD HH:mm'): null
    },
    formItem: {},
    searchItem: {}
  },
  {
    title: '操作',
    tableItem: {
      width: 250,
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


