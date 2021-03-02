import React, { Fragment, useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Breadcrumb } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import md5 from 'md5';
import './SignIn.css';
import RolesWebAPI from '../WebAPIs/RolesWebAPI';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 8 },
};

const _rolesWebAPI = new RolesWebAPI();

const SignIn: React.FC<{ OnSignIn?: () => void }> = ({ OnSignIn }) => {
    const [loginButtonLoading, setLoginButtonLoading] = useState<boolean>(false);


    return  (
            <Form {...layout}
                size={'large'}
                style={{ marginTop: '10vh' }}
                name="SignInForm"
                initialValues={{ Remember: true }}
                onFinish={LoginAsync}>
                <Form.Item
                    label="User Id"
                    name="UserId"
                    rules={[{ required: true, message: 'Please input your user id!' }]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="User Id" />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="Password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                    />
                </Form.Item>



                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" className="login-form-button"
                        loading={loginButtonLoading}>
                        Log In
                    </Button>
                </Form.Item>
            </Form>
    );

    async function LoginAsync(values: any) {
        setLoginButtonLoading(true);
        try {
            await _rolesWebAPI.LoginAsync(values.UserId,md5(values.Password));
            OnSignIn?.();
        } catch (err) {
            window.alert(err);
        } finally { setLoginButtonLoading(false); }
    }
}

export default SignIn;