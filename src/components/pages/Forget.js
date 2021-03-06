import React from 'react';
import { Form, Input, Button } from 'antd';
import './Forget.css'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Forget = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
      <div className='layout'>
          <img alt='background' src='https://www.ox.ac.uk/sites/files/oxford/styles/ow_large_feature/s3/field/field_image_main/Sheet%20Music%20-%20Luke%20Lewis.jpg?itok=-JlFk72h'
      style={{'objectFit': 'cover',
        'width': '100%',
        'height': '100%',
        'position': 'fixed',
        'zIndex': '-1'}}/>
          <div className='forget-form'>
          <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                {
                    required: true,
                    message: 'Please input your username!',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                {
                    required: true,
                    message: 'Please input your email!',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                Send Email
                </Button>
            </Form.Item>
            </Form>
          </div>
      </div>
  );
};

export default Forget;