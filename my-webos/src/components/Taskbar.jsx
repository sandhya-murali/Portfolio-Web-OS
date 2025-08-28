import { useEffect, useState} from 'react'
import { AppBar, Avatar, Button,Frame,Toolbar } from 'react95'
import starticon from '../assets/artage-io-thumb-506ac60fc7b51fb35d66d6ef2a4da9fc.png';
import StartMenu from './StartMenu';
import calendarIcon from '../assets/calendar_13107455.png';


const Taskbar = ({onOpenAbout, onOpenSettings}) => {
    const [open, setOpen] = useState(false);
    const [time, setTime] = useState(new Date())


    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()),1000)
    
        return () => {
            clearInterval(timer)
      }
    }, [])
    

    return (
        <div
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                zIndex: 100
            }}
        >
            <AppBar style={{ position: 'static', padding:'0 5px'}}>
                <Toolbar style={{display: 'flex', justifyContent:'space-between'}} >
                    <Button onClick={() => setOpen(!open)} active={open} style={{fontWeight:'bold'}} >
                        <img src={starticon} style={{ height: '32px', marginRight: '4px' }} alt="start" />
                        Start
                    </Button>
                    {open && <StartMenu setOpen={setOpen} onOpenAbout={onOpenAbout} onOpenSettings={onOpenSettings} />}
                  
                    <Frame variant='field' style={{display:'flex', gap:10, justifyContent:'center', alignItems:'center', padding:'2px 5px'}}>
                        <img src={calendarIcon} style={{width:28}}></img>
                        <div>{time.toLocaleDateString([], {year:'numeric', month:'2-digit', day:'2-digit'})}</div>
                        <div>{time.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</div>
                    </Frame>
                    
                </Toolbar>
                
            </AppBar>
        </div>
    )
}

export default Taskbar
