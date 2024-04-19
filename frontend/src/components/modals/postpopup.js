import ReactDom from 'react-dom';
import '../../corecss/postpopup.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Yesnomodal from './yesnomodal';
import { useNavigate } from 'react-router-dom';
import { nextrequested } from '../../features/nextrequested';
import { nextprofimgrequested } from '../../features/nextreqprofile';
import { currview } from '../../features/profile';

const Postpopup = ({ hider, trigger, data, comheartobj, type, extra }) => {

    let curuser = useSelector((state) => { return state.youryr.value });
    let theme = useSelector((state) => { return state.themeyr.value });

    let disp = useDispatch();
    let nav = useNavigate();

    let [postliked, setPostliked] = useState(data.isliked != undefined ? data.isliked : data.likes.map((each) => each.username).includes(curuser.usrn));
    let [curlikestate, setCurlikestate] = useState(data.likesnum);
    let [commentlikestate, setCommentlikestate] = useState(commentobj);
    let [commentred, setCommentred] = useState({});
    let [curcomment, setCurcomment] = useState(null);
    let [openyesno, setOpenyesno] = useState(false);
    let [delsuccess, setDelsuccess] = useState(false);

    let url = "http://localhost:3001";
    //let url = "https://social-media-app-backend-final.onrender.com";

    let commentobj = {};

    data.comments.map((each) => {
        commentobj[each._id] = each.numlikes;
    })

    const closemodal = () => {
        trigger(false);
    }

    const nextplease = () => {
        trigger(false);
        if (type == 'explore') {
            disp(nextrequested(true));
        } else if (type == 'profile') {
            disp(nextprofimgrequested(true));
        }
    }

    const prevplease = () => {
        trigger(false);
        if (type == 'explore') {
            disp(nextrequested(false));
        } else if (type == 'profile') {
            disp(nextprofimgrequested(false));
        }

    }


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
                    return `${days} DAY`
                }
                return `${days} DAYS`
            }
            return `${days}d`;
        } else if (hours != 0) {
            if (type == 'diff') {
                if (hours == 1) {
                    return `${days} HOUR`
                }
                return `${hours} HOURS`
            }
            return `${hours}h`;
        } else {
            if (type == 'diff') {
                if (minutes == 1) {
                    return `${days} MINUTE`
                }
                return `${minutes} MINUTES`
            }
            return `${minutes}m`;
        }



    }

    const likethepost = () => {


        setPostliked(!postliked);

        let newobj = {
            username: curuser.usrn,
            pfp: curuser.pfp,
            fullname: curuser.fullname
        }


        if (!postliked) {

            setCurlikestate(curlikestate + 1);

            fetch(`${url}/posts/liked/${data._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(newobj),
                credentials: 'include'
            })

            const newnotif =
            {
                username: curuser.usrn,
                type: "postlike",
                attachement: data.img,
                commentifany: null,
                pfp: curuser.pfp,
                fullname: curuser.fullname,
                reference: data._id

            };

            fetch(`${url}/notif/${data.username}`, {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(newnotif),
                credentials: 'include'
            })


            if (type == 'explore') {

                data.likes.push(newobj);
                data.likesnum += 1;

            }


            if (type == 'homepage') {


                extra.action[0][data._id]++;
                extra.actionperformer[0](extra.action[0]);

                let newobj = {
                    username: curuser.usrn,
                    pfp: curuser.pfp,
                    fullname: curuser.fullname
                }

                data.likes.push(newobj);
                data.likesnum += 1;


                extra.action[1][data._id] = true;
                extra.actionperformer[1](extra.action[1]);


            }


        } else {

            setCurlikestate(curlikestate - 1);

            fetch(`${url}/posts/unliked/${data._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(newobj),
                credentials: 'include'
            })

            const delnotif =
            {
                username: curuser.usrn,
                type: "postlikedel",
                attachement: data.img,
            };

            fetch(`${url}/notif/rem/${data.username}`, {
                method: 'DELETE',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(delnotif),
                credentials: 'include'
            })

            if (type == 'explore') {

                let newlikes = data.likes.filter((each) => each.username != curuser.usrn);
                data.likes = newlikes;

                data.likesnum -= 1;

            }

            if (type == 'homepage') {


                extra.action[0][data._id]--;
                extra.actionperformer[0](extra.action[0]);

                let newlikes = data.likes.filter((each) => each.username != curuser.usrn);
                data.likes = newlikes;

                data.likesnum -= 1;


                extra.action[1][data._id] = false;
                extra.actionperformer[1](extra.action[1]);



            }

        }

    }

    const commentliked = (key) => {

        if (commentred[key._id] || comheartobj[key._id]) {


            if (type == 'homepage' || type == "explore") {

                comheartobj[key._id] = false;


                const onevalarray = data.comments.filter((each) => each._id == key._id);
                onevalarray[0].numlikes -= 1;

            }

            setCommentred({ ...commentred, [key._id]: false });
            commentlikestate[key._id]--;
            setCommentlikestate(commentlikestate);


            let newobj = {

                liker: curuser.usrn,
                commenter: key.username,
                commentid: key._id

            }

            fetch(`${url}/posts/commentunlike/${data._id}`, {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(newobj),
                credentials: 'include'
            })

            const delnotif =
            {
                username: curuser.usrn,
                type: "commentlikedel",
                attachement: data.img,
                commentifany: key.thecomment
            };

            fetch(`${url}/notif/rem/${key.username}`, {
                method: 'DELETE',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(delnotif),
                credentials: 'include'
            })

        } else {


            if (type == 'homepage' || type == "explore") {

                comheartobj[key._id] = true;


                const onevalarray = data.comments.filter((each) => each._id == key._id);
                onevalarray[0].numlikes += 1;

            }



            setCommentred({ ...commentred, [key._id]: true });
            commentlikestate[key._id]++;
            setCommentlikestate(commentlikestate);

            let newobj = {

                liker: curuser.usrn,
                commenter: key.username,
                commentid: key._id

            }

            fetch(`${url}/posts/commentlike/${data._id}`, {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(newobj),
                credentials: 'include'
            })

            const newnotif =
            {
                username: curuser.usrn,
                pfp: curuser.pfp,
                fullname: curuser.fullname,
                type: "commentlike",
                attachement: data.img,
                commentifany: key.thecomment,
                reference: data._id
            };

            fetch(`${url}/notif/${key.username}`, {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(newnotif),
                credentials: 'include'
            })

        }

    }

    const capturechange = (e) => {
        setCurcomment(e.target.value);
    }


    const commentsender = async (e) => {


        if (type == 'homepage') {

            extra.action[2][data._id]++;
            extra.actionperformer[2](extra.action[2]);

        }

        let newid = uuidv4()

        const newcomment = {
            username: curuser.usrn,
            pfp: curuser.pfp,
            thecomment: curcomment,
            _id: newid
        }

        if (type == 'homepage') {

            data.comments.unshift({
                username: curuser.usrn,
                pfp: curuser.pfp,
                thecomment: curcomment,
                _id: newid,
                timeposted: new Date(),
                numlikes: 0,
                likes: [],
            })

            commentlikestate[newid] = 0;
            setCommentlikestate(commentlikestate);

        }

        if (type == 'explore' || type == 'profile') {

            data.comments.unshift({
                username: curuser.usrn,
                pfp: curuser.pfp,
                thecomment: curcomment,
                _id: newid,
                timeposted: new Date(),
                numlikes: 0,
                likes: [],
            })

        }

        await fetch(`${url}/posts/addcomment/${data._id}`, {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(newcomment),
            credentials: 'include'
        })

        setCurcomment("");
        let newnotif = {
            username: curuser.usrn,
            pfp: curuser.pfp,
            fullname: curuser.fullname,
            type: 'commented',
            attachement: data.img,
            commentifany: curcomment,
            reference: data._id
        }

        await fetch(`${url}/notif/${data.username}`, {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(newnotif),
            credentials: 'include'
        })


    }

    const deletepost = () => {

        setOpenyesno(true);


    }

    if (delsuccess) {
        trigger(false);
        extra.deleter(false);
    }


    const profileviewer = (username) => {

        disp(currview(username));
        nav(`/profile/${username}`);

    }

    return ReactDom.createPortal(
        <>


            <div className='blurremain'></div>

            {(hider == "leftlim" || hider == true) && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle-fill rightmover" viewBox="0 0 16 16" onClick={nextplease}>
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>}
            {(hider == "rightlim" || hider == true) && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle-fill leftmover" viewBox="0 0 16 16" onClick={prevplease}>
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
            </svg>}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x undopopup" viewBox="0 0 16 16" onClick={closemodal}>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>

            {openyesno && <Yesnomodal trigger={setOpenyesno} text={'this post'} bold={'Delete'} extra={{ purpose: "delpost", thepost: data, curuser, setDelsuccess }} />}

            <div className='postmodal'>
                <div className='postsection'>
                    <img src={data.img} alt=" " className='bigpost'></img>
                </div>
                <div className={theme ? 'postdetssection' : "postdetssection postdetssectionnight"}>

                    <div className="listdiv">
                        <span className={theme ? "listusername" : "listusername nighttextpost"} onClick={() => { profileviewer(data.username) }}>{data.username}</span>

                        <img className="listpfp" src={data.pfp} onClick={() => { profileviewer(data.username) }} ></img>

                        {curuser.usrn == data.username && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 delpost" onClick={deletepost}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        }

                    </div>

                    <hr className='viewpostruler'></hr>

                    <div className='secuserinp'>

                        <div className='commentsection'>

                            <ul className="allcomments">
                                <li className="eachcomment">
                                    <div className='uppercom'>


                                        <img className="compfp" src={data.pfp} onClick={() => { profileviewer(data.username) }}></img>

                                        <div className='onlycom'>
                                            <p className={theme ? "comandusername" : "comandusername nighttextpost"} onClick={() => { profileviewer(data.username) }}><span> <b>{data.username}</b> {data.desc}</span></p>
                                            <div className='likeandtime'>
                                                <span className='whenpostedbyuser'>{datedifffinder(data.createdAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>




                                {data.comments.map((each) => (

                                    <li className="eachcomment" key={each._id}>
                                        <div className='uppercom'>
                                            <img className="compfp" src={each.pfp} onClick={() => { profileviewer(each.username) }}></img>

                                            <div className='onlycom'>
                                                <p className={theme ? "comandusername" : "comandusername nighttextpost"} onClick={() => { profileviewer(each.username) }} ><span> <b>{each.username} </b>{each.thecomment}</span></p>
                                                <div className='likeandtime'>

                                                    {
                                                        commentlikestate[each._id] == 1
                                                            ?
                                                            <span className='comlike'>{commentlikestate[each._id]} like</span>
                                                            :
                                                            <span className='comlike'>{commentlikestate[each._id]} likes</span>
                                                    }

                                                    <span className='whenposted'>{datedifffinder(each.timeposted)}</span>
                                                </div>
                                            </div>


                                            <div className='heartdiv'>

                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" className={comheartobj[each._id] ? "w-6 h-6 comlikerred" : commentred[each._id] ? "w-6 h-6 comlikerred" : theme ? "w-6 h-6 comliker" : "w-6 h-6 comliker comlikernight"} onClick={() => { commentliked(each) }}>
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                </svg>

                                            </div>
                                        </div>



                                    </li>

                                ))}

                            </ul>
                        </div>


                        <div className={theme ? 'yourinput' : 'yourinput yourinputnight'}>

                            <hr className='inpruler'></hr>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={postliked ? "w-6 h-6 comlikerinpred" : theme ? "w-6 h-6 comlikerinp" : "w-6 h-6 comlikerinp comlikerinpnight"} onClick={likethepost}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>

                            {
                                curlikestate == 1
                                    ?
                                    <span className={theme ? 'likecounterpopup' : "likecounterpopup nighttextpost"}>{curlikestate} like</span>
                                    :
                                    <span className={theme ? 'likecounterpopup' : "likecounterpopup nighttextpost"}>{curlikestate} likes</span>
                            }

                            <span className='timeagopopup'>{datedifffinder({ date: data.createdAt, type: 'diff' })} AGO</span>
                            <hr className='inprulertwo'></hr>
                            <input type='text' value={curcomment} placeholder='Add a comment...' className={theme ? 'commentadderpopup' : "commentadderpopup commentadderpopupnight"} onChange={(e) => { capturechange(e) }} />
                            <button className='commentpostbut' onClick={(e) => { commentsender(e) }}>POST</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
        , document.getElementById('portal')
    );
}

export default Postpopup;