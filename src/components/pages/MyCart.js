import React, {useState, useEffect} from 'react';
import { List, Avatar, Space, Button } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import './MyCart.css'

const MyCart = (props) => {
    const [data, setData] = useState(null)
    const fetchURL = "https://itunes.apple.com/us/rss/topalbums/limit=100/json"
    
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        const response = await fetch(fetchURL);
        const jsonData = await response.json();
        setData(jsonData.feed.entry);
    }

    const listData = [];
    let i = 0;
    while(i < data?.length){
        const pic = data[i]["im:image"][2].label;
        const name = data[i]["im:name"].label;
        const artist = data[i]["im:artist"].label;
        const price = data[i]["im:price"].label;
        listData.push({
            id: i,
            picture: pic,
            name: name,
            artist: artist,
            price: price,
            num: 2,
            
        });
        i++;
        if(i===3){
            break;
        }
    }

    const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
    );
    return (
        <>
        <div>
        <List
            itemLayout="vertical"
            size="large"
            dataSource={listData}
            renderItem={item => (
            <List.Item
                key={item.title}
                extra={
                <img
                    width={200}
                    alt="logo"
                    src={item.picture}
                />
                }
            >
                <List.Item.Meta
                title={<a href={item.href}>{item.name}</a>}
                description={item.artist}
                />
                {item.num}<br/>
                Price: ${parseFloat(item.price.substring(1))*item.num}
            </List.Item>
            )}
        />
        <hr style={{
        'border': '1px solid black'
    }}/>
        <div className="total-amount">Total: $53.94</div>
        </div>
        <Button
        style={{'margin-top':"40px",
        'position':"absolute",
        'right':'0',
        'marginRight':'20px'}}>Checkout</Button>
        </>
    )
}

export default MyCart;
