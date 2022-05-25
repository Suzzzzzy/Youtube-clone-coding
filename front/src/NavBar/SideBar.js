import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState, userInfoState, tokenState } from '../../src/atom'
import * as api from '../api'
import 'antd/dist/antd.css';
import { Row, Col, Layout, Menu } from 'antd';
import {
  HomeOutlined,
  InboxOutlined,
  YoutubeOutlined,
  LikeOutlined,
  LoginOutlined,
  UploadOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const { Header, Sider } = Layout;

const SideBar = () => {
  
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState(false)
  const userToken = sessionStorage.getItem('userToken')
    
  const UserState = useRecoilValue(userState)
  const setUserState = useSetRecoilState(userState)
  const setTokenState = useSetRecoilState(tokenState)
  const setUserInfostate = useSetRecoilState(userInfoState)
    
  const stateInitialization = () => {
  
    if(!userToken) {
      setUserState({ user: null }) 
      setTokenState({ token: null })  
      setUserInfostate(undefined)  
      } else {
        setLoginState(true)
        console.log(loginState)
      }
      
    } 

    useEffect(stateInitialization, [loginState, userToken, setUserState, setTokenState, setUserInfostate])

    const [videoList, setVideoList] = useState([])
    const userId = useRecoilValue(userState)._id
    const userName = useRecoilValue(userState).name

    useEffect(() => {
      try {
        api.post("video/getSubscriptionVideos", { 
          userId: userId }).then((res) => setVideoList(res.data))
    } catch(err) {
        console.log(err.message)}
    }, [userId])

    let defaultName = ""
    let subScribingNameList = []
    for (let i=0; i<videoList.length; i++) {
      if(defaultName !== videoList[i].writer.name){ 
          defaultName = videoList[i].writer.name
          const element = getItem(defaultName, `/subscribePage/${videoList[i].writer._id}`)
          subScribingNameList.push(element)
    }
  } console.log(subScribingNameList)
    
  const items = [
    getItem('홈', '/', <HomeOutlined />),
    getItem('보관함', '/myVideoPage', <InboxOutlined />),
    getItem('좋아요 동영상', '/likeVideoPage', <LikeOutlined />),
    getItem('구독', 'sub1', <YoutubeOutlined />, subScribingNameList),
  ];

  const items2 = [
    getItem('업로드', '/video/upload', <UploadOutlined />),
    getItem('회원가입', '/register', <CustomerServiceOutlined />),
    getItem('로그인', '/login', <LoginOutlined />),
  ];

  const onClick = (e) => {
    navigate(e.key);
  };


  return (
    <>
      <Layout hasSider>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            paddingTop: 60,
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['4']}
            items={items}
            onClick={onClick}
          />
        </Sider>
      </Layout>

      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          <Row>
          <Col flex="auto"><span style={{color:"whitesmoke"}}>{loginState && `${UserState.name}님 환영합니다!`}</span></Col>
            <Col flex="330px">
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['4']}
                items={items2}
                onClick={onClick}
              />
            </Col>
          </Row>
        </Header>
      </Layout>
    </>
  );
};

export default SideBar;
