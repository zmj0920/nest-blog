import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
const { Content } = Layout;

@connect(({ articleDetail, loading }) => ({
  articleDetail,
  loading: loading.models.articleDetail
}))
export default class extends BaseComponent {

  render() {
    const { articleDetail } = this.props
    const { articlelist } = articleDetail
    console.log(JSON.stringify(articlelist))
    return (
      <Layout className="full-layout page blank-page">
        <Content>
          {
            articlelist.map((item) => {
              return (
                <div key={item.article_id}>
                  <div>{item.article_id}</div>
                  <div> {item.article_title}</div>
                  <div>{item.article_articleContent}</div>
                  <div>{item.article_addTime}</div>
                  <div>{item.article_viewCount}</div>
                  <div>{item.article_type_typeName}</div>
                  <div>{item.user_name}</div>
                </div>
              )
            })
          }
        </Content>
      </Layout>
    );
  }
}
