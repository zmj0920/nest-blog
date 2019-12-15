import { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import '../static/style/components/advert.css'
import servicePath from '../config/apiUrl'
import axios from 'axios'
const { TabPane } = Tabs;
const Advert = () => {
  const [advertList, setAdvertList] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(servicePath.getAdvertList).then(
        (res) => {
          setAdvertList(res.data.data)
          return res.data.data
        }
      )
      setAdvertList(result)
    }
    fetchData()
  }, [])

  const callback = (key) => {
    console.log(key);
  }
  return (
    <div className="ad-div comm-box">
      <Tabs defaultActiveKey="1" onChange={callback} size="small">
        <TabPane tab="知识" key="1">
          {
            advertList.map((item) => {
              return (
                <div key={item.id}>
                  <a href={item.url} target="_blank" ><img src={item.imgurl}  width="100%" /></a>
                </div>
              )
            })
          }
        </TabPane>
        <TabPane tab="Q群" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="公众号" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>

    </div>
  )
}



export default Advert