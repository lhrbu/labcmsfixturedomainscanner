import React, { useState } from 'react';
import { Layout, Menu, Modal, Button, Input, Row, Col, Form } from 'antd';
import './App.css';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import CheckoutRecordsWebAPI from './WebAPIs/CheckoutRecordsWebAPI';
import CheckinRecordsWebAPI from './WebAPIs/CheckinRecordsWebAPI';
import SignIn from './Pages/SignIn';

const { Header, Content, Footer } = Layout;


const _checkoutRecordsWebAPI = new CheckoutRecordsWebAPI();
const _checkinRecordsWebAPI = new CheckinRecordsWebAPI();

function App() {

  const [logined, setLogined] = useState<boolean>(false);

  const [checkoutModalVisible, setCheckoutModalVisible] = useState<boolean>(false);
  const [checkinModalVisible, setCheckinModalVisible] = useState<boolean>(false);
  const [fixtureNoString, setFixtureNoString] = useState<string>("");

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
            logined ? (
              <div className='CommandButtonsContainer'>
                <Button type="primary" icon={<LogoutOutlined />}
                  className='CommandButton' block
                  onClick={e => setCheckoutModalVisible(true)}>
                  Checkout
                </Button>
                <Button icon={<LoginOutlined />} block
                  className='CommandButton' danger
                  onClick={e => setCheckinModalVisible(true)}>
                  Checkin
                </Button>

                <Modal title="Checkout Confirm"
                  visible={checkoutModalVisible}
                  destroyOnClose
                  onOk={OnCheckoutConfirm}
                  onCancel={OnCheckoutCancel}>
                  <Form
                    onFinish={OnCheckoutConfirm}
                    onFinishFailed={OnCheckoutCancel}>
                    <Form.Item label="Fixture No.">
                      <Input type="text" autoFocus value={fixtureNoString}
                        onInput={e => setFixtureNoString(e.currentTarget.value)} />
                    </Form.Item>
                  </Form>
                </Modal>

                <Modal title="Checkin Confirm"
                  visible={checkinModalVisible}
                  destroyOnClose
                  onOk={OnCheckinConfirm}
                  onCancel={OnCheckinCancel}>
                  <Form
                    onFinish={OnCheckinConfirm}
                    onFinishFailed={OnCheckinCancel}>
                    <Form.Item label="Fixture No.">
                      <Input type="text" autoFocus value={fixtureNoString}
                        onInput={e => setFixtureNoString(e.currentTarget.value)} />
                    </Form.Item>
                  </Form>

                </Modal>

              </div>) :
              <SignIn OnSignIn={() => setLogined(true)} />
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
      const fixtureNo = Number.parseInt(fixtureNoString);
      if (isNaN(fixtureNo)) {
        throw new Error("Input is not a valid fixture no");
      }
      await _checkoutRecordsWebAPI.FixtureRoomApproveAsync(fixtureNo);
      window.alert(`Check out fixture:${fixtureNoString} succefully!`)
    } catch (error) {
      window.alert(error)
    } finally {
      OnCheckoutCancel();
    }
  }

  function OnCheckoutCancel() {
    setFixtureNoString("");
    setCheckoutModalVisible(false);
  }

  async function OnCheckinConfirm() {
    try {
      const fixtureNo = Number.parseInt(fixtureNoString);
      if (isNaN(fixtureNo)) {
        throw new Error("Input is not a valid fixture no");
      }
      await _checkinRecordsWebAPI.FixtureRoomApproveAsync(fixtureNo);
      window.alert(`Check in fixture:${fixtureNoString} succefully!`)
    } catch (error) {
      window.alert(error)
    } finally {
      OnCheckinCancel();
    }
  }

  function OnCheckinCancel() {
    setFixtureNoString("");
    setCheckinModalVisible(false);
  }
}

export default App;
