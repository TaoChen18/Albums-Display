import React from 'react';
import './Albums.css';
import { List, Card, Row, Col } from 'antd';

const Albumlist = ({albumlist = []}) => {
    return (
        <div className="cards">
        <List itemLayout="vertical" size="small" pagination={{
            onChange: page => {
        console.log(page);
      },
      pageSize: 5,
    }}
    dataSource={albumlist}
    renderItem={item => (
        <Row gutter={24}>
            <Col span={6}>
                <a className='card_link' href={item[0].album_href}><Card
                className='card_item'
                cover={
                        <img className='card_picture' 
                        alt="example" src={item[0].picture}/>}
                // actions={[
                //     <SettingOutlined key="setting" />,
                //     <EditOutlined key="edit" />,
                //     <EllipsisOutlined key="ellipsis" />,
                // ]}
                >
                    <div className='card_info'>
                        <h5 className='card_text'>{item[0].name}</h5>
                        <h5 className='artist'>{item[0].artist}</h5>
                        <h5 className='release_date'>{item[0].release}</h5>
                        <h5 className='price'>{item[0].price}</h5>
                    </div>
                </Card></a>
            </Col>
            <Col span={6}>
                <a className='card_link' href={item[1].album_href}><Card
                className='card_item'
                cover={
                        <img className='card_picture' 
                        alt="example" src={item[1].picture}/>}
                // actions={[
                //     <SettingOutlined key="setting" />,
                //     <EditOutlined key="edit" />,
                //     <EllipsisOutlined key="ellipsis" />,
                // ]}
                >
                    <div className='card_info'>
                        <h5 className='card_text'>{item[1].name}</h5>
                        <h5 className='artist'>{item[1].artist}</h5>
                        <h5 className='release_date'>{item[1].release}</h5>
                        <h5 className='price'>{item[1].price}</h5>
                    </div>
                </Card></a>
            </Col>
            <Col span={6}>
                <a className='card_link' href={item[2].album_href}><Card
                className='card_item'
                cover={
                        <img className='card_picture' 
                        alt="example" src={item[2].picture}/>}
                // actions={[
                //     <SettingOutlined key="setting" />,
                //     <EditOutlined key="edit" />,
                //     <EllipsisOutlined key="ellipsis" />,
                // ]}
                >
                    <div className='card_info'>
                        <h5 className='card_text'>{item[2].name}</h5>
                        <h5 className='artist'>{item[2].artist}</h5>
                        <h5 className='release_date'>{item[2].release}</h5>
                        <h5 className='price'>{item[2].price}</h5>
                    </div>
                </Card></a>
            </Col>
            <Col span={6}>
                <a className='card_link' href={item[3].album_href}><Card
                className='card_item'
                cover={
                        <img className='card_picture' 
                        alt="example" src={item[3].picture}/>}
                // actions={[
                //     <SettingOutlined key="setting" />,
                //     <EditOutlined key="edit" />,
                //     <EllipsisOutlined key="ellipsis" />,
                // ]}
                >
                    <div className='card_info'>
                        <h5 className='card_text'>{item[3].name}</h5>
                        <h5 className='artist'>{item[3].artist}</h5>
                        <h5 className='release_date'>{item[3].release}</h5>
                        <h5 className='price'>{item[3].price}</h5>
                    </div>
                </Card></a>
            </Col>
        </Row>
    )}
  />
  </div>
    )
}

export default Albumlist;