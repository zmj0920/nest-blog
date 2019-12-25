import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Editor from 'components/Markdown';
import style from './index.module.less';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  constructor() {
    super()
    this.state = {
      replyContent: ''
    }

  }
  handleChange = replyContent => {
    this.setState({
      replyContent
    });
  }
  onSubmit = () => {
    console.log(this.state.replyContent)
  }
  render() {
    const { replyContent } = this.state;
    const editorProps = {
      value: replyContent,
      height: 700,
      placeholder: '文章内容',
      onChange: this.handleChange,
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
    };

    return (
      <Layout className="full-layout page blank-page" >
        <Content className={style.className}>
          <Editor {...editorProps} />
        </Content>
      </Layout>
    );
  }
}
