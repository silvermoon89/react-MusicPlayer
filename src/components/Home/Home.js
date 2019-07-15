import React, { Component } from 'react';
import MusicPlayer from '../Music/MusicPlayer';
import './../style.less'

class Home extends Component {
  render() {
    return (
      <div>
        {/* <img src="http://api.isoyu.com/bing_images.php" alt="" className="bodyBackground" onMouseDown={e=>{e.preventDefault()}}/> */}
        <MusicPlayer />
      </div>
    );
  }
}

export default Home;