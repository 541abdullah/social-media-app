let cors = require('cors');
let express = require('express');
const mongoose = require('mongoose');
let morgan = require('morgan');
let Userdetail = require('./models/userdet.js');
let Userdata = require('./models/userdata.js');
let Convo = require('./models/convos.js');
let Texter = require('./models/text.js');
let Lineup = require('./models/chatlineup.js');
let cookieParser = require('cookie-parser');
let jwt = require('jsonwebtoken');
let secret = '2eiuoh23n@%dcoe99wekd-$';
let helmet = require('helmet');
let dotenv = require('dotenv');


"use client";

const userRoute = require("./routes/users");
const postRoute = require("./routes/userposts");
const storyRoute = require("./routes/storystuff");
const notifRoute = require("./routes/notif");
const detschangeRoute = require("./routes/detschange");


dotenv.config();

const app = express();

app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


app.use(morgan('dev'));

app.use(express.json({ limit: '500kb' }));
app.use(express.urlencoded({ limit: '500kb', extended: true }));

app.use(function (err, req, res, next) {

    if (err.type === 'entity.too.large') {
        res.status(404).json("compression required");
    }
    else {
        next();
    }
})


app.use(helmet());


let decodedcook;

let jwtAuth = (req, res, next) => {
    const token = req.cookies.jwttoken;
    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(404).json('auth failed');
            }
            else {
                decodedcook = decoded;
                next();
            }
        })
    }
    else {
        res.status(404).json('auth failed');
    }
}




app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/story", storyRoute);
app.use("/notif", notifRoute);
app.use("/detschange", detschangeRoute);


//db connection


let dbURI = process.env.MONGO_dblink;
mongoose.connect(dbURI)
    .then((result) => {
        console.log('connection to the database was successful.');
        app.listen(3001);
    }).catch((error) => {
        console.log(error);
    });


app.post('/signup', (req, res) => {
    const { username, password, email, fullname } = req.body;

    let Userdetailinst = new Userdetail({
        username,
        password,
        email,
        fullname,
        profpic: process.env.DEF_image,
        bio: "Hello, I'm new to Evil Instagram",
        gender: "null",
        acctype: "Private",
        notifscreated: [],
        followreqsent: [],
        postsliked: [],
        postscommented: []

    });

    let Userdatainst = new Userdata({
        username,
        story: false,
        storycontent: [],
        storyseen: [],
        storydel: [],
        storylikes: [],
        pendingfollowreqs: [],
        blocklist: [],
        postsnum: 0

    })

    Userdetailinst.save()
        .then((result) => {
            Userdatainst.save()
                .then((result) => {
                }).catch((err) => {
                    console.log(err);
                });
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(404).json(`the password '${password}' is too short, please choose a longer password`);
        });

});

app.post("/login", (req, res) => {

    let { username, password } = req.body;
    Userdetail.login(username, password
    ).then((result) => {
        const userId = result._id;
        let token = jwt.sign({ userId }, secret, { expiresIn: 259200 });
        res.cookie('jwttoken', token, { httpOnly: true, maxAge: 259200 * 1000 });
        res.status(200).json('okay');

    }).catch((err) => {
        console.log(err);
        res.status(404).json('failure');
    });

})


app.get('/takenusername/:username', (req, res) => {
    let username = req.params.username;

    Userdetail.findOne({
        username: username
    }).then((result) => {
        if (result === null) {
            res.status(200).send('null');
        }
        else {
            res.status(404).json(result);
        }
    }).catch((err) => {
        console.log(err);
    });


});


app.get('/takenemail/:email', (req, res) => {
    let email = req.params.email;

    Userdetail.findOne({
        email: email
    }).then((result) => {
        if (result === null) {
            res.status(200).send('null');
        }
        else {
            res.status(404).json(result);
        }
    }).catch((err) => {
        console.log(err);
    });


});


