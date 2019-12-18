import React from 'react';
import { connect } from 'dva';
import { Layout, Button, message } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Editor from 'components/Editor';
import Panel from 'components/Panel';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  state = {
    html: ''
  };


  onChange = (html) => {
    this.setState({
      html
    });
  };

  setValue = () => {
    this.setState({ newHtml: '<div>今天也要快乐啊！</div>' })
  }
  getValue = () => {
    message.success(this.state.html)
  }

  clearValue = () => {
    this.setState({ newHtml: '' })
  }


  render() {
    return (
      <Layout className="full-layout page">
        <Content>
          <Panel title="富文本">
            <p>
              富文本使用
              <a href="https://github.com/wangfupeng1988/wangEditor">
                wangEditor
              </a>
              ，具体参数可以到其网站查看。
            </p>
            <div style={{
              marginTop: "10px",
              marginBottom: "10px"
            }}>
              <Button.Group >
                <Button
                  type="primary"
                  onClick={this.setValue.bind(this)}
                >
                  设置值
                </Button>
                <Button onClick={this.getValue}>
                  获取值
                </Button>
                <Button onClick={this.clearValue}>
                  清空值
                </Button>
              </Button.Group>
            </div>
            <Editor onChange={this.onChange} value={this.state.newHtml} />
            <b>HTML: </b>
            {this.state.html}
          </Panel>
        </Content>
      </Layout>
    );
  }
}
