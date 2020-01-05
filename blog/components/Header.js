import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import '../static/style/components/header.css'
import { Row, Col, Menu, Icon, Drawer } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const Header = () => {
    const [navArray, setNavArray] = useState([])
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo).then(
                (res) => {
                    setNavArray(res.data)
                    return res.data
                }
            )
            setNavArray(result)
        }
        fetchData()
    }, [])

    const showDrawer = () => {
        setVisible(true)
    };

    const onClose = () => {
        setVisible(false)
    };


    //跳转到列表页
    const handleClick = ({ item, key}) => {
        if (key == 0) {
            Router.push('/index')
        } else {
            Router.push({
                pathname: '/myList',
                query: {
                    id: key,
                    title:item.props.title
                }
            })
        }
    }

    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={21} sm={21} md={10} lg={13} xl={11}>
                    <span className="header-logo">
                        <Link href={{ pathname: '/index' }}>
                            <a> 技术菜</a>
                        </Link>

                    </span>
                    <span className="header-txt">专注前端开发,每年100集免费视频.</span>

                </Col>
                <Col xs={3} sm={3} md={0} lg={0} xl={0}>
                    <span onClick={showDrawer}>
                        <Icon type="menu" style={{ fontSize: '40px', color: '#08c' }} />
                    </span>
                </Col>

                <Col className="memu-div" xs={0} sm={0} md={14} lg={10} xl={7}>
                    <Menu
                        mode="horizontal"
                        onClick={handleClick}
                    >
                        <Menu.Item key="0">
                            <Icon type="home" />
                            博客首页
                        </Menu.Item>
                        {
                            navArray.map((item) => {
                                return (
                                    <Menu.Item key={item.id} title={item.typeName}>
                                        <Icon type={item.icon} />
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Col>
            </Row>
            <Drawer
                title="导航菜单"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <Menu
                    mode="inline"
                    onClick={handleClick}
                >
                    <Menu.Item key="0">
                        <Icon type="home" />
                        博客首页
                        </Menu.Item>
                    {
                        navArray.map((item) => {
                            return (
                                <Menu.Item key={item.id}>
                                    <Icon type={item.icon} />
                                    {item.typeName}
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
            </Drawer>
        </div>
    )
}

export default Header