import React from 'react';
// import moment from 'moment';
import { Input } from 'antd';
const { TextArea } = Input;
export default (self) => [
    {
        title: '文章标题',
        name: 'title',
        formItem: {
            rules: [
                {
                    required: true,
                    message: '文章标题'
                }
            ],
            col: { xs: { span: "24" }, md: { span: "12" }, sm: { span: "24" }, lg: { span: "12" }, xl: { span: "8" }, xxl: { span: "8" } },
        }
    },
    {
        title: '文章类型',
        name: 'articleType',
        dict:[...self.article_type.map(item => {
            return { code: item.id, codeName: item.typeName }
        })],
        formItem: {
            type: 'select',
            rules: [
                {
                    required: true,
                    message: '文章类型'
                }
            ],
            col: { xs: { span: "24" }, md: { span: "12" }, sm: { span: "24" }, lg: { span: "12" }, xl: { span: "8" }, xxl: { span: "8" } },
        }
    },
    // {
    //     title: '发布日期',
    //     name: 'addTime',
    //     formItem: {
    //         type: 'datetime',
    //         showTime: true,
    //         initialValue: moment(),
    //         col: { xs: { span: "24" }, md: { span: "12" }, sm: { span: "24" }, lg: { span: "12" }, xl: { span: "8" }, xxl: { span: "6" } },
    //     }
    // },

    {
        title: '排序',
        name: 'sortNumber',
        formItem: {
            type: 'number',
            col: { xs: { span: "24" }, md: { span: "12" }, sm: { span: "24" }, lg: { span: "12" }, xl: { span: "8" }, xxl: { span: "8" } },
        }
    },
    {
        title: '文章简介',
        formItem: {
            type: 'custom',
            col: { xs: { span: "24" }, sm: { span: "24" }, md: { span: "24" }, lg: { span: "24" }, xl: { span: "24" }, xxl: { span: "24" } },
            formItemLayout: {
                labelCol: { span: 2 },
                wrapperCol: { span: 12 }
            },
            render: (record, form) => {
                const { getFieldDecorator } = form;
                return (
                    <div>
                        {getFieldDecorator('introduce', {
                            initialValue: record && record.introduce
                        })(<TextArea rows={2} />)}
                    </div>
                );
            }
        }
    },
];