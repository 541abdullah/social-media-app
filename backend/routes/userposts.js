const router = require('express').Router();
const Post = require('../../models/posts.js');
const Userdata = require('../../models/userdata.js');
const Userdetail = require('../../models/userdet.js');

router.post("/create", async (req, res) => {

    try {

        let newpost = new Post({

            userid: req.body.userid,
            username: req.body.username,
            desc: req.body.capt ? req.body.capt : " ",
            img: req.body.thepost,
            likes: [],
            likesnum: 0,
            comments: [],
            pfp: req.body.pfp

        });

        await newpost.save();

        const result = await Userdata.findOne({ username: req.body.username });
        await Userdata.updateOne({ username: req.body.username }, { "$set": { postsnum: result.postsnum + 1 } });

        res.status(200).json("posted successfully");

    } catch (err) {

        res.status(404).json("failure");

    }


});

router.delete("/delete/:id", async (req, res) => {

    try {

        const thepost = await Post.findOne({ _id: req.params.id });
        async function likescorrector() {

            for (let i = 0; i < thepost.likes.length; i++) {

                let result = await Userdetail.findOne({ username: thepost.likes[i].username });
                let newlikes = result.postsliked.filter((eachlet) => eachlet != thepost._id);
                await Userdetail.findOneAndUpdate({ username: thepost.likes[i].username }, { '$set': { postsliked: newlikes } });

            }
        }

        likescorrector();

        async function commentscorrector() {

            for (let i = 0; i < thepost.comments.length; i++) {

                let result = await Userdetail.findOne({ username: thepost.comments[i].username });
                let newcomments = result.postscommented.filter((eachlet) => eachlet != thepost._id);
                await Userdetail.findOneAndUpdate({ username: thepost.comments[i].username }, { '$set': { postscommented: newcomments } });

            }
        }

        commentscorrector();
        await Post.deleteOne({ _id: req.params.id });

        try {

            const result = await Userdata.findOne({ username: req.body.username });
            await Userdata.updateOne({ username: req.body.username }, { "$set": { postsnum: result.postsnum - 1 } });

        } catch (err) {

            res.status(404).json(err);

        }

        res.status(200).json("post deleted successfully");

    } catch (err) {
        res.status(404).json("post deletion unsuccessfull");
    }


});


router.patch("/liked/:id", async (req, res) => {

    try {

        const likeduser = await Post.findOne({ _id: req.params.id });
        let mydets = await Userdetail.findOne({ username: req.body.username });

        let newobj = {

            username: req.body.username,
            pfp: req.body.pfp,
            fullname: req.body.fullname

        }

        mydets.postsliked.push(req.params.id);

        await Post.updateOne({ _id: req.params.id }, { $push: { likes: newobj }, '$set': { likesnum: likeduser.likesnum + 1 } });
        await Userdetail.findOneAndUpdate({ username: req.body.username }, { '$set': { postsliked: mydets.postsliked } });
        res.status(200).json("post liked");

    } catch (err) {

        res.status(404).json(err);

    }


});


router.patch("/unliked/:id", async (req, res) => {

    try {

        const likeduser = await Post.findOne({ _id: req.params.id });
        let mydets = await Userdetail.findOne({ username: req.body.username });

        let newobj = {

            username: req.body.username,
            pfp: req.body.pfp,
            fullname: req.body.fullname

        }

        let newlikearray = mydets.postsliked.filter((each) => each != req.params.id);
        await Post.updateOne({ _id: req.params.id }, { $pull: { likes: newobj }, '$set': { likesnum: likeduser.likesnum - 1 } });
        await Userdetail.findOneAndUpdate({ username: req.body.username }, { '$set': { postsliked: newlikearray } });
        res.status(200).json("post unliked");

    } catch (err) {

        res.status(404).json(err);

    }

});



router.post("/commentlike/:id", async (req, res) => {


    try {

        const result = await Post.findOne({ _id: req.params.id });
        let onevalarray = result.comments.filter((each) => each._id == req.body.commentid);
        onevalarray[0].likes.push(req.body.liker);
        onevalarray[0].numlikes += 1;
        await Post.updateOne({ _id: req.params.id }, { "$set": { comments: result.comments } });
        res.status(200).json("comment liked successfully");

    } catch (err) {

        res.status(404).json("failure");

    }

});


router.post("/commentunlike/:id", async (req, res) => {


    try {

        const result = await Post.findOne({ _id: req.params.id });

        let onevalarray = result.comments.filter((each) => each._id == req.body.commentid);
        const newarray = onevalarray[0].likes.filter((each) => each != req.body.liker);

        onevalarray[0].likes = newarray;
        onevalarray[0].numlikes -= 1;
        await Post.updateOne({ _id: req.params.id }, { "$set": { comments: result.comments } });
        res.status(200).json("comment liked successfully");

    } catch (err) {

        res.status(404).json("failure");

    }


});



router.post("/addcomment/:id", async (req, res) => {


    try {

        const result = await Post.findOne({ _id: req.params.id });
        let mydets = await Userdetail.findOne({ username: req.body.username });


        let newcomment = {
            username: req.body.username,
            thecomment: req.body.thecomment,
            pfp: req.body.pfp,
            timeposted: new Date(),
            numlikes: 0,
            likes: [],
            _id: req.body._id
        }

        mydets.postscommented.push(req.params.id);
        result.comments.unshift(newcomment);

        await Post.updateOne({ _id: req.params.id }, { "$set": { comments: result.comments } });
        await Userdetail.findOneAndUpdate({ username: req.body.username }, { '$set': { postscommented: mydets.postscommented } });
        res.status(200).json("comment liked successfully");

    } catch (err) {

        res.status(404).json("failure");

    }

});

router.get("/getpost/:id", async (req, res) => {

    try {

        const requestedpost = await Post.findOne({ _id: req.params.id });
        res.status(200).json(requestedpost);

    } catch (err) {

        res.status(404).json(err);

    }

});


router.get("/getallposts/:username", async (req, res) => {

    try {

        const requestedposts = await Post.find({ username: req.params.username });
        res.status(200).json(requestedposts);

    } catch (err) {

        res.status(404).json(err);

    }

});


router.get("/nextseven/:username", async (req, res) => {


    try {

        const totalposts = await Post.find({ username: { $nin: [req.params.username, 'general'] } }).skip(req.query.skip).limit(7);
        res.status(200).json(totalposts);

    } catch (err) {

        res.status(404).json(err);

    }

});


router.get("/nextten/:username", async (req, res) => {


    try {

        let totalposts = await Post.find({ username: { $nin: [req.params.username, 'general'] } }).skip(req.query.skip).limit(10);

        function shuffler(arr) {
            for (let i = arr.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }

            return arr;
        }

        totalposts = shuffler(totalposts);
        res.status(200).json(totalposts);


    } catch (err) {

        res.status(404).json(err);

    }

});


router.get("/generalgetter", async (req, res) => {

    try {

        const totalpost = await Post.findOne({ username: 'general' });
        res.status(200).json(totalpost);

    } catch (err) {
        res.status(404).json(err);
    }

});

module.exports = router;
