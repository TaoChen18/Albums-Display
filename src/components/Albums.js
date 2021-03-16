import React, { useEffect, useState } from 'react';
import { List, Card, Input, Space,Tag, InputNumber, Button, Menu, Dropdown} from 'antd';
import { AppleOutlined, DownOutlined } from '@ant-design/icons';
import './Albums.css';
import Topic from './Topic';
import Footer from './Footer';


const { Search } = Input;

const Albums = ({setOrder,props}) => {
    const [data, setData] = useState(null)
    const [dataDefault, setDataDefault] = useState(null);
    const [play, setPlay] = useState(true);
    const [duration, setDuration] = useState(0);
    const [index, setIndex] = useState({});
    const [firstime, setFirstTime] = useState(true);
    const [submitError, setSubmitError] = useState({});
    const [orders, setOrders] = useState(null);
    const [amount, setAmount] = useState({});
    const [allorders,setAllOrders] = useState({});
    const [overamount, setOverAmount] = useState({});
    const [submitSuccess, setSubmitSuccess] = useState({});
    const [invalidNumber, setInvalidNumber] = useState({});

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
        setFirstTime(false);
    }

    const onSearch = async (input) => {
        const filtered = []
        for(let i = 0; i < dataDefault.length;i++){
            if(dataDefault[i]["im:name"].label.toLowerCase().includes(input.toLowerCase())||
            dataDefault[i]["im:artist"].label.toLowerCase().includes(input.toLowerCase())){
                filtered.push(dataDefault[i]);
            }
        }
        setData(filtered);
        setPlay(false);
        setDuration(0);
    }

    const categories = [];
    for(let i = 0; i < data?.length;i++){
        categories.push(data[i].category.attributes.label);
    }
    const distinctcategory = [...new Set(categories)]

    const RecoverData = async () => {
        setData(dataDefault);
        setPlay(false);
        setDuration(0);
    }

    const SortPriceAscending= async () => {
        const sorted = [...data].sort((a,b) => (parseFloat(a["im:price"].label?.substring(1)) > parseFloat(b["im:price"].label?.substring(1))) ? 1: -1);
        setData(sorted);
        setPlay(false);
        setDuration(0);
      }

    const SortPriceDescending= async () => {
        const sorted = [...data].sort((a,b) => (parseFloat(a["im:price"].label?.substring(1)) < parseFloat(b["im:price"].label?.substring(1))) ? 1: -1);
        setData(sorted);
        setPlay(false);
        setDuration(0);
    }

    const SortDateDescending= async () => {
        const sorted = [...data].sort((a,b) => (a["im:releaseDate"].label < b["im:releaseDate"].label ? 1: -1));
        setData(sorted);
        setPlay(false);
        setDuration(0);
    }
    const SortDateAscending= async () => {
        const sorted = [...data].sort((a,b) => (a["im:releaseDate"].label > b["im:releaseDate"].label ? 1: -1));
        setData(sorted);
        setPlay(false);
        setDuration(0);
    }

    const FilterByYear = (start,end) => {
        const filtered = []
        for(let i = 0; i < data.length;i++){
            if(data[i]["im:releaseDate"].attributes.label.split(',')[1] >= start &&
            data[i]["im:releaseDate"].attributes.label.split(',')[1] <= end){
                filtered.push(data[i]);
            }
        }
        setData(filtered);
        setPlay(false);
        setDuration(0);
    }

    const FilterByCategory = async (thecategory) => {
        const filtered = []
        for(let i = 0; i < data.length;i++){
            if(data[i].category.attributes.label === thecategory){
                filtered.push(data[i]);
            }
        }
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
        setIndex({...setIndex,[i]: !index[i]})
    }

    useEffect(() => {
        if(orders){
            let temporder = allorders
            if(temporder.hasOwnProperty(orders.id)){
                temporder[orders.id].num=orders.num
            }else{
                temporder[orders.id] = orders
            }
            setAllOrders(temporder)
            setOrders(null);
            
        }
    },[orders,allorders])

      const onFormFinish = async (order,e) => {
          e.preventDefault();
          if(!props.loggedIn && !props.token){
            setSubmitError({...setSubmitError,[order.id]:["Please LogIn before Purchase!"]})
          }else{
            if(!amount[order.id]){
                setInvalidNumber({...setInvalidNumber,[order.id]:["Please enter a valid number!"]})
                return
            }
            setInvalidNumber({...setInvalidNumber,[order.id]:[]})
            let ordernum = amount[order.id];
            if(order.id in allorders){
                if(ordernum + allorders[order.id].num > order.num){
                    setOverAmount({...setOverAmount,[order.id]:["Can't add more items!"]})
                    setSubmitSuccess({...setSubmitSuccess,[order.id]:[]})
                    return
                }
                ordernum += allorders[order.id].num
            }
            setOrders({
                id: order.id,
                picture: order.picture,
                name: order.name,
                artist: order.artist,
                price: order.price,
                num: ordernum,
                itemcount: order.num
            })
            setOrder(allorders);
            setSubmitSuccess({...setSubmitSuccess,[order.id]:["Added to your Cart!"]})
          }
      }

      const onOrderChange = (i,e)=> {
        setAmount({...setAmount, [i]:e});
      }
    

      const menuSort = (
        <Menu>
            <Menu.Item key="0" onClick={RecoverData}>
            Default Order
          </Menu.Item>
          <Menu.Item key="0" onClick={SortPriceAscending}>
            Lowest to Highest Price
          </Menu.Item>
          <Menu.Item key="1" onClick={SortPriceDescending}>
            Highest to Lowest Price
          </Menu.Item>
          <Menu.Item key="2" onClick={SortDateDescending}>
              Release Date New to Old
            </Menu.Item>
          <Menu.Item key="3" onClick={SortDateAscending}>
              Release Date Old to New
            </Menu.Item>
        </Menu>
      );


      const menuYear = (
        <Menu>
            <Menu.Item onClick={() => FilterByYear(1970,1989)}>
                    1970 - 1989
            </Menu.Item>
            <Menu.Item onClick={() => FilterByYear(1990,2009)}>
                    1990 - 2009
            </Menu.Item>
            <Menu.Item onClick={() => FilterByYear(2010,2021)}>
                    2010 - 2021
            </Menu.Item>
        </Menu>
      );

      const menuCategory = (
        <Menu>
            {distinctcategory.map((item) =>
            <Menu.Item onClick={()=>FilterByCategory(item)}>
                    {item}
            </Menu.Item>
            )}
        </Menu>
      );

      


    return(
        <>
        <Topic />
        
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

        <div className="ant-dropdown-link" style={{'animation': `${firstime ? 'fade-in':""} 1s`,
                    'animationDuration': `${0.2}s`}}>
        <Space direction="vertical">
            <Space wrap>
                <div className="filter">Filter By: </div>
            <Dropdown overlay={menuYear} placement="bottomCenter" trigger={['click']}>
                <Button>Year</Button>
            </Dropdown>
            <Dropdown overlay={menuCategory} placement="bottomCenter" trigger={['click']}>
                <Button>Category</Button>
            </Dropdown>
            <div className="reset-button" onClick={RecoverData}>Reset</div>
            <Dropdown overlay={menuSort} placement="bottomRight" trigger={['click']}>
                <div className="sort-button" onClick={e => e.preventDefault()}>
                Sort <DownOutlined />
                </div>
            </Dropdown>
            </Space>
        </Space>
        </div>


        
            
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
                    'height' : `${index[item.id] ? 480 : 480}px`,
                    'transition' : 'width 1s',
                    'animation': `${play ? 'fade-in':""} 1s`,
                    'animationDuration': `${0.2*duration}s`
                }}
                >
                <Card
                className='card_link stack_top'style={{
                    'animation': `${play ? 'fade-in':""} 1s`,
                    'animationDuration': `${0.1*duration}s`
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
                        <div className='album_link'><a href={item.album_href} target='_blank' rel="noreferrer" style={{'color':'black'}}>Learn more<AppleOutlined className="apple_link"/></a></div>
                        <h5 className='artist_in'><span>Artist: </span><a href={item.artist_href} target="_blank" rel="noreferrer">{item.artist}</a></h5>
                        <h5 className='release_date_in'><span>Release Date: </span>{item.release}</h5>
                        <h5 className='company'><span>Company: </span>{item.company}</h5>

                        <div className='submission_form'>
                        <InputNumber min={0} 
                        max={item.num} 
                        style={{ width: "35%",
                                "marginBottom": "10px" }}
                        defaultValue={0}
                        onChange={(e)=>onOrderChange(item.id,e)}
                        /><br/>
                            
                        <Button type="primary" onClick={(e)=>onFormFinish(item,e)}>
                            Add to Cart
                        </Button>
                        {invalidNumber[item.id]? invalidNumber[item.id].map(msg => (
                            <p style={{'color':'red'}} key={msg}>Error: {msg}</p>
                            )): <p/>}
                        {submitError[item.id]? submitError[item.id].map(error => (
                            <p style={{'color':'red'}} key={error}>Error: {error}</p>
                            )): <p/>}
                        {overamount[item.id]? overamount[item.id].map(msg => (
                            <p style={{'color':'red'}} key={msg}>Error: {msg}</p>
                            )): <p/>}
                        {submitSuccess[item.id]? submitSuccess[item.id].map(msg => (
                            <p style={{'color':'green'}} key={msg}>{msg}</p>
                            )): <p/>}
                        </div>
                    </div>
                </div>
                
    )}
  />
  </div>
  <Footer />
        
        </>
    )
}

export default Albums;
