import React from 'react';
import Topic from '../Topic';
import Albums from '../Albums'
import Footer from '../Footer'

const Home = ({onClick,props}) => {
    return (
        <div>
            <Topic />
            <Albums onClick={()=>onClick} props={{loggedIn: props.loggedIn,myorder:props.myorder}}/>
            <Footer />
        </div>
    )
}

export default Home;
