const bcrypt = require('bcrypt');
const router = require('express').Router();
let Userdetail = require('../../models/userdet.js');
let Userdata = require('../../models/userdata.js');
const Post = require('../../models/posts.js');
const Notif = require('../../models/notifs.js');
let Convo = require('../../models/convos.js');
let Texter = require('../../models/text.js');
let Lineup = require('../../models/chatlineup.js');


router.put("/userupdate/:id", async (req, res) => {

    if (req.body.password) {

        let newval;

        try {
            const salt = await bcrypt.genSalt();
            newval = await bcrypt.hash(req.body.password, salt);
        }
        catch (err) {
            return res.status(500).json(err);

        }
        await Userdetail.findByIdAndUpdate({ _id: req.params.id }, { password: newval });
    }

    if (req.body.bio) {
        await Userdetail.findByIdAndUpdate({ _id: req.params.id }, { bio: req.body.bio });
    }

    if (req.body.gender) {
        await Userdetail.findByIdAndUpdate({ _id: req.params.id }, { gender: req.body.gender });
    }

    if (req.body.accstatus) {
        await Userdetail.findByIdAndUpdate({ _id: req.params.id }, { acctype: req.body.accstatus });
    }

    if (req.body.name) {

        let mydets = await Userdetail.findOne({ username: req.body.username });
        mydets.fullname = req.body.name.new;

        let mypeople = await Userdata.findOne({ username: req.body.username });


        let followinglist = mypeople.following.map(async (each) => {
            return await Userdata.findOne({ username: each.username });
        })

        let followingnames = await Promise.all(followinglist);

        let newfollowers;
        let megafollowers = [];

        followingnames.forEach((each) => {
            newfollowers = each.followers.map((eachlet) => {
                if (eachlet.username == req.body.username) {
                    eachlet.fullname = req.body.name.new;
                }

                return eachlet
            })
            megafollowers.push(newfollowers);
        })

        let followerlist = mypeople.followers.map(async (each) => {
            return await Userdata.findOne({ username: each.username });
        })

        let followernames = await Promise.all(followerlist);


        let newfollowing;
        let megafollowing = [];

        followernames.forEach((each) => {
            newfollowing = each.following.map((eachlet) => {
                if (eachlet.username == req.body.username) {
                    eachlet.fullname = req.body.name.new;
                }

                return eachlet
            })
            megafollowing.push(newfollowing);
        })


        let i = -1;
        let finalfollowingupdates = mypeople.following.map(async (each) => {
            i += 1;
            return await Userdata.findOneAndUpdate({ username: each.username }, { '$set': { followers: megafollowers[i] } });
        })


        i = -1;
        let finalfollowerupdates = mypeople.followers.map(async (each) => {
            i += 1;
            return await Userdata.findOneAndUpdate({ username: each.username }, { '$set': { following: megafollowing[i] } });
        })



        let pendingreqs = mydets.followreqsent.map(async (each) => {

            return await Userdata.findOne({ username: each });

        })

        let didntaccept = await Promise.all(pendingreqs);

        let newaccept;
        let megaaccept = [];

        didntaccept.forEach((each) => {
            newaccept = each.pendingfollowreqs.map((eachlet) => {
                if (eachlet.username == req.body.username) {
                    eachlet.fullname = req.body.name.new;
                }

                return eachlet
            })
            megaaccept.push(newaccept);
        })

        i = -1;
        let finalrequpdates = mydets.followreqsent.map(async (each) => {
            i += 1;
            return await Userdata.findOneAndUpdate({ username: each }, { '$set': { pendingfollowreqs: megaaccept[i] } });
        })

        let likedposts = mydets.postsliked.map(async (each) => {

            return await Post.findOne({ _id: each });


        });

        let alllikes = await Promise.all(likedposts);

        let newlikes;
        let megalikes = [];

        alllikes.forEach((each) => {
            newlikes = each.likes.map((eachlet) => {
                if (eachlet.username == req.body.username) {
                    eachlet.fullname = req.body.name.new;
                }

                return eachlet
            })
            megalikes.push(newlikes);
        })

        i = -1;
        let finallikeupdates = mydets.postsliked.map(async (each) => {
            i += 1;
            return await Post.findOneAndUpdate({ _id: each }, { '$set': { likes: megalikes[i] } });
        })


        let finalnotifupdates = mydets.notifscreated.map(async (each) => {
            return await Notif.findOneAndUpdate({ _id: each }, { '$set': { fromfname: req.body.name.new } });
        })

        await Userdetail.findOneAndUpdate({ username: req.body.username }, { '$set': { fullname: mydets.fullname } });
        await Promise.all(finalfollowerupdates);
        await Promise.all(finalfollowingupdates);
        await Promise.all(finalrequpdates);
        await Promise.all(finallikeupdates);
        await Promise.all(finalnotifupdates);

    }




})