app.get('/welcome', jwtAuth, (req, res, next) => {


    Userdetail.findOne({
        _id: decodedcook.userId
    }).then((result) => {
        Userdata.findOne({
            username: result.username
        }).then((r) => {
            if (r.following == []) {
                res.status(200).json({
                    username: result.username,
                    profpic: result.profpic,
                    userstory: r.storycontent,
                    emailID: result.email,
                    fname: result.fullname,
                    userid: result._id,
                    following: r.following,
                    blocklist: r.blocklist,
                    story: r.story,
                    acctype: result.acctype
                });
            }
            else {

                let helperarr = r.following.map((each) => each.username);


                Promise.all(helperarr.map((frens) => {
                    return Userdetail.findOne({ username: frens });
                })).then((arr) => {
                    let final = arr.map((each) => {
                        return each._id;
                    })

                    res.status(200).json({


                        username: result.username,
                        profpic: result.profpic,
                        userstory: r.storycontent,
                        emailID: result.email,
                        fname: result.fullname,
                        userid: result._id,
                        following: final,
                        blocklist: r.blocklist,
                        story: r.story,
                        gender: result.gender,
                        bio: result.bio,
                        acctype: result.acctype,
                        postsliked: result.postsliked,
                        postscommented: result.postscommented,
                        followreqsent: result.followreqsent,
                        notifscreated: result.notifscreated

                    });
                }).catch((err) => {
                    console.log(err);
                })
            }
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    })

});

app.get('/messenger', jwtAuth, (req, res, next) => {

});

app.get('/logout', (req, res) => {
    res.cookie('jwttoken', ' ', { maxAge: 1 });
    res.json('cookie replaced, user logged out');
});

app.post('/stories', (req, res) => {
    let username = req.body.username;

    Userdata.findOne({
        username: username
    }).then((result) => {

        let helperarr = result.following.map((each) => each.username);

        Promise.all(helperarr.map((eachuser) => {

            return Userdata.findOne({
                username: eachuser, story: true
            })


        })).then((arr) => {

            arr = arr.filter((each) => each != null);


            let buffer = arr.map((each) => {
                return each.storycontent;
            })
            Promise.all(arr.map((each) => {
                if (each === null) {
                }
                else {
                    return Userdetail.findOne({
                        username: each.username
                    })

                }
            })).then((arr2) => {
                finalarr = arr2.map((each) => {
                    let retarray = [each.profpic, each.username];
                    return retarray;
                })
                let q = -1;
                let bossarr = finalarr.map((each) => {
                    q = q + 1;
                    return [each[0], each[1], buffer[q]];
                })

                res.status(200).json({ array: bossarr });

            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    })

})







app.post('/newstory', (req, res) => {


    Userdata.findOneAndUpdate({ username: req.body.username }, { story: true, storycontent: req.body.stories }, {
        new: true
    }).then((res) => {

    }).catch((err) => {
        console.log(err);
    })

})

app.get('/stories/:usr', (req, res) => {

    let username = req.params.usr;
    Userdata.findOne({
        username
    }).then((result) => {
        res.status(200).json({ content: result.storycontent });
    }).catch((err) => {
    })

});



app.post("/messenger/create", (req, res) => {
    let newconvo = new Convo({
        members: [req.body.senderId, req.body.receiverId],
        holders: [req.body.senderId, req.body.receiverId]
    })

    newconvo.save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
        });

});


app.post("/messenger/alreadyconv/checker", (req, res) => {

    Convo.findOne({
        members: { $all: req.body }
    }).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(404).json('failed');
    })

});


app.post("/messenger/changingholders/:id", (req, res) => {

    Convo.updateOne({ _id: req.params.id }, { holders: req.body }, {
        new: true
    }).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(404).json(err);
    })

});


