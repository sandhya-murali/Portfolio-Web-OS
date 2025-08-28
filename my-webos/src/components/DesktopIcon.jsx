import React from 'react'

const DesktopIcon = ({icon,label, onDoubleClick}) => {
  return (
    <div style={{textAlign:'center', width:80,cursor:'pointer'}} onDoubleClick={onDoubleClick}>
        {<img src={icon} style={{ width: 48, height: 48 }} ></img>}
        <div style={{wordBreak:'break-word'}}>{label}</div>
    </div>
  )
}


export default DesktopIcon