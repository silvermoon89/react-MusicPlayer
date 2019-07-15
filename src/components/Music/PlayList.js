/**
 * 歌单列表组件
 */
import React, { Component } from 'react';
import SongList from './SongList';

class PlayList extends Component {

  render () {
    const { showSonglist, currentListId, songInfo, playListInfo, showPlaylist, playlistItemClick, changePlayList } = this.props;
    return (
      <div className="playlist" style={{ maxHeight: showPlaylist ? 400 : 0, border: showPlaylist ? '1px solid rgb(85,220,203)' : 'none' }}>
        {
          playListInfo && playListInfo.length > 0 ?
            playListInfo.map((list, index) => {
              return (
                <React.Fragment key={list.id}>
                  <div className="playlistTitle"  onClick={() => changePlayList(list.id)} style={{backgroundColor: list.id == currentListId ? "#4ee6b5": ""}}>
                    <p>{index == 0? ("我"+list.name.slice(-5)) :list.name}{list.id == currentListId && <span style={{color:"red",fontSize:"12px"}}>__当前播放歌单</span>}</p>
                  </div>
                  <SongList index={this.props.index} listId={list.id} currentListId={currentListId} songInfo={songInfo} playlistItemClick={playlistItemClick} showSonglist={showSonglist}></SongList>
                </React.Fragment>
              )
            })
            : ''
        }
      </div>
    );
  }
}

export default PlayList;