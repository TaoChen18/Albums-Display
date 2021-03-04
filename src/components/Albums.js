import React, { useEffect, useState } from 'react';
import { List, Card, Input, Space,Tag, Collapse } from 'antd';
import { AppleOutlined } from '@ant-design/icons';
import './Albums.css';


const { Search } = Input;

const Albums = () => {
    const [data, setData] = useState(null)
    const [dataDefault, setDataDefault] = useState(null);
    const [input, setInput] = useState(null);
    const [play, setPlay] = useState(true);
    const [duration, setDuration] = useState(0);
    const [index, setIndex] = useState({});

    const fetchURL = "https://itunes.apple.com/us/rss/topalbums/limit=100/json"
    
    useEffect(() => {
        getData();
    }, []);

    useEffect(() =>{
        if(duration===0){
            setPlay(true);
            setDuration(1);
        }
    },[duration]);

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
        setInput(input);
        setData(filtered);
        setPlay(false);
        setDuration(0);
    }
    const listData = [];
    let i = 0;
    while(i < data?.length){
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
        listData.push({
            id: i,
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
    }

    const expandCard = (i) => {
        console.log(i)
        setIndex({...setIndex,[i]: !index[i]})
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
        
        <div className="cards">
            
        <List itemLayout="vertical" size="small" pagination={{
            onChange: page => {
        setPlay(false);
        setDuration(0);
      },
      pageSize: 20,
    }}
    dataSource={listData}
    renderItem={item => (
                <div className="card_container"
                style={{
                    'width' : `${index[item.id] ? 550 : 250}px`,
                    'height' : `${index[item.id] ? 450 : 450}px`,
                    'transition' : 'width 1s',
                    'animation': `${play ? 'fade-in':""} 1s`,
                    'animationDuration': `${0.2*duration}s`
                }}
                >
                <Card
                className='card_link stack_top'style={{
                    'animation': `${play ? 'fade-in':""} 1s`,
                    'animationDuration': `${0.2*duration}s`
                }}
                onClick={() => {expandCard(item.id)}}
                cover={
                        <img className='card_picture' 
                        alt="example" src={item.picture}/>}
                >
                    <div className='card_info'>
                        <h5 className='card_text'>{item.name}</h5>
                        <h5 className='artist'>{item.artist}</h5>
                        <h5 className='release_date'>{item.release}</h5>
                        <h5 className='price'>{item.price}</h5>
                        <Tag className='category' color="blue">{item.category}</Tag>
                    </div>
                </Card>
                <div className='card_detail'
                style={{
                    'left' : `${index[item.id] ? 280 : 30}px`,
                    'transition' : 'left 1s',
                }}
                >
                        <h5 className='album'><span>{item.name}</span></h5>
                        <div className='album_link'><a href={item.album_href} target='_blank' style={{'color':'black'}}>Learn more<AppleOutlined className="apple_link"/></a></div>
                        <h5 className='artist_in'><span>Artist: </span><a href={item.artist_href} target="_blank">{item.artist}</a></h5>
                        <h5 className='release_date_in'><span>Release Date: </span>{item.release}</h5>
                        <h5 className='company'><span>Company: </span>{item.company}</h5>
                        <h5 className='item_count'>{item.num}</h5>
                    </div>
                </div>
                
    )}
  />
  </div>
        
        </>
    )
}

export default Albums;
