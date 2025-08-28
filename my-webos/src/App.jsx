import {styleReset } from 'react95';
import { createGlobalStyle, StyleSheetManager, ThemeProvider } from 'styled-components';
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';
import Taskbar from './components/Taskbar';
import AboutMe from './components/AboutMe'; 
import { useEffect, useRef, useState } from 'react';
import desktopBg from './assets/desktop-bg-win95.png';
import isPropValid from '@emotion/is-prop-valid'; 
import SettingsWindow from './components/SettingsWindow';
import CodeEditor from './components/CodeEditor';
import DesktopIcon from './components/DesktopIcon';
import codeEditorIcon from './assets/code-editor-icon.png';
import aboutmeIcon from './assets/profile.png';
import calculatorIcon from './assets/tumblr_c8d12905363fffff08c37f8eca363590_4c69d126_540.png';
import { Themes } from './components/constants';
import Calculator from './components/Calculator';
import Draggable from 'react-draggable';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body, input, select, textarea {
    font-family: 'ms_sans_serif';
    // background: ${({ theme }) => theme.desktopBackground};
    min-height: 100vh;
    
  }
  body {
    background: url(${desktopBg}) no-repeat center center fixed;
    background-size: cover; 
  }
  body, html {
  overflow:hidden;
  }

`;

const App = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showCodeEditor, setShowCodeEditor] = useState(false)
  const [showCalculator, setShowCalculator] = useState(false)
  const codeRef = useRef(null);
  const aboutRef = useRef(null);
  const calcRef = useRef(null);
  const [seltheme, setSelTheme] = useState(() => {
    return localStorage.getItem("theme") || "peggysPastels";
  });
  const [showSettings, setShowSettings] = useState(false)
  useEffect(() => {
    localStorage.setItem("theme", seltheme);
  }, [seltheme]);
  return (
    <div style={{width:'100vw', height:'100vh', position:'relative'}}>
      <StyleSheetManager shouldForwardProp={isPropValid}>
      <ThemeProvider theme={Themes[seltheme]}>
        <GlobalStyles />
          <div style={{ 
              position:'relative', 
              width:'100%',
              height:'100%'
            }}>
            <Draggable bounds="parent" nodeRef={codeRef} defaultPosition={{ x: 20, y: 20 }}>
              <div ref={codeRef} style={{ position: 'absolute' }}>
                <DesktopIcon 
                  icon={codeEditorIcon} 
                  label="Cod(e)ditor.py" 
                  onDoubleClick={() => setShowCodeEditor(true)} 
                />
              </div>
            </Draggable>

            <Draggable bounds="parent" nodeRef={aboutRef} defaultPosition={{ x: 20, y: 140 }}>
              <div ref={aboutRef}style={{ position: 'absolute' }}>
                <DesktopIcon 
                  icon={aboutmeIcon} 
                  label="About Me" 
                  onDoubleClick={() => setShowAbout(true)} 
                />
              </div>
            </Draggable>

            <Draggable bounds="parent" nodeRef={calcRef} defaultPosition={{ x: 20, y: 230 }}>
              <div ref={calcRef}style={{ position: 'absolute' }}>
                <DesktopIcon 
                  icon={calculatorIcon} 
                  label="Calculator" 
                  onDoubleClick={() => setShowCalculator(true)} 
                />
              </div>
            </Draggable>
          </div>
        
        {showSettings && <SettingsWindow seltheme={seltheme} setSelTheme={setSelTheme} onClose={() => setShowSettings(false)} />}
        {showCodeEditor && <CodeEditor onClose={() => setShowCodeEditor(false)} />}
        {showAbout && <AboutMe onClose={() => setShowAbout(false)} />}
        {showCalculator && <Calculator onClose={() => setShowCalculator(false)}/>}
        
        <Taskbar onOpenAbout={() => setShowAbout(true)} onOpenSettings ={() => setShowSettings(true)} />
      </ThemeProvider>
      </StyleSheetManager>
    </div>
  )
};

export default App;