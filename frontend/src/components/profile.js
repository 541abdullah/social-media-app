
import Leftpain from "./leftpain";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import '../corecss/profile.css';
import Header from './header.js';
import "../corecss/welcomepage.css";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import GridOnIcon from '@mui/icons-material/GridOn';
import { useEffect, useState, useRef } from 'react';
import Yesnomodal from "./modals/yesnomodal";
import Optmodal from "./modals/optionsmodal";
import Blockedmodal from "./modals/blockedmodal";
import { yoursets } from '../features/you'
import { useNavigate } from 'react-router-dom';
import Postpopup from "./modals/postpopup";
import { totstories } from '../features/storydata';
import Ffmodal from "./modals/ffmodal";
import { nextprofimgrequested } from "../features/nextreqprofile.js";
import { leftpsets } from '../features/leftp';
import Createmodal from './modals/createpostmodal';
import Shimmer from "./shimmer.js";
import { currview } from '../features/profile';



const Profile = () => {

    let [persondets, setPersonsdets] = useState(null);
    let [thinfollowers, setThinfollowers] = useState([]);
    let [thinfollowing, setThinfollowing] = useState([]);
    let [asktofollow, setAsktofollow] = useState(null);
    let [cancreq, setCancreq] = useState(false);
    let [allpostarray, setAllpostarray] = useState([]);
    let [openaccopts, setOpenaccopts] = useState(false);
    let [sample, setSample] = useState(false);
    let [prevopen, setPrevopen] = useState(false);
    let [postobj, setPostobj] = useState({});
    let [followersclicked, setFollowersclicked] = useState(false);
    let [followingclicked, setFollowingclicked] = useState(false);
    let [deletetrue, setDeletetrue] = useState(false);
    let [limiter, setLimiter] = useState(true);
    let [iscreate, setIscreate] = useState(false);
    let [theirfriend, setTheirfriend] = useState(false);

    let commentheartobj = useRef({});
    let curview = useRef({});
    let doneonce = useRef(true);
    let previouscur = useRef(null);

    let disp = useDispatch();
    let nav = useNavigate();

    let nextrequestedprofimg = useSelector((state) => { return state.nextprofimgyr.value });
    let newpost = useSelector((state) => { return state.newpostadder.value });
    let theme = useSelector((state) => { return state.themeyr.value });
    let curuser = useSelector((state) => { return state.youryr.value });
    let viewperson = useSelector((state) => { return state.profdat.value });
    const notifprofile = useSelector((state) => { return state.notifprofilevisit.value });
    const currentprofview = useSelector((state) => { return state.profdat.value });


    //let url = "http://localhost:3001";
    let url = "https://social-media-app-backend-final.onrender.com";

    useEffect(() => {

        if (nextrequestedprofimg) {

            disp(nextprofimgrequested(null));
            let allpostmap = allpostarray.map((each) => each._id);
            let idx = allpostmap.indexOf(curview.current._id);
            bigpreview(allpostarray[idx + 1]);


        } else if (nextrequestedprofimg == false) {

            disp(nextprofimgrequested(null));
            let allpostmap = allpostarray.map((each) => each._id);
            let idx = allpostmap.indexOf(curview.current._id);
            bigpreview(allpostarray[idx - 1]);
        }

    })



    useEffect(() => {

        async function detgetter() {

            const result = await fetch(`${url}/users/visit/${viewperson}/${curuser.usrn}`, {
                credentials: 'include'
            })

            const data = await result.json();
            setPersonsdets(data);
            doneonce.current = true;
            previouscur.current = data.username;

            setThinfollowers(data.followers.map((each) => each.username));
            setThinfollowing(data.following.map((each) => each.username));

        }

        detgetter();



        async function postfinder() {

            const result = await fetch(`${url}/posts/getallposts/${viewperson}`, {
                credentials: 'include'
            })

            const data = await result.json();
            setAllpostarray(data);

        }

        postfinder();


        async function refresher() {


            const result = await fetch(`${url}/welcome`, {
                credentials: 'include'
            })

            const data = await result.json();

            if (data !== 'auth failed') {
                const newobj = {
                    pfp: data.profpic,
                    usrn: data.username,
                    email: data.emailID,
                    fullname: data.fname,
                    userid: data.userid,
                    following: data.following,
                    blocked: data.blocklist,
                    story: data.story,
                    acctype: data.acctype
                };
                disp(yoursets(newobj));
            }
            else {
                nav('/', { replace: true });
            }

        }

        refresher();


        async function alreadyreq() {

            const result = await fetch(`${url}/notif/alreadyreqd/${viewperson}/${curuser.usrn}`, {
                credentials: 'include'
            })

            const data = await result.json();
            setAsktofollow(data);

        }

        alreadyreq();


    }, [openaccopts, sample, prevopen, theirfriend, notifprofile, newpost, currentprofview])


    const followclicked = async () => {

        fetch(`${url}/users/follow/${viewperson}`, {
            method: 'PUT',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ "username": curuser.usrn }),
            credentials: 'include'
        })


        setAsktofollow(true);


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

        fetch(`${url}/notif/${viewperson}`, {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(newnotif),
            credentials: 'include'
        })

    }

    const cancelfollowclicked = async () => {

        setCancreq(true);

        const delnotif =
        {
            username: curuser.usrn,
            type: "followreqdel",

        };

        fetch(`${url}/notif/rem/${viewperson}`, {
            method: 'DELETE',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(delnotif),
            credentials: 'include'
        })


        fetch(`${url}/users/followcancel/${viewperson}`, {
            method: 'PUT',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ "username": curuser.usrn }),
            credentials: 'include'
        })

    }

    const profileopts = () => {

        setOpenaccopts(true);

    }

    const optionsarraymaker = () => {

        let currentarray = [];

        if (curuser.usrn != persondets.username) {

            currentarray = ['Report', 'Block'];

            if (thinfollowers.includes(curuser.usrn)) {
                currentarray.push('Unfollow');
            }

            if (thinfollowing.includes(curuser.usrn)) {
                currentarray.push('Remove follower');
            }

        } else {

            currentarray = ['Delete Account'];

        }

        return currentarray;

    }

    const specialmaker = () => {

        let currentarray = [];
        if (curuser.usrn != persondets.username) {

            currentarray = ['Block'];

            if (thinfollowers.includes(curuser.usrn)) {
                currentarray.push('Unfollow');
            }

            if (thinfollowing.includes(curuser.usrn)) {
                currentarray.push('Remove follower');
            }

        } else {

            currentarray = ['Delete Account'];

        }

        return currentarray;
    }


    const bigpreview = (each) => {
        curview.current = each;

        if (allpostarray[0]._id == each._id) {
            setLimiter("leftlim");
        } else if (allpostarray[allpostarray.length - 1]._id == each._id) {
            setLimiter("rightlim");
        } else {
            setLimiter(true);
        }

        let thinlikes = each.likes.map((each) => each.username);
        if (thinlikes.includes(curuser.usrn)) {
            each.isliked = true;
        } else {
            each.isliked = false;
        }

        each.comments.map((eachlet) => {

            if (eachlet.likes.includes((curuser.usrn))) {
                commentheartobj.current[eachlet._id] = true;
            }

        })

        setPrevopen(true);
        each.username = viewperson;
        setPostobj(each);

    }

    const showfollowers = () => {
        setFollowersclicked(true)
    }

    const showfollowing = () => {
        setFollowingclicked(true)
    }

    const singlestory = () => {


        let iscolorful = [];

        if (persondets.storyseen.includes(curuser.usrn)) {
            iscolorful.push(true);
        } else {
            iscolorful.push(false);
        }

        let pvttotal = 0;

        let stor = persondets.storycontent.map((each) => {
            let newobj = {
                img: each.thepost,
                time: each.timeposted,
                type: each.type
            }

            if (each.type === 'private') {
                pvttotal++;
            }

            return newobj;
        });

        if (persondets.username == curuser.usrn && persondets.story == false) {
            return;
        }


        if (pvttotal != persondets.storycontent.length || persondets.username == curuser.usrn || thinfollowers.includes(curuser.usrn)) {


            let totalstory = [
                {
                    name: persondets.username,
                    pfp: persondets.profpic,
                    thepost: stor,
                    num: persondets.storycontent.length
                }
            ]


            let trimarr = [[persondets.profpic, persondets.username, 0]];

            const collection = {
                iscolorful,
                totalstory,
                trimarr,
                followers: persondets.followers
            }

            disp(totstories(collection));

            let type = 'single';

            if (curuser.usrn == persondets.username) {

                let self = 'own';
                nav(`/stories/${persondets.username}/${type}/${self}`);

            } else {

                let self = 'none';
                nav(`/stories/${persondets.username}/${type}/${self}`);
            }


        }


    }

    const textsetter = () => {

        nav(`/messenger/outsider/${persondets._id}`);

    }


    const editownprofile = () => {
        disp(leftpsets('SettingsIcon'));
        nav(`/settings/${curuser.usrn}`);
    }

    const seerecommendations = () => {

        nav('/welcome');
        disp(leftpsets('HomeIcon'));

    }

    const postmodal = () => {

        setIscreate(true);

    }

    window.addEventListener('popstate', function () {

        if (doneonce.current && previouscur.current != window.location.href.substring(30)) {

            setTheirfriend(!theirfriend);
            setPersonsdets(null);
            disp(currview(window.location.href.substring(30)));
            doneonce.current = false;

        }

    })




    return (

        <>


            {iscreate && <Createmodal trigger={setIscreate} extra={null} />}

            <Header caller={'profile'} extra={{ setPersonsdets: setPersonsdets, current: persondets?.username }} />

            {followersclicked && <Ffmodal trigger={setFollowersclicked} visit={setTheirfriend} visitval={theirfriend} heading={'Followers'} array={persondets ? persondets.followers : []} setPersondets={setPersonsdets} />}

            {followingclicked && <Ffmodal trigger={setFollowingclicked} visit={setTheirfriend} visitval={theirfriend} heading={'Following'} array={persondets ? persondets.following : []} setPersondets={setPersonsdets} />}

            {prevopen && <Postpopup hider={limiter} trigger={setPrevopen} data={postobj} comheartobj={commentheartobj.current} type={'profile'} extra={{ deleter: setDeletetrue }} /*renderer={setSample} rendererval={sample} refresher={bigpreview}*/ />}

            {cancreq && <Yesnomodal trigger={setCancreq} text={`Do you want to cancel follow request to`} bold={`${viewperson}`} extra={{ viewperson, setAsktofollow, curuser, purpose: "cancelreq" }} />}


            {openaccopts && <Optmodal trigger={setOpenaccopts} contplayer={null} optionsarray={optionsarraymaker()} special={specialmaker()} action={{ purpose: "profile", viewperson }} />}


            <div className={theme ? "mainprofilediv" : "mainprofiledivnight"}>

                <div className="leftpainprof">
                    <Leftpain parent={'explore'} />
                </div>


                {curuser.blocked.includes(viewperson) && <Blockedmodal text={"You have blocked"} doer={curuser.usrn} other={viewperson} extra={{ action: setSample, curstate: sample }} />}

                {persondets ? persondets.blocklist.includes(curuser.usrn) && <Blockedmodal text={"has blocked you"} doer={viewperson} other={curuser.usrn} extra={null} /> : ''}



                <div className="profilemain">
                    {
                        persondets

                            ?

                            <img className={persondets ? curuser.usrn != persondets.username ? persondets.story ? persondets.storyseen.includes(curuser.usrn) ? "bigprofile" : theme ? "bigprofilenew" : "bigprofilenewnight" : "bigprofile" : curuser.story ? theme ? 'bigprofilenew' : "bigprofilenewnight" : 'bigprofile' : ''} src={persondets ? persondets.profpic : ''} alt="" onClick={singlestory}></img>

                            :

                            <div className="profilepfpskeleton">
                                <Shimmer></Shimmer>
                            </div>
                    }

                    <div className="writtendets">
                        <div className="maintopdiv">
                            {

                                persondets

                                    ?

                                    <span className={theme ? "mainusername" : "mainusernamenight"}>{persondets ? persondets.username : " "}</span>

                                    :

                                    <div className="profileusernameskeleton">
                                        <Shimmer></Shimmer>
                                    </div>


                            }


                            {

                                persondets

                                    ?

                                    thinfollowers.includes(curuser.usrn)

                                        ?

                                        <div className="followingtick">
                                            <button className="mainfollowing">Following</button>
                                            <CheckIcon className="maincheck" />
                                        </div>

                                        :

                                        asktofollow

                                            ?

                                            <button className="mainrequested" onClick={cancelfollowclicked}>Requested</button>


                                            :


                                            persondets.username != curuser.usrn

                                                ?

                                                <div className="followplus">
                                                    <button className="mainfollow" onClick={followclicked}>Follow</button>
                                                    <AddIcon className="mainplus" />
                                                </div>

                                                :

                                                <div className="editprof">
                                                    <button className="editprofbut" onClick={() => { editownprofile() }}>Edit Profile</button>
                                                </div>


                                    :

                                    <div className="profilefbuttonskeleton">
                                        <Shimmer></Shimmer>
                                    </div>

                            }


                            <div className={persondets ? thinfollowers.includes(curuser.usrn) ? "messageprofoptions" : "bluemessageprofoptions" : ''}>

                                {persondets && (persondets?.username != curuser.usrn && (thinfollowers.includes(curuser.usrn) || persondets?.acctype == 'Public')) && <button className={persondets ? "mainmessage" : ''} onClick={textsetter} >Message</button>}
                                {persondets && <MoreHorizIcon className={persondets?.username != curuser.usrn ? (thinfollowers.includes(curuser.usrn) || persondets?.acctype == 'Public') ? theme ? "moreprofoptions" : "moreprofoptionsnight" : theme ? "moreprofoptionsnotincl" : "moreprofoptionsnotinclnight" : theme ? 'moreprofoptionsown' : "moreprofoptionsownnight"} onClick={profileopts} />}

                            </div>


                        </div>
                        <div className="userstats">
                            <span className={theme ? "postsnum" : "postsnumnight"}>{persondets ? persondets.postsnum : " "} <b>posts</b></span>
                            <span className={thinfollowers.includes(curuser.usrn) || persondets?.username == curuser.usrn || persondets?.acctype == "Public" ? theme ? "followingnumclick" : "followingnumclicknight" : theme ? "followingnum" : "followingnumnight"} onClick={thinfollowers.includes(curuser.usrn) || persondets?.username == curuser.usrn || persondets?.acctype == "Public" ? persondets?.following.length != 0 ? showfollowing : console.log('failed') : console.log('failed')} > {persondets ? persondets.following.length : " "} <b>following</b></span>
                            <span className={thinfollowers.includes(curuser.usrn) || persondets?.username == curuser.usrn || persondets?.acctype == "Public" ? theme ? "followernumclick" : "followernumclicknight" : theme ? "followernum" : "followernumnight"} onClick={thinfollowers.includes(curuser.usrn) || persondets?.username == curuser.usrn || persondets?.acctype == "Public" ? persondets?.followers.length != 0 ? showfollowers : console.log('failed') : console.log('failed')} > {persondets ? persondets.followers.length : " "} <b>followers</b></span>
                        </div>

                        <textarea className={theme ? "bio" : "bionight"} placeholder={persondets ? persondets.bio : " "} disabled></textarea>

                        {persondets && persondets.username != curuser.usrn

                            ?

                            persondets.mutualpeople.length != 0

                                ?

                                persondets.mutualpeople.length == 1

                                    ?


                                    <span className="mutuals">Followed by <b>{persondets.mutualpeople[0]}</b></span>


                                    :

                                    persondets.mutualpeople.length == 2

                                        ?

                                        <span className="mutuals">Followed by <b>{persondets.mutualpeople[0]}</b> and <b>{persondets.mutualpeople[1]}</b></span>


                                        :


                                        persondets.mutualpeople.length == 3

                                            ?

                                            <span className="mutuals">Followed by <b>{persondets.mutualpeople[0]}</b> and <b>{persondets.mutualpeople[1]}</b> and 1 other.</span>

                                            :


                                            <span className="mutuals">Followed by <b>{persondets.mutualpeople[0]}</b> and <b>{persondets.mutualpeople[1]}</b> and {persondets.mutualpeople.length - 2} others.</span>

                                :

                                ''

                            :

                            ''


                        }

                    </div>
                    <hr className="midseperator" />


                    {
                        persondets

                            ?


                            thinfollowers.includes(curuser.usrn) || persondets.username === curuser.usrn || persondets.acctype == "Public"

                                ?

                                persondets.postsnum != 0

                                    ?

                                    <div className="postgrid">
                                        <hr className="gridtop" />
                                        <div className="gridsymbol">
                                            <GridOnIcon className={theme ? "gridlogo" : "gridlogonight"} />
                                            <span className={theme ? "wordposts" : "wordpostsnight"}><b>POSTS</b></span>
                                        </div>

                                        <div className="thegrid">


                                            {

                                                allpostarray.map((each) => (

                                                    <div className="cell" onClick={() => { bigpreview(each) }}>
                                                        <div className="coverimg">

                                                            <span className="coverlikes"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 coverheart">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                            </svg><b>{each.likesnum}</b>
                                                            </span>

                                                            <span className="covercomments"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 coverbubble">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                                                            </svg><b>{each.comments.length}</b>
                                                            </span>

                                                        </div>
                                                        <img className="eachpost" src={each.img}></img>
                                                    </div>

                                                ))


                                            }


                                            <hr className="endseperator" />

                                            <div className="proffooter">
                                                <span className={theme ? "creds" : "credsnight"}>Instagram private ltd.</span>
                                                <span className="emptyspan"> </span>
                                            </div>


                                        </div>

                                    </div>

                                    :

                                    persondets.username !== curuser.usrn

                                        ?

                                        <div className="ifnoposts">
                                            <hr className="gridtop" />
                                            <div className="gridsymbol">
                                                <GridOnIcon className={theme ? "gridlogo" : "gridlogonight"} />
                                                <span className={theme ? "wordposts" : "wordpostsnight"}><b>POSTS</b></span>
                                            </div>
                                            <div className="nopostsyet">

                                                <div className="fallbacknoposts">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-ban noaccess" viewBox="0 0 16 16">
                                                        <path d="M15 8a6.973 6.973 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8ZM2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Z" />
                                                    </svg>

                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera failedcam" viewBox="0 0 16 16">
                                                        <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                                                        <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                                                    </svg>

                                                    <span className="nopoststatement">NO POSTS YET</span>


                                                </div>

                                                <hr className="endseperatorfb" />

                                                <div className="proffooter">
                                                    <span className={theme ? "creds" : "credsnight"}>Instagram private ltd.</span>
                                                    <span className="emptyspan"> </span>
                                                </div>

                                            </div>
                                        </div>



                                        :

                                        <div className="ifnoposts">
                                            <div className="activityblocks">

                                                <div className="activityscroller">

                                                    {curuser.pfp.substring(curuser.pfp.length - 20) === "e/de697917r3v3Xuv//Z" && <div className={theme ? "pfpact" : "pfpactnight"}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class={theme ? "bi bi-person-circle pfpplus" : "bi bi-person-circle pfpplus night"} viewBox="0 0 16 16">
                                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                                        </svg>
                                                        <span className={theme ? "pfpdesc" : "night pfpdesc"}>Add a profile picture!</span>
                                                        <button className="actbut" onClick={() => { editownprofile() }}>choose photo</button>
                                                    </div>}

                                                    {persondets.following.length == 0 && <div className={theme ? "pfpact" : "pfpactnight"}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class={theme ? "bi bi-people-fill followadd" : "bi bi-people-fill followadd night"} viewBox="0 0 16 16">
                                                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                                        </svg>
                                                        <span className={theme ? "followdesc" : "followdesc night"}>Follow someone!</span>
                                                        <button className="actbut" onClick={() => { seerecommendations() }}>Follow</button>
                                                    </div>}

                                                    {persondets.bio === "Hello, I'm new to Evil Instagram" && <div className={theme ? "pfpact" : "pfpactnight"}>

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class={theme ? "bi bi-pencil pennib" : "bi bi-pencil pennib night"} viewBox="0 0 16 16">
                                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={theme ? "bi bi-noise-reduction artisticcircle" : "bi bi-noise-reduction artisticcircle night"} viewBox="0 0 16 16">
                                                            <path d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm-1 1a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm-1 1a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm-1 1a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm-1 1a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm-1 1a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm-1 1a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm-1 1a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm1 1a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm.5-.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm1-1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm1-1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm1-1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm1-1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm1-1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm1-1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm-5 7a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm1.5-1.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm1-1a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm1-1a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm1-1a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm1-1a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm-3 5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm.5-.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm1-1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm1-1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" />
                                                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM1 8a7 7 0 0 1 12.83-3.875.5.5 0 1 0 .15.235c.131.214.251.437.359.667a.5.5 0 1 0 .359.932c.133.438.225.894.27 1.364a.5.5 0 1 0 .021.282 7.096 7.096 0 0 1-.091 1.592.5.5 0 1 0-.172.75 6.95 6.95 0 0 1-.418 1.091.5.5 0 0 0-.3.555 7.056 7.056 0 0 1-.296.454.499.499 0 0 0-.712.453c0 .111.036.214.098.297a6.99 6.99 0 0 1-.3.3.5.5 0 0 0-.75.614 7.056 7.056 0 0 1-.455.298.503.503 0 0 0-.555.3 6.95 6.95 0 0 1-1.092.417.5.5 0 1 0-.749.172 7.04 7.04 0 0 1-1.592.091.5.5 0 1 0-.282-.021 6.971 6.971 0 0 1-1.364-.27A.498.498 0 0 0 5.5 14a.5.5 0 0 0-.473.339 6.976 6.976 0 0 1-.668-.36A.499.499 0 0 0 5 13.5a.5.5 0 1 0-.875.33A6.993 6.993 0 0 1 1 8Z" />
                                                        </svg>
                                                        <span className={theme ? "biodesc" : "biodesc night"} >Make your profile descriptive!</span>
                                                        <button className="actbut" onClick={() => { editownprofile() }}>Add bio</button>
                                                    </div>}

                                                    <div className={theme ? "pfpact" : "pfpactnight"}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-square-heart-fill cameralove " viewBox="0 0 16 16">
                                                            <path d="M2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm6 3.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={theme ? "bi bi-camera2 camerabubble" : "bi bi-camera2 camerabubble night"} viewBox="0 0 16 16">
                                                            <path d="M5 8c0-1.657 2.343-3 4-3V4a4 4 0 0 0-4 4z" />
                                                            <path d="M12.318 3h2.015C15.253 3 16 3.746 16 4.667v6.666c0 .92-.746 1.667-1.667 1.667h-2.015A5.97 5.97 0 0 1 9 14a5.972 5.972 0 0 1-3.318-1H1.667C.747 13 0 12.254 0 11.333V4.667C0 3.747.746 3 1.667 3H2a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1h.682A5.97 5.97 0 0 1 9 2c1.227 0 2.367.368 3.318 1zM2 4.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0zM14 8A5 5 0 1 0 4 8a5 5 0 0 0 10 0z" />
                                                        </svg>
                                                        <span className={theme ? "cpostdesc" : "cpostdesc night"}>Create your first post!</span>
                                                        <button className="actbut" onClick={() => { postmodal() }} >create post</button>
                                                    </div>




                                                </div>

                                                <hr className="endseperatoract" />

                                                <div className="proffooter">
                                                    <span className={theme ? "creds" : "credsnight"}>Instagram private ltd.</span>
                                                    <span className="emptyspan"> </span>
                                                </div>

                                            </div>
                                        </div>


                                :


                                <div className="ifnoposts">
                                    <hr className="gridtop" />
                                    <div className="gridsymbol">
                                        <GridOnIcon className={theme ? "gridlogo" : "gridlogonight"} />
                                        <span className={theme ? "wordposts" : "wordpostsnight"}><b>POSTS</b></span>
                                    </div>
                                    <div className="nopostsyet">

                                        <div className="fallbacknoposts">


                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill-lock pvtacc" viewBox="0 0 16 16">
                                                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5v-1a1.9 1.9 0 0 1 .01-.2 4.49 4.49 0 0 1 1.534-3.693C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Zm7 0a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2Zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1Z" />
                                            </svg>

                                            <span className="pvtstatement">PRIVATE ACCOUNT</span>


                                        </div>

                                        <hr className="endseperatorfb" />

                                        <div className="proffooter">
                                            <span className={theme ? "creds" : "credsnight"}>Instagram private ltd.</span>
                                            <span className="emptyspan"> </span>
                                        </div>

                                    </div>
                                </div>



                            :

                            ''

                    }

                </div>

            </div>


        </>


    );
}

export default Profile;