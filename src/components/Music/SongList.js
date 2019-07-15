/**
 * 歌曲列表
 */

import React, { Component } from 'react';

class SongList extends Component {

  render () {
    const {listId,currentListId,songInfo,playlistItemClick,showSonglist} = this.props;
    return (
      <div className="songlist" style={{display: showSonglist? 'block': 'none'}}>
        {
          listId==currentListId && songInfo && songInfo.length > 0 ?
            songInfo.map((item, index) => {
              const name = item.name;
              let artist = '';
              let art = '';
              if (item.ar.length == 1) {
                art = item.ar[0].name;
              } else {
                item.ar.map(arts => {
                  art = (artist + '/' + arts.name).substring(1);
                });
              }
              return <div className="playlistItem"  style={{backgroundColor: this.props.index>=0 ? (songInfo[this.props.index].id == item.id ? "#4ee6b5" : ""): ""}} key={item.id} onClick={() => playlistItemClick(index)}><p>{name}--{art}</p></div>
            }) : ''
        }
      </div>
    );
  }
}

export default SongList;