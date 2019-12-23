import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
const { Content } = Layout;


@connect(({ articleList, loading }) => ({
  articleList,
  loading: loading.models.articleList
}))
export default class extends BaseComponent {
  render() {
    const articleTypeList=this.props
    console.log(articleTypeList)
    return (
      <Layout className="full-layout page blank-page">
        <Content>空白页</Content>
      </Layout>
    );
  }
}
