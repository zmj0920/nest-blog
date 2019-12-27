import React from 'react';
import Editor from 'for-editor';
import { connect } from 'dva';
import { Layout, Row, Col } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import Form from 'components/Form';
import createColumns from './columns';
import $$ from 'cmn-utils';
const { Content } = Layout;

@connect(({ article, loading }) => ({
    article,
    loading: loading.models.article
}))
export default class extends BaseComponent {

    constructor() {
        super()
        this.state = {
            value: '',
            mobile: null,
            user: $$.getStore('user')
        }
        this.$from = React.createRef()
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
    handleChange = value => {
        this.setState({
            value
        })
    }

    onSubmit = (values) => {
        const { dispatch } = this.props;
      
        const article = Object.assign(values, { token: this.state.user.token }, { articleContent: this.state.value })
        dispatch({
            type: 'article/save',
            payload: {
                article,
                success: () => {
                    this.$from.current.resetFields()
                    this.state.value = ""
                }
            }
        });
    }
    render() {
        console.log(this.state.user.token)
        const { value } = this.state
        const { article } = this.props
        const columns = createColumns(article);
        const mineditorProps = {
            value: value,
            height: 700,
            placeholder: '文章内容',
            onChange: this.handleChange,
            toolbar: {
                h1: true, // h1
                h2: true, // h2
                h3: true, // h3
                h4: true, // h4
                img: true, // 图片
                preview: true, // 预览
                undo: true, // 撤销
                redo: true, // 重做
            }
        };

        const maxeditorProps = {
            value: value,
            height: 500,
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
                // save: true, // 保存
                subfield: true, // 单双栏模式
            }
        };
        return (
            <Layout className="full-layout page">
                <Content>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Panel title="添加文章">
                                <Form columns={columns} ref={this.$from} onSubmit={this.onSubmit} />
                            </Panel>
                        </Col>
                        <Col span={24}>
                            {this.state.mobile && (
                                <Editor {...mineditorProps} />
                            )}
                            {!this.state.mobile && (
                                <Editor {...maxeditorProps} />
                            )}
                        </Col>
                    </Row>
                </Content>
            </Layout>
        )
    }
}
