import { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import { Button, Frame, Handle, Tab, TextInput, Toolbar, Tooltip, Window, WindowContent, WindowHeader } from 'react95';
import closeicon from '../assets/close.png';
import codeEditorIcon from '../assets/code-editor-icon.png';


const CodeEditor = ({onClose}) => {
    const nodeRef = useRef(null)
    const [value, setValue] = useState('')
    const [output, setOutput] = useState('')
    const runCode = async () => {
      try{
        const response = await fetch ('https://emkc.org/api/v2/piston/execute', {
          method:'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language: 'python3',
            version: '3.10.0',
            files: [{ name:'main.py', content: value }]
          })
        })
        const result = await response.json()
        setOutput(result.run.output)
      } catch (error) {
        setOutput(`Error:${error.message}`)
      }
    }
    useEffect(() => {
      const handleKeyPress = (e) => {
        if (e.ctrlKey &&  e.key === 'Enter') {
          e.preventDefault();
          runCode();
        }
        else if (e.ctrlKey && e.key === 'c'){
          e.preventDefault();
          resetCode();
        }
      }
      window.addEventListener('keydown', handleKeyPress);
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      }
    },[value]);

    const resetCode= () =>{
      setValue('') ;
      setOutput('Your Output appears here')
    }

    return (
        <Draggable bounds='parent' nodeRef={nodeRef} handle='.window-title'>
            <div ref={nodeRef} style={{ position: 'absolute', top:'5%',left:'35%' ,zIndex: 1000 }}>
                <Window  className='window' style={{width:650,height:'auto', position:'absolute'}} >
                    <WindowHeader className='window-title' style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'2px 5px'}} >
                            <span style={{display:'flex', justifyContent:'space-between', alignItems:"center", gap:10, }}>
                                <img src={codeEditorIcon} style={{width:'30px', height:'30px'}} ></img> 
                                <span>Cod(e)ditor.py</span>
                            </span>
                            <Button onClick={onClose}>
                                <img src={closeicon} style={{width:16}} />
                            </Button>
                    </WindowHeader>
                    <WindowContent style={{paddingTop:0,display:'flex', flexDirection:'column', height:'auto'}}>
                      <Toolbar style={{display:'flex', alignItems:'center', justifyContent:'space-between', paddingLeft:0, paddingRight:0}}> 
                        <div style={{display:'flex', justifyContent:'left', alignItems:'center', padding:0, gap:3}}>
                        <Handle size={25} />
                          
                          <Tooltip text='Ctrl+Enter' enterDelay={100} leaveDelay={100}><Button variant='thin' onClick={runCode} >Run</Button></Tooltip>
                          <Tooltip text='Ctrl+C' enterDelay={100} leaveDelay={100}><Button variant='menu' onClick={resetCode}>Clear</Button></Tooltip>
                        <Handle size={25} />
                        </div>
                        <Tab>Python 3.10.0</Tab>
                      </Toolbar>
                      <div style={{display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:5, flex:1}}>
                        <TextInput 
                          variant='default' 
                          multiline 
                          rows={20} 
                          fullWidth 
                          placeholder='Enter Your Code Here...' 
                          value={value}
                          onChange={(e) => {setValue(e.target.value)}} />
                        <Frame variant='field' style={{padding:'8px', overflow:'scroll'}}>
                          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordWrap: 'break-word'}}>
                            {output || 'Your Output appears here'}
                          </pre>
                        </Frame>
                      </div>
                      
                    </WindowContent>
                </Window>
            </div>
        </Draggable>
    )
}

export default CodeEditor