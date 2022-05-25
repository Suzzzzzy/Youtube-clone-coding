import React, {useState, useEffect} from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState, userInfoState, tokenState } from '../../src/atom'
import * as api from '../api'
import 'antd/dist/antd.css'; 
import { Layout, PageHeader, Card, Button } from 'antd';

const { Content } = Layout;

const { Meta } = Card;

const cardStyle = {
  width: '23%',
  height: '23%',
  marginLeft: '1%',
  marginRight: '1%',
  marginTop: '1%',
  marginBottom: '1%',

}

const cardimageStyle = {
  width: '100%',
  height: '280px',
  marginBottom: '3%',
}



const LikeVideo = () => {

  // 영상리스트 저장을 위한 useState, 아래는 예시 데이터.

  const [videoList, setVideoList] = useState([])
  const userId = useRecoilValue(userState)._id
  const userName = useRecoilValue(userState).name

  useEffect(() => {
    api.post("video/getVideoByWriter", {
      userId: userId 
    })
      .then((res) => setVideoList(res.data.video))
  }, [userId])


  // map함수 

  const mapVideo = videoList && 
    videoList.map((video, index) => {  
      const videoId = video.id
      const writerId = video.writer.id
      const title = video.title
      const description = video.description
      const filePath = video.filePath.substring(8)
      const thumbnail = video.thumbnail
      const updatedAt = video.updatedAt 
  
  return (

  <Card.Grid
    style={cardStyle}
    className='videoBox'
    hoverable
    key={videoId}
    >
  
  <img style={cardimageStyle} src={`http://localhost:3001/${thumbnail}`} alt="썸네일" >   
  </img>

  <Meta title={title} description={description}/>
  </Card.Grid>

)})


// ------------------------------- 아래는 컴퍼넌트  --------------------------//


return (

  <Content
  style={{
    marginLeft: '216px',
    marginTop: '16px',
    marginRight: '16px',
    overflow: 'initial',
  
  }}
>
  <div
    className="site-layout-background"
    style={{
      padding: 0,
      textAlign: 'center',
    }}
  >

  <PageHeader
    className="subscribe-page-header"
    ghost={false}
    title='나의 동영상'
    subTitle={`총 ${videoList.length}개`}
    avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
    extra={[]}
  />
  <Card>  
    {/* 아래는 맵함수  */}
    {mapVideo}
  </Card>  
  </div>
  </Content>
)}

export default LikeVideo