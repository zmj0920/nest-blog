import React from 'react';
import moment from 'moment';
import { Input } from 'antd';
const { TextArea } = Input;
export const columns1 = [
    {
        name: 'id',
        formItem: {
            type: 'hidden'
        }
    },
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
            col: { span: 6 },
        }
    },
    {
        title: '文章类型',
        name: 'articleType',
        dict: [
            { code: '1', codeName: '111' },
            { code: '2', codeName: '222' },
            { code: '3', codeName: '333' }
        ],
        formItem: {
            type: 'select',
            rules: [
                {
                    required: true,
                    message: '文章类型'
                }
            ],
            col: { span: 6 },
        }
    },
    {
        title: '发布日期',
        name: 'addTime',
        formItem: {
            type: 'datetime',
            showTime: true,
            initialValue: moment(),
            col: { span: 5 },
        }
    },

    {
        title: '排序',
        name: 'ordder',
        formItem: {
            type: 'number',
            col: { span: 4 },
        }
    },
    {
        title: '文章简介',
        formItem: {
            type: 'custom',
            col: { span: 24 },
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