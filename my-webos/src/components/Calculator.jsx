import { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable';
import { Button, TextInput, Window, WindowContent, WindowHeader } from 'react95';
import calculatorIcon from '../assets/tumblr_c8d12905363fffff08c37f8eca363590_4c69d126_540.png';
import closeicon from '../assets/close.png';
import styled from 'styled-components';
import { evaluate } from 'mathjs';


const BoldButton = styled(Button)`
  font-weight: 700 !important;
`;

const Calculator = ({onClose}) => {
    const nodeRef = useRef(null)
    const [value, setValue] = useState('')

    const handleValue = (clickedValue) => {
        setValue(prev => prev+clickedValue)
    }

    useEffect(() => {
        const handleKeyDown = (e) =>{
            if ((e.key>='0' && e.key<='9') || ['+','-','/','*','.'].includes(e.key)) {
                setValue(prev => prev+e.key);
            }
            else if (e.key === 'Backspace') {
                setValue(prev => prev.slice(0,-1));
            }
            else if (e.key.toLowerCase()==='c') {
                setValue('');
            }
            else if(e.key==='Enter') {
                try {
                    setValue(prev => String(evaluate(prev)));
                } catch (error) {
                    setValue("Error")
                }
            }
        }
        window.addEventListener('keydown', handleKeyDown)

        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])
    
    return (
        <Draggable bounds='parent' nodeRef={nodeRef} handle='.window-title'>
            <div ref={nodeRef} style={{ position: 'absolute', top:'10%',left:'10%' ,zIndex: 1000}}>
                <Window className='window' style={{width:350 ,position:'absolute'}}>
                    <WindowHeader className='window-title' style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 5px'}} >
                                <span style={{display:'flex', justifyContent:'space-between', alignItems:"center", gap:8}}>
                                    <img src={calculatorIcon} style={{width:'30px', height:'30px', padding:0}} ></img> 
                                    <span>Calculator</span>
                                </span>
                                <Button onClick={onClose} >
                                    <img src={closeicon} style={{width:16}} />
                                </Button>
                    </WindowHeader>
                    <WindowContent >
                        <TextInput type='text' style={{width:'100%', height:'22px', textAlign:'right', direction:'ltr'}} value={value}></TextInput>
                        <div style={{display:'flex', justifyContent:'right', gap:10, margin:'10px 0'}}>
                            <BoldButton style={{width:80}} onClick={() => setValue(value.slice(0,-1))} >CE</BoldButton>
                            <BoldButton style={{width:80}} onClick={() => setValue('')} >C</BoldButton>
                        </div>
                        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:10}}>
                            <BoldButton onClick={() => handleValue("7")}>7</BoldButton>
                            <BoldButton onClick={() => handleValue("8")}>8</BoldButton>
                            <BoldButton onClick={() => handleValue("9")}>9</BoldButton>
                            <BoldButton onClick={() => handleValue("/")}>/</BoldButton>

                            <BoldButton onClick={() => handleValue("4")}>4</BoldButton>
                            <BoldButton onClick={() => handleValue("5")}>5</BoldButton>
                            <BoldButton onClick={() => handleValue("6")}>6</BoldButton>
                            <BoldButton onClick={() => handleValue("*")}>*</BoldButton>

                            <BoldButton onClick={() => handleValue("1")}>1</BoldButton>
                            <BoldButton onClick={() => handleValue("2")}>2</BoldButton>
                            <BoldButton onClick={() => handleValue("3")}>3</BoldButton>
                            <BoldButton onClick={() => handleValue("-")}>-</BoldButton>

                            <BoldButton onClick={() => handleValue(".")}>.</BoldButton>
                            <BoldButton onClick={() => handleValue("0")}>0</BoldButton>
                            <BoldButton onClick={() => setValue(String(evaluate(value)))}>=</BoldButton>
                            <BoldButton onClick={() => handleValue("+")}>+</BoldButton>
                        </div>
                    </WindowContent>
                </Window>
            </div>
        </Draggable>
    )
}

export default Calculator