const router = require('express').Router();
let Userdetail = require('../../models/userdet.js');
let Notif = require('../../models/notifs.js');


router.post("/:username", async (req, res) => {



    let newnotif = new Notif({
        from: req.body.username,
        frompfp: req.body.pfp,
        fromfname: req.body.fullname,
        to: req.params.username,
        type: req.body.type,
        attachement: req.body.attachement,
        commentifany: req.body.commentifany,
        cleared: false,
        reference: req.body.reference
    });

    let mydets = await Userdetail.findOne({ username: req.body.username });



    try {

        let savednotif = await newnotif.save();

        mydets.notifscreated.push(savednotif.id);
        await Userdetail.findOneAndUpdate({ username: req.body.username }, { '$set': { notifscreated: mydets.notifscreated } });

        res.status(200).json("notification made");

    } catch (err) {

        res.status(404).json(err);

    }


});




router.delete("/rem/:username", async (req, res) => {



    try {

        let mydets = await Userdetail.findOne({ username: req.body.username });


        if (req.body.type === 'commentlikedel') {


            let notif = await Notif.findOne({ from: req.body.username, to: req.params.username, attachement: req.body.attachement, commentifany: req.body.commentifany });
            let newnotifs = mydets.notifscreated.filter((each) => each != notif.id);
            await Userdetail.findOneAndUpdate({ username: req.body.username }, { '$set': { notifscreated: newnotifs } });
            await Notif.deleteOne({ from: req.body.username, to: req.params.username, attachement: req.body.attachement, commentifany: req.body.commentifany });


        } else if (req.body.type === 'postlikedel') {

            let notif = await Notif.findOne({ from: req.body.username, to: req.params.username, attachement: req.body.attachement, type: 'postlike' });
            let newnotifs = mydets.notifscreated.filter((each) => each != notif.id);
            await Userdetail.findOneAndUpdate({ username: req.body.username }, { '$set': { notifscreated: newnotifs } });
            await Notif.deleteOne({ from: req.body.username, to: req.params.username, attachement: req.body.attachement, type: 'postlike' });


        } else if (req.body.type === 'followreqdel') {

            let notif = await Notif.findOne({ from: req.body.username, to: req.params.username, type: 'followreq' });
            let newnotifs = mydets.notifscreated.filter((each) => each != notif.id);
            await Userdetail.findOneAndUpdate({ username: req.body.username }, { '$set': { notifscreated: newnotifs } });
            await Notif.deleteOne({ from: req.body.username, to: req.params.username, type: 'followreq' });


        }

        res.status(200).json("notification made");

    } catch (err) {

        res.status(404).json(err);

    }

});


router.get("/allreqs/:username", async (req, res) => {


    try {

        const result = await Notif.find({ to: req.params.username, type: 'followreq' });
        res.status(200).json(result);

    } catch (err) {

        res.status(404).json(err);

    }


});


router.get("/alreadyreqd/:theirs/:mine", async (req, res) => {

    try {

        const result = await Notif.find({ to: req.params.theirs, from: req.params.mine, type: 'followreq' });

        if (result.length == 0) {

            res.status(200).json(false);

        } else {

            res.status(200).json(true);

        }

    } catch (err) {

        res.status(404).json(err);

    }

});



router.get("/week/nextfive/:username", async (req, res) => {


    try {

        const totalnotifs = await Notif.find({ to: req.params.username, createdAt: { $gt: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000))) } }).sort({ createdAt: -1 }).skip(req.query.skip).limit(5);
        res.status(200).json(totalnotifs);


    } catch (err) {

        res.status(404).json(err);
    }

});


router.get("/month/nextfive/:username", async (req, res) => {

    try {

        const totalnotifs = await Notif.find({
            to: req.params.username, createdAt: {
                $lte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000))),
                $gt: new Date((new Date().getTime() - (31 * 24 * 60 * 60 * 1000)))
            }
        }).sort({ createdAt: -1 }).skip(req.query.skip).limit(5);
        res.status(200).json(totalnotifs);

    } catch (err) {

        res.status(404).json(err);

    }

});


router.get("/older/nextfive/:username", async (req, res) => {



    try {

        const totalnotifs = await Notif.find({ to: req.params.username, createdAt: { $lte: new Date((new Date().getTime() - (31 * 24 * 60 * 60 * 1000))) } })
            .sort({ createdAt: -1 }).skip(req.query.skip).limit(5);

        res.status(200).json(totalnotifs);


    } catch (err) {

        res.status(404).json(err);

    }


});


router.get("/new/:username", async (req, res) => {

    try {

        const totalnotifs = await Notif.find({ to: req.params.username, cleared: false })
        res.status(200).json(totalnotifs);


    } catch (err) {

        res.status(404).json(err);

    }

});


router.get("/allclear/:username", async (req, res) => {

    try {

        const result = await Notif.updateMany({ to: req.params.username, cleared: false, type: { $ne: 'followreq' } }, { $set: { cleared: true } }, { new: true });
        res.status(200).json({ len: result.modifiedCount });

    } catch (err) {

        res.status(404).json(err);

    }

});


router.get("/clear/:myusername/:fromusername", async (req, res) => {


    try {

        const result = await Notif.updateMany({ to: req.params.myusername, cleared: false, from: req.params.fromusername, type: 'followreq' }, { $set: { cleared: true } }, { new: true });
        res.status(200).json({ len: result.modifiedCount });


    } catch (err) {

        res.status(404).json(err);

    }


});


router.delete("/postdel/:id", async (req, res) => {


    try {

        const allnotifs = await Notif.find({ reference: req.params.id });

        if (allnotifs.length != 0) {

            async function notifcorrector() {
                for (let i = 0; i < allnotifs.length; i++) {

                    let result = await Userdetail.findOne({ username: allnotifs[i].from });
                    let newnotifs = result.notifscreated.filter((eachlet) => eachlet != allnotifs[i]._id);
                    await Userdetail.findOneAndUpdate({ username: allnotifs[i].from }, { '$set': { notifscreated: newnotifs } });

                }
            }

            notifcorrector();

        }

        await Notif.deleteMany({ reference: req.params.id });
        res.status(200).json("notifications deleted");

    } catch (err) {

        res.status(404).json(err);

    }

});

module.exports = router;
