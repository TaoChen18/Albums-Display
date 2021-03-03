import React from 'react'
import Albums from './components/Albums';
import Navbar from './components/Navbar';
import './App.css';
import Topic from './components/Topic';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Navbar />
      <Topic />
      <Albums />
      <Footer />
      </>
  )
}

export default App;