router.delete("/userdelete/:id", async (req, res) => {

    let mydets = await Userdetail.findOne({ username: req.body.username });

    let storywatcher = await Userdata.find({ storyseen: { $in: [req.body.username] } });

    let newwatcher;
    let megawatcher = [];

    storywatcher.forEach((each) => {
        newwatcher = each.storyseen.filter((eachlet) => eachlet != req.body.username);
        megawatcher.push(newwatcher);
    })

    let i = -1;
    let finalstoryupdates = storywatcher.map(async (each) => {
        i += 1;
        return await Userdata.findOneAndUpdate({ username: each.username }, { '$set': { storyseen: megawatcher[i] } });
    })

    let pendingreqs = mydets.followreqsent.map(async (each) => {

        return await Userdata.findOne({ username: each });

    })

    let didntaccept = await Promise.all(pendingreqs);


    let newaccept;
    let megaaccept = [];

    didntaccept.forEach((each) => {
        newaccept = each.pendingfollowreqs.filter((eachlet) => eachlet.username != req.body.username);
        megaaccept.push(newaccept);
    })

    i = -1;
    let finalrequpdates = mydets.followreqsent.map(async (each) => {
        i += 1;
        return await Userdata.findOneAndUpdate({ username: each }, { '$set': { pendingfollowreqs: megaaccept[i] } });
    })

    let finalnotifupdates = mydets.notifscreated.map(async (each) => {
        return await Notif.findOneAndDelete({ _id: each });
    })
    let commentedposts = mydets.postscommented.map(async (each) => {

        return await Post.findOne({ _id: each });


    });

    let allcomments = await Promise.all(commentedposts);

    let newcomments = [];
    let megacomments = [];

    allcomments.forEach((each) => {
        newcomments = each.comments.filter((eachlet) => {
            return eachlet.username != req.body.username;
        });
        megacomments.push(newcomments);
    })

    i = -1;
    let finalcommentupdates = mydets.postscommented.map(async (each) => {
        i += 1;
        return await Post.findOneAndUpdate({ _id: each }, { '$set': { comments: megacomments[i] } });
    })

    const allposts = await Post.find({ username: req.body.username });

    for (let i = 0; i < allposts.length; i++) {
        await Post.findOneAndDelete({ _id: allposts[i]._id });
    }

    let mypeople = await Userdata.findOne({ username: req.body.username });
    let followinglist = mypeople.following.map(async (each) => {
        return await Userdata.findOne({ username: each.username });
    })

    let followingnames = await Promise.all(followinglist);

    let newfollowers;
    let megafollowers = [];

    followingnames.forEach((each) => {
        newfollowers = each.followers.filter((eachlet) => eachlet.username != req.body.username)
        megafollowers.push(newfollowers);
    })


    let followerlist = mypeople.followers.map(async (each) => {
        return await Userdata.findOne({ username: each.username });
    })

    let followernames = await Promise.all(followerlist);
    let newfollowing;
    let megafollowing = [];

    followernames.forEach((each) => {
        newfollowing = each.following.filter((eachlet) => eachlet.username != req.body.username)
        megafollowing.push(newfollowing);
    })

    i = -1;
    let finalfollowingupdates = mypeople.following.map(async (each) => {
        i += 1;
        return await Userdata.findOneAndUpdate({ username: each.username }, { '$set': { followers: megafollowers[i] } });
    })

    i = -1;
    let finalfollowerupdates = mypeople.followers.map(async (each) => {
        i += 1;
        return await Userdata.findOneAndUpdate({ username: each.username }, { '$set': { following: megafollowing[i] } });
    })


    let allconvs = await Convo.find();
    let targetconvs = [];
    let lineupdeleter = {};
    let otherid;

    for (let i = 0; i < allconvs.length; i++) {

        let flag = 0;

        for (let j = 0; j < allconvs[i].members.length; j++) {
            if (allconvs[i].members[j] == req.params.id) {
                flag = 1;
            } else {
                otherid = allconvs[i].members[j];
            }
        }

        if (flag == 0) {

            for (let j = 0; j < allconvs[i].holders.length; j++) {
                if (allconvs[i].holders[j] == req.params.id) {
                    flag = 1;
                } else {
                    otherid = allconvs[i].members[j];
                }
            }

        }

        if (flag == 1) {
            targetconvs.unshift(allconvs[i]._id);
            lineupdeleter[otherid] = allconvs[i]._id;
            await Convo.findOneAndDelete({ _id: allconvs[i]._id });
        }

    }


    let allbubbles = await Texter.find();
    let bubbledel = [];

    for (let i = 0; i < targetconvs.length; i++) {
        for (let j = 0; j < allbubbles.length; j++) {
            if (allbubbles[j].conversationId == targetconvs[i]) {
                bubbledel.unshift(allbubbles[j]._id);
            }
        }
    }


    for (let i = 0; i < bubbledel.length; i++) {
        await Texter.findOneAndDelete({ _id: bubbledel[i] });
    }

    let targets = Object.keys(lineupdeleter);

    let targetlist = targets.map(async (each) => {
        return await Lineup.findOne({ userid: each });
    })


    let targetnames = await Promise.all(targetlist);

    let newlineup;
    let megalineup = [];

    targetnames.forEach((each) => {
        newlineup = each.lineup.filter((eachlet) => eachlet._id != lineupdeleter[each.userid])
        megalineup.push(newlineup);
    })

    i = -1;
    let finallineupupdates = targets.map(async (each) => {
        i += 1;
        return await Lineup.findOneAndUpdate({ userid: each }, { '$set': { lineup: megalineup[i] } });
    })

    await Lineup.findOneAndDelete({ username: req.body.username });

    await Userdata.findOneAndDelete({ username: req.body.username });
    await Userdetail.findOneAndDelete({ username: req.body.username });
    await Promise.all(finalfollowerupdates);
    await Promise.all(finalfollowingupdates);
    await Promise.all(finalrequpdates);
    await Promise.all(finalcommentupdates);
    await Promise.all(finalnotifupdates);
    await Promise.all(finallineupupdates);
    await Promise.all(finalstoryupdates);


})


