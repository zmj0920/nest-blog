import Head from 'next/head'
import { Row, Col, Affix, Icon, Breadcrumb, BackTop } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import servicePath from '../config/apiUrl'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlightjs';
import dayjs from 'dayjs'
import Tocify from '../components/tocify.tsx'
import 'highlightjs/styles/monokai-sublime.css';
import '../static/style/pages/detailed.css'
const Detailed = (props) => {
 // console.log(props)
  const tocify = new Tocify()
  const renderer = new marked.Renderer();
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({

    renderer: renderer,

    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,

    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }

  });
  let html = marked(props.article_articleContent)
  return (
    <>
      <Head>
        <title> {props.article_title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <meta name="description" content=  {props.article_introduce} />
        <meta name="keywords" content="前端知识 , Rract , javascript , Angular,Vue, Nest,next" />
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={15}  >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>{props.article_type_typeName}</Breadcrumb.Item>
                <Breadcrumb.Item> {props.article_title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className="detailed-title">
                {props.article_title}
              </div>

              <div className="list-icon center">
                <span><Icon type="calendar" /> {dayjs(props.article_addTime).format('YYYY-MM-DD dddd HH:mm:ss.SSS A')}</span>
                <span><Icon type="folder" /> {props.article_type_typeName}</span>
                <span><Icon type="fire" /> {props.article_viewCount}</span>
                <span><Icon type="user" />作者： {props.user_name}</span>
              </div>
              <div className="detailed-content"
                dangerouslySetInnerHTML={{ __html: html }}   >
              </div>
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={5}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
            </div>
          </Affix>
        </Col>
        <BackTop />
      </Row>
      <Footer />
    </>
  )
}

Detailed.getInitialProps = async (context) => {
  console.log(context.query.id)
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleById + id).then(
      (res) => {
        resolve(res.data[0])
      }
    )
  })
  return await promise
}

export default Detailed