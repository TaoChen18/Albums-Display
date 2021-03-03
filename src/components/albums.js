import React, { useEffect, useState } from 'react';
import { List, Card, Row, Col } from 'antd';
//import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import './Albums.css';
import Searchbar from './Searchbar';

const Albums = () => {
    const [data, setData] = useState(null)
    const fetchURL = "https://itunes.apple.com/us/rss/topalbums/limit=100/json"
    
    useEffect(() => {
        getData();
    }, []);
    
    const getData = async () => {
        const response = await fetch(fetchURL);
        const jsonData = await response.json();
        setData(jsonData)
    }

    const listData = [];
    let i = 0;
    while(i < 100){
        let count = 0;
        const tmp = [];
        while(count < 4){
            const pic = data?.feed.entry[i]["im:image"][2].label;
            const name = data?.feed.entry[i]["im:name"].label;
            const album_link = data?.feed.entry[i].link.attributes.href;
            const right = data?.feed.entry[i].rights.label;
            const artist = data?.feed.entry[i]["im:artist"].label;
            const artist_link = data?.feed.entry[i]["im:artist"].attributes?.href;
            const price = data?.feed.entry[i]["im:price"].label;
            const num = data?.feed.entry[i]["im:itemCount"].label;
            const category = data?.feed.entry[i].category.attributes.label;
            const release_date = data?.feed.entry[i]["im:releaseDate"].attributes.label;
            tmp.push({
                picture: pic,
                name: name,
                album_href: album_link,
                artist: artist,
                artist_href: artist_link,
                price: price,
                num: num,
                category: category,
                release: release_date,
                company: right
                
            });
            i++;
            count++;
        }
        listData.push(tmp);
    }
    return(
        <div className="cards">
            
        <List itemLayout="vertical" size="small" pagination={{
            onChange: page => {
        console.log(page);
      },
      pageSize: 5,
    }}
    dataSource={listData}
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

export default Albums;
