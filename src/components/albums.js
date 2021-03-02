import React, { useEffect, useState } from 'react';
import { List, Card, Row, Col } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';


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
            const current = data?.feed.entry[i];
            const pic = data?.feed.entry[i]["im:image"][2].label;
            tmp.push({
                href: current?.link.attributes.href,
                title: current?.title.label,
                picture: pic,
            });
            i++;
            count++;
        }
        console.log(tmp)
        listData.push(tmp);
    }
    return(
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
                <Card
                style={{width:275}}
                cover={<img alt="example" src={item[0].picture}/>}
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
                >
                    {item[0].title}
                </Card>
            </Col>
            <Col span={6}>
                <Card
                style={{width:275}}
                cover={<img alt="example" src={item[1].picture}/>}
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
                >
                    {item[1].title}
                </Card>
            </Col>
            <Col span={6}>
                <Card
                style={{width:275}}
                cover={<img alt="example" src={item[2].picture}/>}
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
                >
                    {item[2].title}
                </Card>
            </Col>
            <Col span={6}>
                <Card
                style={{width:275}}
                cover={<img alt="example" src={item[3].picture}/>}
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
                >
                    {item[3].title}
                </Card>
            </Col>
        </Row>
    )}
  />
    )
}

export default Albums;
