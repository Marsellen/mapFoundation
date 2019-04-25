import React from 'react'
import CustomMenu from "../CustomMenu/index";

const menus = [
 
]


class SiderNav extends React.Component {
  render() {

    return (
      <div style={{height: 'calc(100vh - 64px)',overflowY:'scroll'}}>
        <div style={styles.logo}></div>
        <CustomMenu menus={menus}/>
      </div>
    )
  }
}

const styles = {
  logo: {
    height: '32px',
    background: 'rgba(255, 255, 255, .2)',
    margin: '16px'
  }
}

export default SiderNav