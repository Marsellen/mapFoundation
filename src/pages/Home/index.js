import React from 'react'
import {Carousel} from 'antd'
import './style.css'

const imgs = [
  "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556257524505&di=cb8fb1586dacf6c8b9c534f264833276&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170725%2F5125a0fabd124990ab5eb1d67891c04c_th.png",
  "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556257524505&di=bb8dd6516be25c83122eb336828f69e7&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Ftranslate%2F76%2Fw1080h596%2F20180402%2F5wsx-fysvpzh3995788.jpg",
  "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556257524505&di=5cb3560f2616c6cc045d27729406e5ed&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F57%2F78%2F05300001208815130387782748704.jpg",
  "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556257720432&di=72a92a4c787bdbea3dfe6c5acf89d0d4&imgtype=0&src=http%3A%2F%2Fwww.chinapoesy.com%2FUploadFiles%2FPoesy%2F20160304_24044180-54c7-4513-ba50-6944f8790fd6.jpg"
]

class Home extends React.Component {
  render() {
    return (
      <div style={styles.bg} className='home'>
        <Carousel arrows effect='fade' className='size'>
          {imgs.map(item=><div key={item}><div className='size' style={{backgroundImage:`url(${item})`}}/></div>)}
          {/*不用img标签是因为图片大小会出现问题*/}
        </Carousel>
      </div>
    )
  }
}

const styles = {
  bg:{
    position:'absolute',
    top:0,
    left:0,
    width:'100%',
    height:'calc(100vh - 64px)'
  }
}

export default Home