app.post("/messenger/lineupholder/:id", (req, res) => {


    async function updater() {


        const response = await Lineup.findOne({ userid: req.params.id });

        let filterarr = response.lineup.filter((each) => {
            return each._id === req.body.curchat;
        });

        let realfilterarr = response.lineup.filter((each) => {
            return each._id !== req.body.curchat;
        })

        filterarr[0].holders = req.body.members;
        realfilterarr.unshift(filterarr[0]);

        const newresp = await Lineup.findOneAndUpdate({ userid: req.params.id }, { lineup: realfilterarr }, { new: true });
        res.status(200).json(newresp);

    }

    updater();

});


app.post("/messenger/holderedit/:id", (req, res) => {

    Convo.updateOne({ _id: req.body.curchat }, { holders: req.body.members }, {
        new: true
    }).then((result) => {
        res.status(200).json("success");
    }).catch((err) => {
        res.status(404).json(err);
    })

});



app.post("/messenger/send", (req, res) => {


    let newmsg = new Texter(req.body);

    newmsg.save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
})


app.post("/messenger/incrementer/:id", (req, res) => {


    Texter.find({
        conversationId: req.params.id
    }).then((result) => {

        let parray = result.map((each) => {

            if (req.body.new == true) {

                let prevvalue = each.order[req.body.id];
                delete each.order[req.body.id];

                if (req.body.user === 'curuser') {
                    return Texter.updateOne({ _id: each._id }, { "$set": { order: { ...each.order, [req.body.id]: prevvalue + 1 }, branding: [...each.branding, req.body.brand] } }, { new: true });
                } else {
                    return Texter.updateOne({ _id: each._id }, { "$set": { order: { ...each.order, [req.body.id]: prevvalue + 1 }, recbranding: [...each.recbranding, req.body.brand] } }, { new: true });
                }

            } else {

                let prevvalue = each.order[req.body.id];
                if (prevvalue < req.body.comparerval) {

                    delete each.order[req.body.id];

                    if (req.body.user === 'curuser') {
                        return Texter.updateOne({ _id: each._id }, { "$set": { order: { ...each.order, [req.body.id]: prevvalue + 1 }, branding: [...each.branding, req.body.brand] } }, { new: true });
                    } else {
                        return Texter.updateOne({ _id: each._id }, { "$set": { order: { ...each.order, [req.body.id]: prevvalue + 1 }, recbranding: [...each.recbranding, req.body.brand] } }, { new: true });
                    }

                }

            }

        });

        Promise.all(parray
        ).then((rese) => {
            res.status(200).json('successfull increment');
        }).catch((err) => {
            res.status(200).json('falied increment');
        })

    }).catch((err) => {

        res.status(404).json('failed increment');
    });

})


