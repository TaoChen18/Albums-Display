import React from 'react';
import './Albums.css';
import { List, Card, Row, Col } from 'antd';

const Albumlist = ({albumlist = []}) => {
    const renderoption = (content) => {
        if(content){
            return <Col span={6}>
            <a className='card_link' href={content?.album_href}><Card
            className='card_item'
            cover={
                    <img className='card_picture' 
                    alt="example" src={content?.picture}/>}
            // actions={[
            //     <SettingOutlined key="setting" />,
            //     <EditOutlined key="edit" />,
            //     <EllipsisOutlined key="ellipsis" />,
            // ]}
            >
                <div className='card_info'>
                    <h5 className='card_text'>{content?.name}</h5>
                    <h5 className='artist'>{content?.artist}</h5>
                    <h5 className='release_date'>{content?.release}</h5>
                    <h5 className='price'>{content?.price}</h5>
                </div>
            </Card></a>
        </Col>
        }
    }
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
            
            {renderoption(item[1])}
            {renderoption(item[2])}
            {renderoption(item[3])}
        </Row>
    )}
  />
  </div>
    )
}

export default Albumlist;