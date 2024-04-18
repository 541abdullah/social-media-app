import { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import CircleIcon from '@mui/icons-material/Circle';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import "../corecss/header.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { iconresets } from '../features/iconreseter';
import { currview } from '../features/profile';
import Shimmer from './shimmer.js';
import { themeselector } from '../features/theme.js';

const Header = ({ caller, extra }) => {

    let curuser = useSelector((state) => { return state.youryr.value });
    let themer = useSelector((state) => { return state.themeyr.value });

    let [ismsg, setIsmsg] = useState(true);
    let [textval, setTextval] = useState(8);
    let [newmessages, setNewmessages] = useState(0);

    let nav = useNavigate();
    let disp = useDispatch();

    //let url = "http://localhost:3001";
    let url = "https://social-media-app-backend-final.onrender.com";


    useEffect(() => {

        async function newchats() {


            const result = await fetch(`${url}/messenger/lineup/order/${curuser.userid}`, {
                credentials: 'include'
            });

            const data = await result.json();


            if (data.convs == undefined) {
                setNewmessages(0);
            } else {

                const trutharray = Object.values(data.convs.unread);
                let counter = 0;
                for (let i = 0; i < trutharray.length; i++) {
                    if (trutharray[i]) {
                        counter++;
                    }
                }

                setNewmessages(counter);

            }
        }

        newchats();

    }, [curuser]);


    const msgsopener = () => {

        disp(iconresets(true));
        nav('/messenger/insider/null');

    }

    const selfprofile = () => {

        disp(currview(curuser.usrn));
        nav(`/profile/${curuser.usrn}`);

        if (caller == 'profile' && curuser.usrn != extra.current) {
            extra.setPersonsdets(null);
        }

    }

    // icon coloriser

    const theme = createTheme({
        palette: {
            primary: red,
        },
    });


    const changetheme = () => {

        disp(themeselector(!themer));

    }



    return (

        <div className={themer ? 'header' : "header headernight"}>

            <div className='headerleft'>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={themer ? 'logo' : 'logo logonight'}
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7ZM9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12Z"
                        fill="currentColor"
                    />
                    <path
                        d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                        fill="currentColor"
                    />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5 1C2.79086 1 1 2.79086 1 5V19C1 21.2091 2.79086 23 5 23H19C21.2091 23 23 21.2091 23 19V5C23 2.79086 21.2091 1 19 1H5ZM19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                        fill="currentColor"
                    />
                </svg>
            </div>
            <div className='headerright'>
                {newmessages != 0 &&
                    <>
                        <ThemeProvider theme={theme}>
                            {ismsg && <CircleIcon className="fortexts" color="primary" fontSize='medium'></CircleIcon>}
                        </ThemeProvider>
                        {ismsg && <span className={textval < 10 ? "countertexts" : "countertextsdouble"}  >{newmessages}</span>}

                    </>
                }

                <SendIcon className={themer ? 'texts' : 'texts textsnight'} fontSize='large' onClick={msgsopener} />

                <div className='theme'>
                    {themer && <DarkModeIcon className='darkmode' fontSize='large' onClick={changetheme} />}
                    {!themer && <LightModeIcon className='lightmode' fontSize='large' onClick={changetheme} />}
                </div>

                {
                    curuser.pfp

                        ?

                        <img src={curuser.pfp} className={themer ? 'smallpfp' : "smallpfp smallpfpnight"} alt="" onClick={() => { selfprofile() }} />

                        :

                        <div className='falseuser'>
                            <Shimmer></Shimmer>
                        </div>

                }

            </div>

        </div>

    );
}

export default Header;