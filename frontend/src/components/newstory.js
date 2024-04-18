import '../corecss/newstory.css';
import '../corecss/newstorytwo.css';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Optmodal from './modals/optionsmodal';
import Loadingmodal from './modals/loadingmodal';
import { useDispatch } from 'react-redux';
import { currview } from '../features/profile';



const Newstory = () => {

    let [ispvt, setIspvt] = useState(false);
    let [closeslidquick, setCloseslidquick] = useState(false);

    let isthereref = useRef({});
    let barref = useRef([]);
    let onetimeref = useRef(false);

    let curuser = useSelector((state) => { return state.youryr.value });
    let collectionmain = useSelector((state) => { return state.storydat.value });

    let collection = JSON.parse(JSON.stringify(collectionmain));

    //let url = "http://localhost:3001";
    let url = "https://social-media-app-backend-final.onrender.com";

    const current = [];
    if (!onetimeref.current) {

        const curURL = window.location.pathname;
        const usernameunclean = curURL.replace('/stories/', '');

        let usernameself = usernameunclean.replace('/multiple', '');


        if (usernameself.length === usernameunclean.length) {
            usernameself = usernameunclean.replace('/single', '');
        }

        let usernamepre = usernameself.replace('/none', '');
        let username = usernamepre.replace('/own', '');
        let typeself = usernameunclean.replace(`${username}/`, '');
        let typepre = typeself.replace('/own', '');
        let type = typepre.replace('/none', '');


        if (type === 'single') {

            setIspvt(true);

            let newarr = [];

            if (!collection.followers.map((each) => each.username).includes(curuser.usrn) && curuser.usrn != username) {
                newarr = collection.totalstory[0].thepost.filter((each) => {
                    return each.type === 'public';
                })

                collection.totalstory[0].thepost = newarr;

            }


        }


        const onevaluearr = collection.trimarr.filter((each) => { return each[1] === username });
        const idx = collection.trimarr.indexOf(onevaluearr[0]);

        let index;
        if (collection.totalstory.length == collection.trimarr.length) {

            index = idx;
            if (index == 0) {
                current.push(undefined);
            } else {
                current.push(collection.totalstory[index - 1]);
            }

            current.push(collection.totalstory[index]);
            current.push(collection.totalstory[index + 1]);


        } else {

            index = idx - 1;
            if (index == -1) {

            } else {


                if (index == 0) {
                    current.push(undefined);
                } else {
                    current.push(collection.totalstory[index - 1]);
                }

                current.push(collection.totalstory[index]);
                current.push(collection.totalstory[index + 1]);

            }

        }

    }

    onetimeref.current = true;



    let currentref = useRef(current);
    let totalref = useRef(collection.totalstory);
    let coloref = useRef(collection.iscolorful);
    let newcurrentref = useRef(current);
    let ownref = useRef(null);
    let counteref = useRef(0);
    let divisionslist = useRef([]);


    class Stack {
        constructor() {
            this.items = [];
        }

        add(element) {
            return this.items.push(element);
        }

        remove() {
            if (this.items.length > 0) {
                return this.items.pop();
            }
        }

        peek() {
            return this.items[this.items.length - 1];
        }

        isEmpty() {
            return this.items.length == 0;
        }

        size() {
            return this.items.length;
        }

        clear() {
            this.items = [];
        }
    }


    const initialstackcreator = () => {

        let stack = new Stack();

        for (let i = newcurrentref.current[1].num - 1; i >= 0; i--) {


            if (newcurrentref.current[1].thepost[i] != undefined) {

                if (ispvt) {


                    if (collection.followers.map((each) => each.username).includes(curuser.usrn) || curuser.usrn == currentref.current[1].name) {


                        stack.add({
                            framenumber: `each${i + 1}`,
                            frameimg: newcurrentref.current[1].thepost[i].img,
                            frametime: newcurrentref.current[1].thepost[i].time
                        });

                    } else {


                        if (newcurrentref.current[1].thepost[i].type === 'public') {

                            stack.add({
                                framenumber: `each${i + 1}`,
                                frameimg: newcurrentref.current[1].thepost[i].img,
                                frametime: newcurrentref.current[1].thepost[i].time
                            });

                        }

                    }


                } else {

                    stack.add({
                        framenumber: `each${i + 1}`,
                        frameimg: newcurrentref.current[1].thepost[i].img,
                        frametime: newcurrentref.current[1].thepost[i].time
                    });

                }

            }

        }


        async function stillthere() {

            const data = await Promise.all(stack.items.map((each) => {

                if (each.frameimg.length > 100) {
                    return false;
                }

                return fetch(`${url}/story/isthere/${each.frameimg}`, {
                    method: 'POST',
                    headers: { 'Content-Type': "application/json" },
                    body: JSON.stringify({ "username": newcurrentref.current[1].name }),
                    credentials: 'include'
                }).then((res) => res.json());

            }))

            for (let i = 0; i < data.length; i++) {

                isthereref.current[stack.items[i].frameimg] = data[i];

            }


            setSa(!sa);

        }


        if (counteref.current == 0) {

            counteref.current = 1;
            stillthere();

        }

        divisionslist.current = [];

        for (let i = 1; i <= stack.items.length; i++) {
            divisionslist.current.push(i);
        }

        return stack;


    }

    let [sa, setSa] = useState(false);
    let [pauser, setPauser] = useState(false);
    let [turnright, setTurnright] = useState(false);
    let [quickanimnextbar, setQuickanimnextbar] = useState(false);
    let [quickanimprevbar, setQuickanimprevbar] = useState(false);
    let [loader, setLoader] = useState(false);
    let [heartbeat, setHeartbeat] = useState(false);
    let [ownstoryopts, setOwnstoryopts] = useState(false);
    let [closeslid, setCloseslid] = useState(true);
    let [sliderstopper, setSliderstopper] = useState(true);
    let [storydeletion, setStorydeletion] = useState(false);

    let curcolorref = useRef([]);
    let mainstackref = useRef(initialstackcreator());
    let prevstackref = useRef(new Stack());
    let nextstackref = useRef(new Stack());
    let myviewsref = useRef([]);

    let disp = useDispatch();
    let nav = useNavigate();


    let maindefinedref = useRef(null);
    if (mainstackref.current.peek() == undefined) {

        if (prevstackref.current.peek() == undefined) {
            maindefinedref.current = nextstackref.current;

        } else {
            maindefinedref.current = prevstackref.current;
        }

    }
    else {
        maindefinedref.current = mainstackref.current;
    }

    useEffect(() => {

        if (currentref.current[1].name == curuser.usrn) {

            async function viewsgetter() {

                const result = await fetch(`${url}/story/myviews/${currentref.current[1].name}`, {
                    credentials: 'include'
                })

                const data = await result.json();
                myviewsref.current = data;

            }

            viewsgetter();
            ownref.current = true;

        } else {
            ownref.current = false;

            if (mainstackref.current.peek() != undefined && mainstackref.current.peek().framenumber == 'each1') {

                if (currentref.current[1].name != curuser.usrn) {

                    fetch(`${url}/story/viewed/${currentref.current[1].name}`, {
                        method: 'POST',
                        headers: { 'Content-Type': "application/json" },
                        body: JSON.stringify({ "username": curuser.usrn }),
                        credentials: 'include'
                    })


                }

            }

        }

    }, [quickanimnextbar, quickanimprevbar])


    curcolorref.current.push(currentref.current[1].name);


    const nextbaraccess = (val) => {

        const rem = mainstackref.current.peek();
        mainstackref.current.remove();
        prevstackref.current.add(rem);



        if (currentref.current[2] == undefined && mainstackref.current.peek() == undefined) {

            if (ispvt) {
                nav(`/profile/${currentref.current[1].name}`);
            } else {
                nav('/welcome');
            }

            return;

        }

        if (currentref.current[1].name != curuser.usrn) {
            setSliderstopper(true);
        }


        if (mainstackref.current.peek() === undefined) {
            setCloseslidquick(true);
            let comparator = collection.totalstory.map((each) => each.name);
            let idx = comparator.indexOf(currentref.current[2].name);

            newcurrentref.current = [currentref.current[1], currentref.current[2], collection.totalstory[idx + 1]];

            counteref.current = 0;

            setQuickanimprevbar(true);
            setHeartbeat(false);

            setTimeout(() => {
                setLoader(true);
            }, 480);


        } else {
            setSa(!sa);

        }


    }


    let prevanimended = () => {

        currentref.current = newcurrentref.current;
        totalref.current = totalref;
        prevstackref.current = new Stack();
        nextstackref.current = new Stack();
        mainstackref.current = initialstackcreator();
        setTurnright(true);
        setQuickanimprevbar(false);

        setTimeout(() => {
            setLoader(false);
        }, 200)

    }


    const prevbaraccess = () => {

        const rem = prevstackref.current.peek();
        prevstackref.current.remove();


        nextstackref.current.add(mainstackref.current.peek());
        mainstackref.current.add(rem);


        if (currentref.current[0] == undefined && mainstackref.current.peek() == undefined) {

            if (ispvt) {
                nav(`/profile/${currentref.current[1].name}`);
            } else {
                nav('/welcome');
            }
            return;

        }


        if (currentref.current[1].name != curuser.usrn) {
            setSliderstopper(true);
        }

        if (mainstackref.current.peek() === undefined) {

            let comparator = collection.totalstory.map((each) => each.name);
            let idx = comparator.indexOf(currentref.current[0].name);
            newcurrentref.current = [collection.totalstory[idx - 1], currentref.current[0], currentref.current[1]];
            counteref.current = 0;

            setQuickanimnextbar(true);
            setHeartbeat(false);

            setTimeout(() => {
                setLoader(true);
            }, 400);

        } else {

            setSa(!sa);

        }

    }

    const nextanimended = () => {

        currentref.current = newcurrentref.current;
        totalref.current = totalref;
        prevstackref.current = new Stack();
        nextstackref.current = new Stack();

        mainstackref.current = initialstackcreator();
        setTurnright(true);

        setQuickanimnextbar(false);

        setTimeout(() => {
            setLoader(false);
        }, 200)

    }


    const storypageexiter = () => {

        if (ispvt) {
            nav(`/profile/${currentref.current[1].name}`);
        } else {
            nav('/welcome');
        }

    }


    const someoneliked = () => {
        setHeartbeat(true);
        setTimeout(() => {
            setHeartbeat(false);
        }, 5000);


        fetch(`${url}/story/liked/${currentref.current[1].name}`, {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ "username": curuser.usrn }),
            credentials: 'include'
        })

        const newnotif =
        {
            username: curuser.usrn,
            pfp: curuser.pfp,
            fullname: curuser.fullname,
            type: "storylike",
            attachement: null,
            commentifany: null,
            reference: null
        };

        fetch(`${url}/notif/${currentref.current[1].name}`, {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(newnotif),
            credentials: 'include'
        })

    }

    const ownopts = () => {

        setOwnstoryopts(true);
        setPauser(true);

    }


    const sliderstoprevived = () => {
        setCloseslid(true);
        setTimeout(() => {

            setSliderstopper(true);
            setPauser(false);

        }, 1000);

    }

    useEffect(() => {


        if (storydeletion) {

            fetch(`${url}/story/deletion/${curuser.usrn}`, {
                method: 'PUT',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ justdel: maindefinedref.current.peek().frameimg }),
                credentials: 'include'
            })

            setTimeout(() => {

                setStorydeletion(false);

                if (ispvt) {

                    nav(`/profile/${currentref.current[1].name}`);
                } else {

                    nav('/welcome');
                }


            }, 5000);

        }


    }, [storydeletion])


    const profviewer = () => {

        disp(currview(currentref.current[1].name));
        nav(`/profile/${currentref.current[1].name}`);

    }

    const currtime = (postdate) => {


        const date = new Date();
        const storydate = new Date(postdate);

        let dateinsecs = date.getTime() / 1000;
        let postdateinsecs = storydate.getTime() / 1000;
        let diff = Math.abs(dateinsecs - postdateinsecs);

        if (diff < 60) {
            return `${30} s`;
        } else if (diff < 3600) {
            return `${Math.floor(diff / 60)} m`;
        } else {
            if (Math.floor(diff / 3600) >= 23) {
                return `23 h`;
            }
            return `${Math.floor(diff / 3600)} h`;
        }

    }


    const falseclick = (e, val) => {

        e.stopPropagation();
        return;

    }


    return (


        <>

            {storydeletion && <Loadingmodal trigger={'hehe'} />}
            {ownstoryopts && <Optmodal trigger={setOwnstoryopts} contplayer={setPauser} optionsarray={['Delete', 'Views']} special={['Delete']} action={{ Delete: setStorydeletion, Views: [setCloseslid, setSliderstopper, setCloseslidquick] }} />}

            <div className='storyheader'>

                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className='instastoryicon'
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

                <button onClick={storypageexiter}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 outfromstories">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>

            </div>

            <div className='totalpage'>

                <div className='leftstorymover'>


                </div>
                <div className='prevstory'>

                    {currentref.current[0] != undefined &&

                        <div className={quickanimnextbar ? 'leftcardanim' : 'leftcard'} onAnimationEnd={nextanimended}>

                            <div className={quickanimnextbar ? 'leftcoveranim' : 'leftcover'}></div>

                            <img className={coloref.current.includes(currentref.current[0].name) ? !curcolorref.current.includes(currentref.current[0].name) ? 'leftcardpfpnew' : 'leftcardpfpold' : 'leftcardpfpold'} src={currentref.current[0].pfp}></img>
                            <span className={'cardusername'}>{currentref.current[0].name}</span>
                            <span className={'cardtimeago'}>{currtime(currentref.current[0].thepost[currentref.current[0].num - 1].time)}</span>

                            <img className="leftcardimg" src={currentref.current[0].thepost[currentref.current[0].num - 1].img.length > 100 ? currentref.current[0].thepost[currentref.current[0].num - 1].img : currentref.current[0].thepost[currentref.current[0].num - 1].img}></img>




                        </div>

                    }


                </div>
                <div className='currentstory'>

                    <div className={quickanimnextbar ? 'midcardanimnext' : quickanimprevbar ? 'midcardanimprev' : 'midcard'}>

                        <div className={quickanimnextbar || quickanimprevbar ? 'midcardcoveranim' : 'midcardcover'}></div>


                        {loader

                            ?

                            <div className='loadingscreenstory'></div>

                            :

                            isthereref.current[maindefinedref.current.peek().frameimg] === "removed"

                                ?

                                <div>
                                    <div className='fallbackpostmid'></div>
                                    <span className='fallbacktextmid'>This story is unavailable</span>
                                </div>

                                :

                                isthereref.current[maindefinedref.current.peek().frameimg]

                                    ?

                                    <div>
                                        <div className='fallbackpostmid'></div>
                                        <span className='fallbacktextmid'>This story has been deleted.</span>
                                    </div>

                                    :

                                    <img className="currentcardimg" src={maindefinedref.current.peek().frameimg.length > 100 ? maindefinedref.current.peek().frameimg : maindefinedref.current.peek().frameimg} alt=""></img>

                        }

                        {!loader && !isthereref.current[maindefinedref.current.peek().frameimg] && <span className={'storyago'}>{currtime(maindefinedref.current.peek().frametime)}</span>}



                        {ownref.current &&

                            <div className={quickanimnextbar || quickanimprevbar ? "pauseanim" : sliderstopper ? 'viewhidden' : closeslidquick ? 'viewsliderclosedquick' : closeslid ? 'viewsliderclosed' : 'viewslider'}>

                                <button className='slidercancel' onClick={sliderstoprevived}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 chevdown">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 storyeye">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className='numofviews'>{myviewsref.current.length}</span>
                                </button>

                                {
                                    myviewsref.current.map((each) =>

                                        <div className='eachview'>

                                            <div className='viewpfpdropdown'>
                                                <img src={each.pfp} alt=" " className='pfpsliderview' ></img>
                                            </div>

                                            <span className='viewnamedropdown'>{each.username}</span>

                                        </div>


                                    )

                                }

                            </div>


                        }


                        {!loader && ispvt && <span className={"storyusername"} onClick={profviewer}>{curuser.usrn == currentref.current[1].name ? 'You' : currentref.current[1].name}</span>}
                        {!loader && !ispvt && <span className={"storyusername"} onClick={profviewer}>{ownref.current ? 'You' : currentref.current[1].name}</span>}

                        {!loader && !ispvt && !isthereref.current[maindefinedref.current.peek().frameimg] && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={quickanimnextbar || quickanimprevbar ? "pauseanim" : pauser ? "bi bi-pause storypauseclicked" : ownref.current ? "bi bi-pause storypauseown" : "bi bi-pause storypause"} onClick={() => { setPauser(true) }} viewBox="0 0 16 16">
                            <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
                        </svg>}

                        {!loader && !ispvt && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={quickanimnextbar || quickanimprevbar ? "playanim" : pauser ? ownref.current ? "bi bi-play storyplayown" : "bi bi-play storyplay" : "bi bi-play storyplayclicked"} onClick={() => { setPauser(false) }} viewBox="0 0 16 16">
                            <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
                        </svg>}

                        {!loader && ispvt && !isthereref.current[maindefinedref.current.peek().frameimg] && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={quickanimnextbar || quickanimprevbar ? "pauseanim" : pauser ? "bi bi-pause storypauseclicked" : curuser.usrn == currentref.current[1].name ? "bi bi-pause storypauseown" : "bi bi-pause storypause"} onClick={() => { setPauser(true) }} viewBox="0 0 16 16">
                            <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
                        </svg>}

                        {!loader && ispvt && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={quickanimnextbar || quickanimprevbar ? "playanim" : pauser ? curuser.usrn == currentref.current[1].name ? "bi bi-play storyplayown" : "bi bi-play storyplay" : "bi bi-play storyplayclicked"} onClick={() => { setPauser(false) }} viewBox="0 0 16 16">
                            <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
                        </svg>}

                        {!loader && <img className={'cardpfp'} src={currentref.current[1].pfp} onClick={profviewer} alt=""></img>}


                        {!loader && !ispvt && ownref.current && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={quickanimnextbar || quickanimprevbar ? "pauseanim" : "w-6 h-6 storyoptions"} onClick={ownopts}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>}

                        {!loader && ispvt && curuser.usrn == currentref.current[1].name && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={quickanimnextbar || quickanimprevbar ? "pauseanim" : "w-6 h-6 storyoptions"} onClick={ownopts}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>}

                        {!loader && !ispvt && !ownref.current && !isthereref.current[maindefinedref.current.peek().frameimg] && <svg xmlns="http://www.w3.org/2000/svg" className={quickanimnextbar || quickanimprevbar ? "heartanim" : heartbeat ? "storylikedanim" : "storyliker"} onClick={someoneliked} viewBox="0 0 24 24" >
                            <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>}

                        {!loader && ispvt && curuser.usrn != currentref.current[1].name && !isthereref.current[maindefinedref.current.peek().frameimg] && <svg xmlns="http://www.w3.org/2000/svg" className={quickanimnextbar || quickanimprevbar ? "heartanim" : heartbeat ? "storylikedanim" : "storyliker"} onClick={someoneliked} viewBox="0 0 24 24" >
                            <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>}

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id={heartbeat ? 'storylikero' : ''}>
                            <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id={heartbeat ? 'storylikert' : ''} >
                            <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id={heartbeat ? 'storylikerth' : ''} >
                            <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id={heartbeat ? 'storylikerf' : ''} >
                            <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>

                        <topfade>
                        </topfade>

                    </div>


                    {!quickanimnextbar && !quickanimprevbar &&

                        <button id="nextd" onClick={() => { nextbaraccess("null") }}><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className='chevronright'>
                            <path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z" /></svg>

                            {!loader && <div className={quickanimnextbar || quickanimprevbar ? "baranim" : "storybar"}>

                                {divisionslist.current.map((val) =>

                                    <div className={quickanimnextbar || quickanimprevbar ? "meteranim" : maindefinedref.current.peek().framenumber === `each${val}` ? "eachmeter eachmeterdef" : "eachmeterdef"} onClick={(e) => { falseclick(e, val) }} >
                                        <div key={val} ref={(el) => barref.current[val] = el} className={quickanimnextbar || quickanimprevbar ? "innermeteranim" : maindefinedref.current.peek().framenumber === `each${val}` ? pauser ? "eachpause" : "eachplay cur" : prevstackref.current.items.map((each) => each.framenumber).includes(`each${val}`) ? "defdone" : "defremain"} onAnimationEnd={() => { nextbaraccess(val) }} onClick={(e) => { falseclick(e, val) }}></div>
                                    </div>

                                )}

                            </div>}

                        </button>
                    }

                    {!quickanimnextbar && !quickanimprevbar &&

                        <button id="previousd" onClick={prevbaraccess}><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className='chevronleft'>
                            <path d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zM142.1 273l135.5 135.5c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L226.9 256l101.6-101.6c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L142.1 239c-9.4 9.4-9.4 24.6 0 34z" /></svg>

                            {!loader && <div className={quickanimnextbar || quickanimprevbar ? "baranimd" : "storybard"}>

                                {divisionslist.current.map((val) =>

                                    <div className={quickanimnextbar || quickanimprevbar ? "meteranim" : maindefinedref.current.peek().framenumber === `each${val}` ? "eachmeter eachmeterdef" : "eachmeterdef"} onClick={(e) => { falseclick(e, val) }}>
                                        <div className={quickanimnextbar || quickanimprevbar ? "innermeteranim" : maindefinedref.current.peek().framenumber === `each${val}` ? pauser ? "eachpause" : "eachplay cur" : prevstackref.current.items.map((each) => each.framenumber).includes(`each${val}`) ? "defdone" : "defremain"} onClick={(e) => { falseclick(e, val) }}></div>
                                    </div>

                                )}

                            </div>}

                        </button>

                    }

                </div>
                <div className='nextstory'>

                    {currentref.current[2] != undefined &&

                        <div className={quickanimprevbar ? 'rightcardanim' : 'rightcard'} onAnimationEnd={prevanimended}>

                            <div className={quickanimprevbar ? 'rightcoveranim' : 'rightcover'}></div>

                            <img className={coloref.current.includes(currentref.current[2].name) ? !curcolorref.current.includes(currentref.current[2].name) ? 'rightcardpfpnew' : 'rightcardpfpold' : 'rightcardpfpold'} src={currentref.current[2].pfp}></img>
                            <span className='cardusername'>{currentref.current[2].name}</span>
                            <span className='cardtimeago'>{currtime(currentref.current[2].thepost[currentref.current[2].num - 1].time)}</span>

                            <img className="rightcardimg" src={currentref.current[2].thepost[0].img.length > 100 ? currentref.current[2].thepost[0].img : currentref.current[2].thepost[0].img}></img>


                        </div>


                    }



                </div>
                <div className='rightstorymover'>

                </div>

            </div>


        </>


    );
}

export default Newstory;