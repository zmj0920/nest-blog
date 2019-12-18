import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'
import { Row, Col, List, Icon, Breadcrumb ,Pagination} from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/list.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'
import dayjs from 'dayjs'

const myList = ({ router }) => {
  console.log(router.query.id)
  const [mylist, setMylist] = useState([]);
  const [pageNum, setpageNum] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [titleType, setTitle] = useState('');
  const getArticleLimit = (pageNum, pageSize) => {
    axios(`${servicePath.getListById}${router.query.id}/${pageNum}/${pageSize}`).then(
      res => {
        if (res.data.success === 200) {
          console.log(res)
          setTitle(res.data.data[0].article_type_typeName)
          setMylist(res.data.data)
          setTotal(res.data.total)
        }
      }
    )
  }

  useEffect(() => {
    getArticleLimit(pageNum, pageSize)
  }, [])

  const onShowSizeChange = (current, pageSize) => {
    setpageSize(pageSize)
  }
  const onChange = (pageNum, pageSize) => {
    if (pageNum) {
      getArticleLimit(pageNum, pageSize)
    }
  };


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
                <Breadcrumb.Item>{titleType}</Breadcrumb.Item>
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
          <div className="pagination-page">
            <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              defaultCurrent={pageNum}
              pageSize={pageSize}
              onChange={onChange}
              total={total}
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

// myList.getInitialProps = async (context) => {
//   let id = context.query.id
//   const articleList = new Promise((resolve) => {
//     axios(servicePath.getListById + id).then(
//       (res) => resolve(res.data)
//     )
//   })
//   return await articleList
// }
export default withRouter(myList)

