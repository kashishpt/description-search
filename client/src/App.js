import React, { useState, useEffect } from 'react'
import Page from './components/Page';

function App() {
  const [videos, updateVideos] = useState([{}])
  // useEffect(() => {
  //   fetch("/videos/MrBeast")
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  // }, [])


  return <div className='App'><Page></Page></div>;
}
export default App;
