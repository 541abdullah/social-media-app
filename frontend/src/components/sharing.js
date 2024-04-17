import "../corecss/homepagefeed.css";
import "../corecss/welcomepage.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCommentIcon from '@mui/icons-material/AddComment';
import TelegramIcon from '@mui/icons-material/Telegram';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { red } from '@mui/material/colors';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import dateFormat from "dateformat";
import Postpopup from "./modals/postpopup";
import { v4 as uuidv4 } from 'uuid';
import { followunfollowobj } from "../features/followunfollow";
import { currview } from '../features/profile';


const Share = ({ refer }) => {



    let samplee = useSelector((state) => { return state.followyr.value });
    let themer = useSelector((state) => { return state.themeyr.value });
    let curuser = useSelector((state) => { return state.youryr.value });

    let disp = useDispatch();
    let nav = useNavigate();

    useEffect(() => {

        setIsrequested(samplee.isrequested);
        setCancelreq(samplee.cancelreq);

    }, [samplee])

    let [following, setFollowing] = useState({});
    let [wannacomment, setWannacomment] = useState({});
    let [isrequested, setIsrequested] = useState({});
    let [cancelreq, setCancelreq] = useState({});
    let [sample, setSample] = useState(false);
    let [currentposts, setCurrentposts] = useState([]);
    let [skipval, setSkipval] = useState(7);
    let [loader, setLoader] = useState(null);
    let [curlikestate, setCurlikestate] = useState({});
    let [postlikestate, setPostlikestate] = useState({});
    let [alreadystate, setAlreadystate] = useState({});
    let [bigopen, setBigopen] = useState(null);
    let [curcomment, setCurcomment] = useState({});
    let [commentnumstate, setCommentnumstate] = useState({});
    let [pusher, setPusher] = useState(null);

    let commentheartobj = useRef({});
    let whichone = useRef(null);
    let doublstopper = useRef(1);
    let scrollstopper = useRef(1);
    let lastloader = useRef(1);


    useEffect(() => {


        async function initialtop() {

            const result = await fetch(`http://localhost:3001/posts/nextseven/${curuser.usrn}?skip=0`, {
                credentials: 'include',
            })

            const data = await result.json();
            const redobj = {};
            const already = {};
            const numofcom = {};


            data.map((each) => {

                curuser.following.map((eachlet) => {
                    if (eachlet == each.userid) {
                        setFollowing((prev) => ({ ...prev, [each.userid]: true }));
                    }
                })

                redobj[each._id] = each.likesnum;
                if (each.likes.map((eachlet) => eachlet.username).includes(curuser.usrn)) {
                    already[each._id] = true;
                }

                commentheartobj.current[each._id] = {};
                each.comments.map((eachlet) => {

                    if (eachlet.likes.includes((curuser.usrn))) {
                        commentheartobj.current[each._id][eachlet._id] = true;
                    }

                })

                numofcom[each._id] = each.comments.length;

            })

            setCurlikestate({ ...curlikestate, ...redobj });
            setAlreadystate({ ...alreadystate, ...already });
            setCommentnumstate({ ...commentnumstate, ...numofcom });


            for (let i = data.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [data[i], data[j]] = [data[j], data[i]];
            }

            setCurrentposts(data);

        }

        initialtop();

    }, [])

    const fetchData = useCallback(async () => {

        const result = await fetch(`http://localhost:3001/posts/nextseven/${curuser.usrn}?skip=${skipval}`, {
            credentials: 'include',
        })

        const data = await result.json();

        const redobj = {};
        const already = {};
        const numofcom = {};

        data.map((each) => {

            curuser.following.map((eachlet) => {
                if (eachlet == each.userid) {
                    setFollowing((prev) => ({ ...prev, [each.userid]: true }));
                }
            })

            redobj[each._id] = each.likesnum;
            if (each.likes.map((eachlet) => eachlet.username).includes(curuser.usrn)) {
                already[each._id] = true;
            }

            commentheartobj.current[each._id] = {};

            each.comments.map((eachlet) => {

                if (eachlet.likes.includes((curuser.usrn))) {
                    commentheartobj.current[each._id][eachlet._id] = true;
                }

            })

            numofcom[each._id] = each.comments.length;

        })

        setCurlikestate((curlikestate) => {
            return { ...curlikestate, ...redobj }
        });
        setAlreadystate((alreadystate) => {
            return { ...alreadystate, ...already }
        });
        setCommentnumstate((commentnumstate) => {
            return { ...commentnumstate, ...numofcom }
        })

        if (data.length == 0) {
            setLoader(false);
        }

        scrollstopper.current = data.length;
        function shuffler(data) {

            for (let i = data.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [data[i], data[j]] = [data[j], data[i]];
            }


        }

        shuffler(data);
        setCurrentposts((currentposts) => [...currentposts, ...data]);

        setSkipval((skipval) => skipval + 7);
        setLoader(false);
        doublstopper.current = 1;

    }, [loader]);

    useEffect(() => {

        const handleScroll = () => {

            if (doublstopper.current == 1) {

                if (Math.abs(refer.scrollHeight - refer.clientHeight - refer.scrollTop) < 1) {
                    if (scrollstopper.current != 0) {

                        fetchData();
                        setLoader(true);
                        doublstopper.current = 0;

                    }
                    if (scrollstopper.current == 0) {

                        if (lastloader.current) {

                            setLoader(true);
                            lastloader.current = 0;
                            setTimeout(() => {
                                setLoader(false);
                            }, 3000);
                        }
                    }
                }
            }

        };


        if (refer != null) {


            refer.addEventListener("scroll", handleScroll);
            return () => {
                refer.removeEventListener("scroll", handleScroll);
            };

        }


    });



    // const theme = createTheme({
    //     palette: {
    //         primary: {
    //             main: '#fafafa',
    //         },
    //         secondary: red
    //     },
    // });

    const followtry = (each) => {

        fetch(`http://localhost:3001/users/follow/${each.username}`, {
            method: 'PUT',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ "username": curuser.usrn }),
            credentials: 'include'
        })


        const newnotif =
        {
            username: curuser.usrn,
            type: "followreq",
            attachement: null,
            commentifany: null,
            pfp: curuser.pfp,
            fullname: curuser.fullname,
            reference: null

        };

        fetch(`http://localhost:3001/notif/${each.username}`, {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(newnotif),
            credentials: 'include'
        })

        setIsrequested((prev) => ({ ...prev, [each.userid]: true }));
        setCancelreq((prev) => ({ ...prev, [each.userid]: true }));

    }


    useEffect(() => {

        disp(followunfollowobj({ isrequested: isrequested, cancelreq: cancelreq }));

    }, [isrequested])

    const requested = (each) => {


        const delnotif =
        {
            username: curuser.usrn,
            type: "followreqdel",

        };

        fetch(`http://localhost:3001/notif/rem/${each.username}`, {
            method: 'DELETE',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(delnotif),
            credentials: 'include'
        })


        fetch(`http://localhost:3001/users/followcancel/${each.username}`, {
            method: 'PUT',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ "username": curuser.usrn }),
            credentials: 'include'
        })


        setIsrequested((prev) => ({ ...prev, [each.userid]: false }));
        setCancelreq((prev) => ({ ...prev, [each.userid]: false }));

    }


    const postliked = (key) => {



        let newobj = {
            username: curuser.usrn,
            pfp: curuser.pfp,
            fullname: curuser.fullname
        }

        key.likes.push(newobj);
        key.likesnum += 1;

        if (postlikestate[key._id] || alreadystate[key._id]) {


            curlikestate[key._id]--;
            setCurlikestate(curlikestate);

            alreadystate[key._id] = false;
            setAlreadystate(alreadystate);

            setPostlikestate({ ...postlikestate, [key._id]: false })

            fetch(`http://localhost:3001/posts/unliked/${key._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(newobj),
                credentials: 'include'
            })

            const delnotif =
            {
                username: curuser.usrn,
                type: "postlikedel",
                attachement: key.img,
            };

            fetch(`http://localhost:3001/notif/rem/${key.username}`, {
                method: 'DELETE',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(delnotif),
                credentials: 'include'
            })

        } else {

            curlikestate[key._id]++;
            setCurlikestate(curlikestate);
            setPostlikestate({ ...postlikestate, [key._id]: true })

            fetch(`http://localhost:3001/posts/liked/${key._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(newobj),
                credentials: 'include'
            })

            const newnotif =
            {
                username: curuser.usrn,
                type: "postlike",
                attachement: key.img,
                commentifany: null,
                pfp: curuser.pfp,
                fullname: curuser.fullname,
                reference: key._id

            };

            fetch(`http://localhost:3001/notif/${key.username}`, {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(newnotif),
                credentials: 'include'
            })
        }

    }


    const popup = (key) => {

        setBigopen(true);
        whichone.current = { post: key, postid: key._id };
    }

    const capturechange = (e, key) => {
        curcomment[key] = e.target.value;
        setCurcomment({ ...curcomment });
    }


    const makecomment = (key) => {
        wannacomment[key] = true;
        setWannacomment({ ...wannacomment });
    }


    const commentsender = async (key) => {

        let newid = uuidv4();

        const newcomment = {
            username: curuser.usrn,
            pfp: curuser.pfp,
            thecomment: curcomment[key._id],
            _id: newid
        }

        key.comments.unshift({
            likes: [],
            numlikes: 0,
            pfp: curuser.pfp,
            thecomment: curcomment[key._id],
            timeposted: new Date(),
            username: curuser.usrn,
            _id: newid
        })


        await fetch(`http://localhost:3001/posts/addcomment/${key._id}`, {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(newcomment),
            credentials: 'include'
        })

        let newnotif = {
            username: curuser.usrn,
            pfp: curuser.pfp,
            fullname: curuser.fullname,
            type: 'commented',
            attachement: key.img,
            commentifany: curcomment[key._id],
            reference: key._id
        }

        curcomment[key._id] = "";
        setCurcomment({ ...curcomment });
        commentnumstate[key._id] += 1;
        setCommentnumstate({ ...commentnumstate });



        await fetch(`http://localhost:3001/notif/${key.username}`, {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(newnotif),
            credentials: 'include'
        })

    }

    const cancelcommentaction = (key) => {


        wannacomment[key] = false;
        setWannacomment(wannacomment);
        curcomment[key] = "";
        setCurcomment({ ...curcomment });

    }

    const viewprofile = (username) => {

        disp(currview(username));
        nav(`/profile/${username}`);

    }



    return (

        <>

            {bigopen && <Postpopup trigger={setBigopen} data={whichone.current.post} comheartobj={commentheartobj.current[whichone.current.postid]} type={'homepage'} extra={{ actionperformer: [setCurlikestate, setAlreadystate, setCommentnumstate, setPusher, setSample], action: [curlikestate, alreadystate, commentnumstate, null, sample] }}/*renderer={setSample} rendererval={sample} refresher={bigpreview}*/ />}

            {
                currentposts.map((each) => (

                    <div className={each.desc.length < 68 ? themer ? "sharecomp" : "sharecompnight" : themer ? 'sharecomplong' : 'sharecomplongnight'} key={each._id}>
                        <div className="sharecontainer">
                            <div className="shareheader">
                                <img className={themer ? "homepagefeedpfps" : "homepagefeedpfpsnight"} src={each.pfp} onClick={() => { viewprofile(each.username) }}></img>
                                <span className={themer ? "homepagefeedusername" : "homepagefeedusernamenight"} onClick={() => { viewprofile(each.username) }}>{each.username}</span>
                                {!following[each.userid] && <button className={cancelreq[each.userid] ? "blue_follow_buttonheadhidden" : "blue_follow_buttonhead"} onClick={() => { followtry(each) }}>Follow </button>}
                                {!following[each.userid] && <AddIcon className={cancelreq[each.userid] ? "justplusheadhidden" : "justplushead"} onClick={() => { followtry(each) }} />}
                                {!following[each.userid] && <button className={isrequested[each.userid] ? "silver_requested_buttonhead" : "silver_requested_buttonheadhidden"} onClick={() => { requested(each) }} >Requested </button>}
                            </div>

                            <div className="postcontainer">
                                <img className="thepost" src={each.img} alt="" onDoubleClick={() => { popup(each) }} ></img>
                            </div>


                            <div className="sharefooter">
                                <div className="shareoptions">
                                    <div className="shareoption">
                                        <FavoriteIcon fontSize="large" className={alreadystate[each._id] ? "likeiconrede" : postlikestate[each._id] ? "likeiconrede" : themer ? "likeicone" : "likeiconenight"} onClick={() => { postliked(each) }} />
                                    </div>
                                    <div className="shareoption">
                                        <AddCommentIcon fontSize="large" className={themer ? "commenticone" : "commenticonenight"} onClick={() => { makecomment(each._id) }} />
                                    </div>
                                    <div className="postdesc">
                                        <span className={themer ? "desce" : "descenight"}>{each.desc.length < 130 ? each.desc : `${each.desc.substring(0, 130)}...`}</span>
                                    </div>
                                    {curlikestate[each._id] != 1 && <span className={each.desc.length < 68 ? "numlikes" : "numlikeslong"}>{curlikestate[each._id]} likes</span>}
                                    {curlikestate[each._id] == 1 && <span className={each.desc.length < 68 ? "numlikes" : "numlikeslong"}>{curlikestate[each._id]} like</span>}
                                    <span className={commentnumstate[each._id] == 0 ? each.desc.length < 68 ? "numcommentszero" : "numcommentszerolong" : each.desc.length < 68 ? "numcomments" : "numcommentslong"} onClick={() => { popup(each) }}>{commentnumstate[each._id] == 0 ? "No comments" : commentnumstate[each._id] == 1 ? ' view 1 comment' : `View all ${commentnumstate[each._id]} comments`}</span>
                                    <span className={each.desc.length < 68 ? "dateposted" : "datepostedlong"}>{dateFormat(each.createdAt).substring(4, 15)}</span>

                                    <input value={curcomment[each._id]} type="text" className={wannacomment[each._id] ? themer ? "addcomment" : "addcommentnight" : "addcommenthidden"} placeholder="Add a comment..." onChange={(e) => { capturechange(e, each._id) }} />

                                    <TelegramIcon fontSize="large" className={wannacomment[each._id] ? "sendericon" : "sendericonhidden"} onClick={() => { commentsender(each) }} />

                                    <CloseIcon fontSize="large" className={wannacomment[each._id] ? "cancelcommenticon" : "cancelcommenticonhidden"} onClick={() => { cancelcommentaction(each._id) }} />

                                </div>
                            </div>
                        </div>
                    </div>

                ))
            }

            {loader && <div className='loadingmoreposts'></div>}

        </>

    );
}


export default Share;