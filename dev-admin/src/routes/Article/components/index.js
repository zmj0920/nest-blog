import React from 'react';
import Editor from 'for-editor';
import { connect } from 'dva';
import { Layout, Button, message } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  constructor() {
    super()
    this.state = {
      value: ''
    }
    this.$vm = React.createRef()
  }

  onChange = (value) => {
    this.setState({
      value
    });
  };

  getValue = () => {
    message.success(this.state.value)
  }

  clearValue = () => {
    this.setState({ value: '' })
  }
  handleChange(value) {
    this.setState({
      value
    })
  }

  addImg($file) {
     this.$vm.current.$img2Url($file.name, 'file_url')
    console.log($file)
  }

  handleSave(value: string) {
    console.log('触发保存事件', value)
  }
  render() {
    const { value } = this.state

    return (
      <Layout className="full-layout page">
        <Content>
          <Panel title="富文本">
            <div style={{
              marginTop: "10px",
              marginBottom: "10px"
            }}>
              <Button.Group >
                <Button
                  type="primary"
                >
                  设置值
                </Button>
                <Button onClick={this.getValue}>
                  保存
                </Button>
                <Button onClick={this.clearValue}>
                  清空值
                </Button>
              </Button.Group>
            </div>
            <Editor
              ref={this.$vm}
              value={value}
              onSave={value => this.handleSave(value)}
              addImg={($file) => this.addImg($file)}
              onChange={value => this.handleChange(value)}
            />
          </Panel>
        </Content>
      </Layout>
    )
  }
}
