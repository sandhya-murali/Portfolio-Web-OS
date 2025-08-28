import { MenuList, MenuListItem, Separator } from 'react95'
import linkedinIcon from '../assets/app_16070141.png';
import settingsIcon from '../assets/settings.png';
import aboutmeIcon from '../assets/profile.png';
import styled from 'styled-components';


const StyledMenuListItem = styled(MenuListItem)`
    display : flex;
    align-items: center;
    gap:12px;
    justify-content: space-between;
    text-align:right;
    img {
        width: 32px;
        height: 32px;
    }

    &:hover {
    cursor:pointer;
    }
`;
const StartMenu = ({setOpen, onOpenAbout, onOpenSettings}) => {

    
    return (
        <>
        <MenuList onClick = {() => setOpen(false)}style={{position: 'absolute',left: '10px', bottom:'100%', display:'flex', flexDirection:'column' }} >
            <StyledMenuListItem onClick={onOpenAbout} ><img src={aboutmeIcon}></img>About Me</StyledMenuListItem>
            <StyledMenuListItem onClick={onOpenSettings}><img src={settingsIcon}></img>Settings</StyledMenuListItem>
            <StyledMenuListItem><img src={linkedinIcon}></img> <a target='_blank' href='https://www.linkedin.com/in/sandhya-p-m'>LinkedIn</a> </StyledMenuListItem>
            <Separator />
            <StyledMenuListItem disabled>Logout</StyledMenuListItem>
        </MenuList>
    </>)
}

export default StartMenu