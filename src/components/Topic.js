import React from 'react';
import '../App.css';
import './Topic.css';

function Topic() {
  return (
    <div className='topic-container'>
      <img alt='background' src='https://vidooly.com/blog/wp-content/uploads/2019/09/Top-10-Websites-to-Find-Background-Music-for-your-Videos-featured-Image.jpg'
      style={{'objectFit': 'cover',
        'width': '100%',
        'height': '100%',
        'position': 'fixed',
        'zIndex': '-1'}}/>
      <h1>TOP 100 ALBUMS</h1>
      <p>Which one is your pick?</p>
    </div>
  );
}

export default Topic;