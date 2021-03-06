import React, {useState} from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './SignIn.css';
import PropTypes from 'prop-types';

async function loginUser(credentials){
    return fetch('http://localhost:8080/sign-in',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data=> data.json())
}

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 26,
  },
};

const userlibrary = {
    "admin":"123456"
}

const SignIn = ({setlog,setuser,settoken,props}) => {
    const [username,setUserName] = useState();
    const [password, setPassWord] = useState();
    const [loginError, setloginError] = useState(null);

    const handleSubmit = async () => {
        const token = await loginUser({
            username,
            password
        });
        settoken(token);
    }

  const onFinish = (values) => {
      if(!(values.username in userlibrary)){
            onFinishFailed("User or password doesn't match");
      }else{
          if(values.password !== userlibrary[values.username]){
            onFinishFailed("User or password doesn't match");
          }else{
            setlog(true);
            setuser(values.username);
            setUserName(values.username);
            setPassWord(values.password)
            handleSubmit();
          }
      }
  };

  const onFinishFailed = (errorInfo) => {
    setloginError([errorInfo])
  };

  return (
      <div className="layout">
          <img alt='background' src='https://www.ox.ac.uk/sites/files/oxford/styles/ow_large_feature/s3/field/field_image_main/Sheet%20Music%20-%20Luke%20Lewis.jpg?itok=-JlFk72h'
      style={{'objectFit': 'cover',
        'width': '100%',
        'height': '100%',
        'position': 'fixed',
        'zIndex': '-1'}}/>
    <div className="signin-form">
        
    <Form
        className="form"
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
        <h1 className="welcome-message">Welcome!</h1>
        <Form.Item
        className="username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>

      <Form.Item
      className="password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item> 
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="/forget-form">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="/sign-up">register now!</a>
        {loginError? loginError.map(error => (
                            <p style={{'color':'red'}} key={error}>Error: {error}</p>
                            )): <p/>}
      </Form.Item>
    </Form>
    </div>
    </div>
  );
};

SignIn.propTypes = {
    settoken: PropTypes.func.isRequired
}

export default SignIn;