app.post("/messenger/decrementer/:id", (req, res) => {


    Texter.find({
        conversationId: req.params.id
    }).then((result) => {


        if (result.length != 0) {

            let parray = result.map((each) => {


                if (req.body.user === 'receiver') {


                    if (req.body.brand.entrusted != undefined) {

                        for (let i = 0; i < req.body.brand.entrusted.length; i++) {

                            if (each.branding.includes(req.body.brand.entrusted[i])) {

                                let newbranding = each.branding.filter((each) => {
                                    return each != req.body.brand.entrusted[i];
                                });

                                let prevvalue = each.order[req.body.id[0]];
                                delete each.order[req.body.id[0]];

                                return Texter.updateOne({ _id: each._id }, { "$set": { order: { ...each.order, [req.body.id[0]]: prevvalue - 1 }, branding: newbranding } }, { new: true });

                            }
                        }
                    }

                    for (let i = 0; i < req.body.brand.own.length; i++) {

                        if (each.recbranding.includes(req.body.brand.own[i])) {

                            let newbranding = each.recbranding.filter((each) => {
                                return each != req.body.brand.own[i];
                            });


                            let prevvalue = each.order[req.body.id[0]];
                            delete each.order[req.body.id[0]];

                            return Texter.updateOne({ _id: each._id }, { "$set": { order: { ...each.order, [req.body.id[0]]: prevvalue - 1 }, recbranding: newbranding } }, { new: true });

                        }

                    }

                }

                else {


                    if (req.body.brand.entrusted != undefined) {

                        for (let i = 0; i < req.body.brand.entrusted.length; i++) {

                            if (each.recbranding.includes(req.body.brand.entrusted[i])) {

                                let newbranding = each.recbranding.filter((each) => {
                                    return each != req.body.brand.entrusted[i];
                                });

                                let prevvalue = each.order[req.body.id[0]];
                                delete each.order[req.body.id[0]];

                                return Texter.updateOne({ _id: each._id }, { "$set": { order: { ...each.order, [req.body.id[0]]: prevvalue - 1 }, recbranding: newbranding } }, { new: true });

                            }

                        }

                    }


                    for (let i = 0; i < req.body.brand.own.length; i++) {

                        if (each.branding.includes(req.body.brand.own[i])) {

                            let newbranding = each.branding.filter((each) => {
                                return each != req.body.brand.own[i];
                            });
                            let prevvalue = each.order[req.body.id[0]];
                            delete each.order[req.body.id[0]];

                            return Texter.updateOne({ _id: each._id }, { "$set": { order: { ...each.order, [req.body.id[0]]: prevvalue - 1 }, branding: newbranding } }, { new: true });

                        }

                    }


                }


            });

            let proarray = parray.filter((each) => {
                return each != null;
            })


            if (proarray.length == 0) {

                res.status(200).json('process over');

            } else {
                Promise.all(proarray
                ).then((rese) => {
                    res.status(200).json('successfull decrement');
                }).catch((err) => {
                    res.status(200).json('falied decrement');
                })

            }
        } else {
            res.status(200).json('process over');
        }

    }).catch((err) => {
        res.status(404).json('failed decrement');
    });

})


app.post("/messenger/decrementer/deltype/:id", (req, res) => {

    Texter.find({
        conversationId: req.params.id
    }).then((result) => {

        let parray = result.map((each) => {

            let prevvalue = each.order[req.body.userid];
            delete each.order[req.body.userid];
            return Texter.updateOne({ _id: each._id }, { "$set": { order: { ...each.order, [req.body.userid]: prevvalue - 1 } } }, { new: true });

        });

        Promise.all(parray
        ).then((rese) => {
            res.status(200).json('successfull decrement');
        }).catch((err) => {
            res.status(404).json('failed decrement');
        })

    }).catch((err) => {

        res.status(404).json('falied decrement');

    });



});



app.post("/messenger/inheritance", (req, res) => {

    const inheritor = async () => {
        const response = await Texter.findOneAndUpdate({ _id: req.body.inheritorid }, { "$set": { brand: req.body.newbrand, effected: req.body.neweffected, receffected: req.body.newreceffected } }, { new: true });
        res.status(200).send(response);
    }

    inheritor();

})


app.post("/messenger/findmytextsifany/:userid", (req, res) => {

    async function finder() {
        let response = await Texter.find({ conversationId: req.body.convid, holders: { $in: req.params.userid } });
        res.status(200).json(response);
    }

    finder();

})


app.get("/messenger/getfren/:user", (req, res) => {


    let userid = req.params.user;
    let realname = null;

    Userdetail.findOne({
        _id: userid
    }).then((result) => {
        realname = result.username;
        Userdata.findOne({
            username: realname
        }).then((result) => {

            let helperarr = result.following.map((each) => each.username);
            Promise.all(helperarr.map((frens) => {
                return Userdetail.findOne({ username: frens });
            })).then((arr) => {

                let frenvector = [];
                arr.map((each) => {
                    const { _id, username, fullname, profpic } = each;
                    frenvector.push({ _id, username, fullname, profpic });
                });
                res.status(200).json(frenvector);
            }).catch((err) => {
                res.status(404).json(err);
            })
        }).catch((err) => {
            res.status(404).json(err);
        });
    }).catch((err) => {
        res.status(404).json(err);
    });

})