router.get("/visit/:username/:ownidentity", async (req, res) => {


    try {


        let result = await Userdetail.findOne({ username: req.params.username });
        let secondresult = await Userdata.findOne({ username: req.params.username });
        let ownresult = await Userdata.findOne({ username: req.params.ownidentity });
        let totalarray = ownresult.following.map((each) => each.username);

        for (let i = 0; i < ownresult.followers.length; i++) {
            if (!totalarray.includes(ownresult.followers[i].username)) {
                totalarray.push(ownresult.followers[i].username);
            }
        }

        let matchedarray = secondresult.followers.map((each) => each.username);
        let mutualpeople = totalarray.map((each) => {
            if (matchedarray.includes(each)) {
                return each;
            }
        })

        let finalmutualpeople = mutualpeople.filter((each) => each != null);

        let { password, ...rest } = result._doc;
        let { _id, ...secondrest } = secondresult._doc;
        let data = { ...rest, ...secondrest, mutualpeople: finalmutualpeople };


        res.status(200).json(data);

    } catch (err) {

        res.status(200).json("user not found");

    }

})



router.put("/follow/:username", async (req, res) => {


    try {

        let mydets = await Userdetail.findOne({ username: req.body.username });
        let persondets = await Userdata.findOne({ username: req.params.username });

        let newobj = {
            username: mydets.username,
            fullname: mydets.fullname,
            pfp: mydets.profpic
        };

        persondets.pendingfollowreqs.push(newobj);
        mydets.followreqsent.push(req.params.username);
        await Userdata.findOneAndUpdate({ username: persondets.username }, { '$set': { pendingfollowreqs: persondets.pendingfollowreqs } });
        await Userdetail.findOneAndUpdate({ username: mydets.username }, { '$set': { followreqsent: mydets.followreqsent } });

        res.status(200).json("request sent");

    } catch (err) {

        res.status(404).json(err);

    }

})


router.put("/followcancel/:username", async (req, res) => {


    try {

        let mydets = await Userdetail.findOne({ username: req.body.username });
        let persondets = await Userdata.findOne({ username: req.params.username });

        let newarray = persondets.pendingfollowreqs.filter((each) => each.username != req.body.username);
        let newreqsentarray = mydets.followreqsent.filter((each) => each != req.params.username);
        await Userdata.findOneAndUpdate({ username: persondets.username }, { '$set': { pendingfollowreqs: newarray } });
        await Userdetail.findOneAndUpdate({ username: req.body.username }, { '$set': { followreqsent: newreqsentarray } });
        res.status(200).json("request sent");

    } catch (err) {

        res.status(404).json(err);

    }

})


