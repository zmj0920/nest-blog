import React from 'react';
import { connect } from 'dva';
import { Layout, Button } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Toolbar from 'components/Toolbar';
import SearchBar from 'components/SearchBar';
import DataTable from 'components/DataTable';
import { ModalForm } from 'components/Modal';
import createColumns from './columns';
import './index.less';
const { Content, Header, Footer } = Layout;
const Pagination = DataTable.Pagination;


@connect(({ articleList, loading }) => ({
  articleList,
  loading: loading.models.articleList
}))
export default class extends BaseComponent {

  state = {
    record: null,
    visible: false,
    rows: []
  };

  render() {
    const { articleList, loading, dispatch } = this.props;
    const { pageData, article_type } = articleList;
    const columns = createColumns(this);
    const { rows, record, visible } = this.state;

    console.log(pageData)

    const dataTableProps = {
      loading,
      columns,
      rowKey: 'article_id',
     // isScroll: { x: 666, y: 500}, //固定表头和左右固定空白问题需要设一个宽 
      dataItems: pageData,
      selectType: 'checkbox',
      showNum: true, //行号
      selectedRowKeys: rows.map(item => item.rowKey),
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'articleList/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize)
          }
        });
      },
      onSelect: (keys, rows) => this.setState({ rows })
    };



    return (
      <Layout className="full-layout page articleList-page">
       <Content>
          <DataTable {...dataTableProps} />
        </Content>
      </Layout>
    );
  }
}
