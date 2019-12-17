import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Button from 'components/Button';
import Panel from 'components/Panel';
import { normal, antdNotice } from 'components/Notification';

import Mask from 'components/Mask';
import avatar from 'assets/images/avatar.jpg';

import './index.less';
const { Content } = Layout;
const Ripple = Button.Ripple;

@connect()
export default class extends BaseComponent {


  state = {
    mask: {
      visible: false
    }
  };

  toggleMask = props => {
    this.setState({
      mask: {
        ...props,
        visible: !this.state.mask.visible
      }
    });
  };


  render() {
    return (
      <Layout className="full-layout page button-page">
        <Content>
          <Panel title="AntD Button">
            <Button type="primary">Primary</Button>
            <Button tooltip="Tip!">Default</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="danger">Danger</Button>
          </Panel>
          <Panel title="Ripple Button (Material Design)">
            <div>
              <Ripple>Default</Ripple>
              <Ripple type="primary">Primary</Ripple>
              <Ripple type="danger">Danger</Ripple>
            </div>
            <div>
              <Ripple ghost>Default</Ripple>
              <Ripple ghost type="primary">Primary</Ripple>
              <Ripple ghost type="danger">Danger</Ripple>
            </div>
          </Panel>

          <Panel title="Notification / 通知">
            <p>我们默认包含了两种通知样式，当您的组件继承于BaseCompoent时，可使用this.notice发出config.js中配置的默认通知样式，或者可以通过实现Notification接口实现自已的通知类</p>
          </Panel>
          <Panel title="Normal notice">
            <Button.Group>
              <Button onClick={_ => normal.success('I‘m Hero')}>成功</Button>
              <Button onClick={_ => normal.error('I‘m Hero')}>失败</Button>
              <Button onClick={_ => normal.warning('I‘m Hero')}>注意</Button>
              <Button onClick={_ => normal.info('I‘m Hero')}>通知</Button>
            </Button.Group>
          </Panel>
          <Panel title="Antd notice">
            <Button.Group>
              <Button onClick={_ => antdNotice.success('I‘m Hero')}>成功</Button>
              <Button onClick={_ => antdNotice.error('I‘m Hero')}>失败</Button>
              <Button onClick={_ => antdNotice.warning('I‘m Hero')}>注意</Button>
              <Button onClick={_ => antdNotice.info('I‘m Hero')}>通知</Button>
            </Button.Group>
          </Panel>

          <Panel title="Mask组件">
            <p>Mask组件可以包含任意组件，形成遮罩效果</p>
            <Button.Group>
              <Button onClick={_ => this.toggleMask()}>一般</Button>
              <Button onClick={_ => this.toggleMask({ closable: true })}>
                带x图标
              </Button>
              <Button
                onClick={_ =>
                  this.toggleMask({
                    closable: true,
                    maskClosable: false
                  })
                }
              >
                点外部关闭不了
              </Button>
              <Button onClick={_ => this.toggleMask({ className: 'search-box' })}>
                CodePen样式
              </Button>
            </Button.Group>
          </Panel>
        </Content>
        <Mask
          onClose={_ => this.toggleMask()}
          {...this.state.mask}
        >
          <img
            src={avatar}
            alt="logo"
            style={{
              position: 'absolute',
              margin: 'auto',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }}
          />
        </Mask>
      </Layout>
    );
  }
}
