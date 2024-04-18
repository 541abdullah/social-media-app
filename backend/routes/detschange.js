const router = require('express').Router();
let Userdetail = require('../models/userdet.js');
const Post = require('../models/posts.js');
let Notif = require('../models/notifs.js');
const Userdata = require('../models/userdata.js');


router.post("/changepfp/:username", async (req, res) => {

    let mydets = await Userdetail.findOne({ username: req.params.username });
    mydets.profpic = req.body.newpfp;

    let mypeople = await Userdata.findOne({ username: req.params.username });


    let followinglist = mypeople.following.map(async (each) => {
        return await Userdata.findOne({ username: each.username });
    })

    let followingnames = await Promise.all(followinglist);

    let newfollowers;
    let megafollowers = [];

    followingnames.forEach((each) => {
        newfollowers = each.followers.map((eachlet) => {
            if (eachlet.username == req.params.username) {
                eachlet.pfp = req.body.newpfp;
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
            if (eachlet.username == req.params.username) {
                eachlet.pfp = req.body.newpfp;
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
            if (eachlet.username == req.params.username) {
                eachlet.pfp = req.body.newpfp;
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

    let commentedposts = mydets.postscommented.map(async (each) => {

        return await Post.findOne({ _id: each });


    });

    let allcomments = await Promise.all(commentedposts);

    let newcomments;
    let megacomments = [];

    allcomments.forEach((each) => {
        newcomments = each.comments.map((eachlet) => {
            if (eachlet.username == req.params.username) {
                eachlet.pfp = req.body.newpfp;
            }

            return eachlet
        })
        megacomments.push(newcomments);
    })

    i = -1;
    let finalcommentupdates = mydets.postscommented.map(async (each) => {
        i += 1;
        return await Post.findOneAndUpdate({ _id: each }, { '$set': { comments: megacomments[i] } });
    })



    let likedposts = mydets.postsliked.map(async (each) => {

        return await Post.findOne({ _id: each });


    });

    let alllikes = await Promise.all(likedposts);
    let newlikes;
    let megalikes = [];

    alllikes.forEach((each) => {
        newlikes = each.likes.map((eachlet) => {
            if (eachlet.username == req.params.username) {
                eachlet.pfp = req.body.newpfp;
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
        return await Notif.findOneAndUpdate({ _id: each }, { '$set': { frompfp: req.body.newpfp } });
    })

    await Userdetail.findOneAndUpdate({ username: req.params.username }, { '$set': { profpic: mydets.profpic } });
    await Promise.all(finalfollowerupdates);
    await Promise.all(finalfollowingupdates);
    await Promise.all(finalrequpdates);
    await Promise.all(finalcommentupdates);
    await Promise.all(finallikeupdates);
    await Promise.all(finalnotifupdates);

});




module.exports = router;