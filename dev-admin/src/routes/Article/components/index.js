import React from 'react';
import Editor from 'for-editor';
import { connect } from 'dva';
import { Layout, Button, message, Row, Col } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import Form from 'components/Form';
import { columns1 } from './columns';
const { Content } = Layout;
@connect()
export default class extends BaseComponent {

  constructor() {
    super()
    this.state = {
      value: '',
      mobile: null,
    }

    this.$vm = React.createRef()
  }

  resize() {
    if (window.matchMedia('(min-width: 768px)').matches) {
      this.setState({
        mobile: false
      })
    } else {
      this.setState({
        mobile: true
      })
    }
  }

  componentDidMount() {
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
  }

  onChange = (value) => {
    this.setState({
      value
    });
  };

  onSubmit = (values) => {

    console.log(values);
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

  handleSave(value) {
    console.log('触发保存事件', value)
  }
  render() {
    const { value } = this.state
    return (
      <Layout className="full-layout page">
        <Content>
          <Row gutter={16}>
            <Col span={24}>
              <Panel title="添加文章">
                <Form columns={columns1} onSubmit={this.onSubmit} />
              </Panel>
            </Col>
            <Col span={24}>
              {this.state.mobile && (
                <Editor
                  ref={this.$vm}
                  height="500px"
                  toolbar={{
                    h1: true,
                    h2: true,
                    h3: true,
                    save: true,
                    preview: true
                  }}
                  value={value}
                  subfield={false}
                  onChange={value => this.handleChange(value)}
                  onSave={value => this.handleSave(value)}
                />
              )}
              {!this.state.mobile && (
                <Editor
                  ref={this.$vm}
                  height="700px"
                  toolbar={{
                    h1: true, // h1
                    h2: true, // h2
                    h3: true, // h3
                    h4: true, // h4
                    img: true, // 图片
                    link: true, // 链接
                    code: true, // 代码块
                    preview: true, // 预览
                    expand: true, // 全屏
                    /* v0.0.9 */
                    undo: true, // 撤销
                    redo: true, // 重做
                    // save: true, // 保存
                    /* v0.2.3 */
                    subfield: true, // 单双栏模式
                  }}
                  value={value}
                  addImg={($file) => this.addImg($file)}
                  onChange={value => this.handleChange(value)}
                  onSave={value => this.handleSave(value)}
                />
              )}
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}
