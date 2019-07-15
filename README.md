这是基于binaryify大神的[网易云API](https://github.com/Binaryify/NeteaseCloudMusicApi)写的一个react音乐播放器。  
我是一个萌新，所以界面不太好看，代码优化也很差，若是各位大神有什么建议，请不吝赐教。
***
## 说明
代码中*public/config.js*是进行歌曲配置的文件，其中*uid*是网易云音乐的个人userid，*playListId*为加载时默认播放歌单ID，*url*是API地址。

## 运行
1、首先运行后端的[网易云API](https://github.com/Binaryify/NeteaseCloudMusicApi)，请自行点击连接，按照说明运行。  
2、克隆本项目，配置好API地址、uid和歌单id，获取网易云uid和歌单id的方法，请自行百度。  
```
git clone https://github.com/silvermoon89/react-MusicPlayer.git

cd react-MusicPlayer

npm install 或 yarn install

npm start 或 yarn start
```

## 线上演示
[查看演示效果](http://silver.eleuu.com/content/templates/Demo/react-music/index.html)

## 界面图展示
![界面图片](https://github.com/silvermoon89/react-MusicPlayer/blob/master/view.jpg)
