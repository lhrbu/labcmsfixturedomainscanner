import React, { useState } from 'react';
import { Layout, Menu, Modal, Button, Input, Row, Col } from 'antd';
import './App.css';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import CheckoutRecordsWebAPI from './WebAPIs/CheckoutRecordsWebAPI';
import CheckinRecordsWebAPI from './WebAPIs/CheckinRecordsWebAPI';
import SignIn from './Pages/SignIn';

const { Header, Content, Footer } = Layout;


const _checkoutRecordsWebAPI = new CheckoutRecordsWebAPI();
const _checkinRecordsWebAPI = new CheckinRecordsWebAPI();

function App() {

  const [logined,setLogined] = useState<boolean>(false);

  const [checkoutModalVisible, setCheckoutModalVisible] = useState<boolean>(false);
  const [checkinModalVisible, setCheckinModalVisible] = useState<boolean>(false);
  const [fixtureNoString, setFixtureNoString] = useState<string>("");
  const [onSubmitting, setOnSubmitting] = useState<boolean>(false);

  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" style={{ fontSize: '16px' }}
          defaultSelectedKeys={[window.location.pathname]}>
          <Menu.Item key="/">Home</Menu.Item>
        </Menu>
      </Header>
      <Content>
        <div className="site-layout-content">
          <div className="HeaderBar">HJL-NL-TI-V Fixture Management System</div>
          {
            logined?(
          <div className='CommandButtonsContainer'>
            <Button type="primary" icon={<LogoutOutlined />}
              className='CommandButton' block
              onClick={e => setCheckoutModalVisible(true)}>
              Checkout</Button>
            <Button icon={<LoginOutlined />} block
              className='CommandButton' danger
              onClick={e => setCheckinModalVisible(true)}>
              Checkin
              </Button>

            <Modal title="Checkout Confirm"
              visible={checkoutModalVisible}
              destroyOnClose
              onCancel={OnCheckoutCancel}
              onOk={OnCheckoutConfirm}>
              <Input type="text" autoFocus value={fixtureNoString} onChange={e => setFixtureNoString(e.currentTarget.value)} />
            </Modal>

            <Modal title="Checkin Confirm"
              visible={checkinModalVisible}
              destroyOnClose
              
              onCancel={OnCheckinCancel}
              onOk={OnCheckinConfirm}>
              <Input type="text" autoFocus value={fixtureNoString} onChange={e => setFixtureNoString(e.currentTarget.value)} />
            </Modal>

          </div>):
          <SignIn OnSignIn={()=>setLogined(true)}/>
          } 
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        LabCMS.FixtureDomain ©2021 Created by Raccoon Li
      </Footer>
    </Layout>
  );

  async function OnCheckoutConfirm() {
    try {
      setOnSubmitting(true);
      const fixtureNo = Number.parseInt(fixtureNoString);
      if (isNaN(fixtureNo)) {
        throw new Error("Input is not a valid fixture no");
      }
      await _checkoutRecordsWebAPI.FixtureRoomApproveAsync(fixtureNo);
      window.alert(`Check out fixture:${fixtureNoString} succefully!`)
    } catch (error) {
      window.alert(error)
    } finally {
      setFixtureNoString("");
      setOnSubmitting(false);
      setCheckoutModalVisible(false);
    }
  }

  function OnCheckoutCancel() {
    setFixtureNoString("");
    setCheckoutModalVisible(false);
  }

  async function OnCheckinConfirm() {
    try {
      setOnSubmitting(true);
      const fixtureNo = Number.parseInt(fixtureNoString);
      if (isNaN(fixtureNo)) {
        throw new Error("Input is not a valid fixture no");
      }
      await _checkinRecordsWebAPI.FixtureRoomApproveAsync(fixtureNo);
      window.alert(`Check in fixture:${fixtureNoString} succefully!`)
    } catch (error) {
      window.alert(error)
    } finally {
      setFixtureNoString("");
      setOnSubmitting(false);
      setCheckinModalVisible(false);
    }
  }

  function OnCheckinCancel() {
    setFixtureNoString("");
    setCheckinModalVisible(false);
  }
}

export default App;