app.get("/messenger/getconvostuff/:id", (req, res) => {

    let theid = req.params.id;

    Userdetail.findOne({
        _id: theid
    }).then((result) => {

        Userdata.findOne({
            username: result.username
        }).then((resultin) => {

            let newobj = {
                pfp: result.profpic,
                username: result.username,
                fname: result.fullname,
                blocked: resultin.blocklist
            }
            res.status(200).json(newobj);

        })

    }).catch((err) => {
        res.status(404).json(err);
    });

})

app.get("/messenger/seen/:textid", (req, res) => {

    Texter.findOneAndUpdate({ _id: req.params.textid }, { status: true }, {
        new: true
    }).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(404).json(err);
    })

})


app.post("/messenger/findatleastone/:userid", (req, res) => {


    async function onefinder() {

        let flag = false;

        const response = await Texter.find({ conversationId: req.body.convid });
        if (response === null) {
            res.status(200).json({ ans: response });
        } else {


            for (let i = 0; i < response.length; i++) {


                if (response[i].holders.includes(req.params.userid)) {
                    flag = true;
                    res.status(200).json('Green');
                    break;
                }

            }

            if (!flag) {
                res.status(200).json({ ans: null });
            }
        }
    }

    onefinder();

})

app.delete("/messenger/delete/:id", (req, res) => {
    Texter.deleteOne({
        _id: req.params.id
    }).then((result) => {
        res.status(200).json(" text deletion successfull");
    }).catch((err) => {
    })
})


app.post("/messenger/conv/remover/:id", (req, res) => {


    Lineup.findOne({
        userid: req.params.id
    }).then((result) => {


        if (req.body.curuser == undefined) {
            let newlineup = result.lineup.filter((each) => each._id !== req.body.convid);

            let tempobj = result.unread;
            delete tempobj[req.body.convid];

            Lineup.findOneAndUpdate({ userid: req.params.id }, { "$set": { unread: tempobj, lineup: newlineup } }, {
                new: true
            }).then((result) => {
                res.status(200).json(result);
            }).catch((err) => {
                res.status(404).json(err);
            })

        }
        else {

            let onevalarray = result.lineup.filter((each) => each._id === req.body.convid);
            let idx = result.lineup[result.lineup.indexOf(onevalarray[0])].holders.indexOf(req.body.curuser);
            let tempobj = result.unread;
            delete tempobj[req.body.convid];

            if (idx == 0) {
                result.lineup[result.lineup.indexOf(onevalarray[0])].holders.shift();
            } else if (idx == 1) {
                result.lineup[result.lineup.indexOf(onevalarray[0])].holders.pop();
            }

            Lineup.findOneAndUpdate({ userid: req.params.id }, { "$set": { unread: tempobj, lineup: result.lineup } }, {
                new: true
            }).then((result) => {
                res.status(200).json(result);
            }).catch((err) => {
                res.status(404).json(err);
            })

        }

    }).catch((err) => {
        res.status(404).json('failed');
    });

})

app.post("/messenger/convholder/remover", (req, res) => {

    Convo.findOne({
        _id: req.body.convid
    }).then((result) => {

        if (result.holders.length == 1) {
            Convo.deleteOne({
                _id: req.body.convid
            }).then((result) => {

                Texter.deleteMany({
                    conversationId: req.body.convid
                }).then((result) => {
                    res.status(200).json('process completed without issues');
                }).catch((err) => {
                    res.status(404).json('process failed');
                });

            }).catch((err) => {
                res.status(404).json('process failed');
            });
        }

        else {

            let oneholder = result.holders.filter((each) => each != req.body.userid);

            Convo.updateOne({ _id: req.body.convid }, { holders: oneholder }, {
                new: true
            }).then((result) => {

                Texter.deleteMany({
                    conversationId: req.body.convid, status: false
                }).then((result) => {

                    Texter.updateMany({ conversationId: req.body.convid }, {
                        holders: oneholder
                    }).then((result) => {
                        res.status(200).json('process completed without issues');
                    }).catch((err) => {

                        res.status(404).json('process failed');
                    });

                }).catch((err) => {

                })

            }).catch((err) => {
                res.status(404).json('process failed');
            });

        }

    }).catch((err) => {
        res.status(404).json('failed');
    });

})



