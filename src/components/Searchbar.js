import React from 'react';

const Searchbar = ({keyword, setKeyword}) => {
    return (
        <input type='search'
        className='search'
        value={keyword}
        key="random1"
        placeholder={"Enter Albums name or Artist name..."}
        onChange={(e) => setKeyword(e.target.value)}
        />
    )
}

export default Searchbar;