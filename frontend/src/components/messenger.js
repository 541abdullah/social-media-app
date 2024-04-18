import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../corecss/messenger.css";
import Conversation from "./nestedcomponents/conversations";
import Chatabyss from "./nestedcomponents/chatabyss";
import Onlinechatters from "./nestedcomponents/onlinechatters";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import HomeIcon from '@mui/icons-material/Home';
import { currview } from '../features/profile';
import { leftpsets } from '../features/leftp';
import Shimmer from "./shimmer";



const Messenger = () => {


    let curuser = useSelector((state) => { return state.youryr.value });
    let theme = useSelector((state) => { return state.themeyr.value });


    let [istext, setIstext] = useState(false);
    let [conversations, setConversations] = useState([]);
    let [followfirst, setFollowfirst] = useState(false);
    let [messages, setMessages] = useState([]);
    let [Currentchat, setCurrentchat] = useState(null);
    let [newtext, setNewtext] = useState("");
    let [chatclicked, setChatclicked] = useState(false);
    let [onlusers, setOnlusers] = useState([]);
    let [arrivedtext, setArrivedtext] = useState(null);
    let [timearray, setTimearray] = useState([]);
    let [ident, setIdent] = useState(null);
    let [realcurchat, setRealcurchat] = useState([]);
    let [isscrollbar, setIsscrollbar] = useState(false);
    let [finalseenobj, setFinalseenobj] = useState({});
    let [pfpobj, setPfpobj] = useState({});
    let [viewer, setViewer] = useState(null);
    let [shddel, setShddel] = useState(false);
    let [textdets, setTextdets] = useState(null);
    let [loader, setLoader] = useState(false);
    let [info, setInfo] = useState(false);
    let [newmsg, setNewmsg] = useState(false);
    let [showfastscroll, setShowfastscroll] = useState(false);
    let [redisplaylane, setRedisplaylane] = useState(null);
    let [redselector, setRedselector] = useState({});
    let [updaterchatclicked, setUpdaterchatclicked] = useState(false);
    let [latestchat, setLatestchat] = useState({});
    let [rectext, setRectext] = useState(null);
    let [recsender, setRecsender] = useState(null);
    let [draft, setDraft] = useState(null);
    let [nodel, setNodel] = useState(false);
    let [goback, setGoback] = useState(false);
    let [groupdeletion, setGroupdeletion] = useState(false);
    let [multiplelast, setMultiplelast] = useState(false);
    let [someonetexted, setSomeonetexted] = useState(false);
    let [fromconv, setFromconv] = useState({});
    let [outsider, setOutsider] = useState({ verdict: false, data: null });
    let [onlchatclicked, setOnlchatclicked] = useState(false);

    let scrollref = useRef(null);
    let instantref = useRef(null);
    let dotref = useRef(null);
    let socket = useRef("");
    let timeref = useRef(null);
    let yarescroll = useRef(null);
    let seendiv = useRef(null);
    let ysone = useRef(null);
    let ystwo = useRef(null);
    let finalseenobjref = useRef(finalseenobj);
    let Currentchatref = useRef(Currentchat);
    let messagesref = useRef(messages);
    let realcurchatref = useRef(realcurchat);
    let realsent = useRef(false);
    let onelineref = useRef(null);
    let firstarray = useRef(null);
    let origord = useRef(null);
    let isontop = useRef(false);
    let verdict = useRef(false);
    let latestchatref = useRef(latestchat);
    let conversationsref = useRef(conversations);
    let redselectorref = useRef(redselector);
    let safeinherit = useRef({});
    let safeinheritval = useRef(9999999999);
    let counterinit = useRef(0);
    let counterfinal = useRef(0);
    let truechat = useRef(null);
    let onetimer = useRef(1);
    let initref = useRef([]);
    let skeletonsemaphore = useRef(false);

    let disp = useDispatch();

    //let url = "http://localhost:3001";
    let url = "https://social-media-app-backend-final.onrender.com";

    useEffect(() => {
        socket.current = io("ws://localhost:3002");

        socket.current.on("textserver", (data) => {

            if (Currentchatref.current?._id === data.converid) {

                fetch(`${url}/messenger/seen/` + data.saveID, {
                    credentials: 'include'
                }).then((res) => {
                    return res.json();
                }).then((data) => {

                }).catch((err) => {
                    console.log(err);
                });

            }

            setRealcurchat((prev) => {

                let newprev = prev.filter((each) => each !== data.converid);
                return newprev;

            });

            setLatestchat((prev) => {

                if (Currentchatref.current == null || !(data.converid == Currentchatref.current._id)) {
                    let newobj = latestchatref.current;
                    newobj[data.converid] = true;
                    return { ...newobj };
                }
                else {
                    let newobj = latestchatref.current;
                    newobj[data.converid] = false;
                    return { ...newobj };
                }
            });


            setConversations((prev) => {

                setFollowfirst(true);
                let temparr = conversationsref.current;
                let onevaluearr = temparr.filter((elem) => {
                    return elem._id === data.converid;
                })

                if (onevaluearr.length == 0) {

                    let newobj = {
                        _id: data.converid,
                        members: [curuser.userid, data.sender],
                        holders: [curuser.userid, data.sender]
                    };

                    temparr.unshift(newobj);
                    return [...temparr];

                } else {

                    let newarr = temparr.filter((elem) => {
                        return elem._id !== data.converid;
                    })
                    newarr.unshift(onevaluearr[0]);
                    return [...newarr];
                }


            });


            if (messagesref.current.length == 0) {

                setSomeonetexted(true);
            }
            else if (messagesref.current[0].conversationId !== data.converid) {

                setSomeonetexted(true);

            }
            else {

                setArrivedtext({
                    conversationId: data.converid,
                    sender: data.sender,
                    receiver: data.receiver,
                    thetext: data.recenttext,
                    createdAt: Date.now(),
                    status: data.status,
                    order: data.order,
                    holders: data.holders
                });

            }

            if (Currentchatref.current != null) {

                if (Currentchatref.current._id === data.curchat._id) {

                    for (let i = messagesref.current.length - 1; i >= 0; i--) {
                        if (messagesref.current[i]?.status == true) {

                            const receiverid = Currentchatref.current.members.find((elem) => elem !== curuser.userid);

                            fetch(`${url}/messenger/ex/` + Currentchatref.current._id, {
                                credentials: 'include'
                            }).then((res) => {
                                return res.json();
                            }).then((data) => {

                                messagesref.current = data;
                                socket.current.emit("clientseen", {
                                    receiverid,
                                    status: true,
                                    messagesREC: data,
                                    curchat: Currentchatref.current
                                });
                            }).catch((err) => {
                                console.log(err);
                            });
                            break;
                        }
                        else if (messagesref.current[i]?.sender !== curuser.userid) {

                            fetch(`${url}/messenger/seen/` + messagesref.current[i]?._id, {
                                credentials: 'include'
                            }).then((res) => {
                                return res.json();
                            }).then((data) => {

                            }).catch((err) => {
                                console.log(err);
                            });

                        }

                        const receiverid = Currentchatref.current.members.find((elem) => elem !== curuser.userid);

                        fetch(`${url}/messenger/ex/` + Currentchatref.current._id, {
                            credentials: 'include'
                        }).then((res) => {
                            return res.json();
                        }).then((data) => {

                            messagesref.current = data;
                            socket.current.emit("clientseen", {
                                receiverid,
                                status: true,
                                messagesREC: data,
                                curchat: Currentchatref.current
                            });
                        }).catch((err) => {
                            console.log(err);
                        });

                    }

                }

            }

            if (data.sender === curuser.userid) {
                timeref.current = true;
            }
            else {
                timeref.current = false;
            }
        });

        socket.current.on("servertypes", (data) => {


            if (data.status) {
                if (!realcurchatref.current.includes(data.curchat._id)) {
                    setRealcurchat((prev) => {
                        return [...prev, data.curchat._id];
                    });
                }
            } else if (!data.status) {
                if (realcurchatref.current.includes(data.curchat._id)) {
                    setRealcurchat((prev) => {

                        let newprev = prev.filter((each) => each !== data.curchat._id);
                        return newprev;

                    });
                }
            }


        });


        socket.current.on("serverseen", (data) => {

            let holtexs = data.messagesREC.filter((each) => {
                return each.holders.includes(curuser.userid);
            })

            let bitexts = data.messagesREC.filter((each) => {
                return each.holders.includes(curuser.userid);
            })

            bitexts[bitexts.length - 1].status = true;
            for (let i = bitexts.length - 1; i >= 0; i--) {
                if (finalseenobjref.current[bitexts[i]._id] == true) {
                    break;
                }
                else if (bitexts[i].sender === curuser.userid) {
                    setFinalseenobj((prev) => ({ ...prev, [bitexts[i]._id]: true }));
                }
            }

            setMessages(holtexs);
        });

        socket.current.on('servertextdel', (data) => {

            fetch(`${url}/messenger/ex/${data.convid}`, {
                credentials: 'include'
            }).then((res) => {
                return res.json();
            }).then((data) => {

                let holtexts = data.filter((each) => each.holders.includes(curuser.userid));
                setMessages(holtexts);

            }).catch((err) => {
                console.log(err);
            });


        });



        socket.current.on('serverdelchange', (data) => {

            fetch(`${url}/messenger/lineup/order/${curuser.userid}`, {
                credentials: 'include'
            }).then((res) => {
                return res.json();
            }).then((data) => {

                setConversations(data.convs.lineup);
                setFollowfirst(true);
                if (data.convs.unread != undefined) {
                    setLatestchat(data.convs.unread);
                }
            }).catch((err) => {
                console.log(err);
            })



        });


        socket.current.on('serveraddholder', (data) => {

            fetch(`${url}/messenger/lineupholder/${curuser.userid}`, {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ members: data.members, curchat: data.curchat }),
                credentials: 'include'
            }).then((res) => {
                return res.json();
            }).then((datum) => {
                setTimeout(() => {

                    setConversations((prev) => {
                        setFollowfirst(true);
                        let temparr = datum.lineup;
                        let onevaluearr = temparr.filter((elem) => {
                            return elem._id === data.curchat;
                        })
                        let newarr = temparr.filter((elem) => {
                            return elem._id !== data.curchat;
                        })

                        if (onevaluearr.length == 0) {

                            let newobj = {
                                _id: data.curchat,
                                members: data.members,
                                holders: data.members
                            };

                            newarr.unshift(newobj);
                            return [...newarr];

                        }
                        else {
                            newarr.unshift(onevaluearr[0]);
                            return [...newarr];
                        }

                    });

                }, 3000);


            }).catch((err) => {
                console.log(err);
            });

        });

        socket.current.on('serverchangetextnums', (datamain) => {

            let nevertexts = [];

            for (let i = datamain.nevermessages.length - 1; i >= 0; i--) {

                if (datamain.nevermessages[i].status === true) {
                    break;
                } else {
                    nevertexts.unshift(datamain.nevermessages[i]);
                }


            }

            if (nevertexts.length == datamain.nevermessages.length) {


                setConversations(() => {

                    setFollowfirst(true);

                    let newlineup = conversationsref.current.filter((each) => {
                        return each._id != datamain.convid;
                    })
                    return [...newlineup];

                })

                setLatestchat(() => {

                    let newunread = latestchatref.current;
                    delete newunread[datamain.convid];
                    return { ...newunread };

                })


                fetch(`${url}/messenger/lineup/checker/${curuser.userid}`, {
                    credentials: 'include'
                }).then((data) => {
                    return data.json();
                }).then((res) => {

                    let newlineup = res.lineup.filter((each) => each._id != datamain.convid);
                    delete res.unread[datamain.convid];

                    let newobj = {
                        lineup: newlineup,
                        unread: res.unread
                    }


                    fetch(`${url}/messenger/lineup/${curuser.userid}`, {
                        method: 'POST',
                        headers: { 'Content-Type': "application/json" },
                        body: JSON.stringify(newobj),
                        credentials: 'include'
                    }).then((data) => {
                        return data.json();
                    }).then((res) => {
                        console.log(res);
                    });


                })

                async function remconv() {


                    const response = await fetch(`${url}/messenger/delconv/${datamain.convid}`, {
                        method: 'DELETE',
                        credentials: 'include'
                    });

                    const ans = await response.json();

                };

                remconv();

                if (!datamain.nevermessages.length == 0) {

                    datamain.nevermessages.map((each) => {

                        each.receffected.map((lessereach) => {

                            fetch(`${url}/messenger/decrementer/${lessereach}`, {
                                method: 'POST',
                                headers: { 'Content-Type': "application/json" },
                                body: JSON.stringify({ id: [curuser.userid], brand: each.brand, user: 'receiver' }),
                                credentials: 'include'
                            }).then((res) => {
                                return res.json();
                            }).then((data) => {

                            }).catch((err) => {
                                console.log(err);
                            });

                        })


                    })

                }

            } else {

                setLatestchat(() => {


                    let newunread = latestchatref.current;
                    newunread[datamain.convid] = false;
                    return { ...newunread };

                })

                if (nevertexts.length != 0) {

                    setConversations(() => {

                        setFollowfirst(true);

                        let newlineup = conversationsref.current.filter((each) => {
                            return each._id != datamain.convid;
                        })

                        let onevaluearr = conversationsref.current.filter((each) => each._id === datamain.convid);
                        newlineup.splice(newlineup.length, 0, onevaluearr[0]);
                        return [...newlineup];

                    })

                    let helperarray = [];

                    for (let i = 0; i < nevertexts.length; i++) {

                        for (let j = 0; j < nevertexts[i].receffected.length; j++) {

                            helperarray.unshift(nevertexts[i].receffected[j]);

                        }
                    }

                    let otherarray = conversationsref.current.filter((each) => !helperarray.includes(each));
                    otherarray.map((each) => {

                        fetch(`${url}/messenger/decrementer/deltype${each}`, {
                            method: 'POST',
                            headers: { 'Content-Type': "application/json" },
                            body: JSON.stringify({ userid: curuser.userid }),
                            credentials: 'include'
                        }).then((res) => {
                            return res.json();
                        }).then((data) => {

                        }).catch((err) => {
                            console.log(err);
                        });

                    })

                    if (!nevertexts.length == 0) {

                        nevertexts.map((each) => {

                            each.receffected.map((lessereach) => {

                                fetch(`${url}/messenger/decrementer/${lessereach}`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': "application/json" },
                                    body: JSON.stringify({ id: [curuser.userid], brand: each.brand, user: 'receiver' }),
                                    credentials: 'include'
                                }).then((res) => {
                                    return res.json();
                                }).then((data) => {

                                }).catch((err) => {
                                    console.log(err);
                                });
                            })
                        })
                    }
                }



                setTimeout(() => {

                    fetch(`${url}/messenger/lineup/checker/${curuser.userid}`, {
                        credentials: 'include'
                    }).then((data) => {
                        return data.json();
                    }).then((res) => {

                        let conv = res.lineup.filter((each) => each._id == datamain.convid);
                        let one = conv[0];

                        const func = (elem) => elem == one
                        let index = res.lineup.findIndex(func);

                        if (one.holders.length == 0) {
                            one.holders.push(curuser.userid);
                        } else {

                            let newholder = one.holders.filter((each) => each != curuser.userid);
                            one.holders = newholder;

                        }

                        let newlineup = res.lineup;
                        newlineup[index] = one;

                        let newobj = {
                            lineup: newlineup,
                            unread: res.unread
                        }

                        fetch(`${url}/messenger/lineup/${curuser.userid}`, {
                            method: 'POST',
                            headers: { 'Content-Type': "application/json" },
                            body: JSON.stringify(newobj),
                            credentials: 'include'
                        }).then((data) => {
                            return data.json();
                        }).then((res) => {

                        });


                    })

                }, 2000);


            }


        });


        socket.current.on('newestdata', () => {

            if (updaterchatclicked) {

                setUpdaterchatclicked(false);

            } else {

                if (Currentchatref.current != null) {


                    fetch(`${url}/messenger/ex/${Currentchatref.current._id}`, {
                        credentials: 'include'
                    }).then((res) => {
                        return res.json();
                    }).then((data) => {

                        let holtexts = data.filter((each) => each.holders.includes(curuser.userid));
                        setMessages(holtexts);

                    }).catch((err) => {
                        console.log(err);
                    });

                    async function newestcurconv() {

                        const response = await fetch(`${url}/messenger/alreadyconv/checker`,
                            {
                                method: 'POST',
                                headers: { 'Content-Type': "application/json" },
                                body: JSON.stringify(Currentchatref.current.members),
                                credentials: 'include'
                            }
                        );

                        const verdict = await response.json();

                        if (verdict != null) {
                            if (Currentchatref.current._id === verdict._id) {
                                Currentchatref.current = verdict
                            }

                        }

                    }

                    newestcurconv();

                }

            }

        });


        let decider = window.location.href.substring(32)[0];

        if (decider[0] == 'o') {

            let outsiderid = window.location.href.substring(41);

            let newobj = {
                senderId: curuser.userid,
                receiverId: outsiderid,
            };

            fetch(`${url}/messenger/create`, {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(newobj),
                credentials: 'include'
            }).then((res) => {
                return res.json();
            }).then((datae) => {

                setCurrentchat(datae);
                setDraft(datae);


                fetch(`${url}/messenger/delconv/${datae._id}`, {
                    method: 'DELETE',
                    credentials: 'include'
                }).then((res) => {
                    return res.json();
                }).then((data) => {

                }).catch((err) => {
                    console.log(err);
                });

            }).catch((err) => {
                console.log(err);
            });

        }

    }, []);

    useEffect(() => {
        finalseenobjref.current = finalseenobj;
    }, [finalseenobj]);

    useEffect(() => {
        realcurchatref.current = realcurchat;
    }, [realcurchat]);


    useEffect(() => {


        if (someonetexted) {
            setSomeonetexted(false);

            if (Currentchatref.current != null) {

                const receiverid = Currentchatref.current.members.find((elem) => elem !== curuser.userid);

                fetch(`${url}/messenger/ex/${Currentchatref.current._id}`, {
                    credentials: 'include'
                }).then((res) => {
                    return res.json();
                }).then((data) => {

                    let holtexts = data.filter((each) => each.holders.includes(curuser.userid));
                    setMessages(holtexts);

                    socket.current.emit('clienttextdel', {
                        receiverid,
                        convid: Currentchatref.current._id
                    });

                }).catch((err) => {
                    console.log(err);
                });

            }

        }

    }, [someonetexted]);


    useEffect(() => {

        function remtyper(event) {
            if (!event.target.matches('.chatfield')) {

                const receiverid = Currentchat?.members.find((elem) => elem !== curuser.userid);

                socket.current.emit("clienttypes", {
                    dims: null,
                    status: false,
                    receiverid,
                    curchat: Currentchat
                });

            }
        }
        document.addEventListener("click", remtyper);
        return () => {
            document.removeEventListener("click", remtyper);
        };

    });

    useEffect(() => {

        function scrollup(event) {

            if (Math.abs((yarescroll.current?.scrollHeight - yarescroll.current?.clientHeight) - yarescroll.current?.scrollTop) > 80) {
                if (!newmsg) {
                    setShowfastscroll(true);
                }
            } else {
                setShowfastscroll(false);
                setNewmsg(false);

            }

        }

        yarescroll.current?.addEventListener("scroll", scrollup);
        return () => {
            yarescroll.current?.removeEventListener("scroll", scrollup);
        };

    });

    useEffect(() => {
        setTimeout(() => {

            if (Math.abs((yarescroll.current?.scrollHeight - yarescroll.current?.clientHeight) - yarescroll.current?.scrollTop) <= 49) {
                setTimeout(() => {
                    seendiv.current?.scrollIntoView({ behavior: "smooth" });
                }, 10);


            } else {

                if (arrivedtext != null) {
                    setNewmsg(true);
                    setShowfastscroll(false);

                }
            }


            arrivedtext && Currentchat?.members.includes(arrivedtext.sender) &&
                setMessages((prev) => {

                    return [...prev, arrivedtext]

                });

            setTimeout(() => {
                setSomeonetexted(true);
            }, 1000);

            arrivedtext && Currentchat?.members.includes(arrivedtext.sender) &&
                setTimearray((prev) => [...prev, timeref.current]);


        }, 1000);

    }, [arrivedtext]);



    let searcher = (e) => {

        if (e.target.value === '') {
            setViewer(null);
        }
        else {

            fetch(`${url}/messenger/lineup/order/${curuser.userid}`, {
                credentials: 'include'
            }).then((res) => {
                return res.json();
            }).then((data) => {

                origord.current = data.convs.lineup;
                firstarray.current = data.searchhelper;

                let searcharr = firstarray.current.map((each) => {

                    const regex = new RegExp(`^${e.target.value}`);

                    if (regex.test(each[0]) || regex.test(each[1])) {
                        for (let i = 0; i < origord.current.length; i++) {
                            if (origord.current[i].members.includes(each[2])) {
                                return origord.current[i];
                            }
                        }
                    }
                })

                setViewer(searcharr.filter((each) => each != undefined));

            }).catch((err) => {
                console.log(err);
            })

        }


    }


    let textdoer = (e) => {

        const receiverid = Currentchat.members.find((elem) => elem !== curuser.userid);

        ystwo.current = yarescroll.current?.scrollHeight - yarescroll.current?.clientHeight;

        socket.current.emit("clienttypes", {
            dims: ystwo.current,
            status: true,
            receiverid,
            curchat: Currentchat
        });

        if (/[^\s]/.test(e.target.value)) {
            setIstext(true);
        }
        else {
            setIstext(false);
        }
        setNewtext(e.target.value);
    }

    let handlesender = (e) => {

        realsent.current = true;

        e.preventDefault();
        setIstext(false);

        let alreadytop;

        if (conversationsref.current[0]?._id === Currentchatref.current._id) {
            alreadytop = true;
        } else {
            alreadytop = false;

        }

        const receiverid = Currentchat.members.find((elem) => elem !== curuser.userid);


        let len = conversationsref.current.length;
        let lastidx;

        if (messagesref.current[messagesref.current.length - 1] === undefined) {
            lastidx = conversationsref.current.length;
        } else {
            lastidx = messagesref.current[messagesref.current.length - 1]?.order[curuser.userid];
        }

        let lastidxrecf;
        if (messagesref.current[messagesref.current.length - 1] != undefined) {
            lastidxrecf = messagesref.current[messagesref.current.length - 1].order[receiverid];
        }

        ysone.current = yarescroll.current?.scrollHeight - yarescroll.current?.clientHeight;

        if (Currentchatref.current.holders.length == 1) {

            if (Currentchatref.current.holders.includes(curuser.userid)) {

                fetch(`${url}/messenger/lineupholder/${curuser.userid}`, {
                    method: 'POST',
                    headers: { 'Content-Type': "application/json" },
                    body: JSON.stringify({ members: Currentchatref.current.members, curchat: Currentchatref.current._id }),
                    credentials: 'include'
                }).then((res) => {
                    return res.json();
                }).then((data) => {

                    setTimeout(() => {

                        setConversations((prev) => {

                            setFollowfirst(true);
                            let temparr = data.lineup;

                            let onevaluearr = temparr.filter((elem) => {
                                return elem._id === Currentchatref.current._id;
                            })
                            let newarr = temparr.filter((elem) => {
                                return elem._id !== Currentchatref.current._id;
                            })
                            if (onevaluearr.length == 0) {

                                let newobj = {
                                    _id: Currentchatref.current._id,
                                    members: [curuser.userid, receiverid],
                                    holders: [curuser.userid, receiverid]
                                };

                                newarr.unshift(newobj);
                                return [...newarr];

                            }
                            else {

                                newarr.unshift(onevaluearr[0]);
                                return [...newarr];

                            }

                        });

                    }, 3000);


                }).catch((err) => {
                    console.log(err);
                });

            } else {

                socket.current.emit('clientaddholder', {
                    receiverid,
                    curchat: Currentchatref.current._id,
                    members: Currentchatref.current.members
                });

            }

        }

        setConversations((prev) => {

            setFollowfirst(true);
            let temparr = conversationsref.current;

            let onevaluearr = temparr.filter((elem) => {
                return elem._id === Currentchatref.current._id;
            })
            let newarr = temparr.filter((elem) => {
                return elem._id !== Currentchatref.current._id;
            })
            if (onevaluearr.length == 0) {

                let newobj = {
                    _id: Currentchatref.current._id,
                    members: [curuser.userid, receiverid],
                    holders: [curuser.userid, receiverid]
                };

                newarr.unshift(newobj);
                return [...newarr];

            }
            else {
                newarr.unshift(onevaluearr[0]);
                return [...newarr];
            }

        });


        async function isconv() {

            const response = await fetch(`${url}/messenger/alreadyconv/checker`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': "application/json" },
                    body: JSON.stringify([curuser.userid, receiverid]),
                    credentials: 'include'
                }
            );

            const verdict = await response.json();

            fetch(`${url}/messenger/holderedit/${curuser.userid}`, {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ members: Currentchatref.current.members, curchat: Currentchatref.current._id }),
                credentials: 'include'
            }).then((res) => {
                return res.json();
            }).then((data) => {

            }).catch((err) => {
                console.log(err);
            })


            if (verdict === null) {

                let newbrand = uuidv4();

                if (!alreadytop) {


                    for (let i = 0; i <= len; i++) {

                        if (conversationsref.current[i]?._id !== Currentchatref.current._id) {

                            fetch(`${url}/messenger/incrementer/${conversationsref.current[i]._id}`, {
                                method: 'POST',
                                headers: { 'Content-Type': "application/json" },
                                body: JSON.stringify({ id: curuser.userid, brand: newbrand, new: true, user: 'curuser', comparerval: null }),
                                credentials: 'include'

                            }).then((res) => {
                                return res.json();
                            }).then((data) => {

                            }).catch((err) => {
                                console.log(err);
                            });


                        }

                    }


                }


                let recid = null;
                if (draft.members[0] == curuser.userid) {
                    recid = draft.members[1];
                }
                else {
                    recid = draft.members[0];
                }

                let newobj = {
                    senderId: curuser.userid,
                    receiverId: recid
                };

                fetch(`${url}/messenger/create`, {
                    method: 'POST',
                    headers: { 'Content-Type': "application/json" },
                    body: JSON.stringify(newobj),
                    credentials: 'include'
                }).then((res) => {
                    return res.json();
                }).then((data) => {

                    let correctdata = data;
                    setCurrentchat(data);

                    setConversations([data, ...conversations]);
                    setFollowfirst(true);
                    setDraft(null);
                    const receiverid = data.members.find((elem) => elem !== curuser.userid);

                    let zeroobj = {
                        [curuser.userid]: 0,
                        [receiverid]: 0
                    };

                    let helper = conversationsref.current.map((each) => {
                        if (each._id != Currentchatref.current._id) {
                            return each._id;
                        }
                    });

                    let curusereffected = helper.filter((each) => {
                        return each != null;
                    })

                    let receivereffected;

                    fetch(`${url}/messenger/lineup/checker/${receiverid}`, {
                        credentials: 'include'
                    }).then((res) => {
                        return res.json();
                    }).then((data) => {

                        if (data == null) {

                            receivereffected = [];
                            if (!(onelineref.current.includes(receiverid))) {

                                let newobj = {
                                    username: "",
                                    userid: receiverid,
                                    lineup: [Currentchatref.current],
                                    unread: { [Currentchatref.current._id]: true, necessary: false }
                                }

                                fetch(`${url}/messenger/lineup/create`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': "application/json" },
                                    body: JSON.stringify(newobj),
                                    credentials: 'include'
                                }).then((res) => {
                                    return res.json();
                                }).then((data) => {

                                    const newmsg = {
                                        conversationId: correctdata._id,
                                        sender: curuser.userid,
                                        receiver: receiverid,
                                        thetext: newtext,
                                        status: false,
                                        order: zeroobj,
                                        holders: [curuser.userid, receiverid],
                                        brand: { own: [newbrand] },
                                        branding: [],
                                        effected: curusereffected,
                                        recbranding: [],
                                        receffected: receivereffected
                                    };

                                    fetch(`${url}/messenger/send`, {
                                        method: 'POST',
                                        headers: { 'Content-Type': "application/json" },
                                        body: JSON.stringify(newmsg),
                                        credentials: 'include'
                                    }).then((res) => {
                                        return res.json();
                                    }).then((newdata) => {

                                        socket.current.emit("textclient", {
                                            senderid: curuser.userid,
                                            receiverid,
                                            recenttext: newtext,
                                            converid: correctdata._id,
                                            saveID: newdata._id,
                                            curchat: Currentchatref.current,
                                            status: false,
                                            order: zeroobj,
                                            holders: [curuser.userid, receiverid],
                                            brand: newdata.brand.own[0],
                                            branding: newdata.branding,
                                            effected: newdata.effected,
                                            recbranding: newdata.recbranding,
                                            receffected: newdata.receffected,
                                            newlatestchat: data.unread,
                                            newconversationlineup: data.lineup


                                        });




                                        setMessages([...messages, newdata]);
                                        setTimearray([...timearray, true]);
                                        setNewtext("");
                                        setChatclicked(false);

                                    }).catch((err) => {
                                        console.log(err);
                                    });


                                }).catch((err) => {
                                    console.log(err);
                                })

                            }
                        }

                        else if (data.lineup.length == 0) {


                            receivereffected = [];


                            if (!(onelineref.current.includes(receiverid))) {


                                let newobj = {
                                    lineup: [Currentchatref.current],
                                    unread: { [Currentchatref.current._id]: true, necessary: false }
                                }

                                fetch(`${url}/messenger/lineup/${receiverid}`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': "application/json" },
                                    body: JSON.stringify(newobj),
                                    credentials: 'include'
                                }).then((res) => {
                                    return res.json();
                                }).then((data) => {

                                    const newmsg = {
                                        conversationId: correctdata._id,
                                        sender: curuser.userid,
                                        receiver: receiverid,
                                        thetext: newtext,
                                        status: false,
                                        order: zeroobj,
                                        holders: [curuser.userid, receiverid],
                                        brand: { own: [newbrand] },
                                        branding: [],
                                        effected: curusereffected,
                                        recbranding: [],
                                        receffected: receivereffected
                                    };

                                    fetch(`${url}/messenger/send`, {
                                        method: 'POST',
                                        headers: { 'Content-Type': "application/json" },
                                        body: JSON.stringify(newmsg),
                                        credentials: 'include'
                                    }).then((res) => {
                                        return res.json();
                                    }).then((newdata) => {

                                        socket.current.emit("textclient", {
                                            senderid: curuser.userid,
                                            receiverid,
                                            recenttext: newtext,
                                            converid: correctdata._id,
                                            saveID: newdata._id,
                                            curchat: Currentchatref.current,
                                            status: false,
                                            order: zeroobj,
                                            holders: [curuser.userid, receiverid],
                                            brand: newdata.brand.own[0],
                                            branding: newdata.branding,
                                            effected: newdata.effected,
                                            recbranding: newdata.recbranding,
                                            receffected: newdata.receffected,
                                            newlatestchat: data.unread,
                                            newconversationlineup: data.lineup
                                        });

                                        setMessages([...messages, newdata]);
                                        setTimearray([...timearray, true]);
                                        setNewtext("");
                                        setChatclicked(false);

                                    }).catch((err) => {
                                        console.log(err);
                                    });


                                }).catch((err) => {
                                    console.log(err);
                                })

                            }

                        }

                        else {


                            let rechelper = data.lineup.map((each) => {

                                return each._id;

                            });

                            receivereffected = rechelper.filter((each) => {
                                return each != null;
                            })

                            if (!(onelineref.current.includes(receiverid))) {

                                let newobj = {};
                                let newarr = data.lineup.filter((elem) => elem._id != Currentchatref.current._id);
                                if (data.unread != undefined) {
                                    if (Object.keys(data.unread).includes(Currentchatref.current._id)) {
                                        data.unread[Currentchatref.current._id] = true;
                                        newobj = {
                                            lineup: [Currentchatref.current, ...newarr],
                                            unread: data.unread
                                        }
                                    } else {

                                        newobj = {
                                            lineup: [Currentchatref.current, ...newarr],
                                            unread: { ...data.unread, [Currentchatref.current._id]: true }
                                        }
                                    }
                                }
                                else {
                                    newobj = {
                                        lineup: [Currentchatref.current, ...newarr],
                                        unread: { [Currentchatref.current._id]: true }
                                    }

                                }


                                fetch(`${url}/messenger/lineup/${receiverid}`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': "application/json" },
                                    body: JSON.stringify(newobj),
                                    credentials: 'include'
                                }).then((res) => {
                                    return res.json();
                                }).then((datam) => {


                                    for (let i = 0; i < data.lineup.length; i++) {


                                        if (data.lineup[i]._id != Currentchatref.current._id) {

                                            fetch(`${url}/messenger/incrementer/${data.lineup[i]._id}`, {
                                                method: 'POST',
                                                headers: { 'Content-Type': "application/json" },
                                                body: JSON.stringify({ id: receiverid, brand: newbrand, new: true, user: 'receiver', comparerval: null }),
                                                credentials: 'include'

                                            }).then((res) => {
                                                return res.json();
                                            }).then((data) => {

                                            }).catch((err) => {
                                                console.log(err);
                                            });

                                        }

                                    }

                                    const newmsg = {
                                        conversationId: correctdata._id,
                                        sender: curuser.userid,
                                        receiver: receiverid,
                                        thetext: newtext,
                                        status: false,
                                        order: zeroobj,
                                        holders: [curuser.userid, receiverid],
                                        brand: { own: [newbrand] },
                                        branding: [],
                                        effected: curusereffected,
                                        recbranding: [],
                                        receffected: receivereffected
                                    };

                                    fetch(`${url}/messenger/send`, {
                                        method: 'POST',
                                        headers: { 'Content-Type': "application/json" },
                                        body: JSON.stringify(newmsg),
                                        credentials: 'include'
                                    }).then((res) => {
                                        return res.json();
                                    }).then((newdata) => {

                                        socket.current.emit("textclient", {
                                            senderid: curuser.userid,
                                            receiverid,
                                            recenttext: newtext,
                                            converid: correctdata._id,
                                            saveID: newdata._id,
                                            curchat: Currentchatref.current,
                                            status: false,
                                            order: zeroobj,
                                            holders: [curuser.userid, receiverid],
                                            brand: newdata.brand.own[0],
                                            branding: newdata.branding,
                                            effected: newdata.effected,
                                            recbranding: newdata.recbranding,
                                            receffected: newdata.receffected,
                                            newlatestchat: data.unread,
                                            newconversationlineup: data.lineup
                                        });


                                        setMessages([...messages, newdata]);
                                        setTimearray([...timearray, true]);
                                        setNewtext("");
                                        setChatclicked(false);

                                    }).catch((err) => {
                                        console.log(err);
                                    });



                                }).catch((err) => {
                                    console.log(err);
                                })

                            }

                        }


                    }).catch((err) => {
                        console.log(err);
                    });

                }).catch((err) => {
                    console.log(err);
                });


            } else {

                if (verdict.holders.length == 2) {

                    let newbrand = uuidv4();

                    if (!alreadytop) {

                        for (let i = 0; i <= lastidx; i++) {

                            if (i < conversationsref.current.length) {

                                if (conversationsref.current[i]._id !== Currentchatref.current._id && conversationsref.current[i] != undefined) {


                                    fetch(`${url}/messenger/incrementer/${conversationsref.current[i]._id}`, {
                                        method: 'POST',
                                        headers: { 'Content-Type': "application/json" },
                                        body: JSON.stringify({ id: curuser.userid, brand: newbrand, new: false, user: 'curuser', comparerval: lastidx }),
                                        credentials: 'include'

                                    }).then((res) => {
                                        return res.json();
                                    }).then((data) => {

                                    }).catch((err) => {
                                        console.log(err);
                                    });

                                }

                            }

                        }

                    }

                    const receiverid = Currentchat.members.find((elem) => elem !== curuser.userid);

                    let zeroobj = {
                        [curuser.userid]: 0,
                        [receiverid]: 0
                    };

                    let curusereffected = [];

                    for (let i = 0; i <= lastidx; i++) {

                        if (conversationsref.current[i] != undefined) {

                            if (conversationsref.current[i]._id !== Currentchatref.current._id) {

                                curusereffected.unshift(conversationsref.current[i]._id);


                            }

                        }

                    }

                    let receivereffected = [];


                    fetch(`${url}/messenger/lineup/checker/${receiverid}`, {
                        credentials: 'include'
                    }).then((res) => {
                        return res.json();
                    }).then((data) => {

                        if (messagesref.current[messagesref.current.length - 1] === undefined) {
                            lastidxrecf = data.lineup.length;
                        }
                        for (let i = 0; i <= lastidxrecf; i++) {

                            if (data.lineup[i] != undefined) {

                                if (data.lineup[i]._id !== Currentchatref.current._id) {

                                    receivereffected.unshift(data.lineup[i]._id);

                                }

                            }

                        }


                        if (!(onelineref.current.includes(receiverid))) {


                            if (data.lineup[0]._id === Currentchatref.current._id) {
                                isontop.current = true;
                            }
                            else {
                                isontop.current = false;
                            }

                            let newobj = {};
                            let newarr = data.lineup.filter((elem) => elem._id != Currentchatref.current._id);

                            if (data.unread != undefined) {
                                if (Object.keys(data.unread).includes(Currentchatref.current._id)) {
                                    data.unread[Currentchatref.current._id] = true;
                                    newobj = {
                                        lineup: [Currentchatref.current, ...newarr],
                                        unread: data.unread
                                    }
                                } else {

                                    newobj = {
                                        lineup: [Currentchatref.current, ...newarr],
                                        unread: { ...data.unread, [Currentchatref.current._id]: true }
                                    }
                                }
                            }
                            else {
                                newobj = {
                                    lineup: [Currentchatref.current, ...newarr],
                                    unread: { [Currentchatref.current._id]: true }
                                }

                            }


                            fetch(`${url}/messenger/lineup/${receiverid}`, {
                                method: 'POST',
                                headers: { 'Content-Type': "application/json" },
                                body: JSON.stringify(newobj),
                                credentials: 'include'
                            }).then((res) => {
                                return res.json();
                            }).then((datam) => {
                                async function forrec() {

                                    let lastidxrec;

                                    const response = await fetch(`${url}/messenger/findmytextsifany/${receiverid}`,

                                        {
                                            method: 'POST',
                                            headers: { 'Content-Type': "application/json" },
                                            body: JSON.stringify({ convid: Currentchatref.current._id }),
                                            credentials: 'include'
                                        });

                                    const datum = await response.json();

                                    if (datum[datum.length - 1] === undefined) {
                                        lastidxrec = data.lineup.length;
                                    }
                                    else {
                                        lastidxrec = datum[datum.length - 1].order[receiverid];
                                    }


                                    for (let i = 0; i <= lastidxrec; i++) {

                                        if (data.lineup[i] != undefined) {

                                            if (data.lineup[i]._id != Currentchatref.current._id) {

                                                fetch(`${url}/messenger/incrementer/${data.lineup[i]._id}`, {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': "application/json" },
                                                    body: JSON.stringify({ id: receiverid, brand: newbrand, new: false, user: 'receiver', comparerval: lastidxrec }),
                                                    credentials: 'include'

                                                }).then((res) => {
                                                    return res.json();
                                                }).then((data) => {

                                                }).catch((err) => {
                                                    console.log(err);
                                                });

                                            }

                                        }

                                    }

                                };


                                if (!isontop.current) {
                                    forrec();
                                }

                                const newmsg = {
                                    conversationId: Currentchat._id,
                                    sender: curuser.userid,
                                    receiver: receiverid,
                                    thetext: newtext,
                                    status: false,
                                    order: zeroobj,
                                    holders: [curuser.userid, receiverid],
                                    brand: { own: [newbrand] },
                                    branding: [],
                                    effected: curusereffected,
                                    recbranding: [],
                                    receffected: receivereffected

                                };

                                fetch(`${url}/messenger/send`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': "application/json" },
                                    body: JSON.stringify(newmsg),
                                    credentials: 'include'
                                }).then((res) => {
                                    return res.json();
                                }).then((datum) => {

                                    socket.current.emit("textclient", {
                                        senderid: curuser.userid,
                                        receiverid,
                                        recenttext: newtext,
                                        converid: Currentchat._id,
                                        saveID: datum._id,
                                        status: false,
                                        curchat: Currentchatref.current,
                                        order: zeroobj,
                                        holders: [curuser.userid, receiverid],
                                        brand: datum.brand.own[0],
                                        branding: datum.branding,
                                        effected: datum.effected,
                                        recbranding: datum.recbranding,
                                        receffected: datum.receffected,
                                        newlatestchat: data.unread,
                                        newconversationlineup: data.lineup

                                    });

                                    setMessages([...messages, datum]);
                                    setTimearray([...timearray, true]);
                                    setNewtext("");
                                    setChatclicked(false);

                                }).catch((err) => {
                                    console.log(err);
                                });

                            }).catch((err) => {
                                console.log(err);
                            })


                        }


                    }).catch((err) => {
                        console.log(err);
                    });


                } else {


                    let newbrand = uuidv4();

                    if (!alreadytop) {

                        let newobj = {
                            id: curuser.userid,
                            brand: newbrand,
                            new: verdict.holders.includes(curuser.userid) ? false : true,
                            user: 'curuser',
                            comparerval: verdict.holders.includes(curuser.userid) ? lastidx : null
                        };


                        for (let i = 0; i <= verdict.holders.includes(curuser.userid) ? lastidx : len; i++) {

                            if (i >= conversationsref.current.length) {
                                break;
                            }

                            if (conversationsref.current[i]._id !== Currentchatref.current._id && conversationsref.current[i] != undefined) {

                                fetch(`${url}/messenger/incrementer/${conversationsref.current[i]._id}`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': "application/json" },
                                    body: JSON.stringify(newobj),
                                    credentials: 'include'

                                }).then((res) => {
                                    return res.json();
                                }).then((data) => {
                                }).catch((err) => {
                                    console.log(err);
                                });



                            }


                        }

                    }

                    const receiverid = Currentchat.members.find((elem) => elem !== curuser.userid);

                    let zeroobj = {
                        [curuser.userid]: 0,
                        [receiverid]: 0
                    };

                    let curusereffected = [];


                    if (verdict.holders.includes(curuser.userid)) {


                        for (let i = 0; i <= lastidx; i++) {

                            if (conversationsref.current[i]?._id !== Currentchatref.current._id && conversationsref.current[i] != undefined) {

                                curusereffected.unshift(conversationsref.current[i]._id);

                            }

                        }


                    } else {

                        let helper = conversationsref.current.map((each) => {
                            if (each._id != Currentchatref.current._id) {
                                return each._id;
                            }
                        });

                        curusereffected = helper.filter((each) => {
                            return each != null;
                        })

                    }

                    let receivereffected = [];

                    fetch(`${url}/messenger/lineup/checker/${receiverid}`, {
                        credentials: 'include'
                    }).then((res) => {
                        return res.json();
                    }).then((data) => {

                        if (data.lineup.length == 0) {

                            receivereffected = [];

                            if (!(onelineref.current.includes(receiverid))) {


                                let newobj = {
                                    lineup: [Currentchatref.current],
                                    unread: { [Currentchatref.current._id]: true, necessary: false }
                                }

                                fetch(`${url}/messenger/lineup/${receiverid}`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': "application/json" },
                                    body: JSON.stringify(newobj),
                                    credentials: 'include'
                                }).then((res) => {
                                    return res.json();
                                }).then((data) => {

                                    const newmsg = {
                                        conversationId: Currentchat._id,
                                        sender: curuser.userid,
                                        receiver: receiverid,
                                        thetext: newtext,
                                        status: false,
                                        order: zeroobj,
                                        holders: [curuser.userid, receiverid],
                                        brand: { own: [newbrand] },
                                        branding: [],
                                        effected: curusereffected,
                                        recbranding: [],
                                        receffected: receivereffected

                                    };

                                    fetch(`${url}/messenger/send`, {
                                        method: 'POST',
                                        headers: { 'Content-Type': "application/json" },
                                        body: JSON.stringify(newmsg),
                                        credentials: 'include'
                                    }).then((res) => {
                                        return res.json();
                                    }).then((datum) => {

                                        socket.current.emit("textclient", {
                                            senderid: curuser.userid,
                                            receiverid,
                                            recenttext: newtext,
                                            converid: Currentchat._id,
                                            saveID: datum._id,
                                            status: false,
                                            curchat: Currentchatref.current,
                                            order: zeroobj,
                                            holders: [curuser.userid, receiverid],
                                            brand: datum.brand.own[0],
                                            branding: datum.branding,
                                            effected: datum.effected,
                                            recbranding: datum.recbranding,
                                            receffected: datum.receffected,
                                            newlatestchat: data.unread,
                                            newconversationlineup: data.lineup
                                        });

                                        setMessages([...messages, datum]);
                                        setTimearray([...timearray, true]);
                                        setNewtext("");
                                        setChatclicked(false);

                                    }).catch((err) => {
                                        console.log(err);
                                    });



                                }).catch((err) => {
                                    console.log(err);
                                })

                            }

                        }

                        else {


                            if (verdict.holders.includes(receiverid)) {

                                for (let i = 0; i <= lastidxrecf; i++) {

                                    if (data.lineup[i]?._id !== Currentchatref.current._id) {

                                        receivereffected.unshift(data.lineup[i]._id);

                                    }


                                }


                            } else {


                                let rechelper = data.lineup.map((each) => {

                                    if (each._id != Currentchatref.current._id) {
                                        return each._id;
                                    }

                                });

                                receivereffected = rechelper.filter((each) => {
                                    return each != null;
                                })


                            }


                            if (!(onelineref.current.includes(receiverid))) {


                                if (data.lineup[0]._id === Currentchatref.current._id) {
                                    isontop.current = true;
                                }
                                else {
                                    isontop.current = false;
                                }

                                let newobj = {};
                                let newarr = data.lineup.filter((elem) => elem._id != Currentchatref.current._id);

                                if (data.unread != undefined) {
                                    if (Object.keys(data.unread).includes(Currentchatref.current._id)) {
                                        data.unread[Currentchatref.current._id] = true;
                                        newobj = {
                                            lineup: [Currentchatref.current, ...newarr],
                                            unread: data.unread
                                        }
                                    } else {

                                        newobj = {
                                            lineup: [Currentchatref.current, ...newarr],
                                            unread: { ...data.unread, [Currentchatref.current._id]: true }
                                        }
                                    }
                                }

                                else {
                                    newobj = {
                                        lineup: [Currentchatref.current, ...newarr],
                                        unread: { [Currentchatref.current._id]: true }
                                    }

                                }


                                fetch(`${url}/messenger/lineup/${receiverid}`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': "application/json" },
                                    body: JSON.stringify(newobj),
                                    credentials: 'include'
                                }).then((res) => {
                                    return res.json();
                                }).then((datam) => {

                                    if (verdict.holders.includes(receiverid)) {

                                        async function forrec() {

                                            let lastidxrec;

                                            const response = await fetch(`${url}/messenger/findmytextsifany/${receiverid}`,

                                                {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': "application/json" },
                                                    body: JSON.stringify({ convid: Currentchatref.current._id }),
                                                    credentials: 'include'
                                                });

                                            const datum = await response.json();
                                            lastidxrec = datum[datum.length - 1].order[receiverid];

                                            for (let i = 0; i <= lastidxrec; i++) {

                                                if (data.lineup[i]._id != Currentchatref.current._id) {

                                                    fetch(`${url}/messenger/incrementer/${data.lineup[i]._id}`, {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': "application/json" },
                                                        body: JSON.stringify({ id: receiverid, brand: newbrand, new: false, user: 'receiver', comparerval: lastidxrec }),
                                                        credentials: 'include'

                                                    }).then((res) => {
                                                        return res.json();
                                                    }).then((data) => {

                                                    }).catch((err) => {
                                                        console.log(err);
                                                    });

                                                }


                                            }


                                        };


                                        if (!isontop.current) {

                                            forrec();

                                        }

                                    } else {

                                        for (let i = 0; i <= data.lineup.length; i++) {
                                            if (data.lineup[i] != undefined) {
                                                if (data.lineup[i]._id != Currentchatref.current._id) {

                                                    fetch(`${url}/messenger/incrementer/${data.lineup[i]._id}`, {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': "application/json" },
                                                        body: JSON.stringify({ id: receiverid, brand: newbrand, new: true, user: 'receiver', comparerval: null }),
                                                        credentials: 'include'

                                                    }).then((res) => {
                                                        return res.json();
                                                    }).then((data) => {

                                                    }).catch((err) => {
                                                        console.log(err);
                                                    });


                                                }


                                            }

                                        }

                                    }

                                    const newmsg = {
                                        conversationId: Currentchat._id,
                                        sender: curuser.userid,
                                        receiver: receiverid,
                                        thetext: newtext,
                                        status: false,
                                        order: zeroobj,
                                        holders: [curuser.userid, receiverid],
                                        brand: { own: [newbrand] },
                                        branding: [],
                                        effected: curusereffected,
                                        recbranding: [],
                                        receffected: receivereffected

                                    };

                                    fetch(`${url}/messenger/send`, {
                                        method: 'POST',
                                        headers: { 'Content-Type': "application/json" },
                                        body: JSON.stringify(newmsg),
                                        credentials: 'include'
                                    }).then((res) => {
                                        return res.json();
                                    }).then((datum) => {

                                        socket.current.emit("textclient", {
                                            senderid: curuser.userid,
                                            receiverid,
                                            recenttext: newtext,
                                            converid: Currentchat._id,
                                            saveID: datum._id,
                                            status: false,
                                            curchat: Currentchatref.current,
                                            order: zeroobj,
                                            holders: [curuser.userid, receiverid],
                                            brand: datum.brand.own[0],
                                            branding: datum.branding,
                                            effected: datum.effected,
                                            recbranding: datum.recbranding,
                                            receffected: datum.receffected,
                                            newlatestchat: data.unread,
                                            newconversationlineup: data.lineup


                                        });

                                        setMessages([...messages, datum]);
                                        setTimearray([...timearray, true]);
                                        setNewtext("");
                                        setChatclicked(false);

                                    }).catch((err) => {
                                        console.log(err);
                                    });

                                }).catch((err) => {
                                    console.log(err);
                                })

                            }

                        }


                    }).catch((err) => {
                        console.log(err);
                    });


                }

            }

        }

        isconv();
    }

    let convohandler = (c) => {

        if (Currentchatref.current != null && c._id != Currentchatref.current._id) {
            skeletonsemaphore.current = false;
        }

        if (fromconv[c._id] == undefined) {
            return;
        }

        if (!curuser.blocked.includes(fromconv[c._id].username) && !fromconv[c._id].blocked.includes(curuser.usrn)) {

            setCurrentchat(c);
            Currentchatref.current = c;
            setChatclicked(true);
            setLoader(true);
            setUpdaterchatclicked(true);

            setLatestchat((prev) => {
                let newobj = latestchatref.current;
                newobj[c._id] = false;
                return { ...newobj };
            });

        }

    }



    let delcon = (conv) => {

        let nevermessages = messagesref.current;

        async function deleter() {

            const response = await fetch(`${url}/messenger/findatleastone/${curuser.userid}`, {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ convid: conv }),
                credentials: 'include'
            })

            const verdictval = await response.json();
            const receiverid = Currentchatref.current.members.find((elem) => elem !== curuser.userid);

            if (verdictval.ans === null) {

                setCurrentchat(null);

                let newobj = { convid: conv };
                let newobjtwo = { convid: conv, curuser: curuser.userid };


                let iterable = [
                    fetch(`${url}/messenger/conv/remover/${curuser.userid}`, {
                        method: 'POST',
                        headers: { 'Content-Type': "application/json" },
                        body: JSON.stringify(newobj),
                        credentials: 'include'
                    }),
                    fetch(`${url}/messenger/conv/remover/${receiverid}`, {
                        method: 'POST',
                        headers: { 'Content-Type': "application/json" },
                        body: JSON.stringify(newobjtwo),
                        credentials: 'include'
                    }),
                    fetch(`${url}/messenger/convholder/remover`, {
                        method: 'POST',
                        headers: { 'Content-Type': "application/json" },
                        body: JSON.stringify({ userid: curuser.userid, convid: conv }),
                        credentials: 'include'
                    })
                ];


                Promise.all(iterable
                ).then((result) => {

                    fetch(`${url}/messenger/lineup/order/${curuser.userid}`, {
                        credentials: 'include'
                    }).then((res) => {
                        return res.json();
                    }).then((data) => {
                        setConversations(data.convs.lineup);
                        setFollowfirst(true);
                        if (data.convs.unread != undefined) {
                            setLatestchat(data.convs.unread);
                        }
                    }).catch((err) => {
                        console.log(err);
                    })


                }).catch((err) => {
                    console.log(err);
                })

            } else {

                if (Currentchatref.current.holders.length == 2) {
                    verdict.current = true;
                }

                const receiverid = Currentchatref.current.members.find((elem) => elem !== curuser.userid);

                let redmessages = messagesref.current;

                let newobj = { convid: conv };
                let newobjtwo = { convid: conv, curuser: curuser.userid };


                let iterable = [
                    fetch(`${url}/messenger/conv/remover/${curuser.userid}`, {
                        method: 'POST',
                        headers: { 'Content-Type': "application/json" },
                        body: JSON.stringify(newobj),
                        credentials: 'include'
                    }),
                    fetch(`${url}/messenger/conv/remover/${receiverid}`, {
                        method: 'POST',
                        headers: { 'Content-Type': "application/json" },
                        body: JSON.stringify(newobjtwo),
                        credentials: 'include'
                    }),
                    fetch(`${url}/messenger/convholder/remover`, {
                        method: 'POST',
                        headers: { 'Content-Type': "application/json" },
                        body: JSON.stringify({ userid: curuser.userid, convid: conv }),
                        credentials: 'include'
                    })
                ];


                Promise.all(iterable
                ).then((result) => {

                    fetch(`${url}/messenger/lineup/order/${curuser.userid}`, {
                        credentials: 'include'
                    }).then((res) => {
                        return res.json();
                    }).then((data) => {

                        setConversations(data.convs.lineup);
                        setFollowfirst(true);
                        if (data.convs.unread != undefined) {
                            setLatestchat(data.convs.unread);
                        }

                        fetch(`${url}/messenger/lineup/checker/${curuser.userid}`, {
                            credentials: 'include'
                        }).then((res) => {
                            return res.json();
                        }).then((datae) => {


                            for (let i = nevermessages.length - 1; i >= 0; i--) {
                                if (nevermessages[i].status == false) {

                                    fetch(`${url}/messenger/delete/${nevermessages[i]._id}`, {
                                        method: 'DELETE',
                                        credentials: 'include'
                                    }).then((res) => {
                                        return res.json();
                                    }).then((data) => {

                                    }).catch((err) => {
                                        console.log(err);
                                    })

                                } else {
                                    break;
                                }

                            }

                            setLoader(true);
                            setCurrentchat(null);

                            redmessages.map((each) => {


                                if (each.sender === curuser.userid) {

                                    each.effected.map((lessereach) => {

                                        fetch(`${url}/messenger/decrementer/${lessereach}`, {
                                            method: 'POST',
                                            headers: { 'Content-Type': "application/json" },
                                            body: JSON.stringify({ id: [curuser.userid, receiverid], brand: each.brand, user: 'curuser' }),
                                            credentials: 'include'
                                        }).then((res) => {
                                            return res.json();
                                        }).then((data) => {

                                        }).catch((err) => {
                                            console.log(err);
                                        });


                                    })


                                } else {


                                    each.receffected.map((lessereach) => {

                                        fetch(`${url}/messenger/decrementer/${lessereach}`, {
                                            method: 'POST',
                                            headers: { 'Content-Type': "application/json" },
                                            body: JSON.stringify({ id: [curuser.userid, receiverid], brand: each.brand, user: 'receiver' }),
                                            credentials: 'include'
                                        }).then((res) => {
                                            return res.json();
                                        }).then((data) => {

                                        }).catch((err) => {
                                            console.log(err);
                                        });

                                    })


                                }

                            })


                        }).catch((err) => {
                            console.log(err);
                        });


                    }).catch((err) => {
                        console.log(err);
                    })

                    if (verdict.current) {

                        let curchat = Currentchatref.current._id;
                        setTimeout(() => {

                            fetch(`${url}/messenger/convdel/reorder/${receiverid}`, {
                                method: 'POST',
                                headers: { 'Content-Type': "application/json" },
                                body: JSON.stringify({ converid: conv }),
                                credentials: 'include'
                            }).then((res) => {
                                return res.json();
                            }).then((data) => {

                            }).catch((err) => {
                                console.log(err);
                            })

                            socket.current.emit('clientchangetextnums', {

                                receiverid,
                                convid: curchat,
                                nevermessages

                            });

                        }, 2200);

                    }

                }).catch((err) => {
                    console.log(err);
                })

            }

        }

        deleter();

    }

    let quickscroll = (() => {

        setTimeout(() => {
            seendiv.current?.scrollIntoView({ behavior: "smooth" });
        }, 200);

    })

    useEffect(() => {

        setTimeout(() => {
            setLoader(null);
        }, 3000);
    }, [loader]);

    useEffect(() => {
        setTimeout(() => {
            setInfo(null);
        }, 2500);
    }, [info]);


    useEffect(() => {

        fetch(`${url}/messenger/lineup/order/${curuser.userid}`, {
            credentials: 'include'
        }).then((res) => {
            return res.json();
        }).then((data) => {


            if (data.convs != undefined) {
                setConversations(data.convs.lineup);
                setFollowfirst(true);
                setLatestchat(data.convs.unread);
                initref.current[0] = data.convs.lineup;
                initref.current[1] = data.convs.unread;
            }


        }).catch((err) => {
            console.log(err);
        })
    }, [curuser.userid]);


    useEffect(() => {

        conversationsref.current = conversations;
        latestchatref.current = latestchat;

        setTimeout(() => {

            fetch(`${url}/messenger/lineup/checker/${curuser.userid}`, {
                credentials: 'include'
            }).then((res) => {
                return res.json();
            }).then((data) => {

                if (data == null) {
                    let newobj = {
                        username: curuser.usrn,
                        userid: curuser.userid,
                        lineup: conversationsref.current,
                        unread: { necessary: false }
                    }
                    fetch(`${url}/messenger/lineup/create`, {
                        method: 'POST',
                        headers: { 'Content-Type': "application/json" },
                        body: JSON.stringify(newobj),
                        credentials: 'include'
                    }).then((res) => {
                        return res.json();
                    }).then((data) => {

                    }).catch((err) => {
                        console.log(err);
                    })
                }
                else {

                    if (onetimer.current == 1) {
                        onetimer.current = 0;
                        conversationsref.current = initref.current[0];
                        latestchatref.current = initref.current[1];
                    }

                    let newobj = {};
                    if (data.username == "") {

                        newobj = {
                            username: curuser.usrn,
                            lineup: conversationsref.current,
                            unread: latestchatref.current
                        }
                    } else {
                        newobj = {
                            lineup: conversationsref.current,
                            unread: latestchatref.current
                        }
                    }

                    fetch(`${url}/messenger/lineup/${curuser.userid}`, {
                        method: 'POST',
                        headers: { 'Content-Type': "application/json" },
                        body: JSON.stringify(newobj),
                        credentials: 'include'
                    }).then((res) => {
                        return res.json();
                    }).then((data) => {

                    }).catch((err) => {
                        console.log(err);
                    })

                }

            }).catch((err) => {
                console.log(err);
            });

        }, 1000);


    }, [conversations, latestchat]);


    let nav = useNavigate();

    useEffect(() => {

        fetch(`${url}/messenger`, {
            credentials: 'include'
        }).then((res) => {
            return res.json();
        }).then((data) => {
            if (data !== 'auth failed') {
            }
            else {
                nav('/', { replace: true });
            }
        }).catch((err) => {
            console.log(err);
        });

    }, []);



    useEffect(() => {

        setIstext(false);
        setNewtext("");
        Currentchatref.current = Currentchat;

        if (Currentchat != null) {

            fetch(`${url}/messenger/ex/${Currentchat._id}`, {
                credentials: 'include'
            }).then((res) => {
                return res.json();
            }).then((data) => {

                if (Currentchat.holders.length == 1 && !Currentchat.holders.includes(curuser.userid)) {
                    setTimeout(() => {
                        setInfo(true);
                    }, 1500);
                }

                let holtexts = data.filter((each) => {
                    return each.holders.includes(curuser.userid);
                })

                let bitexts = data.filter((each) => {
                    return each.holders.length == 2;
                })
                setMessages(holtexts);


                if (bitexts.length != 0) {

                    for (let i = bitexts.length - 1; i >= 0; i--) {
                        if (bitexts[i]?.status == true) {
                            break;
                        }
                        else if (bitexts[i]?.sender !== curuser.userid) {
                            fetch(`${url}/messenger/seen/` + bitexts[i]?._id, {
                                credentials: 'include'
                            }).then((res) => {
                                return res.json();
                            }).then((data) => {
                                setSomeonetexted(true);
                            }).catch((err) => {
                                console.log(err);
                            });

                            const receiverid = Currentchat?.members.find((elem) => elem !== curuser.userid);

                            socket.current.emit("clientseen", {
                                receiverid,
                                status: true,
                                messagesREC: data,
                                curchat: Currentchat
                            });

                        }
                    }

                }

            }).catch((err) => {
                console.log(err);
            });

            let identID = null;
            if (Currentchat.members[0] == curuser.userid) {
                identID = Currentchat.members[1];
            }
            else {
                identID = Currentchat.members[0];
            }

            fetch(`${url}/messenger/getconvostuff/${identID}`, {
                credentials: 'include'
            }).then((res) => {
                return res.json();
            }).then((data) => {

                data.identid = identID;
                setIdent(data);
                skeletonsemaphore.current = true;

            }).catch((err) => {
                console.log(err);
            });

        }

    }, [Currentchat]);



    useEffect(() => {

        skeletonsemaphore.current = false;

    }, [onlchatclicked])


    useEffect(() => {

        if (realsent.current) {

            realsent.current = false;

            setTimeout(() => {
                seendiv.current?.scrollIntoView({ behavior: "smooth" });
            }, 3000);



        }

        setRectext(messages[messages.length - 1]?._id);
        setRecsender(messages[messages.length - 1]?.sender);

        messagesref.current = messages;

        if (shddel) {

            setShddel(false);
            let arrobj = Object.keys(safeinherit.current);

            if (arrobj.length != 0) {

                if (arrobj.length == 1) {
                    safeinheritval.current = Math.min(safeinherit.current[arrobj[0]][1], safeinheritval.current);
                }
                else {
                    for (let i = 0; i < arrobj.length; i++) {

                        if (safeinherit.current[arrobj[i]][0] == true) {
                            safeinheritval.current = Math.min(safeinherit.current[arrobj[i]][1], safeinheritval.current);
                        }
                    }

                }

                arrobj.forEach((each) => {
                    if (safeinherit.current[each][0]) {
                        counterfinal.current += 1;
                    }
                })
                safeinherit.current = {};
            }

            if (!textdets.last && !multiplelast) {

                let child = messages[safeinheritval.current];
                let newbrand;
                let neweffected;
                let newreceffected;

                if (counterinit.current === counterfinal.current - 1) {
                    safeinheritval.current = 9999999999;
                    counterinit.current = 0;
                    counterfinal.current = 0;
                    setGroupdeletion(false);
                } else {
                    counterinit.current += 1;
                }

                if (child.sender === curuser.userid) {

                    newbrand =
                    {
                        own: [...child.brand.own, ...textdets.msg.brand.own],

                    };

                    if (child.brand.entrusted && textdets.msg.brand.entrusted) {
                        newbrand.entrusted = [...child.brand.entrusted, ...textdets.msg.brand.entrusted]
                    } else if (child.brand.entrusted) {
                        newbrand.entrusted = [...child.brand.entrusted];
                    } else if (textdets.msg.brand.entrusted) {
                        newbrand.entrusted = [...textdets.msg.brand.entrusted];
                    }


                    neweffected = [...child.effected, ...textdets.msg.effected];
                    newreceffected = [...child.receffected, ...textdets.msg.receffected];

                } else {

                    newbrand =
                    {
                        own: [...child.brand.own],
                        entrusted: [...textdets.msg.brand.own]

                    }

                    if (textdets.msg.brand.entrusted) {
                        newbrand.own.push(...textdets.msg.brand.entrusted);
                    }

                    if (child.brand.entrusted) {
                        newbrand.entrusted.push(...child.brand.entrusted);
                    }

                    neweffected = [...child.effected, ...textdets.msg.receffected];
                    newreceffected = [...child.receffected, ...textdets.msg.effected];

                }

                let inheritvals = async () => {

                    const response = await fetch(`${url}/messenger/inheritance`,
                        {
                            method: 'POST',
                            headers: { 'Content-Type': "application/json" },
                            body: JSON.stringify({ inheritorid: child._id, newbrand, neweffected, newreceffected }),
                            credentials: 'include'

                        })

                    const data = await response.json();
                    setSomeonetexted(true);

                }

                inheritvals();


            } else {


                if (counterinit.current === counterfinal.current - 1) {
                    safeinheritval.current = 9999999999;
                    counterinit.current = 0;
                    counterfinal.current = 0;
                    setGroupdeletion(false);
                    setMultiplelast(false);
                } else {
                    counterinit.current += 1;
                }

                let receiverid;

                if (Currentchatref.current == null) {

                    receiverid = truechat.current.members.find((elem) => elem !== curuser.userid);


                }
                else {

                    receiverid = Currentchatref.current.members.find((elem) => elem !== curuser.userid);

                }



                fetch(`${url}/messenger/lineup/checker/${receiverid}`, {
                    credentials: 'include'
                }).then((res) => {
                    return res.json();
                }).then((data) => {

                    let newobj = {};
                    let newarry = [];
                    if (Currentchatref.current == null) {

                        newarry = data.lineup.filter((elem) => elem._id != truechat.current._id);

                    } else {
                        newarry = data.lineup.filter((elem) => elem._id !== Currentchatref.current._id);
                    }

                    let onevaluearr = [];

                    if (Currentchatref.current == null) {

                        onevaluearr = data.lineup.filter((elem) => elem._id == truechat.current._id);


                    } else {

                        onevaluearr = data.lineup.filter((elem) => elem._id == Currentchatref.current._id);
                    }

                    let twicedecrement = [];

                    if (messages[messages.length - 1] === undefined) {

                        let otherarray = [];

                        for (let i = textdets.msg.order[receiverid] + 1; i < data.lineup.length; i++) {
                            if (!textdets.msg.receffected.includes(data.lineup[i])) {
                                otherarray.unshift(data.lineup[i]);
                            }
                        }

                        newarry.splice(data.lineup.length, 0, onevaluearr[0]);


                        if (!textdets.status) {
                            data.unread[Currentchatref.current ? Currentchatref.current._id : truechat.current._id] = false;
                        }

                        newobj = {
                            lineup: [...newarry],
                            unread: data.unread
                        };

                        fetch(`${url}/messenger/lineup/${receiverid}`, {
                            method: 'POST',
                            headers: { 'Content-Type': "application/json" },
                            body: JSON.stringify(newobj),
                            credentials: 'include'
                        }).then((res) => {
                            return res.json();
                        }).then((data) => {

                            socket.current.emit('clientdelchange', {
                                receiverid,
                            });


                        }).catch((err) => {
                            console.log(err);
                        })

                        otherarray.map((each) => {

                            twicedecrement.unshift(
                                fetch(`${url}/messenger/decrementer/deltype${each}`,
                                    {
                                        method: 'POST',
                                        headers: { 'Content-Type': "application/json" },
                                        body: JSON.stringify({ userid: receiverid }),
                                        credentials: 'include'
                                    })
                            )

                        })

                    } else {

                        let lastidx = messages[messages.length - 1].order[receiverid];
                        newarry.splice(lastidx, 0, onevaluearr[0]);

                        if (messages[messages.length - 1].status == true) {
                            data.unread[Currentchatref.current ? Currentchatref.current._id : truechat.current._id] = false;
                        }

                        newobj = {
                            lineup: [...newarry],
                            unread: data.unread
                        };

                        fetch(`${url}/messenger/lineup/${receiverid}`, {
                            method: 'POST',
                            headers: { 'Content-Type': "application/json" },
                            body: JSON.stringify(newobj),
                            credentials: 'include'
                        }).then((res) => {
                            return res.json();
                        }).then((data) => {

                            socket.current.emit('clientdelchange', {
                                receiverid,
                            });


                        }).catch((err) => {
                            console.log(err);
                        })
                    }



                    textdets.msg.receffected.map((each) => {

                        twicedecrement.unshift(
                            fetch(`${url}/messenger/decrementer/${each}`,
                                {
                                    method: 'POST',
                                    headers: { 'Content-Type': "application/json" },
                                    body: JSON.stringify({ id: [receiverid, curuser.userid], brand: textdets.msg.brand, user: 'receiver' }),
                                    credentials: 'include'
                                })
                        )
                    })

                    Promise.all((twicedecrement
                    )).then((result) => {
                        setSomeonetexted(true);
                    }).catch((err) => {
                        console.log(err);
                    })


                }).catch((err) => {
                    console.log(err);
                });

                fetch(`${url}/messenger/lineup/checker/${curuser.userid}`, {
                    credentials: 'include'
                }).then((res) => {
                    return res.json();
                }).then((data) => {

                    let newobj = {};
                    let newarr;

                    if (Currentchatref.current == null) {

                        newarr = data.lineup.filter((elem) => elem._id != truechat.current._id);

                    } else {

                        newarr = data.lineup.filter((elem) => elem._id != Currentchatref.current._id);

                    }

                    let onevaluearr = [];


                    if (Currentchatref.current == null) {

                        onevaluearr = data.lineup.filter((elem) => elem._id == truechat.current._id);


                    } else {

                        onevaluearr = data.lineup.filter((elem) => elem._id == Currentchatref.current._id);
                    }


                    let twicedecrement = [];

                    if (messages[messages.length - 1] === undefined) {


                        let otherarray = [];

                        for (let i = textdets.msg.order[curuser.userid] + 1; i < data.lineup.length; i++) {

                            if (!textdets.msg.effected.includes(data.lineup[i]._id)) {
                                otherarray.unshift(data.lineup[i]);
                            }

                        }

                        newarr.splice(data.lineup.length, 0, onevaluearr[0]);

                        newobj = {
                            lineup: [...newarr],
                            unread: data.unread
                        };

                        fetch(`${url}/messenger/lineup/${curuser.userid}`, {
                            method: 'POST',
                            headers: { 'Content-Type': "application/json" },
                            body: JSON.stringify(newobj),
                            credentials: 'include'
                        }).then((res) => {
                            return res.json();
                        }).then((data) => {

                            fetch(`${url}/messenger/lineup/order/${curuser.userid}`, {
                                credentials: 'include'
                            }).then((res) => {
                                return res.json();
                            }).then((data) => {

                                setConversations(data.convs.lineup);
                                setFollowfirst(true);
                                if (data.convs.unread != undefined) {
                                    setLatestchat(data.convs.unread);
                                }

                            }).catch((err) => {
                                console.log(err);
                            })

                        }).catch((err) => {
                            console.log(err);
                        })

                        otherarray.map((each) => {

                            twicedecrement.unshift(
                                fetch(`${url}/messenger/decrementer/deltype${each}`,
                                    {
                                        method: 'POST',
                                        headers: { 'Content-Type': "application/json" },
                                        body: JSON.stringify({ userid: curuser.userid }),
                                        credentials: 'include'
                                    })
                            )

                        })

                    } else {

                        let lastidx = messages[messages.length - 1].order[curuser.userid];

                        let onevaluearr = [];

                        if (Currentchatref.current == null) {

                            onevaluearr = data.lineup.filter((elem) => elem._id == truechat.current._id);


                        } else {

                            onevaluearr = data.lineup.filter((elem) => elem._id == Currentchatref.current._id);

                        }


                        newarr.splice(lastidx, 0, onevaluearr[0]);

                        if (messages[messages.length - 1].status == true) {
                            data.unread[Currentchatref.current ? Currentchatref.current._id : truechat.current._id] = false;
                        }

                        newobj = {
                            lineup: newarr,
                            unread: data.unread
                        };


                        fetch(`${url}/messenger/lineup/${curuser.userid}`, {
                            method: 'POST',
                            headers: { 'Content-Type': "application/json" },
                            body: JSON.stringify(newobj),
                            credentials: 'include'
                        }).then((res) => {
                            return res.json();
                        }).then((data) => {

                            fetch(`${url}/messenger/lineup/order/${curuser.userid}`, {
                                credentials: 'include'
                            }).then((res) => {
                                return res.json();
                            }).then((data) => {
                                setConversations(data.convs.lineup);
                                setFollowfirst(true);
                                if (data.convs.unread != undefined) {
                                    setLatestchat(data.convs.unread);
                                }
                            }).catch((err) => {
                                console.log(err);
                            })

                        }).catch((err) => {
                            console.log(err);
                        })

                    }

                    textdets.msg.effected.map((each) => {

                        twicedecrement.unshift(
                            fetch(`${url}/messenger/decrementer/${each}`,
                                {
                                    method: 'POST',
                                    headers: { 'Content-Type': "application/json" },
                                    body: JSON.stringify({ id: [curuser.userid, receiverid], brand: textdets.msg.brand, user: 'curuser' }),
                                    credentials: 'include'
                                })
                        )

                    })

                    Promise.all((twicedecrement
                    )).then((result) => {
                        setSomeonetexted(true);
                    }).catch((err) => {
                        console.log(err);
                    })

                }).catch((err) => {
                    console.log(err);
                });


            }


        }


        for (let i = 0; i < messages.length; i++) {

            if (!Object.keys(pfpobj).includes(messages[i]._id)) {

                if (i === 0 && messages[i].receiver === curuser.userid) {
                    setPfpobj((prev) => ({ ...prev, [messages[i]._id]: true }));
                }

                else {

                    if (messages[i - 1]?.sender === curuser.userid) {
                        setPfpobj((prev) => ({ ...prev, [messages[i]._id]: true }));
                    }

                }

            }

        }

    }, [messages]);


    useEffect(() => {

        socket.current.on("servertypes", (data) => {

            if ((yarescroll.current?.scrollHeight - yarescroll.current?.clientHeight) - (yarescroll.current?.scrollTop + 43) <= 7) {

                setTimeout(() => {
                    seendiv.current?.scrollIntoView({ behavior: "smooth" });
                }, 1000);
            }

        });

    }, []);

    useEffect(() => {

        if (yarescroll.current?.scrollHeight > yarescroll.current?.clientHeight) {
            setIsscrollbar(true);
        }


    })


    useEffect(() => {

        setGoback(true);
        safeinherit.current = {};
        setMultiplelast(false);
        setShowfastscroll(false);

        setTimeout(() => {
            seendiv.current?.scrollIntoView({ behavior: "smooth" });

        }, 3300);


    }, [Currentchat]);


    useEffect(() => {

        socket.current.emit("addMe", curuser.userid);

        socket.current.on("onlinefrens", (data) => {

            let helperarr = curuser.following;

            let newarr = helperarr.filter((each) => data.some((u) => u.userid === each));
            setOnlusers(helperarr.filter((each) => data.some((u) => u.userid === each)));
            onelineref.current = data;
            const curURL = window.location.pathname;

            let typetwo = curURL.replace('/messenger/', '');
            let datatwo = typetwo.replace('outsider/', '');
            let realdata = datatwo.replace('insider/', '');

            if (typetwo[0] == 'o') {
                setOutsider({ verdict: true, data: realdata });
            }

        })

    }, [curuser]);

    useEffect(() => {

        redselectorref.current = redselector;
        if (Object.keys(redselectorref.current).length == messagesref.current.length) {

            truechat.current = Currentchatref.current;

        }

    }, [redselector]);

    let groupdel = () => {


        if (truechat.current) {
            delcon(truechat.current._id);
        } else {
            setGroupdeletion(true);
        }
        setGoback(true);

    };


    let unselect = () => {

        setGroupdeletion(false);
        safeinherit.current = {};
        setGoback(true);
        setMultiplelast(false);

    };


    const welcomeagain = () => {
        nav('/welcome');
        disp(leftpsets('HomeIcon'));
    }

    const viewprof = (username) => {

        disp(currview(username));
        nav(`/profile/${username}`)

    }

    return (


        <>
            <div className={theme ? "messenger " : "messengernight"}>
                <div className="menu ">
                    <div className="menuwrap">
                        <input placeholder="search conversations..." className={theme ? "searchmessages" : "searchmessagesnight"} onChange={searcher} />
                        {viewer == null ?
                            conversations.map((c) => (
                                <div key={c._id} onClick={() => { convohandler(c) }}>
                                    <Conversation conver={c} latestchat={latestchat} setFromconv={setFromconv} fromconv={fromconv} />
                                </div>
                            ))
                            :
                            viewer.map((c) => (
                                <div key={c._id} onClick={() => { convohandler(c) }}>
                                    <Conversation conver={c} latestchat={latestchat} setFromconv={setFromconv} fromconv={fromconv} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={theme ? "area" : "areanight"}>
                    <div className="areawrap">


                        {followfirst

                            ?


                            conversations.length != 0 || Currentchat != null ?

                                <>
                                    {Currentchat ?

                                        <>
                                            {loader ?
                                                <>
                                                    <div className="loadingscreen" ></div>

                                                </>

                                                :
                                                <>

                                                    {info ?
                                                        <>

                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={theme ? "w-6 h-6 chatcloud" : "w-6 h-6 chatcloudnight"}>
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                                            </svg>

                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={theme ? "w-6 h-6 chatuser" : "w-6 h-6 chatusernight"}>
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                                            </svg>

                                                            <span className={theme ? "selectconvo" : "selectconvonight"}> this chat had been deleted by you  </span>

                                                        </>



                                                        :
                                                        <>
                                                            <div className={theme ? "identitybar" : "identitybarnight"}>



                                                                {

                                                                    skeletonsemaphore.current

                                                                        ?

                                                                        <img className="identityimg" alt=" " src={ident != null ? ident.pfp : ' '} onClick={() => { viewprof(ident.username) }} />

                                                                        :

                                                                        <div className="identityimgskeleton">
                                                                            <Shimmer></Shimmer>
                                                                        </div>


                                                                }

                                                                {

                                                                    skeletonsemaphore.current

                                                                        ?

                                                                        <span className={theme ? "identityname" : "identitynamenight"} onClick={() => { viewprof(ident.username) }}>{ident != null ? ident.fname : ''}</span>

                                                                        :

                                                                        <div className="identityfnameskeleton">
                                                                            <Shimmer></Shimmer>
                                                                        </div>


                                                                }

                                                                {

                                                                    skeletonsemaphore.current

                                                                        ?

                                                                        <span className={theme ? "identityusrname" : "identityusrnamenight"} onClick={() => { viewprof(ident.username) }}>{ident != null ? `@${ident.username}` : ''}</span>

                                                                        :

                                                                        <div className="identityusernameskeleton">
                                                                            <Shimmer></Shimmer>
                                                                        </div>


                                                                }


                                                                {onlusers.includes(ident?.identid) && <div className="mark"></div>}
                                                                {nodel ?
                                                                    <div className="upperoptions">
                                                                        <div>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" className={theme ? "bi bi-arrow-return-left notdelsel" : "bi bi-arrow-return-left notdelsel topiconnight"} onClick={unselect} viewBox="0 0 16 16">
                                                                                <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z" />
                                                                            </svg>
                                                                        </div>

                                                                        <div>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" className={theme ? "bi bi-trash2-fill seldel" : "bi bi-trash2-fill seldel topiconnight"} onClick={groupdel} viewBox="0 0 16 16">
                                                                                <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z" />
                                                                            </svg>
                                                                        </div>
                                                                    </div>


                                                                    :

                                                                    <div>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className={theme ? "bi bi-trash3 topdelete" : "bi bi-trash3 topdelete topiconnight"} onClick={() => { delcon(Currentchat._id) }} viewBox="0 0 16 16">
                                                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                                                        </svg>
                                                                    </div>

                                                                }
                                                            </div>

                                                            <div ref={yarescroll} className="areawrapupper">
                                                                {messages.map((o) => (

                                                                    <div key={o._id} ref={chatclicked ? instantref : scrollref} className={!pfpobj[o._id] ? 'pdleft' : ''}>
                                                                        <Chatabyss onechat={o} own={o.sender === curuser.userid} ident={ident} status={o.status} id={o._id} rec={rectext} pfpobj={pfpobj} finalseen={finalseenobj} messages={messages} setMessages={setMessages} Currentchat={Currentchat} socket={socket} setShddel={setShddel} setTextdets={setTextdets} redisplaylane={redisplaylane} setRedisplaylane={setRedisplaylane} redselector={redselector} setRedselector={setRedselector} setNodel={setNodel} goback={goback} setGoback={setGoback} groupdeletion={groupdeletion} groupie={redselectorref.current[o._id]} safeinherit={safeinherit} setMultiplelast={setMultiplelast} sempahore={skeletonsemaphore.current} />
                                                                    </div>

                                                                ))}


                                                                <div ref={dotref}>

                                                                    {recsender === curuser.userid ?

                                                                        <>


                                                                            {realcurchat?.includes(Currentchat._id) &&

                                                                                <div className="typerimgdiv">

                                                                                    <img className="typerimg" alt=" " src={ident != null ? ident.pfp : ' '} />
                                                                                    <div className="typestatus" style={{ padding: '10px', marginTop: '4px', borderRadius: '20px', backgroundColor: 'rgb(30,36,36)', color: 'white', maxWidth: "60px" }}>
                                                                                        <div className="threedots">
                                                                                            <div className="adot">
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" height="8" width="8" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
                                                                                                    <circle cx="8" cy="8" r="8" />
                                                                                                </svg>
                                                                                            </div>
                                                                                            <div className="adot">
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" height="8" width="8" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
                                                                                                    <circle cx="8" cy="8" r="8" />
                                                                                                </svg>
                                                                                            </div>
                                                                                            <div className="adot">
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" height="8" width="8" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
                                                                                                    <circle cx="8" cy="8" r="8" />
                                                                                                </svg>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>

                                                                            }


                                                                        </>


                                                                        :


                                                                        <>

                                                                            {realcurchat?.includes(Currentchat._id) && <div className="typestatus" style={{ padding: '10px', marginLeft: '50px', marginTop: '11px', borderRadius: '20px', backgroundColor: 'rgb(30,36,36)', color: 'white', maxWidth: "60px" }}>
                                                                                <div className="threedots">
                                                                                    <div className="adot">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" height="8" width="8" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
                                                                                            <circle cx="8" cy="8" r="8" />
                                                                                        </svg>
                                                                                    </div>
                                                                                    <div className="adot">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" height="8" width="8" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
                                                                                            <circle cx="8" cy="8" r="8" />
                                                                                        </svg>
                                                                                    </div>
                                                                                    <div className="adot">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" height="8" width="8" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
                                                                                            <circle cx="8" cy="8" r="8" />
                                                                                        </svg>
                                                                                    </div>
                                                                                </div>
                                                                            </div>}

                                                                        </>

                                                                    }

                                                                </div>

                                                                <div ref={seendiv} style={{ padding: '10px' }}></div>

                                                                {newmsg && isscrollbar && <div className="fastscrollnew"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chat-fill" onClick={quickscroll} viewBox="0 0 16 16">
                                                                    <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z" />
                                                                </svg></div>}

                                                                {showfastscroll && <div className="fastscroll">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-down-circle-fill" onClick={quickscroll} viewBox="0 0 16 16">
                                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                                                                    </svg>
                                                                </div>}


                                                            </div>
                                                            <div className="areawraplower">
                                                                <textarea className={theme ? "chatfield" : "chatfieldnight"} placeholder="send message..." onChange={textdoer} value={newtext}></textarea>
                                                                <button className={istext ? "chatsender" : "chatsender blocked"} onClick={handlesender}>send</button>
                                                            </div>

                                                        </>
                                                    }

                                                </>

                                            }


                                        </>

                                        :


                                        <>

                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={theme ? "w-6 h-6 chatcloud" : "w-6 h-6 chatcloudnight"}>
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                            </svg>

                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={theme ? "w-6 h-6 chatuser" : "w-6 h-6 chatusernight"}>
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                            </svg>


                                            <span className={theme ? "selectconvo" : "selectconvonight"}>select a conversation to begin chatting !</span>
                                        </>




                                    }



                                </>

                                :

                                <>

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={theme ? "w-6 h-6 chatcloud" : "w-6 h-6 chatcloudnight"}>
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                    </svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={theme ? "w-6 h-6 chatuser" : "w-6 h-6 chatusernight"}>
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>

                                    <span className={theme ? "selectconvohuge" : "selectconvohugenight"}>follow someone to start chatting or have a look at recommendations !</span>
                                </>

                            :

                            <>
                                <div className="loadingscreen" ></div>

                            </>

                        }


                    </div>
                </div>
                <div className="currentonline ">
                    <div className="curonlinewrap">
                        <Onlinechatters onl={onlusers} setCurrentchat={setCurrentchat} Currentchat={Currentchat} setDraft={setDraft} draft={draft} outsider={outsider} setOutsider={setOutsider} semaphore={skeletonsemaphore.current} setOnlchatclicked={setOnlchatclicked} onlchatclicked={onlchatclicked} />
                    </div>

                </div>
                <div className={theme ? "homediv" : "homedivnight"} onClick={welcomeagain}>
                    <HomeIcon className={theme ? 'texthomeicon' : "texthomeiconnight"} />
                </div>
                <div className={theme ? "lowerblack" : "lowerblacknight"}></div>
            </div>
        </>

    );
}

export default Messenger;