import React, { useRef, useState } from 'react'
import { Button, Window, WindowContent, WindowHeader } from 'react95';
import Draggable from 'react-draggable';
import closeicon from '../assets/close.png';
import aboutmeIcon from '../assets/profile.png';


const AboutMe = ({onClose}) => {
    const nodeRef = useRef(null)
    return (
        <Draggable bounds='parent' handle=".window-title" nodeRef={nodeRef}>
            <div ref={nodeRef} style={{ position: 'absolute', top:'25%',left:'25%' ,zIndex: 1000 }}>
                <Window className='window' style={{width:500}} >
                    <WindowHeader className='window-title' style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 5px'}} >
                        <span style={{display:'flex', justifyContent:'space-between', alignItems:"center", gap:5}}>
                            <img src={aboutmeIcon} style={{width:'30px', height:'30px', padding:0}} ></img> 
                            <span>About Me</span>
                        </span>
                        <Button onClick={onClose}>
                            <img src={closeicon} style={{width:16}} />
                        </Button>
                    </WindowHeader>
                    <WindowContent>
                        <p>Hi, I’m <b> Sandhya</b> 👋  </p>
                        <p>I’m a Frontend Developer with experience in building interactive and user-friendly web applications. I work with HTML, CSS, JavaScript and ReactJS</p>
                        <p>
                            I enjoy turning ideas into reality through clean, efficient code with a touch of creativity.
                        </p>
                    </WindowContent>
                </Window>
            </div>
        </Draggable>
    )
}

export default AboutMe