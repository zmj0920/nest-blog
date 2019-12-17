import React from 'react';
import { connect } from 'dva';
import { Layout, Button, Row, Col, Tree } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Toolbar from 'components/Toolbar';
import SearchBar from 'components/SearchBar';
import DataTable, { Editable } from 'components/DataTable';
import { ModalForm } from 'components/Modal';
import createColumns, { columns5} from './columns';
import Panel from 'components/Panel';
import './index.less';
const { Content, Header, Footer } = Layout;
const Pagination = DataTable.Pagination;

@connect(({ crud, loading }) => ({
  crud,
  loading: loading.models.crud
}))
export default class extends BaseComponent {
  state = {
    record: null,
    visible: false,
    rows: [],
    editingKey: null
  }

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

  onEdit = record => {
    this.setState({
      editingKey: record.id
    });
  };

  onCancelEdit = () => {
    this.setState({ editingKey: null });
  };

  render() {
    const { crud, loading, dispatch } = this.props;
    const { pageData } = crud;
    const columns = createColumns(this);
    const { rows, record, visible } = this.state;

    const searchBarProps = {
      columns,
      onSearch: values => {
        dispatch({
          type: 'crud/getPageInfo',
          payload: {
            pageData: pageData.filter(values).jumpPage(1, 10)
          }
        });
      }
    };

    const dataTableProps = {
      loading,
      columns,
      rowKey: 'uid',
      dataItems: pageData,
       selectType: 'checkbox',
      // showNum: true, //是否显示行列号
       isScroll: true,
      selectedRowKeys: rows.map(item => item.rowKey),
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'crud/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize)
          }
        });
      },
      onSelect: (keys, rows) => this.setState({ rows })
    };


    const dataTableProps2 = {
      loading,
      columns,
      rowKey: 'uid',
      dataItems: pageData,
      selectType: 'radio', //显示类型
       showNum: true,
       isScroll: true,
       selectedRowKeys: rows.map(item => item.rowKey),
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'crud/getPageInfo',
          payload: {
            pageData: pageData.jumpPage(pageNum, pageSize)
          }
        });
      },
      onSelect: (keys, rows) => this.setState({ rows })
    };

    const dataTableProps7 = {
      loading,
      columns: columns5(this, this.state.editingKey),
      rowKey: 'uid',
      dataItems: pageData,
      showNum: true
    };


    const modalFormProps = {
      loading,
      record,
      visible,
      columns,
      modalOpts: {
        width: 700
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
        if (record) {
          dispatch({
            type: 'crud/update',
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
            type: 'crud/save',
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
      <Layout className="full-layout crud-page">
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

          <Panel title="说明">
            <h3>DataTable 用法</h3>
            <p>
              DataTable通常结合
              来使用，由Columns定义其数据结构，支持多种类型数据，扩展自antd的Table组件，可以使用Table的api。
            </p>
          </Panel>
            {/* <DataTable pagination {...dataTableProps} /> */}
            <Row gutter={20}>
              <Col span={12}>
                <Panel title="基本用法">
                  <DataTable {...dataTableProps} />
                </Panel>
              </Col>
              <Col span={12}>
                <Panel title="内部分页">
                  <DataTable pagination {...dataTableProps} />
                </Panel>
              </Col>
          </Row>
          <Panel title="外部分页">
            <DataTable {...dataTableProps} />
            <div className="footer">
              <Pagination {...dataTableProps} />
            </div>
          </Panel>
          <Row gutter={20}>
            <Col span={12}>
              <Panel title="单选按钮">
                <DataTable {...dataTableProps2} selectedRowKeys={[1, 2, 4]} />
              </Panel>
            </Col>
            <Col span={12}>
              <Panel title="可编辑的行，用法与Form相似" height={500} scroll>
                <Editable pagination={{ pageSize: 20 }} {...dataTableProps7} />
              </Panel>
            </Col>
          </Row>
        </Content>
        <Footer>
          {/* <Pagination {...dataTableProps} /> */}
        </Footer>
        <ModalForm {...modalFormProps} />
      </Layout>
    );
  }
}