app.post("/messenger/convdel/reorder/:id", (req, res) => {

    Texter.find({
        conversationId: req.body.converid
    }).then((result) => {

        if (result.length != 0) {

            let idx = result[result.length - 1].order[req.params.id];

            Lineup.findOne({
                userid: req.params.id
            }).then((result) => {

                let onevalarray = result.lineup.filter((each) => each._id === req.body.converid);
                let reordered = result.lineup.filter((each) => each._id !== req.body.converid);

                reordered.splice(idx, 0, onevalarray[0]);

                Lineup.findOneAndUpdate({ userid: req.params.id }, { "$set": { lineup: reordered } }, {
                    new: true
                }).then((result) => {
                    res.status(200).json(result);
                }).catch((err) => {
                    res.status(404).json(err);
                })

            }).catch((err) => {

            })

        }
        else {

            res.status(200).json('process terminated');
        }

    }).catch((err) => {

    })

})


app.get("/messenger/ex/:convId", (req, res) => {

    Texter.find({
        conversationId: req.params.convId
    }).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(404).json(err);
    })
})


app.get("/messenger/checker/:convid", (req, res) => {
    let convid = req.params.convid;

    Texter.findOne({
        conversationId: convid
    }).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(404).json(err);
    })

})

app.delete("/messenger/delconv/:draft", (req, res) => {

    Convo.deleteOne({
        _id: req.params.draft
    }).then((result) => {
        res.status(200).json("deletion successfull");
    }).catch((err) => {

    })

})



app.get("/messenger/lineup/checker/:userid", (req, res) => {
    let id = req.params.userid;

    Lineup.findOne({
        userid: id
    }).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(404).json(err);
    })

});


app.get("/messenger/lineup/order/:userid", (req, res) => {

    let id = req.params.userid;

    Lineup.findOne({
        userid: id
    }).then((result) => {

        if (result != null) {

            let temparr = result.lineup.map((each) => {
                let searchid = each.members.filter((each) => each != id);
                return Userdetail.findOne({ _id: searchid });
            });

            Promise.all(temparr
            ).then((rese) => {
                let finalarr = rese.map((each) => {
                    return [each.fullname, each.username, each._id];
                })
                let theobj = { convs: result, searchhelper: finalarr };
                res.status(200).json(theobj);
            }).catch((err) => {
            });

        }



    }).catch((err) => {
        res.status(404).json(err);
    })

});


app.post("/messenger/lineup/create", (req, res) => {
    let newentry = new Lineup(req.body);

    newentry.save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json(err);
        })


});

app.post("/messenger/lineup/:userid", (req, res) => {

    if (req.body.username != undefined) {

        Lineup.findOneAndUpdate({ userid: req.params.userid }, { "$set": { unread: req.body.unread, username: req.body.username, lineup: req.body.lineup } }, {
            new: true
        }).then((result) => {
            res.status(200).json('success');
        }).catch((err) => {
            res.status(404).json('failed');
        })

    }

    else {

        Lineup.findOneAndUpdate({ userid: req.params.userid }, { "$set": { unread: req.body.unread, lineup: req.body.lineup } }, {
            new: true
        }).then((result) => {
            res.status(200).json('success');
        }).catch((err) => {
            res.status(404).json('failed');
        })

    };

});


app.get("/messenger/:userId", (req, res) => {

    Convo.find({
        members: { $in: [req.params.userId] }
    }).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json(err);
    })
})

app.post("/colorchecker/:username", async (req, res) => {

    try {

        const result = await Userdata.findOne({ username: req.params.username });

        if (result.storyseen.includes(req.body.username)) {
            res.status(200).json(true);
        } else {
            res.status(200).json(false);
        }

    } catch (err) {
        res.status(404).json(err);
    }

})




