import React from 'react';
import Editor from 'for-editor';
import { connect } from 'dva';
import { Layout, Button, message } from 'antd';
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
          <Panel title="富文本">
            <div style={{
              marginTop: "10px",
              marginBottom: "10px"
            }}>
              {/* <Button.Group >
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
              </Button.Group> */}

              <Form columns={columns1} onSubmit={this.onSubmit} />


              {/* <Form
                ref={node => this.customBtnForm = node}
                columns={columns1}
                type="inline"
                footer={
                  <Button
                    style={{ display: 'inline', margin: '10 auto' }}
                 
                    onClick={e => {
                      const form = this.customBtnForm;
                      form.validateFields((err, values) => {
                        if (!err) {
                          console.log('自定义提交:', values)
                        }
                      });
                    }}
                  >
                    注册
                    </Button>
                }
              /> */}
            </div>
            {/* <Editor
              ref={this.$vm}
              value={value}
              onSave={value => this.handleSave(value)}
              addImg={($file) => this.addImg($file)}
              onChange={value => this.handleChange(value)}
            /> */}

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
                value={value}
                addImg={($file) => this.addImg($file)}
                onChange={value => this.handleChange(value)}
                onSave={value => this.handleSave(value)}
              />
            )}
          </Panel>
        </Content>
      </Layout>
    )
  }
}