router.put("/unfollow/:username", async (req, res) => {

    if (req.query.valid == 'redirect further') {

        const temp = req.body.username;
        req.body = { username: req.params.username };
        req.params.username = temp;

    }




    try {

        let mydets = await Userdata.findOne({ username: req.body.username });
        let persondets = await Userdata.findOne({ username: req.params.username });

        let updatedfollowers = persondets.followers.filter((each) => each.username != mydets.username);
        await Userdata.findOneAndUpdate({ username: persondets.username }, { followers: updatedfollowers });

        let updatedfollowing = mydets.following.filter((each) => each.username != persondets.username);
        await Userdata.findOneAndUpdate({ username: mydets.username }, { following: updatedfollowing });

        if (req.query.valid === 'redirect further') {

            const str = encodeURIComponent('end of loop');
            res.redirect("/users/block/:loopend?valid=" + str);

        } else {

            res.status(200).json("user unfollowed");

        }

    } catch (err) {

        res.status(404).json(err);

    }

})


router.put("/accepted/:username", async (req, res) => {

    try {

        let mydets = await Userdata.findOne({ username: req.params.username });

        let newobj = {
            username: req.body.username,
            pfp: req.body.pfp,
            fullname: req.body.fullname
        }

        mydets.followers.push(newobj);
        await Userdata.findOneAndUpdate({ username: mydets.username }, { followers: mydets.followers });
        let myfollowerdets = await Userdata.findOne({ username: req.body.username });
        let myotherdets = await Userdetail.findOne({ username: req.params.username });

        let newobjtwo = {
            username: myotherdets.username,
            pfp: myotherdets.profpic,
            fullname: myotherdets.fullname
        }

        myfollowerdets.following.push(newobjtwo);

        await Userdata.findOneAndUpdate({ username: req.body.username }, { following: myfollowerdets.following });
        res.status(200).json("user request accepted");

    } catch (err) {

        res.status(404).json(err);

    }


})


router.put("/removal/:username", async (req, res) => {

    try {

        let mydets = await Userdata.findOne({ username: req.params.username });
        let updatedfollowers = mydets.followers.filter((each) => each.username != req.body.username);
        await Userdata.findOneAndUpdate({ username: mydets.username }, { followers: updatedfollowers });
        let myexfollowerdets = await Userdata.findOne({ username: req.body.username });
        let updatedfollowing = myexfollowerdets.following.filter((each) => each.username != mydets.username);
        await Userdata.findOneAndUpdate({ username: req.body.username }, { following: updatedfollowing });


        if (req.query.valid === 'redirect further') {

            const str = encodeURIComponent('redirect further');
            res.redirect(`/users/unfollow/${req.params.username}?valid=` + str);

        } else {
            res.status(200).json("user removed from followers");
        }


    } catch (err) {

        res.status(404).json(err);

    }


})



router.put("/block/:username", async (req, res) => {

    try {

        if (req.query.valid == "end of loop") {

            res.status(200).json("user blocked");

        } else {

            let mydets = await Userdata.findOne({ username: req.params.username });
            mydets.blocklist.push(req.body.username);
            await Userdata.findOneAndUpdate({ username: mydets.username }, { blocklist: mydets.blocklist });
            const str = encodeURIComponent('redirect further');
            res.redirect(`/users/removal/${req.params.username}?valid=` + str);

        }

    } catch (err) {

        res.status(404).json(err);
    }

})

router.put("/unblock/:username", async (req, res) => {

    try {

        let mydets = await Userdata.findOne({ username: req.params.username });
        let newblocklist = mydets.blocklist.filter((each => each != req.body.username));
        await Userdata.findOneAndUpdate({ username: mydets.username }, { blocklist: newblocklist });
        res.status(200).json("user unblocked");

    } catch (err) {

        res.status(404).json(err);

    }
})

router.get("/getall", async (req, res) => {

    try {

        let alldets = await Userdetail.find();
        const necarray = alldets.map((each) => {
            return { usr: each.username, fname: each.fullname, pfp: each.profpic, id: each._id };
        })
        res.status(200).json(necarray);

    } catch (err) {

        res.status(404).json(err);

    }

})

module.exports = router;
