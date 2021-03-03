import React, { useEffect, useState } from 'react';
import { List, Card, Row, Col } from 'antd';
//import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import './Albums.css';
import Albumlist from './Albumlist';
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

const Albums = () => {
    const [data, setData] = useState(null)
    const [dataDefault, setDataDefault] = useState(null);
    const [input, setInput] = useState(null);

    const fetchURL = "https://itunes.apple.com/us/rss/topalbums/limit=100/json"
    
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const response = await fetch(fetchURL);
        const jsonData = await response.json();
        setData(jsonData.feed.entry);
        setDataDefault(jsonData.feed.entry)
    }

    const onSearch = async (input) => {
        const filtered = []
        for(let i = 0; i < dataDefault.length;i++){
            if(dataDefault[i]["im:name"].label.toLowerCase().includes(input.toLowerCase())||
            dataDefault[i]["im:artist"].label.toLowerCase().includes(input.toLowerCase())){
                filtered.push(dataDefault[i]);
            }
        }
        console.log(filtered)
        setInput(input);
        setData(filtered);
    }

    const listData = [];
    let i = 0;
    while(i < data?.length){
        let count = 0;
        const tmp = [];
        while(count < 4 && i < data?.length){
            const pic = data[i]["im:image"][2].label;
            const name = data[i]["im:name"].label;
            const album_link = data[i].link.attributes.href;
            const right = data[i].rights.label;
            const artist = data[i]["im:artist"].label;
            const artist_link = data[i]["im:artist"].attributes?.href;
            const price = data[i]["im:price"].label;
            const num = data[i]["im:itemCount"].label;
            const category = data[i].category.attributes.label;
            const release_date = data[i]["im:releaseDate"].attributes.label;
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
        <>
        <div className="search_bar">
        <Space direction="vertical">
            <Search
            placeholder="Enter Album Name or Artist Name..."
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            />
        </Space>
        </div>
        
        <Albumlist albumlist={listData} />
        
        </>
    )
}

export default Albums;
