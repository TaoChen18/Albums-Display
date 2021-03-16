import React, {useState, useEffect} from 'react';
import { List, Button, InputNumber } from 'antd';
import './MyCart.css'

const MyCart = ({setOrder,props}) => {
    const [orders,setOrders] = useState(null);
    const [prices,setPrices] = useState({});
    const [amount,setAmount] = useState({});
    const [totalamount, setTotal] = useState(null);

    useEffect(() => {
        setOrders(props.data);
    },[props.data])

    const onRemoveItem = (item) => {
        const temp = {...orders};
        delete temp[item.id]
        setOrders(temp);
        setOrder(temp);
        let temptotal = 0
        for(let i in temp){
            temptotal += parseFloat(temp[i].price.substring(1)) * temp[i].num
        }
        setTotal(temptotal)
    }

    const listData = [];
    let defaulttotal = 0;
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
        defaulttotal += (parseFloat(price.substring(1)) * orders[i].num)
    }

    const onAmountChange = (item,e) => {
        const tempamount = amount
        tempamount[item.id] = e
        setAmount(tempamount)
        setPrices({...setPrices,[item.id]:parseFloat(item.price.substring(1))*e})
        let temporder = orders;
        for(let i in temporder){
            if(amount[i]){
                temporder[i].num = amount[i]
            }
        }
        setOrder(temporder)
        let temptotal = 0
        for(let i in temporder){
            temptotal += parseFloat(temporder[i].price.substring(1)) * temporder[i].num
        }
        setTotal(temptotal)
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
                Price: ${`${prices[item.id]? prices[item.id]:(parseFloat(item.price.substring(1))*item.num).toFixed(2)}`}
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
        <div className="total-amount">Total: ${`${totalamount? totalamount.toFixed(2):defaulttotal}`}</div>
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
