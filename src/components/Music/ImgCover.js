/**
 * 封面组件
 */
import React, { Component } from 'react';
import errorImg from '../../images/error.png';

class ImgCover extends Component {

  render() {
    const { showAll, isPlay, songInfo, index } = this.props;
    const { mouseClick, mouseDown } = this.props;
    const coverImg = songInfo[index] ? songInfo[index].al.picUrl : '';
    return (
      <div
        className="img-cover"
        onDoubleClick={mouseClick}
        onMouseDown={mouseDown}
        title={showAll ? "双击收起面板" : "双击展开面板"}
      >
        <img src={coverImg ? coverImg : errorImg} alt="" className={isPlay ? "rotate" : ""} onMouseDown={e=>{e.preventDefault()}}/>
      </div>
    );
  }
}

export default ImgCover; 