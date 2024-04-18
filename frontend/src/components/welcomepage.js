import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { yoursets } from '../features/you'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import "../corecss/welcomepage.css";
import Header from './header.js';
import Homepagefeed from './homepagefeed.js';
import Sidepain from './sidepain';
import Leftpain from './leftpain';
import { totstories } from '../features/storydata';
import { settingsdef } from '../features/forsettings.js';
import Storymodal from './modals/createstorymodal';
import Shimmer from './shimmer.js';


const Welcome = () => {

    let [flag, setFlag] = useState(true);
    let [usr, setUsr] = useState(null);
    let [story, setStory] = useState(null);
    let [displayer, setDisplayer] = useState(null);
    let [img, setImg] = useState(null);
    let [starr, setStarr] = useState(null);
    let [ustory, setUstory] = useState(null);
    let [storytabopener, setStorytabopener] = useState(false);
    let [storychanged, setStorychanged] = useState(false);

    let domref = useRef(null);
    let colorfulref = useRef([]);
    let sliderref = useRef(null);
    let userfixer = useRef({ verdict: false, val: null });

    let curuser = useSelector((state) => { return state.youryr.value });
    let theme = useSelector((state) => { return state.themeyr.value });

    let nav = useNavigate();
    let disp = useDispatch();


    //let url = "http://localhost:3001";
    let url = "https://social-media-app-backend-final.onrender.com";




    useEffect(() => {

        async function welcomer() {

            const result = await fetch(`${url}/welcome`, {
                credentials: 'include'
            })

            const data = await result.json();

            if (data !== 'auth failed') {

                setUsr(data.username);
                setImg(data.profpic);

                let settingsobj = {
                    username: data.username,
                    fname: data.fname,
                    gender: data.gender,
                    bio: data.bio,
                    acctype: data.acctype,
                    profpic: data.profpic,
                    email: data.emailID
                }

                disp(settingsdef(settingsobj));

                let newobj2;


                if (data.userstory.length == 0) {

                    newobj2 = {
                        pfp: data.profpic,
                        usrn: data.username,
                        email: data.emailID,
                        fullname: data.fname,
                        userid: data.userid,
                        following: data.following,
                        blocked: data.blocklist,
                        story: false,
                        acctype: data.acctype
                    };

                } else {


                    newobj2 = {
                        pfp: data.profpic,
                        usrn: data.username,
                        email: data.emailID,
                        fullname: data.fname,
                        userid: data.userid,
                        following: data.following,
                        blocked: data.blocklist,
                        story: true,
                        acctype: data.acctype
                    };

                }

                disp(yoursets(newobj2));

                if (data.userstory != false) {
                    userfixer.current = { verdict: true, val: data.userstory };
                    setUstory(data.userstory);
                }
            }
            else {

                nav('/', { replace: true });
            }

            if (usr != null) {


                fetch(`${url}/stories`, {
                    method: 'POST',
                    headers: { 'Content-Type': "application/json" },
                    body: JSON.stringify({ "username": usr }),
                    credentials: 'include'
                }).then((res) => {
                    return res.json();
                }).then((data) => {

                    let starr = data.array.map((each) => {
                        return each[2];
                    });


                    if (userfixer.current.verdict) {
                        starr.unshift(userfixer.current.val);
                        userfixer.current = { verdict: false, val: 'furtherprocess' };
                    }
                    else {
                        starr.unshift(null);
                    }

                    setStarr(starr);


                    data.array.unshift([img, usr]);
                    let q = -1;
                    let trimarr = data.array.map((eachitem) => {
                        if (eachitem[1].length > 15) {
                            eachitem[1] = eachitem[1].substring(0, 13) + '..';
                        }
                        q = q + 1;
                        return [eachitem[0], eachitem[1], q];
                    }
                    );


                    let iscolorful = [];

                    async function colorfinder() {

                        for (let i = 1; i < trimarr.length; i++) {


                            const result = await fetch(`${url}/colorchecker/${trimarr[i][1]}`, {
                                method: 'POST',
                                credentials: 'include',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ username: usr })
                            })

                            const data = await result.json();

                            if (!data) {
                                iscolorful.push(trimarr[i][1]);
                            }


                        }


                        colorfulref.current = iscolorful;


                        let totalstory = [];
                        for (let i = 0; i < trimarr.length; i++) {

                            if (starr[i] == null) {
                                continue;
                            }


                            const postarray = starr[i].map((each) => {
                                return {
                                    img: each.thepost,
                                    time: each.timeposted
                                }
                            })

                            let newobj = {


                                name: trimarr[i][1],
                                pfp: trimarr[i][0],
                                thepost: postarray,
                                num: postarray.length,
                            }

                            totalstory.push(newobj);


                        }


                        let newarr = [];
                        let helperfinal = [];

                        for (let i = 1; i < trimarr.length; i++) {

                            if (!colorfulref.current.includes(trimarr[i][1])) {

                                newarr.push(trimarr[i]);
                                helperfinal.push(trimarr[i]);

                            } else {

                                newarr.unshift(trimarr[i]);
                                helperfinal.unshift(trimarr[i]);

                            }

                        }

                        if (userfixer.current.val != null) {
                            helperfinal.unshift(trimarr[0]);
                        }

                        newarr.unshift(trimarr[0]);
                        let totalstorynew = [];

                        for (let i = 0; i < helperfinal.length; i++) {

                            let name = helperfinal[i][1];
                            let onevalarray = totalstory.filter((each) => each.name == name);
                            totalstorynew.push(onevalarray[0]);

                        }

                        trimarr = helperfinal;
                        totalstory = totalstorynew;


                        let collection = {
                            trimarr,
                            totalstory,
                            iscolorful
                        }

                        disp(totstories(collection));
                        setStory(newarr);
                        setDisplayer(true);

                    }

                    colorfinder();

                }).catch((err) => {
                    console.log(err);
                });
            }

        }

        welcomer();

    }, [usr, storychanged]);


    let storyopener = (acc, pfp, idx) => {


        if (acc != usr || ustory != null) {

            let extra = 'multiple';
            let self = 'none';

            nav(`/stories/${acc}/${extra}/${self}`);

        }



    }



    let storysetter = (selectionarr) => {
        fetch(`${url}/newstory`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stories: selectionarr, username: usr })
        }).then((res) => {
            return res.json();
        }).then((data) => {
        }).catch((err) => {
            console.log(err);
        })
    }


    console.log(sliderref.current);


    return (

        <>
            {flag &&
                <>
                    <Header caller={'welcomepage'} extra={null} />

                    {storytabopener && <Storymodal trigger={setStorytabopener} changes={setStorychanged} current={storychanged} />}


                    <div className={theme ? 'hpagecontainer' : "hpagecontainernight"}>

                        <div className='leftpain'>
                            <Leftpain parent={'homepage'} />
                        </div>

                        <div ref={sliderref} className='topdown'>
                            <div id="storyscroll" className={theme ? 'tw-overflow-x-auto tw-flex tw-border tw-border-black tw-border-solid' : 'tw-overflow-x-auto tw-flex tw-border tw-border-white tw-border-solid'} ref={domref}>
                                {displayer

                                    ?


                                    story.map((eachuser) => (
                                        <div className='tw-pl-0.4' key={eachuser[1]}>


                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 plusc" onClick={() => { setStorytabopener(true) }}>
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>

                                            <div id={eachuser[1] == usr ? ustory == null ? 'qwertyold' : theme ? 'qwertynew' : 'qwertynewnight' : colorfulref.current.includes(eachuser[1]) ? theme ? 'qwertynew' : 'qwertynewnight' : 'qwertyold'} className={theme ? ' tw-cursor-pointer tw-p-1 tw-bg-white tw-m-2.5 tw-overflow-hidden tw-border-solid tw-border-black-800 tw-border-2 tw-rounded-full' : 'tw-cursor-pointer tw-p-1 tw-bg-black tw-m-2.5 tw-overflow-hidden tw-border-solid tw-border-white-800 tw-border-2 tw-rounded-full'} onClick={() => { storyopener(eachuser[1], eachuser[0], eachuser[2]) }}>
                                                <img src={eachuser[0]} className='storylanepfp'></img>

                                            </div>



                                            <div className='tw-flex tw-justify-center tw-items-center '>
                                                <label className={theme ? ' tw-w-28 tw-h-6 tw-overflow-hidden tw-text-center' : ' tw-w-28 tw-h-6 tw-text-white tw-overflow-hidden tw-text-center'}>{eachuser[1] == usr ? "You" : eachuser[1]}</label>
                                            </div>
                                        </div>
                                    ))

                                    :

                                    <>
                                        <div className='falsestory'>
                                            <div className='falsestorycircle'>
                                                <Shimmer></Shimmer>
                                            </div>
                                            <div className='falsestoryposter'>
                                                <Shimmer></Shimmer>
                                            </div>
                                        </div>
                                        <div className='falsestory'>
                                            <div className='falsestorycircle'>
                                                <Shimmer></Shimmer>
                                            </div>
                                            <div className='falsestoryposter'>
                                                <Shimmer></Shimmer>
                                            </div>

                                        </div>
                                        <div className='falsestory'>
                                            <div className='falsestorycircle'>
                                                <Shimmer></Shimmer>
                                            </div>
                                            <div className='falsestoryposter'>
                                                <Shimmer></Shimmer>
                                            </div>

                                        </div>
                                    </>


                                }
                            </div>
                            {curuser.userid.length != 0 && <Homepagefeed refer={sliderref.current} />}
                        </div>

                        <div className='sidepane'>
                            <Sidepain />
                        </div>


                    </div>

                </>
            }
        </>





    );

}

export default Welcome;


