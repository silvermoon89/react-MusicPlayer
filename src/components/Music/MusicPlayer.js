/**
 * 父组件，播放器最外层
 */

import React, { Component } from 'react';
import ImgCover from './ImgCover';
import PlayBox from './PlayBox';
// import userInfo from '../../config/config.js/index.js';
import PlayList from './PlayList';
import './../style.less';

class MusicPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 80,
      y: 80,
      showAll: false,
      isPlay: true,
      shunxu: false,
      suiji: true,
      danqu: false,
      songInfo: [],
      currentListId: '',
      mp3Url: '',
      index: 1,  //这里设置1而不是0，是为了防止在播放第一首歌曲时PlayBox组件中的componentWillDidMount生命周期内的判断条件不成立
      showPlaylist: false,
      allTime: 0,
      currentTime: 0,
      progressWidth: 0,
      active: false,
      showVolume: false,
      volumeHeight: 50,
      playListId : window.config.playListId,
      playListInfo: [],
      showSonglist: true,
    }

    this.oX = 0;
    this.oY = 0;
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.toggleClick = this.toggleClick.bind(this);
    this.repeatAll = this.repeatAll.bind(this);
    this.repeatOne = this.repeatOne.bind(this);
    this.random = this.random.bind(this);
  }


  componentDidMount() {
    const getPlayListUrl = window.config.url+'user/playlist?uid='+window.config.uid;
    fetch(getPlayListUrl,{
      method: 'GET',
    }).then(response => {
      return response.json()
    }).then(list => {
      console.log(list);
      this.setState({
        playListInfo: list ? list.playlist : '歌单不存在'
      })
    })
      this.getPlayList(this.state.playListId);
      this.interval = setInterval(this.progressInterval,1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  //获取歌单列表信息
  getPlayList = (id)=>{
    const url = window.config.url+'playlist/detail?id='+id;
    fetch(url,{
      method: 'GET',
    }).then(response => {
        return response.json();
      }).then(playlist => {
        console.log(playlist);
        const songlist = playlist.playlist.tracks;
        this.setState({
          currentListId: playlist.playlist.id,
          songInfo: songlist,
          index: --this.state.index
        });
      })
  }

  //点击切换歌单
  changePlayList = (id)=>{
    id!=this.state.currentListId && this.getPlayList(id);
    this.setState({
      showSonglist: id==this.state.currentListId ? !this.state.showSonglist : this.state.showSonglist,
    })
  }

  //获取当前播放时间，按比例更新进度条
  progressInterval = () => {
    const audio = document.getElementById('audio');
    const { suiji, shunxu, } = this.state;
    if(audio !== null){
      const scale = audio.currentTime / audio.duration;
      this.setState({
        currentTime: audio.currentTime,
        allTime: audio.duration,
        progressWidth: 150 * scale
      });
      if (suiji || shunxu) {
        audio.currentTime == audio.duration && this.nextClick();
      }
    }
  }

  //按住封面拖动---开始
  mouseDown(e) {
    let ev = e || window.event;
    let target = ev.target || ev.srcElement;
    if (target.id !== "player") {
      target = document.getElementById('player');
    }
    ev.preventDefault();

    // 鼠标与物体左边与上边的距离
    this.oX = ev.clientX - target.offsetLeft;
    this.oY = ev.clientY - target.offsetTop;
    this.setState({
      x: ev.clientX - this.oX,
      y: ev.clientY - this.oY
    });

    document.onmousemove = this.mouseMove;
    document.onmouseup = this.mouseUp;
  }

  mouseMove(e) {
    let ev = e || window.event;
    ev.preventDefault();
    const showAll = this.state.showAll;

    let disX = ev.clientX - this.oX;
    let disY = ev.clientY - this.oY;
    let maxX = showAll ? document.documentElement.clientWidth - 300 : document.documentElement.clientWidth - 100;
    let maxY = document.documentElement.clientHeight - 100;
    if (disX <= 0) {
      disX = 0;
    } else if (disX >= maxX) {
      disX = maxX;
    }
    if (disY <= 0) {
      disY = 0;
    } else if (disY >= maxY) {
      disY = maxY;
    }
    this.setState({
      x: disX,
      y: disY
    });
  }

  mouseUp() {
    document.onmousemove = null;
    document.onmouseup = null;
  }
  //按住封面拖动---结束

  //子组件获取音乐播放地址
  getMusicUrl = (url) => {
    this.setState({
      mp3Url: url
    });
  }

  //双击封面，显示/隐藏播放器控制界面
  onCoverClick = () => {
    this.setState({
      showAll: !this.state.showAll,
      showPlaylist: false
    });
  }

  //暂停/播放
  toggleClick() {
    const audio = document.getElementById('audio');
    const isPlay = this.state.isPlay;
    if (isPlay && audio !== null) {
      audio.pause();
      clearInterval(this.interval);
    } else {
      audio.play();
      this.interval = setInterval(() => {
        const scale = audio.currentTime / audio.duration;
        this.setState({
          currentTime: audio.currentTime,
          allTime: audio.duration,
          progressWidth: 150 * scale
        });
      }, 1000)
    }
    this.setState({
      isPlay: !this.state.isPlay
    });
  }

  //进度条点击，调整播放进度
  progressClick = (event) => {
    let e = event || window.event;
    let target = e.target || e.srcElement;
    const audio = document.getElementById('audio');
    const player = document.getElementById('player');
    const progressTop = document.querySelector('.progress');
    if(target !== progressTop){
      target = progressTop
    }
    const left = player.offsetLeft;
    const X = e.clientX - target.offsetLeft - left;
    const { allTime} = this.state;
    //点击进度条后现在的播放时间
    const now = X * allTime / 150;
    audio.currentTime = now;
    this.setState({
      progressWidth: X
    });
  }

  //音量条点击调整音量
  volumeClick = (event)=>{
    let e = event || window.event;
    let target = e.target || e.srcElement;
    const audio = document.getElementById('audio');
    const player = document.getElementById('player');
    const volume = document.querySelector('.volume');
    // const volumeTop = document.querySelector('.volume-top');
    const controller = document.querySelector('.controller');
    if(target !== volume){
      target = volume
    }
    const h = player.offsetTop - 100 + controller.offsetTop;
    const height = e.clientY - h;
    // if(volumeTop.attachEvent){
    //   volumeTop.attachEvent('DOMMouseScroll',()=>{

    //   })
    // }
    audio.volume = 1 - height/100;
    this.setState({
      volumeHeight: height
    })
  }

  //音量按钮点击，弹出音量条
  voiceBtnClick = ()=>{
    this.setState({
      showVolume: !this.state.showVolume
    })
  }

  //歌单列表显示/关闭
  playlistBtnClick = () => {
    this.setState({
      showPlaylist: !this.state.showPlaylist
    });
  }

  //歌单内歌曲点击切换
  playlistItemClick = (index) => {
    this.setState({
      index: index,
      progressWidth: 0
    });
  }

  //上一曲
  prevClick = () => {
    clearInterval(this.interval);
    const index = --this.state.index;
    const playlist = this.state.songInfo;
    const suiji = this.state.suiji;
    if (suiji) {
      const num = Math.floor(Math.random() * playlist.length);
      this.interval = setInterval(this.progressInterval,1000);
      this.setState({
        progressWidth: 0,
        index: num
      });
    } else {
      if (index < 0) {
        return;
      }

      this.interval = setInterval(this.progressInterval,1000);
      this.setState({
        progressWidth: 0,
        index: index
      });
    }
  }

  //下一曲
  nextClick = () => {
    clearInterval(this.interval);
    const index = ++this.state.index;
    const playlist = this.state.songInfo;
    const suiji = this.state.suiji;
    if (suiji) {
      const num = Math.floor(Math.random() * playlist.length);

      this.interval = setInterval(this.progressInterval,1000);
      this.setState({
        index: num,
        progressWidth: 0,
      });
    } else {
      if (index >= playlist ? playlist.length : '') {
        return;
      }

      this.interval = setInterval(this.progressInterval,1000);
      this.setState({
        index: index,
        progressWidth: 0,
      });
    }

  }

 //点击顺序循环图标，即改为随机播放
  repeatAll() {
    this.setState({
      shunxu: false,
      suiji: true,
      danqu: false,
    });
  }

  //点击单曲循环图标，即改为顺序播放
  repeatOne() {
    this.setState({
      shunxu: true,
      suiji: false,
      danqu: false,
    });
  }

  //点击随机播放图标，即改为单曲循环
  random() {
    this.setState({
      shunxu: false,
      suiji: false,
      danqu: true,
    });
  }

  render() {
    const progressWidth = this.state.progressWidth;
    if (progressWidth >= 150) {
      clearInterval(this.interval);
    }
    const songinfo = {
      songInfo: this.state.songInfo,
      index: this.state.index,
      mp3Url: this.state.mp3Url,
      isPlay: this.state.isPlay,
      active: this.state.active,
      playListInfo: this.state.playListInfo,
      currentListId: this.state.currentListId,
      showSonglist: this.state.showSonglist,
    };
    const parentProps = {
      showAll: this.state.showAll,
      showPlaylist: this.state.showPlaylist,
      showVolume: this.state.showVolume,
      volumeHeight: this.state.volumeHeight,
      progressWidth: this.state.progressWidth,
      shunxu: this.state.shunxu,
      danqu: this.state.danqu,
      suiji: this.state.suiji,
      repeatAll: this.repeatAll,
      repeatOne: this.repeatOne,
      random: this.random,
      toggleClick: this.toggleClick,
      nextClick: this.nextClick,
      prevClick: this.prevClick,
      getMusicUrl: this.getMusicUrl,
      playlistBtnClick: this.playlistBtnClick,
      progressClick: this.progressClick,
      voiceBtnClick: this.voiceBtnClick,
      volumeClick: this.volumeClick
    }

    return (
      <div id="player" style={{ left: this.state.x, top: this.state.y }}>
        <ImgCover {...songinfo} showAll={this.state.showAll} isPlay={this.state.isPlay} mouseDown={this.mouseDown} mouseClick={this.onCoverClick} />
        <PlayBox {...songinfo} {...parentProps} />
        <PlayList  {...songinfo} onHover={this.onHover} onHoverOut={this.onHoverOut} showPlaylist={this.state.showPlaylist} playlistItemClick={this.playlistItemClick} changePlayList={this.changePlayList} getPlayList={this.getPlayList}/>
      </div>
    );
  }
}

export default MusicPlayer;
