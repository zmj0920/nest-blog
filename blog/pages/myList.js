import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Row, Col, List, Icon, Breadcrumb } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/list.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'
import dayjs from 'dayjs'

const myList = (articleList) => {

  const [mylist, setMylist] = useState(articleList.data);
  useEffect(() => {
    setMylist(articleList.data)
  })
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={15}  >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>{mylist[0].article_type_typeName}</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link href={{ pathname: '/detailed', query: { id: item.article_id } }}>
                      <a>{item.article_title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><Icon type="calendar" /> {dayjs(item.article_addTime).format('YYYY-MM-DD dddd HH:mm:ss.SSS A')}</span>
                    <span><Icon type="folder" /> {item.article_typeName}</span>
                    <span><Icon type="fire" /> {item.article_viewCount}人</span>
                    <span><Icon type="user" />作者： {item.user_name}</span>
                  </div>
                  <div className="list-context">{item.article_introduce}</div>
                </List.Item>
              )}
            />

          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={8} lg={6} xl={5}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />

    </>
  )

}

myList.getInitialProps = async (context) => {
  let id = context.query.id
  const articleList = new Promise((resolve) => {
    axios(servicePath.getListById + id).then(
      (res) => resolve(res.data)
    )
  })
  return await articleList
}
export default myList

