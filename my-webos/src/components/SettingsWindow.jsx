import { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { Button, GroupBox, Radio, Window, WindowContent, WindowHeader } from 'react95';
import settingsIcon from '../assets/settings.png';
import closeicon from '../assets/close.png';
import {Themes, ThemeNames} from './constants';
import styled from 'styled-components';

const StyledRadio = styled(Radio)`
    cursor: pointer;
    * {
    cursor: pointer;
    }

`

const SettingsWindow = ({seltheme, setSelTheme, onClose}) => {
    const nodeRef = useRef(null)
    const [value, setValue] = useState(seltheme)
    return (
        <Draggable bounds='parent' nodeRef={nodeRef} handle='.window-title'>
            <div ref={nodeRef} style={{ position: 'absolute', top:'35%',right:'45%' ,zIndex: 1000,display: 'inline-block', minHeight: 250,  }}>
                <Window className='window' style={{width:300 ,position:'absolute'}} >
                    <WindowHeader className='window-title' style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 5px'}} >
                            <span style={{display:'flex', justifyContent:'space-between', alignItems:"center", gap:5}}>
                                <img src={settingsIcon} style={{width:'30px', height:'30px', padding:0}} ></img> 
                                <span>Settings</span>
                            </span>
                            <Button onClick={onClose}>
                                <img src={closeicon} style={{width:16}} />
                            </Button>
                    </WindowHeader>
                    <WindowContent>
                        <GroupBox label="Theme" style={{display:'grid', gridTemplateColumns:'1fr 1fr', columnGap:20}} > 
                            {Object.keys(Themes).map((themeKey) => (
                                <StyledRadio 
                                    key={themeKey}
                                    label={themeKey}
                                    checked={seltheme === themeKey}
                                    onChange={() => setSelTheme(themeKey)}
                                />
                            ))}
                        </GroupBox>          
                    </WindowContent>
                </Window>
            </div>
        </Draggable>
    )
}

export default SettingsWindow