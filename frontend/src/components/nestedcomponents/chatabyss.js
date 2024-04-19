
import "../../corecss/chatabyss.css";
import { format } from 'timeago.js';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import Shimmer from "../shimmer";


const Chatabyss = ({ onechat, own, ident, status, id, rec, pfpobj, finalseen, messages, setMessages, Currentchat, socket, setShddel, setTextdets, redisplaylane, setRedisplaylane, redselector, setRedselector, setNodel, goback, setGoback, groupdeletion, groupie, safeinherit, setMultiplelast, sempahore }) => {

    let [clicked, setClicked] = useState({});
    let [displaylane, setDisplaylane] = useState(null);
    let [noaccess, setNoaccess] = useState({});

    let curuser = useSelector((state) => { return state.youryr.value });
    let theme = useSelector((state) => { return state.themeyr.value });

    let bubbler = (id) => {

        setTimeout(() => {
            setClicked((prev) => ({ ...prev, [id]: true }));
            setNoaccess((prev) => ({ ...prev, [id]: true }));
        }, 1);

    }

     let url = "http://localhost:3001";
     //let url = "https://social-media-app-backend-final.onrender.com";

    let redzone = (id) => {

        setRedselector((prev) => {

            if (Object.keys(prev).includes(id)) {
                prev[id] = !prev[id];
                return { ...prev };
            } else {
                return { ...prev, [id]: true };
            }

        });

    }

    let del = (text) => {


        if (text.length == 1) {


            let isLast = false;
            if (text[0]._id === messages[messages.length - 1]._id) {
                isLast = true;
            }

            fetch(`${url}/messenger/delete/${text[0]._id}`, {
                method: 'DELETE',
                credentials: 'include'
            }).then((res) => {
                return res.json();
            }).then((data) => {

                fetch(`${url}/messenger/ex/${Currentchat._id}`, {
                    credentials: 'include'
                }).then((res) => {
                    return res.json();
                }).then((data) => {

                    let holtexts = data.filter((each) => each.holders.includes(curuser.userid));
                    setMessages(holtexts);
                    setShddel(true);
                    setTextdets({ msg: text[0], last: isLast });

                }).catch((err) => {
                    console.log(err);
                });

                const receiverid = Currentchat.members.find((elem) => elem !== curuser.userid);

                socket.current.emit('clienttextdel', {
                    receiverid,
                    convid: Currentchat._id
                });


            }).catch((err) => {
                console.log(err);
            })




        } else {


            safeinherit.current = { ...safeinherit.current, [text._id]: [true, messages.indexOf(text)] };

            let isLast = false;

            if (text._id === messages[messages.length - 1]._id) {

                isLast = true;

            }

            fetch(`${url}/messenger/delete/${text._id}`, {
                method: 'DELETE',
                credentials: 'include'
            }).then((res) => {
                return res.json();
            }).then((data) => {

                fetch(`${url}/messenger/ex/${Currentchat._id}`, {
                    credentials: 'include'
                }).then((res) => {
                    return res.json();
                }).then((data) => {

                    let holtexts = data.filter((each) => each.holders.includes(curuser.userid));

                    setMessages(holtexts);
                    setShddel(true);
                    setTextdets({ msg: text, last: isLast });

                }).catch((err) => {
                    console.log(err);
                });

                const receiverid = Currentchat.members.find((elem) => elem !== curuser.userid);

                socket.current.emit('clienttextdel', {
                    receiverid,
                    convid: Currentchat._id
                });



            }).catch((err) => {
                console.log(err);
            })

        }

    }

    let copytoclipboard = (copiedtext) => {
        navigator.clipboard.writeText(copiedtext);
        setDisplaylane(true);
    }

    useEffect(() => {
        const id = setTimeout(() => {
            setDisplaylane(null);
        }, 3000);

        return () => {
            clearTimeout(id)
        }

    }, [displaylane]);

    let cel = () => {

    }

    let selection = (text) => {

        setNoaccess({});
        setRedisplaylane(true);
        setRedselector((prev) => ({ ...prev, [text._id]: true }));
        setNodel(true);

    }

    useEffect(() => {

        if (goback) {

            setGoback(false);
            setNodel(false);
            setRedisplaylane(null);
            setRedselector({});
        }

    }, [goback]);


    useEffect(() => {

        if (groupdeletion && groupie) {

            let redarray = Object.keys(redselector);

            for (let i = 0; i < redarray.length; i++) {
                safeinherit.current = { ...safeinherit.current, [redarray[i]]: [true, messages.indexOf(messages.find((each) => each._id === redarray[i]))] };
            }

            if (redselector[messages[messages.length - 1]._id]) {
                setMultiplelast(true);
            }

            del([onechat]);

        }

    }, [groupdeletion]);



    useEffect(() => {


        let functionc = (e) => {
            if (!e.target.matches('.textoptions')) {
                setClicked({});
            }
        }

        document.addEventListener('click', functionc);

        return () => {
            document.removeEventListener('click', functionc);
        }


    });



    return (


        <>

            {onechat._id ?

                <>

                    <div className={own ? redselector[id] ? "reddisplay textabyss own" : displaylane ? "greendisplay textabyss own" : "textabyss own" : "textabyss"} >
                        <div className="textabyssupper">

                            {
                                sempahore

                                    ?

                                    !own && pfpobj[id] && <img className="abysspfp" alt="" src={ident != null ? ident.pfp : ' '}></img>

                                    :

                                    !own && pfpobj[id] && <div className="abysspfpskeleton"> <Shimmer></Shimmer></div>

                            }

                            <p className={onechat.thetext.length < 300 ? `themessager` : `thelongmessager`} onClick={own ? redisplaylane ? () => { redzone(id) } : () => { bubbler(id) } : console.log(" ")}>{onechat.thetext}</p>
                            {noaccess[id] && own && clicked[id] && <div className="textoptions right">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="currentColor" className="bi bi-trash3 delete" onClick={() => { del(onechat) }} viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                    </svg>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="currentColor" className="bi bi-files copy" onClick={() => { copytoclipboard(onechat.thetext) }} viewBox="0 0 16 16">
                                        <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z" />
                                    </svg>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="currentColor" className="bi bi-check-square select" onClick={() => { selection(onechat) }} viewBox="0 0 16 16">
                                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
                                    </svg>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="currentColor" className="bi bi-x cancel" onClick={cel} viewBox="0 0 16 16">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                </div>
                            </div>}
                            {displaylane && <p className="status">TEXT COPIED </p>}
                            {redselector[id] && redisplaylane && <p className="statusred">TEXT SELECTED </p>}
                            <p className={redselector[id] ? "redstamp" : theme ? "timestamp" : "timestamp timenight"}>{/^((?!seconds).)*$/.test(format(onechat?.createdAt)) ? format(onechat?.createdAt) : 'just now'}</p>
                        </div>

                        {(Object.keys(finalseen).length === 0 ? (status && id === rec && own) : (finalseen[id] && status && id === rec && own)) &&
                            <div className="textabysslower">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                </svg>
                            </div>}


                    </div>


                </>

                :

                <>

                    <div className={own ? redselector[id] ? "reddisplay textabyss own invisibility" : displaylane ? "greendisplay textabyss own invisibility" : "textabyss own invisibility" : "textabyss invisibility"} >
                        <div className="textabyssupper invisibility">
                            {!own && pfpobj[id] && <img className="abysspfp" alt="" src={ident != null ? ident.pfp : ' '}></img>}


                            <p className={onechat.thetext.length < 300 ? `themessage` : `thelongmessage`} onClick={own ? redisplaylane ? () => { redzone(id) } : () => { bubbler(id) } : console.log(" ")}>{onechat.thetext}</p>
                            {noaccess[id] && own && clicked[id] && <div className="textoptions right">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="currentColor" className="bi bi-trash3 delete" onClick={() => { del(onechat) }} viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                    </svg>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="currentColor" className="bi bi-files copy" onClick={() => { copytoclipboard(onechat.thetext) }} viewBox="0 0 16 16">
                                        <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z" />
                                    </svg>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="currentColor" className="bi bi-check-square select" onClick={() => { selection(onechat) }} viewBox="0 0 16 16">
                                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
                                    </svg>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="currentColor" className="bi bi-x cancel" onClick={cel} viewBox="0 0 16 16">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                </div>
                            </div>}
                            {displaylane && <p className="status">TEXT COPIED </p>}
                            {redselector[id] && redisplaylane && <p className="statusred">TEXT SELECTED </p>}
                            <p className={redselector[id] ? "redstamp" : "timestamp"}>{/^((?!seconds).)*$/.test(format(onechat?.createdAt)) ? format(onechat?.createdAt) : 'just now'}</p>
                        </div>

                        {(Object.keys(finalseen).length === 0 ? (status && id === rec && own) : (finalseen[id] && status && id === rec && own)) &&
                            <div className="textabysslower invisibility">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                </svg>
                            </div>}


                    </div>


                </>



            }

        </>


    );
}

export default Chatabyss;




