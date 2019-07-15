/**
 * 播放器控制组件
 */
import React, { Component } from 'react';
import bgImg from './../../images/music-bg.jpg';
import voice from './../../images/voice.svg'
// import playlistId from '../../config/config.js/index.js';

class PlayBox extends Component {

  componentDidUpdate(prevProps) {
    //根据上首歌和当前要播放的歌曲的索引值来判断是否需要更新，若不加此条判断会造成无限重复渲染，造成页面崩溃
    if (this.props.index !== prevProps.index) {
      const { index, getMusicUrl, nextClick } = this.props;
      const songId = this.props.songInfo[index] ? this.props.songInfo[index].id : '';
      fetch(window.config.url+'check/music?id=' + songId,{
        method: 'GET',
        mode: 'cors',
      })
        .then(respone => {
          return respone.json();
        })
        .then(canPlay => {
          if (canPlay.success == true) {
            fetch(window.config.url+'song/url?id=' + songId,{
              method: 'GET',
              mode: 'cors',
            })
              .then(respone => {
                return respone.json();
              })
              .then(music => {
                const url = music.data[0] ? music.data[0].url : '';
                getMusicUrl(url);
              })

            // fetch('http://localhost:4000/lyric?id=' + songId)
            //   .then(respone =>{
            //     return respone.json();
            //   })
            //   .then(lyric =>{
            //     console.log(lyric);
            //     const reg = /\\n/g;
            //     const timereg = /\[\d{2}:\d{2}:\d{2}\]/g;
            //     const lrc = lyric.lrc.lyric.match(reg);
            //     console.log(lrc);
            //     console.log(lyric.lrc.lyric);
            //   })
          } else {
            console.error("抱歉！此歌曲暂无版权(ID="+songId+")，已切换歌曲!");
            nextClick();
          }
        })
    }
  }

  render() {
    const {volumeHeight, volumeClick, showVolume, voiceBtnClick, progressClick, progressWidth, playlistBtnClick , mp3Url, songInfo, index, nextClick, prevClick, showAll, toggleClick, isPlay, repeatAll, repeatOne, random, shunxu, danqu, suiji } = this.props;
    let artist = '';
    const arts = songInfo[index] ? songInfo[index].ar : '';
    for (let i = 0; i < arts.length; i++) {
      artist = artist + '/' + arts[i].name;
    }
    const art = artist.substring(1);
    const textWidth = document.querySelector('.songTitle') ? document.querySelector('.songTitle').querySelector('p').offsetWidth : '';
    const conWidth = document.querySelector('.songTitle') ? document.querySelector('.songTitle').offsetWidth : '';

    return (
      <div
        // className={showAll ? "playbox fadein" : "playbox"}
        className="playbox"
        style={{display: showAll ? "block" : "none"}}
      >
        <img src={bgImg} alt="" className="bgImg" />

        <audio id="audio" src={mp3Url} autoPlay={true} loop={danqu}></audio>

        <div className="songTitle">
          <p className={textWidth > conWidth ? "titleloop textScroll" : "titleloop"}><span className="title">{songInfo[index] ? songInfo[index].name : ''}</span><span className="artist">--{art}</span></p>
        </div> 
        <div className="progress" onClick={progressClick}>
          <div className="progress-top" style={{width: progressWidth ? progressWidth : 0 }}></div>
        </div>
        <div className="controller" style={{ bottom: 12 }}>
          <div className="prev"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={prevClick}><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /><path d="M0 0h24v24H0z" fill="none" /></svg>
          </div>
          <div className="play">
            {isPlay ?
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={toggleClick}><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /><path d="M0 0h24v24H0z" fill="none" /></svg> :
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={toggleClick}><path d="M8 5v14l11-7z" /><path d="M0 0h24v24H0z" fill="none" /></svg>
            }
          </div>
          <div className="next">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={nextClick}><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /><path d="M0 0h24v24H0z" fill="none" /></svg>
          </div>
          <div className="play-mode">
            {shunxu ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={repeatAll}><path d="M0 0h24v24H0z" fill="none" /><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" /></svg> : ''}
            {suiji ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={random}><path d="M0 0h24v24H0z" fill="none" /><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" /></svg> : ''}
            {danqu ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={repeatOne}><path d="M0 0h24v24H0z" fill="none" /><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v4H13z" /></svg> : ''}
          </div>
          <div className="voice">
            <img src={voice} alt="" onClick={voiceBtnClick}/>
            <div className="volume" style={{display: showVolume ? "block" : "none"}} onClick={volumeClick}>
              <div className="volume-top" style={{height: volumeHeight ? volumeHeight : 0}}></div>
            </div>
          </div>
          <div className="playlistBtn">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" onClick={playlistBtnClick}><path fill="none" d="M0 0h24v24H0V0z" /><path d="M4 10h12v2H4zm0-4h12v2H4zm0 8h8v2H4zm10 0v6l5-3z" /></svg>
          </div>
        </div>
      </div>
    );
  }
}

export default PlayBox;