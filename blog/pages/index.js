import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List, Icon, BackTop, Affix } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import '../static/style/pages/index.css'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import servicePath from '../config/apiUrl'
import axios from 'axios'
import dayjs from 'dayjs'



const Home = (articleList) => {
  //---------主要代码-------------start
  //const [mylist, setMylist] = useState(list.data);

  const [mylist, setMylist] = useState(articleList.data);
  // console.log(articleList.data)
  //---------主要代码-------------end
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={15}  >
          <div>

            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item key={item.article_id}>
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
          <Affix offsetTop={60} >
            <Advert />
          </Affix>
        </Col>
        <BackTop />
      </Row>
     
      <Footer />

    </>
  )

}

Home.getInitialProps = async () => {
 
  const articleList = new Promise((resolve) => {
    axios(servicePath.getArticleList).then(
      (res) => {
        resolve(res.data)
      }
    )
  })

  return await articleList
}


export default Home