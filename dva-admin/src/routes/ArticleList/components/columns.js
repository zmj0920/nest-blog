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
      width: 200,
      align: 'center',
      fixed: 'left',
    },
    formItem: { col: { xs: { span: "24" }, md: { span: "12" }, sm: { span: "24" }, lg: { span: "12" }, xl: { span: "12" }, xxl: { span: "12" } } },
    searchItem: {}
  },
  {
    title: '文章类型',
    name: 'article_type_id',
    dict: [...article_type.map(item => {
      return { code: item.id, codeName: item.typeName }
    })],
    tableItem: {
      align: 'center',
      width: 200
    },
    formItem: {
      col: { xs: { span: "24" }, md: { span: "12" }, sm: { span: "24" }, lg: { span: "12" }, xl: { span: "12" }, xxl: { span: "12" } },
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
      align: 'center',
      width: 200
    },
    searchItem: {}
  },
  {
    title: '点击次数',
    name: 'article_viewCount',
    tableItem: {
      align: 'center',
      width: 150
    },
    searchItem: {}
  },
  {
    title: '发布日期',
    name: 'article_addTime',
    tableItem: {
      align: 'center',
      width: 150,
      render: text => text ? moment(text).format('YYYY-MM-DD HH:mm') : null
    },
    searchItem: {}
  },
  {
    title: '文章简介',
    name: 'article_introduce',
    tableItem: {
      align: 'center',
      width: 450
    },
    formItem: {
      formItemLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 }
      },
      col: { xs: { span: "24" }, sm: { span: "24" }, md: { span: "24" }, lg: { span: "24" }, xl: { span: "24" }, xxl: { span: "24" } },
      type: 'textarea',
    },
    searchItem: {}
  },
  {
    title: '内容',
    name: 'article_articleContent',
    formItem: {
      formItemLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 }
      },
      col: { xs: { span: "24" }, sm: { span: "24" }, md: { span: "24" }, lg: { span: "24" }, xl: { span: "24" }, xxl: { span: "24" } },
      type: 'markdown',
      markdownProps: {
        height: 500,
        toolbar: {
          h1: true, // h1
          h2: true, // h2
          h3: true, // h3
          h4: true, // h4
          img: true, // 图片
          link: true, // 链接
          code: true, // 代码块
          preview: true, // 预览
          expand: true, // 全屏
          undo: true, // 撤销
          redo: true, // 重做
          subfield: true, // 单双栏模式
        }
      }
    }
  },
  {
    title: '操作',
    tableItem: {
      align: 'center',
      width: 150,
      fixed: 'right',
      render: (text, record) => {
        return(
          <DataTable.Oper>
            <Button tooltip="修改" onClick={e => self.onUpdate(record)}>
              <Icon type="edit" />
            </Button>
            <Button tooltip="删除" onClick={e => self.onDelete(record)}>
              <Icon type="trash" />
            </Button>
            <Button tooltip="查看">
              <Link to={"/articleDetail?id=" + record.article_id}>
                <Icon type="link" antd />
              </Link>
            </Button>
          </DataTable.Oper>
        )
      }
    }
  }
];


