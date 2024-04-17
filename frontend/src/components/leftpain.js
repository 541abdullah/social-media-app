import ExploreIcon from '@mui/icons-material/Explore';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CircleIcon from '@mui/icons-material/Circle';
import SettingsIcon from '@mui/icons-material/Settings';
import "../corecss/welcomepage.css";
import Yesnomodal from "./modals/yesnomodal";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { currview } from '../features/profile';
import { iconresets } from '../features/iconreseter';
import { notifvisit } from '../features/notifvisit';
import { useState, useEffect, useRef, useCallback } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import Createmodal from './modals/createpostmodal';
import { leftpsets } from '../features/leftp';

const Leftpain = ({ parent }) => {

  let [isnotif, setIsnotif] = useState(true);
  let [notifsval, setNotifsval] = useState(6);
  let [slidedown, setSlidedown] = useState(false);
  let [ddcloseanim, setDdcloseanim] = useState(false);
  let [theslide, setTheslide] = useState(false);
  let [iscreate, setIscreate] = useState(false);
  let [allreqs, setAllreqs] = useState(false);
  let [newnotifs, setNewnotifs] = useState(0);
  let [skipvalseven, setSkipvalseven] = useState(5);
  let [loaderseven, setLoaderseven] = useState(null);
  let [sevenarray, setSevenarray] = useState([]);
  let [skipvalthirty, setSkipvalthirty] = useState(5);
  let [loaderthirty, setLoaderthirty] = useState(null);
  let [thirtyarray, setThirtyarray] = useState([]);
  let [skipvalolder, setSkipvalolder] = useState(5);
  let [loaderolder, setLoaderolder] = useState(null);
  let [olderarray, setOlderarray] = useState([]);
  let [currentselect, setCurrentselect] = useState(useSelector((state) => { return state.selectedleftp.value }));
  let [cursel, setCursel] = useState(null);
  let [logout, setLogout] = useState(false);
  let [notifsevenarray, setNotifsevenarray] = useState([]);
  let [notifthirtyarray, setNotifthirtyarray] = useState([]);
  let [notifolderarray, setNotifolderarray] = useState([]);

  let curuser = useSelector((state) => { return state.youryr.value });
  let ismessagesclicked = useSelector((state) => { return state.iconresetyr.value });
  let themer = useSelector((state) => { return state.themeyr.value });
  const notifprofile = useSelector((state) => { return state.notifprofilevisit.value });

  let nav = useNavigate();
  let disp = useDispatch();

  let referseven = useRef(null);
  let doublstopperseven = useRef(1);
  let scrollstopperseven = useRef(6);
  let lastloaderseven = useRef(1);
  let referthirty = useRef(null);
  let doublstopperthirty = useRef(1);
  let scrollstopperthirty = useRef(6);
  let lastloaderthirty = useRef(1);
  let referolder = useRef(null);
  let doublstopperolder = useRef(1);
  let scrollstopperolder = useRef(6);
  let lastloaderolder = useRef(1);
  let firsttime = useRef(false);


  if (ismessagesclicked) {
    disp(leftpsets('None'));
    disp(iconresets(false));
  }


  const fetchDataseven = useCallback(async () => {


    const result = await fetch(`http://localhost:3001/notif/week/nextfive/${curuser.usrn}?skip=${skipvalseven}`, {
      credentials: 'include',
    })

    const data = await result.json();

    if (data.length < 5) {
      setLoaderseven(false);
    }

    scrollstopperseven.current = data.length;
    setSevenarray((sevenarray) => [...sevenarray, ...data]);
    setSkipvalseven((skipvalseven) => skipvalseven + 5);
    setLoaderseven(false);
    doublstopperseven.current = 1;

  }, [loaderseven, curuser]);


  const fetchDatathirty = useCallback(async () => {


    const result = await fetch(`http://localhost:3001/notif/month/nextfive/${curuser.usrn}?skip=2`, {
      credentials: 'include',
    })

    const data = await result.json();

    if (data.length < 5) {
      setLoaderthirty(false);
    }

    scrollstopperthirty.current = data.length;
    setThirtyarray((thirtyarray) => [...thirtyarray, ...data]);
    setSkipvalthirty((skipvalthirty) => skipvalthirty + 5);
    setLoaderthirty(false);
    doublstopperthirty.current = 1;

  }, [loaderthirty, curuser]);


  const fetchDataolder = useCallback(async () => {


    const result = await fetch(`http://localhost:3001/notif/older/nextfive/${curuser.usrn}?skip=${skipvalolder}`, {
      credentials: 'include',
    })

    const data = await result.json();

    if (data.length < 5) {
      setLoaderolder(false);
    }

    scrollstopperolder.current = data.length;
    setOlderarray((olderarray) => [...olderarray, ...data]);
    setSkipvalolder((skipvalolder) => skipvalolder + 5);
    setLoaderolder(false);
    doublstopperolder.current = 1;

  }, [loaderolder, curuser]);


  useEffect(() => {

    const handleScrollseven = () => {

      if (doublstopperseven.current == 1) {
        if (Math.abs(referseven.current.scrollHeight - referseven.current.clientHeight - referseven.current.scrollTop) < 1) {


          if (scrollstopperseven.current >= 5) {

            fetchDataseven();
            setLoaderseven(true);
            doublstopperseven.current = 0;

          }

          if (scrollstopperseven.current < 5) {
            if (lastloaderseven.current) {
              setLoaderseven(true);
              lastloaderseven.current = 0;
              setTimeout(() => {
                setLoaderseven(false);
              }, 3000);
            }
          }
        }
      }

    };



    const handleScrollthirty = () => {

      if (doublstopperthirty.current == 1) {
        if (Math.abs(referthirty.current.scrollHeight - referthirty.current.clientHeight - referthirty.current.scrollTop) < 1) {


          if (scrollstopperthirty.current >= 5) {

            fetchDatathirty();
            setLoaderthirty(true);
            doublstopperthirty.current = 0;

          }

          if (scrollstopperthirty.current < 5) {
            if (lastloaderthirty.current) {
              setLoaderthirty(true);
              lastloaderthirty.current = 0;
              setTimeout(() => {
                setLoaderthirty(false);
              }, 3000);
            }
          }
        }
      }

    };


    const handleScrollolder = () => {

      if (doublstopperolder.current == 1) {
        if (Math.abs(referolder.current.scrollHeight - referolder.current.clientHeight - referolder.current.scrollTop) < 1) {

          if (scrollstopperolder.current >= 5) {

            fetchDataolder();
            setLoaderolder(true);
            doublstopperolder.current = 0;
          }

          if (scrollstopperolder.current < 5) {
            if (lastloaderolder.current) {
              setLoaderolder(true);
              lastloaderolder.current = 0;
              setTimeout(() => {
                setLoaderolder(false);
              }, 3000);
            }
          }
        }
      }

    };

    if (referseven.current != null && referthirty.current != null && referolder.current != null) {

      referseven.current.addEventListener("scroll", handleScrollseven);
      referthirty.current.addEventListener("scroll", handleScrollthirty);
      referolder.current.addEventListener("scroll", handleScrollolder);
      return () => {


        if (referseven.current != null && referthirty.current != null && referolder.current != null) {


          referseven.current.removeEventListener("scroll", handleScrollseven);
          referthirty.current.removeEventListener("scroll", handleScrollthirty);
          referolder.current.removeEventListener("scroll", handleScrollolder);


        }


      };

    }

  });


  // icon coloriser

  const theme = createTheme({
    palette: {
      primary: red,
    },
  });


  useEffect(() => {

    async function allreqgetter() {

      const result = await fetch(`http://localhost:3001/notif/allreqs/${curuser.usrn}`, {
        credentials: 'include'
      })

      const data = await result.json();
      setAllreqs(data);

    }

    allreqgetter();


    async function initialtopseven() {

      const result = await fetch(`http://localhost:3001/notif/week/nextfive/${curuser.usrn}?skip=0`, {
        credentials: 'include',
      })

      const data = await result.json();
      let samplearr = [];

      for (let i = 0; i < data.length; i++) {
        if (data[i].type != "followreq") {
          samplearr.push(data[i]);
        }
      }

      setNotifsevenarray(samplearr);
      setSevenarray(data);

    }

    initialtopseven();

    async function initialtopthirty() {

      const result = await fetch(`http://localhost:3001/notif/month/nextfive/${curuser.usrn}?skip=0`, {
        credentials: 'include',
      })

      const data = await result.json();

      let samplearr = [];

      for (let i = 0; i < data.length; i++) {
        if (data[i].type != "followreq") {
          samplearr.push(data[i]);
        }
      }

      setNotifthirtyarray(samplearr);
      setThirtyarray(data);

    }

    initialtopthirty();

    async function initialtopolder() {

      const result = await fetch(`http://localhost:3001/notif/older/nextfive/${curuser.usrn}?skip=0`, {
        credentials: 'include',
      })

      const data = await result.json();

      let samplearr = [];

      for (let i = 0; i < data.length; i++) {
        if (data[i].type != "followreq") {
          samplearr.push(data[i]);
        }
      }

      setNotifolderarray(samplearr);
      setOlderarray(data);
    }

    initialtopolder();

    async function numofnotifs() {

      const result = await fetch(`http://localhost:3001/notif/new/${curuser.usrn}`, {
        credentials: 'include',
      })

      const data = await result.json();
      setNewnotifs(data.length);
    }

    numofnotifs();

  }, [curuser])


  const reqslider = () => {

    setSlidedown(true);

  }

  const ddcloser = (e) => {

    if (e != null) {
      e.stopPropagation();
    }

    setDdcloseanim(true);
    setTimeout(() => {
      setDdcloseanim(false);
    }, 600);
    setTimeout(() => {
      setSlidedown(false);
    }, 400);

  }

  const postcreator = () => {

    setIscreate(true);
    setCursel('AddCircleIcon');

  }

  const slidenotifbar = () => {

    if (theslide == false) {

      setCursel('NotificationsNoneIcon');

      async function clearer() {

        const result = await fetch(`http://localhost:3001/notif/allclear/${curuser.usrn}`, {
          credentials: 'include'
        })

        const data = await result.json();

        setNewnotifs((newnotifs) => newnotifs - data.len);

        setTheslide(true);
        firsttime.current = true;

      }

      clearer();

    }


  }


  useEffect(() => {

    function isunslide(event) {
      if (theslide) {

        const unmatch = [
          '.notifslider', '.notifslidernight', '.checkreqs', '.onefreqtextdropdown', '.reqdeleter', '.confirmbut',
          '.eachreq', '.eachreqnight', '.notifs', '.notifspfp', '.notifspfpone', '.notifspfptwo', '.notifspfpdropdownup',
          '.pfpsliderup', '.lastseven', '.followreqsexpand', '.onefreqtext', '.candidates', '.allreqsslider', '.allreqsslidermorethanthree', '.followreqs',
          '.nofollowplus', '.nofreqstext', '.reqsandruler', '#notifactredcircle', '.notifacticon'
        ]

        let flag = false;

        unmatch.map((each) => {
          if (event.target.matches(each)) {
            flag = true;
          }
        })

        if (!flag) {
          setTheslide(false);
          setCursel(null);
        }

      }

    }


    document.addEventListener("click", isunslide);

    return () => {
      document.removeEventListener('click', isunslide);
    }

  })

  const datedifffinder = (pastdate) => {


    const type = pastdate.type;

    if (pastdate.type == 'diff') {
      pastdate = pastdate.date;
    }

    let cur = new Date();
    let prev = new Date(pastdate);

    const diff = (cur - prev);

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.round(((diff % 86400000) % 3600000) / 60000);

    if (days != 0) {
      if (type == 'diff') {
        if (days == 1) {
          return `${days}d`
        }
        return `${days}d`
      }
      return `${days}d`;
    } else if (hours != 0) {
      if (type == 'diff') {
        if (hours == 1) {
          return `${days}h`
        }
        return `${hours}h`
      }
      return `${hours}h`;
    } else {
      if (type == 'diff') {
        if (minutes == 1) {
          return `${days}m`
        }
        return `${minutes}m`
      }
      return `${minutes}m`;
    }
  }


  const goexplore = () => {

    nav('/explore');
    disp(leftpsets('ExploreIcon'));

  }

  const welcomeagain = () => {

    nav('/welcome');
    disp(leftpsets('HomeIcon'));

  }

  const profileviewer = (key) => {

    disp(currview(key.from));
    disp(notifvisit(!notifprofile));
    nav(`/profile/${key.from}`);

  }

  const letfollow = (key) => {

    async function clearer() {

      const result = await fetch(`http://localhost:3001/notif/clear/${curuser.usrn}/${key.from}`, {
        credentials: 'include'
      })

      const data = await result.json();
      setNewnotifs((newnotifs) => newnotifs - data.len);

      const idx = allreqs.indexOf(key);
      allreqs.splice(idx, 1);
      setAllreqs([...allreqs]);


      if (allreqs.length == 0) {
        ddcloser(null);
      }


      const newnotif =
      {
        username: key.from,
        pfp: key.frompfp,
        fullname: key.fromfname,
        type: "followsyou",
        attachement: null,
        commentifany: null,
        reference: null
      };

      fetch(`http://localhost:3001/notif/${curuser.usrn}`, {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(newnotif),
        credentials: 'include'
      })

      const newnotiftwo =
      {
        username: curuser.usrn,
        pfp: curuser.pfp,
        fullname: curuser.fullname,
        type: "accepted",
        attachement: null,
        commentifany: null,
        reference: null
      };

      fetch(`http://localhost:3001/notif/${key.from}`, {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(newnotiftwo),
        credentials: 'include'
      })


      const delnotif =
      {
        username: key.from,
        type: "followreqdel",

      };

      fetch(`http://localhost:3001/notif/rem/${curuser.usrn}`, {
        method: 'DELETE',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(delnotif),
        credentials: 'include'
      })

      let newobj = {
        username: key.from,
        pfp: key.frompfp,
        fullname: key.fromfname
      }

      fetch(`http://localhost:3001/users/accepted/${curuser.usrn}`, {
        method: 'PUT',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(newobj),
        credentials: 'include'
      })
    }

    clearer();

  }

  const dontletfollow = (key) => {


    async function clearer() {

      const result = await fetch(`http://localhost:3001/notif/clear/${curuser.usrn}/${key.from}`, {
        credentials: 'include'
      })

      const data = await result.json();
      setNewnotifs((newnotifs) => newnotifs - data.len);

      const idx = allreqs.indexOf(key);
      allreqs.splice(idx, 1);
      setAllreqs([...allreqs]);

      if (allreqs.length == 0) {
        ddcloser(null);
      }

      const delnotif =
      {
        username: key.from,
        type: "followreqdel",

      };

      fetch(`http://localhost:3001/notif/rem/${curuser.usrn}`, {
        method: 'DELETE',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(delnotif),
        credentials: 'include'
      })

    }

    clearer();

  }

  const userloggingout = () => {
    setCursel('LogoutIcon');
    setLogout(true);
  }

  const gotosettings = () => {
    disp(leftpsets('SettingsIcon'));
    nav(`/settings/${curuser.usrn}`);
  }


  window.onpopstate = e => {


    let curloc = window.location.href;
    let decider = curloc.substring(22);

    if (decider[0] == 'e') {
      disp(leftpsets('ExploreIcon'));
    } else if (decider[0] == 'w') {
      disp(leftpsets('HomeIcon'));
    } else if (decider[0] == 's') {
      disp(leftpsets('SettingsIcon'));
    } else {
      disp(leftpsets('ExploreIcon'));
    }



  }





  return (
    <>
      <div className="leftbar">

        {iscreate && <Createmodal trigger={setIscreate} extra={setCursel} />}

        {logout && <Yesnomodal trigger={setLogout} text={`Are you sure you want to `} bold={`Log out`} extra={{ purpose: "logger", setCursel }} />}
        {firsttime.current && <div className={theslide ? themer ? 'notifslider' : "notifslidernight" : themer ? 'notifsliderrev' : "notifsliderrevnight"}>

          <span className={themer ? 'headingslider' : 'headingslider leftpnight'}> Notifications</span>

          <div className='reqsandruler'>

            <div className={slidedown ? 'followreqsexpand' : themer ? "followreqs" : 'followreqs followreqsnight'} onClick={allreqs.length >= 1 ? reqslider : console.log('pass')}>

              {

                slidedown

                  ?

                  <div className={ddcloseanim ? allreqs.length <= 3 ? themer ? 'allreqssliderclosed' : 'allreqssliderclosed bgnight' : themer ? 'allreqsslidermorethanthreeclosed' : 'allreqsslidermorethanthreeclosed bgnight' : allreqs.length <= 3 ? themer ? 'allreqsslider' : "allreqsslider bgnight" : themer ? 'allreqsslidermorethanthree' : "allreqsslidermorethanthree bgnight"}>

                    <button className={themer ? 'slideback' : 'slidebacknight leftpnight'} onClick={(e) => { ddcloser(e) }}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 chevup">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                    </svg>
                    </button>



                    {allreqs.map((each) => (

                      <div className={themer ? 'eachreq' : 'eachreqnight'} key={each.from}>

                        <div className={themer ? 'notifspfpdropdownup' : 'notifspfpdropdownup notifspfpdropdownupnight'} >
                          <img src={each.frompfp} alt=" " className='pfpsliderup' ></img>
                        </div>

                        <span className={themer ? 'onefreqtextdropdown' : "onefreqtextdropdown leftpnight"}>{each.from}</span>
                        <span className={each.fromfname.length < 10 ? 'candidatesdropdown' : 'candidatesdropdownlarge'}>{each.fromfname}. {datedifffinder(each.createdAt)}</span>

                        <button className='confirmbut' onClick={() => { letfollow(each) }}>Confirm</button>
                        <button className="reqdeleter" onClick={() => { dontletfollow(each) }}>Delete</button>


                      </div>

                    ))}


                  </div>



                  :


                  allreqs.length == 0

                    ?

                    <>

                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={themer ? "w-6 h-6 nofollowplus" : "w-6 h-6 nofollowplus leftpnight"}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                      </svg>

                      <span className={themer ? 'nofreqstext' : "nofreqstext leftpnight"}>No New Follow Requests...</span>

                    </>

                    :

                    allreqs.length == 1

                      ?

                      <div className='reqclicker'>

                        <div className={themer ? 'notifspfp' : "notifspfp notifspfpnight"} >
                          <img src={allreqs[0].frompfp} alt=" " className='pfpsliderupcoverone' ></img>

                        </div>

                        <span className={themer ? 'onefreqtext' : "onefreqtext leftpnight"}>Follow Request</span>
                        <span className='candidates'>{allreqs[0].from}</span>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={themer ? "w-6 h-6 checkreqs" : "w-6 h-6 checkreqs leftpnight"}>
                          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>

                      </div>


                      :

                      <>

                        <div className={themer ? 'notifspfpone' : "notifspfpone notifspfponenight"}>

                          <img src={allreqs[0].frompfp} alt=" " className='pfpsliderupcover' ></img>

                        </div>

                        <div className={themer ? 'notifspfptwo' : " notifspfptwo notifspfptwonight"}>

                          <img src={allreqs[1].frompfp} alt=" " className='pfpsliderupcover' ></img>

                        </div>

                        <span className={themer ? 'onefreqtext' : 'onefreqtext leftpnight'}> Follow Requests</span>
                        {

                          allreqs.length == 2

                            ?

                            <span className='candidates'>{allreqs[0].from} and {allreqs[1].from}</span>

                            :

                            <span className='candidates'>{allreqs[0].from}, {allreqs[1].from} + {allreqs.length - 2} others</span>

                        }

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={themer ? "w-6 h-6 checkreqs" : "w-6 h-6 checkreqs leftpnight"}>
                          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>

                      </>

              }


            </div>

          </div>

          <span className={themer ? 'sevenheading' : 'sevenheading leftpnight'}>Last 7 days</span>

          <div ref={referseven} className={sevenarray.length <= 3 ? themer ? 'lastsevenplus' : "lastsevenplus bgnight" : themer ? 'lastseven' : "lastseven bgnight"}>

            {

              notifsevenarray.length != 0

                ?

                sevenarray.map((each) => (

                  <>

                    <div className={each.type === 'storylike' ? themer ? 'generictemplate' : "generictemplate bgnightshadow " : 'hidd'} onClick={() => { profileviewer(each) }}>
                      <div className={themer ? 'notifspfpdropdown' : "notifspfpdropdown notifspfpdropdownnight"}>
                        <img src={each.frompfp} alt=" " className='pfpslider' ></img>
                      </div>
                      <span className={themer ? 'onefreqtextothers' : "onefreqtextothers leftpnight"}><b>{each.from} </b>liked your story.</span>
                      <span className='candidatesdropdown'>{each.fromfname}&nbsp;&nbsp;&nbsp;{datedifffinder(each.createdAt)}</span>
                    </div>


                    < div className={each.type === 'commented' ? themer ? 'imgtemplate' : "imgtemplate bgnightshadow " : 'hidd'} onClick={() => { profileviewer(each) }}>
                      <div className={themer ? 'notifspfpdropdown' : "notifspfpdropdown notifspfpdropdownnight"}>
                        <img src={each.frompfp} alt=" " className='pfpslider' ></img>
                      </div>
                      <div className='textblockc'>
                        <p className={themer ? 'thenotif' : "thenotif leftpnight "}><span><b>{each.from} </b> commented under your post: "{each.commentifany}".</span></p>
                        <span className='candidatesdropdownc'>{each.fromfname}&nbsp;&nbsp;&nbsp;{datedifffinder(each.createdAt)}</span>
                      </div>
                      <img className='thepostinquestion' src={each.attachement} alt=" "></img>
                    </div>


                    <div className={each.type === 'accepted' ? themer ? 'imgtemplatereqac' : 'imgtemplatereqac bgnightshadow ' : 'hidd'} onClick={() => { profileviewer(each) }} >
                      <div className={themer ? 'notifspfpdropdown' : "notifspfpdropdown notifspfpdropdownnight"}>
                        <img src={each.frompfp} alt=" " className='pfpslider' ></img>
                      </div>
                      <div className='textblock'>
                        <p className={themer ? 'thenotif' : "thenotif leftpnight "}><span><b>{each.from} </b>has accepted your follow request.</span></p>
                        <span className='candidatesdropdownreqac'>{each.fromfname}&nbsp;&nbsp;&nbsp;{datedifffinder(each.createdAt)}</span>
                      </div>
                    </div>


                    <div className={each.type === 'followsyou' ? themer ? 'generictemplate' : "generictemplate bgnightshadow" : 'hidd'} onClick={() => { profileviewer(each) }} >
                      <div className={themer ? 'notifspfpdropdown' : "notifspfpdropdown notifspfpdropdownnight"}>
                        <img src={each.frompfp} alt=" " className='pfpslider' ></img>
                      </div>

                      <span className={themer ? 'onefreqtextothers' : "onefreqtextothers leftpnight"}> <b>{each.from} </b>follows you now.</span>
                      <span className='candidatesdropdown'>{each.fromfname}&nbsp;&nbsp;&nbsp;{datedifffinder(each.createdAt)}</span>
                    </div>


                    <div className={each.type === 'postlike' ? themer ? 'imgtemplatereqac' : 'imgtemplatereqac bgnightshadow' : 'hidd'} onClick={() => { profileviewer(each) }}>
                      <div className={themer ? 'notifspfpdropdown' : "notifspfpdropdown notifspfpdropdownnight"}>
                        <img src={each.frompfp} alt=" " className='pfpslider' ></img>
                      </div>

                      <span className={themer ? 'onefreqtextothers' : "onefreqtextothers leftpnight"}><b>{each.from} </b> liked your post.</span>
                      <span className='candidatesdropdown'>{each.fromfname}&nbsp;&nbsp;&nbsp;{datedifffinder(each.createdAt)}</span>
                      <img className='thepostinquestion' src={each.attachement} alt=" "></img>
                    </div>


                    <div className={each.type === 'commentlike' ? themer ? 'imgtemplate' : 'imgtemplate bgnightshadow ' : 'hidd'} onClick={() => { profileviewer(each) }}>
                      <div className={themer ? 'notifspfpdropdown' : "notifspfpdropdown notifspfpdropdownnight"}>
                        <img src={each.frompfp} alt=" " className='pfpslider' ></img>
                      </div>
                      <div className='textblockc'>
                        <p className={themer ? 'thenotif' : "thenotif leftpnight "}><span><b>{each.from} </b> liked your comment: "{each.commentifany}".</span></p>
                        <span className='candidatesdropdownc'>{each.fromfname}&nbsp;&nbsp;&nbsp;{datedifffinder(each.createdAt)}</span>
                      </div>
                      <img className='thepostinquestion' src={each.attachement} alt=" "></img>
                    </div>



                  </>


                ))

                :

                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 crossbell">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.143 17.082a24.248 24.248 0 0 0 3.844.148m-3.844-.148a23.856 23.856 0 0 1-5.455-1.31 8.964 8.964 0 0 0 2.3-5.542m3.155 6.852a3 3 0 0 0 5.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 0 0 3.536-1.003A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53" />
                  </svg>
                  <span className='crossbelltext'>no notifications</span>
                </div>

            }

            {loaderseven && <div className='loadingiconnotifs'></div>}

          </div>


          <span className={themer ? 'thirtyheading' : 'thirtyheading leftpnight'}>Last 30 days</span>
          <div ref={referthirty} className={thirtyarray.length <= 3 ? themer ? 'lastthirtyplus' : 'lastthirtyplus bgnight' : themer ? 'lastthirty' : "lastthirty bgnight"}>

            {
              notifthirtyarray.length != 0

                ?

                thirtyarray.map((each) => (

                  <>

                    <div className={each.type === 'storylike' ? themer ? 'generictemplate' : "generictemplate bgnightshadow " : 'hidd'} onClick={() => { profileviewer(each) }}>
                      <div className={themer ? 'notifspfpdropdown' : "notifspfpdropdown notifspfpdropdownnight"}>
                        <img src={each.frompfp} alt=" " className='pfpslider' ></img>
                      </div>
                      <span className={themer ? 'onefreqtextothers' : "onefreqtextothers leftpnight"}><b>{each.from} </b>liked your story.</span>
                      <span className='candidatesdropdown'>{each.fromfname}&nbsp;&nbsp;&nbsp;{datedifffinder(each.createdAt)}</span>
                    </div>


                    < div className={each.type === 'commented' ? themer ? 'imgtemplate' : "imgtemplate bgnightshadow " : 'hidd'} onClick={() => { profileviewer(each) }}>
                      <div className={themer ? 'notifspfpdropdown' : "notifspfpdropdown notifspfpdropdownnight"}>
                        <img src={each.frompfp} alt=" " className='pfpslider' ></img>
                      </div>
                      <div className='textblockc'>
                        <p className={themer ? 'thenotif' : "thenotif leftpnight "}><span><b>{each.from} </b> commented under your post: "{each.commentifany}".</span></p>
                        <span className='candidatesdropdownc'>{each.fromfname}&nbsp;&nbsp;&nbsp;{datedifffinder(each.createdAt)}</span>
                      </div>
                      <img className='thepostinquestion' src={each.attachement} alt=" "></img>
                    </div>


                    <div className={each.type === 'accepted' ? themer ? 'imgtemplatereqac' : 'imgtemplatereqac bgnightshadow ' : 'hidd'} onClick={() => { profileviewer(each) }} >
                      <div className={themer ? 'notifspfpdropdown' : "notifspfpdropdown notifspfpdropdownnight"}>
                        <img src={each.frompfp} alt=" " className='pfpslider' ></img>
                      </div>
                      <div className='textblock'>
                        <p className={themer ? 'thenotif' : "thenotif leftpnight "}><span><b>{each.from} </b>has accepted your follow request.</span></p>
                        <span className='candidatesdropdownreqac'>{each.fromfname}&nbsp;&nbsp;&nbsp;{datedifffinder(each.createdAt)}</span>
                      </div>
                    </div>


                    <div className={each.type === 'followsyou' ? themer ? 'generictemplate' : "generictemplate bgnightshadow" : 'hidd'} onClick={() => { profileviewer(each) }} >
                      <div className={themer ? 'notifspfpdropdown' : "notifspfpdropdown notifspfpdropdownnight"}>
                        <img src={each.frompfp} alt=" " className='pfpslider' ></img>
                      </div>

                      <span className={themer ? 'onefreqtextothers' : "onefreqtextothers leftpnight"}> <b>{each.from} </b>follows you now.</span>
                      <span className='candidatesdropdown'>{each.fromfname}&nbsp;&nbsp;&nbsp;{datedifffinder(each.createdAt)}</span>
                    </div>


                    <div className={each.type === 'postlike' ? themer ? 'imgtemplatereqac' : 'imgtemplatereqac bgnightshadow' : 'hidd'} onClick={() => { profileviewer(each) }}>
                      <div className={themer ? 'notifspfpdropdown' : "notifspfpdropdown notifspfpdropdownnight"}>
                        <img src={each.frompfp} alt=" " className='pfpslider' ></img>
                      </div>

                      <span className={themer ? 'onefreqtextothers' : "onefreqtextothers leftpnight"}><b>{each.from} </b> liked your post.</span>
                      <span className='candidatesdropdown'>{each.fromfname}&nbsp;&nbsp;&nbsp;{datedifffinder(each.createdAt)}</span>
                      <img className='thepostinquestion' src={each.attachement} alt=" "></img>
                    </div>


                    <div className={each.type === 'commentlike' ? themer ? 'imgtemplate' : 'imgtemplate bgnightshadow ' : 'hidd'} onClick={() => { profileviewer(each) }}>
                      <div className={themer ? 'notifspfpdropdown' : "notifspfpdropdown notifspfpdropdownnight"}>
                        <img src={each.frompfp} alt=" " className='pfpslider' ></img>
                      </div>
                      <div className='textblockc'>
                        <p className={themer ? 'thenotif' : "thenotif leftpnight "}><span><b>{each.from} </b> liked your comment: "{each.commentifany}".</span></p>
                        <span className='candidatesdropdownc'>{each.fromfname}&nbsp;&nbsp;&nbsp;{datedifffinder(each.createdAt)}</span>
                      </div>
                      <img className='thepostinquestion' src={each.attachement} alt=" "></img>
                    </div>



                  </>


                ))


                :

                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 crossbell">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.143 17.082a24.248 24.248 0 0 0 3.844.148m-3.844-.148a23.856 23.856 0 0 1-5.455-1.31 8.964 8.964 0 0 0 2.3-5.542m3.155 6.852a3 3 0 0 0 5.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 0 0 3.536-1.003A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53" />
                  </svg>
                  <span className='crossbelltext'>no notifications</span>
                </div>

            }


            {loaderthirty && <div className='loadingiconnotifs'></div>}

          </div>

          <span className={themer ? 'olderhead' : 'olderhead leftpnight '}>older</span>
          <div ref={referolder} className={olderarray.length <= 3 ? themer ? 'oldernotifsplus' : 'oldernotifsplus bgnight' : themer ? 'oldernotifs' : 'oldernotifs bgnight'}>

            {
              notifolderarray.length != 0

                ?

                olderarray.map((each) => (

                  <>

                    <div className={each.type === 'storylike' ? themer ? 'generictemplate' : "generictemplate bgnightshadow " : 'hidd'} onClick={() => { profileviewer(each) }}>
                      <div className={themer ? 'notifspfpdropdown' : "notifspfpdropdown notifspfpdropdownnight"}>
                        <img src={each.frompfp} alt=" " className='pfpslider' ></img>
                      </div>
                      <span className={themer ? 'onefreqtextothers' : "onefreqtextothers leftpnight"}><b>{each.from} </b>liked your story.</span>
                      <span className='candidatesdropdown'>{each.fromfname}&nbsp;&nbsp;&nbsp;{datedifffinder(each.createdAt)}</span>
                    </div>


                    < div className={each.type === 'commented' ? themer ? 'imgtemplate' : "imgtemplate bgnightshadow " : 'hidd'} onClick={() => { profileviewer(each) }}>
                      <div className={themer ? 'notifspfpdropdown' : "notifspfpdropdown notifspfpdropdownnight"}>
                        <img src={each.frompfp} alt=" " className='pfpslider' ></img>
                      </div>
                      <div className='textblockc'>
                        <p className={themer ? 'thenotif' : "thenotif leftpnight "}><span><b>{each.from} </b> commented under your post: "{each.commentifany}".</span></p>
                        <span className='candidatesdropdownc'>{each.fromfname}&nbsp;&nbsp;&nbsp;{datedifffinder(each.createdAt)}</span>
                      </div>
                      <img className='thepostinquestion' src={each.attachement} alt=" "></img>
                    </div>


                    <div className={each.type === 'accepted' ? themer ? 'imgtemplatereqac' : 'imgtemplatereqac bgnightshadow ' : 'hidd'} onClick={() => { profileviewer(each) }} >
                      <div className={themer ? 'notifspfpdropdown' : "notifspfpdropdown notifspfpdropdownnight"}>
                        <img src={each.frompfp} alt=" " className='pfpslider' ></img>
                      </div>
                      <div className='textblock'>
                        <p className={themer ? 'thenotif' : "thenotif leftpnight "}><span><b>{each.from} </b>has accepted your follow request.</span></p>
                        <span className='candidatesdropdownreqac'>{each.fromfname}&nbsp;&nbsp;&nbsp;{datedifffinder(each.createdAt)}</span>
                      </div>
                    </div>

                    <div className={each.type === 'followsyou' ? themer ? 'generictemplate' : "generictemplate bgnightshadow" : 'hidd'} onClick={() => { profileviewer(each) }} >
                      <div className={themer ? 'notifspfpdropdown' : "notifspfpdropdown notifspfpdropdownnight"}>
                        <img src={each.frompfp} alt=" " className='pfpslider' ></img>
                      </div>

                      <span className={themer ? 'onefreqtextothers' : "onefreqtextothers leftpnight"}> <b>{each.from} </b>follows you now.</span>
                      <span className='candidatesdropdown'>{each.fromfname}&nbsp;&nbsp;&nbsp;{datedifffinder(each.createdAt)}</span>
                    </div>


                    <div className={each.type === 'postlike' ? themer ? 'imgtemplatereqac' : 'imgtemplatereqac bgnightshadow' : 'hidd'} onClick={() => { profileviewer(each) }}>
                      <div className={themer ? 'notifspfpdropdown' : "notifspfpdropdown notifspfpdropdownnight"}>
                        <img src={each.frompfp} alt=" " className='pfpslider' ></img>
                      </div>

                      <span className={themer ? 'onefreqtextothers' : "onefreqtextothers leftpnight"}><b>{each.from} </b> liked your post.</span>
                      <span className='candidatesdropdown'>{each.fromfname}&nbsp;&nbsp;&nbsp;{datedifffinder(each.createdAt)}</span>
                      <img className='thepostinquestion' src={each.attachement} alt=" "></img>
                    </div>


                    <div className={each.type === 'commentlike' ? themer ? 'imgtemplate' : 'imgtemplate bgnightshadow ' : 'hidd'} onClick={() => { profileviewer(each) }}>
                      <div className={themer ? 'notifspfpdropdown' : "notifspfpdropdown notifspfpdropdownnight"}>
                        <img src={each.frompfp} alt=" " className='pfpslider' ></img>
                      </div>
                      <div className='textblockc'>
                        <p className={themer ? 'thenotif' : "thenotif leftpnight "}><span><b>{each.from} </b> liked your comment: "{each.commentifany}".</span></p>
                        <span className='candidatesdropdownc'>{each.fromfname}&nbsp;&nbsp;&nbsp;{datedifffinder(each.createdAt)}</span>
                      </div>
                      <img className='thepostinquestion' src={each.attachement} alt=" "></img>
                    </div>



                  </>


                ))

                :

                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 crossbell">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.143 17.082a24.248 24.248 0 0 0 3.844.148m-3.844-.148a23.856 23.856 0 0 1-5.455-1.31 8.964 8.964 0 0 0 2.3-5.542m3.155 6.852a3 3 0 0 0 5.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 0 0 3.536-1.003A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53" />
                  </svg>
                  <span className='crossbelltext'>no notifications</span>
                </div>

            }

            {loaderolder && <div className='loadingiconnotifs'></div>}

          </div>

        </div>}

        <ul>
          <li className={(cursel == 'AddCircleIcon' || cursel == 'NotificationsNoneIcon' || cursel == 'LogoutIcon') ? 'leftpainitem' : currentselect == 'HomeIcon' ? 'selectedcurrently leftpainitem' : 'leftpainitem '} >
            <div className={themer ? "activitypair" : "activitypair activitypairnight"} onClick={welcomeagain}>
              <HomeIcon className={themer ? 'activityicons' : "activityicons leftpnight"} fontSize='large' />
              <span className={themer ? 'activityname' : "activityname leftpnight"}>Home</span>
            </div>
          </li>

          <li className={(cursel == 'AddCircleIcon' || cursel == 'NotificationsNoneIcon' || cursel == 'LogoutIcon') ? 'leftpainitem' : currentselect == 'ExploreIcon' ? 'selectedcurrently leftpainitem' : 'leftpainitem '}>
            <div className={themer ? "activitypair" : "activitypair activitypairnight"} onClick={goexplore}>
              <ExploreIcon className={themer ? 'activityicons' : 'activityicons leftpnight'} fontSize='large' />
              <span className={themer ? 'activityname' : "activityname leftpnight"}>Explore</span>
            </div>
          </li>

          <li className={cursel == 'AddCircleIcon' ? 'selectedcurrently leftpainitem' : 'leftpainitem '}>
            <div className={themer ? "activitypair" : "activitypair activitypairnight"} onClick={postcreator}>
              <AddCircleIcon className={themer ? 'activityicons' : "activityicons leftpnight"} fontSize='large' ></AddCircleIcon>
              <span className={themer ? 'activityname' : "activityname leftpnight"}>Create</span>
            </div>
          </li>

          <li className={cursel == 'NotificationsNoneIcon' ? 'selectedcurrently leftpainitem' : 'leftpainitem '}>
            <div id="notifact" className={themer ? "activitypair" : "activitypair activitypairnight"} onClick={slidenotifbar}>

              {newnotifs > 0 &&
                <>
                  <ThemeProvider theme={theme}>
                    {isnotif && <CircleIcon id="notifactredcircle" className={parent != 'explore' ? "fornotifs" : "fornotifsresize"} color="primary" fontSize='medium'></CircleIcon>}
                  </ThemeProvider>
                  {isnotif && <span id="notifactval" className={notifsval < 10 ? parent != 'explore' ? "counternotifs" : "counternotifsresize" : parent != 'explore' ? "counternotifsdouble" : "counternotifsdoubleresize"} >{newnotifs}</span>}
                </>
              }

              <button id='notifacticon' ><NotificationsNoneIcon className={themer ? 'activityicons' : 'activityicons leftpnight'} fontSize='large' /></button>
              <span className={themer ? 'activityname' : "activityname leftpnight"}>Notifications</span>
            </div>
          </li>

          <li className={cursel == 'LogoutIcon' ? 'selectedcurrently leftpainitem' : 'leftpainitem '}>
            <div className={themer ? "activitypair" : "activitypair activitypairnight"} onClick={userloggingout}>
              <LogoutIcon className={themer ? 'activityiconslg' : 'activityiconslg leftpnight'} fontSize='large' />
              <span className={themer ? 'activityname' : "activityname leftpnight"}>Log Out</span>
            </div>
          </li>

          <li className={(cursel == 'AddCircleIcon' || cursel == 'NotificationsNoneIcon' || cursel == 'LogoutIcon') ? 'leftpainitem' : currentselect == 'SettingsIcon' ? 'selectedcurrently leftpainitem' : 'leftpainitem '}>
            <div className={themer ? "activitypair" : "activitypair activitypairnight"} onClick={gotosettings}>
              <SettingsIcon className={themer ? 'activityiconslg' : 'activityiconslg leftpnight'} fontSize='large' />
              <span className={themer ? 'activityname' : "activityname leftpnight"}>Settings</span>
            </div>
          </li>

        </ul>
      </div>
    </>
  );
}

export default Leftpain;