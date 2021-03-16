import React, {useState, useEffect} from 'react';
import { List, Button, InputNumber } from 'antd';
import './MyCart.css'

const MyCart = ({setOrder,props}) => {
    const [orders,setOrders] = useState(null);
    const [prices,setPrices] = useState({});
    const [amount,setAmount] = useState({});

    useEffect(() => {
        setOrders(props.data);
    },[props.data])

    const onRemoveItem = (item) => {
        const temp = {...orders};
        delete temp[item.id]
        setOrders(temp);
        setOrder(temp);
    }

    const listData = [];
    let totalamount = 0;
    for(let i in orders){
        const pic = orders[i].picture
        const name = orders[i].name
        const artist = orders[i].artist
        const price = orders[i].price
        listData.push({
            id: i,
            picture: pic,
            name: name,
            artist: artist,
            price: price,
            num: orders[i].num,
            itemcount: orders[i].itemcount
        });
        totalamount += (parseFloat(price.substring(1)) * orders[i].num)
    }

    const onAmountChange = (item,e) => {
        setAmount({...setAmount,[item.id]:e})
        setPrices({...setPrices,[item.id]:parseFloat(item.price.substring(1))*e})
        let temporder = orders;
        for(let i in temporder){
            if(amount[i]){
                temporder[i].num = amount[i]
            }
        }
        setOrder(temporder)
    }

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
                <div className="order-detail" >
                Amount: <InputNumber min={1} 
                max={item.itemcount} 
                defaultValue={item.num}
                onChange={(e)=>onAmountChange(item,e)}/><br/>
                Price: ${`${prices[item.id]? prices[item.id]:parseFloat(item.price.substring(1))*item.num}`}
                </div>
                <Button type="primary" onClick={()=>onRemoveItem(item)}>
                    Remove Item
                </Button>
            </List.Item>
            )}
        />
        <hr style={{
        'border': '1px solid black'
    }}/>
        <div className="total-amount">Total: ${totalamount}</div>
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
