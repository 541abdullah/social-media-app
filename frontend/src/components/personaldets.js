import Header from "./header";
import Leftpain from "./leftpain";
import { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import Passwordchecker from './passwordchecker';
import '../corecss/personaldets.css';
import Loadingmodal from './modals/loadingmodal.js';
import { useNavigate } from 'react-router-dom';
import { loadersets } from '../features/loader.js'
import { useDispatch } from 'react-redux';

import { clearfollowunfollow } from '../features/followunfollow.js';
import { clearsettings } from '../features/forsettings.js';
import { cleariconreset } from '../features/iconreseter.js';
import { clearleftp } from '../features/leftp.js';
import { clearloader } from '../features/loader.js';
import { clearnextreqprof } from '../features/nextreqprofile.js';
import { clearnextreq } from '../features/nextrequested.js';
import { clearnotif } from '../features/notifvisit.js';
import { clearprof } from '../features/profile.js';
import { clearstory } from '../features/story.js';
import { clearstorydat } from '../features/storydata.js';
import { clearyourdets } from '../features/you.js';
import { clearnewpost } from "../features/newpost.js";
import { leftpsets } from '../features/leftp';
import { cleartheme } from '../features/theme';


const Personaldets = () => {


    let curuser = useSelector((state) => { return state.youryr.value });
    let alldets = useSelector((state) => { return state.settingdefault.value });
    let theme = useSelector((state) => { return state.themeyr.value });

    let [currentbiolen, setCurrentbiolen] = useState(alldets.bio?.length);
    let [emailid, setEmailid] = useState(alldets?.email);
    let [realaccstatus, setRealaccstatus] = useState(alldets?.acctype);
    let [accstatus, setAccstatus] = useState(alldets?.acctype);
    let [curbio, setCurbio] = useState(alldets?.bio);
    let [gender, setGender] = useState(alldets?.gender);
    let [fname, setFname] = useState(alldets?.fname);
    let [username, setUsername] = useState(alldets?.username);
    let [profpic, setProfpic] = useState(alldets?.profpic);
    let [newname, setNewname] = useState(null);
    let [newbio, setNewbio] = useState(null);
    let [newgender, setNewgender] = useState(null);
    let [newpasskey, setNewpasskey] = useState(null);
    let [repass, setRepass] = useState(null);
    let [reshow, setReshow] = useState(false);
    let [nonum, setNonum] = useState(false);
    let [noeight, setNoeight] = useState(false);
    let [nosymbol, setNosymbol] = useState(false);
    let [noupperletter, setNoupperletter] = useState(false);
    let [nolowerletter, setNolowerletter] = useState(false);
    let [displayer, setDisplayer] = useState(false);
    let [rendisplayer, setRendisplayer] = useState(false);
    let [empty, setEmpty] = useState(false);
    let [realinvalid, setRealinvalid] = useState(false);
    let [gendererror, setGendererror] = useState(false);
    let [ischanged, setIschanged] = useState(false);
    let [savedisabled, setSavedisabled] = useState(false);
    let [genderselection, setGenderselection] = useState([]);
    let [loader, setLoader] = useState(false);

    let mainpassref = useRef(null);
    let repassref = useRef(null);

    let nav = useNavigate();
    let dis = useDispatch();


    useEffect(() => {
        let genderlist = ['Male', 'Female', 'Rather not say'];
        setGenderselection(genderlist.filter((each) => each != gender));
    }, [])

    const imgupload = (e) => {

        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => {

            setProfpic(reader.result);

            async function pfpchanger() {

                await fetch(`http://localhost:3001/detschange/changepfp/${username}`, {
                    method: 'POST',
                    headers: { 'Content-Type': "application/json" },
                    body: JSON.stringify({ newpfp: reader.result }),
                    credentials: 'include'
                })

            }

            pfpchanger();

        }

        reader.onerror = error => {
        }
    }

    const newnamesetter = (e) => {

        if (e.target.value.length == 0) {
            setNewname(null);
        } else {
            setNewname(e.target.value);
        }

    }

    let counter = (e) => {
        let currentcount = e.target.value.length;
        setCurrentbiolen(currentcount);
        if (e.target.value.length == 0) {
            setCurrentbiolen(alldets.bio.length);
            setNewbio(null);
        } else {
            setNewbio(e.target.value);
        }

    }


    const changestatus = (newtype) => {

        setAccstatus(newtype);

    }

    const genderchange = (e) => {

        setNewgender(e.target.value);
        setGendererror(false);

    }


    let newpass = (e) => {

        if (repass != null) {
            setIschanged(!ischanged);
        }

        let newpassword = e.target.value;
        if (newpassword.length != 0) {
            setReshow(true);
            setNewpasskey(e.target.value);

            let passchecker = (checkpass) => {
                setDisplayer(true);
                let delaypass = checkpass;
                let begin = true;

                if (/[A-Z]/.test(delaypass)) {
                    setNoupperletter(true);
                    begin = true && begin;
                }
                else {
                    setNoupperletter(false);
                    begin = false && begin;
                }
                if (/[a-z]/.test(delaypass)) {
                    setNolowerletter(true);
                    begin = true && begin;
                }
                else {
                    setNolowerletter(false);
                    begin = false && begin;
                }
                if (/[0-9]/.test(delaypass)) {
                    setNonum(true);
                    begin = true && begin;
                }
                else {
                    setNonum(false);
                    begin = false && begin;
                }
                if (/.{8,}/.test(delaypass)) {
                    setNoeight(true);
                    begin = true && begin;
                }
                else {
                    setNoeight(false);
                    begin = false && begin;
                }
                if (/[!@#$%^&*_]/.test(delaypass)) {
                    setNosymbol(true);
                    begin = true && begin;
                }
                else {
                    setNosymbol(false);
                    begin = false && begin;
                }

                if (begin) {
                    setRealinvalid(false);
                    mainpassref.current.style.border = 'rgb(46 138 61) solid 2px';

                    if (repassref.current != null) {
                        repassref.current.style.border = 'rgb(0 0 0) solid 2px';
                    }

                }
                else {
                    mainpassref.current.style.border = 'rgb(220 38 38) solid 2px';
                }



                if (delaypass == "") {
                    setNoupperletter(false);
                    setNosymbol(false);
                    setNoeight(false);
                    setNonum(false);
                    setNolowerletter(false);
                    setDisplayer(false);

                    mainpassref.current.style.border = 'rgb(0 0 0) solid 2px';
                }



            };


            passchecker(e.target.value);


        } else {
            setReshow(false);
            setEmpty(false);
            setRendisplayer(false);
            setRealinvalid(false);
            setDisplayer(false);

            setNewpasskey(null);
            setRepass(null);


            mainpassref.current.style.border = 'rgb(0 0 0) solid 2px';
        }
    }


    useEffect(() => {

        if (reshow) {

            if (!nolowerletter || !noupperletter || !noeight || !nonum || !nosymbol) {

                setRealinvalid(true);
                setEmpty(false);
                setRendisplayer(false);
                repassref.current.style.border = 'rgb(220 38 38) solid 2px';

            } else if (repass == "") {
                setEmpty(true);
                setRendisplayer(false);
                repassref.current.style.border = 'rgb(220 38 38) solid 2px';
            } else if (repass != newpasskey) {
                setEmpty(false);
                setRendisplayer(true);
                repassref.current.style.border = 'rgb(220 38 38) solid 2px';
            } else if (repass == newpasskey) {


                setRealinvalid(false);
                setRendisplayer(false);
                setEmpty(false);
                repassref.current.style.border = 'rgb(46 138 61) solid 2px';
                setRepass(repass);


            }

        }

    }, [ischanged, repass])

    useEffect(() => {

        if ((newpasskey == repass) && (noeight && nonum && noupperletter && nolowerletter && nosymbol || !displayer)) {

            setSavedisabled(false);
        } else {

            setSavedisabled(true);

        }

    }, [newpasskey, repass])


    const savechanges = (e) => {

        e.preventDefault();

        if (gender != "null" || newgender != null) {

            const updateobj = {};

            newname ? newname != fname ? updateobj["name"] = { new: newname, prev: fname } : updateobj["name"] = false : updateobj["name"] = false;
            newbio ? newbio != curbio ? updateobj["bio"] = newbio : updateobj["bio"] = false : updateobj["bio"] = false;
            newpasskey ? updateobj["password"] = newpasskey : updateobj["password"] = false;
            accstatus ? accstatus != realaccstatus ? updateobj["accstatus"] = accstatus : updateobj["accstatus"] = false : updateobj["accstatus"] = false;
            newgender ? newgender != gender ? updateobj["gender"] = newgender : updateobj["gender"] = false : updateobj["gender"] = false;

            updateobj["username"] = username;

            setLoader(true);

            setTimeout(() => {

                setLoader(false);
                nav('/welcome');
                dis(leftpsets('HomeIcon'));

            }, 4000)

            fetch(`http://localhost:3001/users/userupdate/${curuser.userid}`, {
                method: 'PUT',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(updateobj),
                credentials: 'include'
            })

        } else {

            setGendererror(true);

        }


    }


    const deleter = (e) => {


        e.preventDefault();


        setLoader(true);
        setTimeout(() => {

            setLoader(false);

            dis(loadersets(false));
            fetch(`http://localhost:3001/logout`, {
                credentials: 'include',
            })
            nav('/', { replace: true });

        }, 8000)

        setTimeout(() => {

            dis(clearfollowunfollow(true));
            dis(clearsettings(true));
            dis(cleariconreset(true));
            dis(clearleftp(true));
            dis(clearloader(true));
            dis(clearnextreqprof(true));
            dis(clearnextreq(true));
            dis(clearnotif(true));
            dis(clearprof(true));
            dis(clearstory(true));
            dis(clearstorydat(true));
            dis(clearyourdets(true));
            dis(clearnewpost(true));
            dis(cleartheme(true));

        }, 10000)

        let deleteobj = { "username": username };

        fetch(`http://localhost:3001/users/userdelete/${curuser.userid}`, {
            method: 'DELETE',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(deleteobj),
            credentials: 'include'
        })

    }


    return (

        <>
            {loader && <Loadingmodal trigger={setLoader} />}

            <Header caller={'settings'} extra={null} />

            <div className={theme ? "mainform" : " mainform mainformnight"} >

                <div className="formleftpain">
                    <Leftpain parent={'explore'} />
                </div>


                <div className={theme ? "formpart" : "formpartnight"}>

                    <div className="innerform">

                        <span className={theme ? "heading" : "headingnight"}>Edit Profile</span>

                        <span className={theme ? "usernameform" : "usernameform persondetsdark"}>{username}</span>
                        <img className={theme ? "pfpform" : "pfpform persondetsdark"} src={profpic}></img>

                        <button className={theme ? "pfpchanger" : "pfpchangernight"}>change profile picture <input name='thepost' id='filess' onChange={(e) => { imgupload(e) }} type="file" /> </button>

                        <form action="" className="formdets">
                            <div className="formelememail">
                                <label className={theme ? "emaillabel" : "emaillabel persondetsdark"} for={theme ? "email" : "emailnight"}>Email ID</label>
                                <input type="text" id={theme ? "email" : "emailnight"} placeholder={emailid} disabled />
                            </div>
                            <div className="formelemname">
                                <label className={theme ? "namelabel" : "namelabel persondetsdark"} for={theme ? "name" : "namenight"}>Name</label>
                                <input type="text" id={theme ? "name" : "namenight"} placeholder={fname} onChange={(e) => { newnamesetter(e) }} />
                            </div>
                            <div className="formelembio">
                                <label className={theme ? "biolabel" : "biolabel persondetsdark"} for={theme ? "bio" : "bionight"}>Bio</label>
                                <div className="biocounter">

                                    <textarea id={theme ? "bio" : "bionight"} maxLength="70" className="biochanger" onChange={(e) => { counter(e) }} placeholder={curbio}></textarea>
                                    <span className={theme ? "lencounter" : "lencounternight"}>{currentbiolen}/70</span>

                                </div>

                            </div>

                            <div className="formelempass">
                                <label className={theme ? "passwordlabel" : "passwordlabel persondetsdark"} for={theme ? "pword" : "pwordnight"}>Change Password</label>
                                <input type="text" id={theme ? "pword" : "pwordnight"} ref={mainpassref} onChange={(e) => { newpass(e) }} />
                            </div>
                            {displayer && <Passwordchecker nosymbol={nosymbol} noeight={noeight} nonum={nonum} nolowerletter={nolowerletter} noupperletter={noupperletter} loc={false} />}

                            {reshow && <div className={(noeight && nonum && noupperletter && nolowerletter && nosymbol || !displayer) ? "formelemrepassvalid" : "formelemrepass"}>
                                <label className={theme ? "repasswordlabel" : "repasswordlabel persondetsdark"} for={theme ? "repassword" : "repasswordnight"}>Re-enter new Password</label>
                                <input type="text" id={theme ? "repassword" : "repasswordnight"} ref={repassref} onChange={(e) => { setRepass(e.target.value) }} />
                            </div>}

                            {empty && <p className={(noeight && nonum && noupperletter && nolowerletter && nosymbol || !displayer) ? " tw-text-red-600 repassredtextvalid" : " tw-text-red-600 repassredtext"}>*please re-enter the new password</p>}
                            {rendisplayer && <p className={(noeight && nonum && noupperletter && nolowerletter && nosymbol || !displayer) ? " tw-text-red-600 repassredtextvalid" : " tw-text-red-600 repassredtext"}>*passwords do not match</p>}
                            {realinvalid && <p className={(noeight && nonum && noupperletter && nolowerletter && nosymbol || !displayer) ? " tw-text-red-600 repassredtextvalid" : " tw-text-red-600 repassredtext"}>*please enter a valid password above</p>}


                            <div className="radioboxes">

                                <span className={theme ? "accstatus" : " accstatus persondetsdark"}>Account status </span>
                                <div className={theme ? "formelempriv" : "formelemprivnight"}>
                                    <label for="private"><b>private</b></label>
                                    <input className="radbuts" type="radio" id="private" name="acctype" checked={accstatus == 'Private' ? true : false} onClick={() => { changestatus('Private') }} />
                                </div>
                                <div className={theme ? "formelempub" : "formelempubnight"}>
                                    <label for="public"><b>public</b></label>
                                    <input className="radbuts" type="radio" id="public" name="acctype" checked={accstatus == 'Public' ? true : false} onClick={() => { changestatus('Public') }} />
                                </div>


                            </div>

                            <div className="formelemgen">
                                <label className={theme ? "genderlabel" : "genderlabel persondetsdark"} for={theme ? "genderx" : "genderxnight"}>Gender</label>


                                {gender === "null"

                                    ?

                                    <select id={theme ? "genderx" : "genderxnight"} required onChange={(e) => { genderchange(e) }}>
                                        <option value="" disabled selected>Select your gender</option>
                                        <option value={genderselection[0]}>{genderselection[0]}</option>
                                        <option value={genderselection[1]}>{genderselection[1]}</option>
                                        <option value={genderselection[2]}>{genderselection[2]}</option>
                                    </select>

                                    :

                                    <select id={theme ? "genderx" : "genderxnight"} required onChange={(e) => { genderchange(e) }}>
                                        <option value={gender}>{gender}</option>
                                        <option value={genderselection[0]}>{genderselection[0]}</option>
                                        <option value={genderselection[1]}>{genderselection[1]}</option>
                                    </select>

                                }

                            </div>

                            {gendererror && <span className="gendersel">*Please select your gender</span>}

                            <div className="formelem">

                            </div>

                            <button className={theme ? "saverbut" : "saverbutnight"} disabled={savedisabled} onClick={(e) => { savechanges(e) }} >Save Changes</button>

                            <div className="formelemdel">
                                <button className="deletedanger" onClick={(e) => { deleter(e) }} >Delete Account</button>
                            </div>

                        </form>

                    </div>


                </div>

            </div>

        </>


    );
}

export default Personaldets;