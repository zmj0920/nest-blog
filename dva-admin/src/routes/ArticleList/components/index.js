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

//箭头左面是所有state,右边是想放到当前props里的state
//loading状态执行bool型的变量，effect开始就是true effect结束了就是false了
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

  handleDelete = records => {
    const { rows } = this.state;
    this.props.dispatch({
      type: 'crud/remove',
      payload: {
        records,
        success: () => {
          // 如果操作成功，在已选择的行中，排除删除的行
          this.setState({
            rows: rows.filter(
              item => !records.some(jtem => jtem.rowKey === item.rowKey)
            )
          });
        }
      }
    });
  };



  render() {
    const { articleList, loading, dispatch } = this.props;
    const { pageData, article_type } = articleList;
    const columns = createColumns(this, article_type);
    const { rows, record, visible } = this.state;
    console.log(pageData)
    const searchBarProps = {
      columns,
      onSearch: values => {
        dispatch({
          type: 'articleList/getPageInfo',
          payload: {
            pageData: pageData.filter(values).jumpPage(1, 10)
          }
        });
      }
    };


    const dataTableProps = {
      loading,
      columns,
      rowKey: 'article_id',
      isScroll: { x: 666, y: 500 }, //固定表头和左右固定空白问题需要设一个宽 
      dataItems: pageData,
      selectType: 'checkbox',
      showNum: true, //行号
      selectedRowKeys: rows.map(item => item.rowKey),
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'articleList/getPageList',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize)
          }
        });
      },
      onSelect: (keys, rows) => this.setState({ rows })
    };
    const modalFormProps = {
      loading,
      record,
      visible,
      columns,
      modalOpts: {
        width: '80%'
      },
      onCancel: () => {
        this.setState({
          record: null,
          visible: false
        });
      },
      // 新增、修改都会进到这个方法中，
      // 可以使用主键或是否有record来区分状态

      onSubmit: values => {
        console.log(values)
        if (record) {
          dispatch({
            type: 'articleList/update',
            payload: {
              record, values,
              success: () => {
                this.setState({
                  record: null,
                  visible: false
                });
              }
            }
          });
        } else {
          dispatch({
            type: 'articleList/save',
            payload: {
              values,
              success: () => {
                this.setState({
                  record: null,
                  visible: false
                });
              }
            }
          });
        }

      }
    };


    return (
      <Layout className="full-layout articleList-page">
        <Header>
          <Toolbar
            appendLeft={
              <Button.Group>
                <Button type="primary" icon="plus" onClick={this.onAdd}>
                  新增
              </Button>
                <Button
                  disabled={!rows.length}
                  onClick={e => this.onDelete(rows)}
                  icon="delete"
                >
                  删除
              </Button>
              </Button.Group>
            }
            pullDown={<SearchBar type="grid" {...searchBarProps} />}
          >
            <SearchBar group="abc" {...searchBarProps} />
          </Toolbar>
        </Header>
        <Content>
          <DataTable {...dataTableProps} />
        </Content>
        <Footer>
          <Pagination {...dataTableProps} />
        </Footer>
        <ModalForm {...modalFormProps} />
      </Layout>
    );
  }
}
