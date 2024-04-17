const router = require('express').Router();
let Userdata = require('../../models/userdata.js');
const Userdetail = require('../../models/userdet.js');


router.post("/create/:username", async (req, res) => {

    try {

        const insertion = {
            thepost: req.body.thepost,
            timeposted: new Date(),
            type: req.body.type
        }

        await Userdata.updateOne({ username: req.params.username }, { $push: { storycontent: insertion }, '$set': { story: true } });
        res.status(200).json('success');

    }
    catch (err) {

        res.status(404).json('failure');
    }

})


router.post("/viewed/:username", async (req, res) => {

    try {

        const result = await Userdata.findOne({ username: req.params.username });


        if (!result.storyseen.includes(req.body.username)) {
            await Userdata.updateOne({ username: req.params.username }, { $push: { storyseen: req.body.username } });
        }

        res.status(200).json("added view successfully");

    } catch (err) {

        res.status(404).json(err);

    }

});


router.post("/liked/:username", async (req, res) => {

    try {

        const result = await Userdata.findOne({ username: req.params.username });

        if (!result.storylikes.includes(req.body.username)) {
            await Userdata.updateOne({ username: req.params.username }, { $push: { storylikes: req.body.username } });
        }

        res.status(200).json("added like successfully");

    } catch (err) {

        res.status(404).json(err);

    }


});


router.get("/myviews/:username", async (req, res) => {

    try {

        const result = await Userdata.findOne({ username: req.params.username });
        const data = await Promise.all(result.storyseen.map((each) => Userdetail.findOne({ username: each })));

        let finalmapping = [];

        for (let i = 0; i < result.storyseen.length; i++) {

            finalmapping.push({ username: result.storyseen[i], pfp: data[i].profpic });

        }

        res.status(200).json(finalmapping);

    } catch (err) {

        res.status(404).json(err);

    }

});


router.put("/deletion/:username", async (req, res) => {


    try {

        const result = await Userdata.findOne({ username: req.params.username });
        let newcontent = result.storycontent.filter((each) => each.thepost != req.body.justdel);

        if (newcontent = []) {

            await Userdata.updateOne({ username: req.params.username }, { $push: { storydel: req.body.justdel }, '$set': { storycontent: newcontent, story: false, storyseen: [], storylikes: [] } });
            res.status(200).json("deleted successfully");

        } else {

            await Userdata.updateOne({ username: req.params.username }, { $push: { storydel: req.body.justdel }, '$set': { storycontent: newcontent } });
            res.status(200).json("deleted successfully");

        }

    } catch (err) {

        console.log(err);
        res.status(404).json(err);

    }


});


router.post("/isthere/:imgid", async (req, res) => {

    try {

        const result = await Userdata.findOne({ username: req.body.username });

        if (result.storydel.includes(req.params.imgid)) {
            res.status(200).json(true);
        } else {

            const content = result.storycontent.map((each) => each.thepost);

            if (content.includes(req.params.imgid))
                res.status(200).json(false);
            else {
                res.status(200).json("removed");
            }

        }

    } catch (err) {

        res.status(404).json(err);

    }

});


module.exports = router;
