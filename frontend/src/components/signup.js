import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Passwordchecker from './passwordchecker';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadersets } from '../features/loader';
import "../corecss/signupstyle.css"

const Signup = () => {

    let [nonum, setNonum] = useState(false);
    let [noeight, setNoeight] = useState(false);
    let [nosymbol, setNosymbol] = useState(false);
    let [noupperletter, setNoupperletter] = useState(false);
    let [nolowerletter, setNolowerletter] = useState(false);
    let [displayer, setDisplayer] = useState(false);
    let [regid, setRegid] = useState(false);
    let [email, setEmail] = useState(true);
    let [emaildisplayer, setEmaildisplayer] = useState(false);
    let [takenusername, setTakenusername] = useState(false);
    let [userdisplayer, setUserdisplayer] = useState(false);
    let [invusr, setInvusr] = useState(true);
    let [namechecker, setNamechecker] = useState(false);

    let inputref = useRef('null');

    let disp = useDispatch();
    let nav = useNavigate();

    let delayusr = null;
    let delaypass = null;
    let delayid = null;

    //let url = "http://localhost:3001";
    let url = "https://social-media-app-backend-final.onrender.com";

    let preventer = (e) => {

        e.preventDefault();
        let sformdata = document.querySelector('.sform');
        let data = new FormData(sformdata);

        fetch(`${url}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                "username": data.get('username'),
                "password": data.get('password'),
                "email": data.get('email'),
                "fullname": data.get('fullname')
            })
        }).then((result) => {
            return result.json();
        }).then((data) => {
            disp(loadersets(false));
            nav('/', { replace: true });
        }).catch((error) => {
            console.log(error);
        });

    };


    let userchecker = (e) => {

        delayusr = e.target.value;

        if (/^\S*$/.test(delayusr) && /.{4,}/.test(delayusr)) {
            setInvusr(true);
            setUserdisplayer(true);

            fetch(`${url}/takenusername/` + delayusr, {
                credentials: 'include'
            }
            ).then((res) => {
                return res.json();
            }).then((data) => {
                if (!(/^\S*$/.test(e.target.value) && /.{4,}/.test(e.target.value))) {
                    setUserdisplayer(false);
                    setInvusr(false);
                    document.getElementById('uname').style.border = 'rgb(220 38 38) solid 2px';
                }
                else if (delayusr == '') {
                    setInvusr(true);
                    setUserdisplayer(false);
                    setTakenusername(false);
                    document.getElementById('uname').style.border = 'rgb(0 0 0) solid 2px';
                }
                else if (delayusr == e.target.value) {
                    if (data == null) {
                        setTakenusername(true);
                        document.getElementById('uname').style.border = 'rgb(34 197 94) solid 2px';
                    }
                    else {
                        setTakenusername(false);
                        document.getElementById('uname').style.border = 'rgb(220 38 38) solid 2px';
                    }
                }
            }).catch((err) => {
                console.log(err);
            });

        }
        else {
            setUserdisplayer(false);
            setInvusr(false);
            document.getElementById('uname').style.border = 'rgb(220 38 38) solid 2px';
        }
        if (delayusr == '') {
            setInvusr(true);
            setUserdisplayer(false);
            setTakenusername(false);
            document.getElementById('uname').style.border = 'rgb(0 0 0) solid 2px';
        }

    };


    let idchecker = (e) => {
        delayid = e.target.value;

        if (/[^@]+@[^@]+\.[^@]+/.test(delayid)) {
            setEmaildisplayer(true);
            setEmail(true);
            fetch(`${url}/takenemail/` + delayid
            ).then((res) => {
                return res.json();
            }).then((data) => {
                if (/[^@]+@[^@]+\.[^@]+/.test(delayid)) {
                    if (data === null) {
                        setRegid(true);
                        document.getElementById('emid').style.border = 'rgb(34 197 94) solid 2px';
                    }
                    else {
                        setRegid(false);
                        document.getElementById('emid').style.border = 'rgb(220 38 38) solid 2px';
                    }
                }
            }).catch((err) => {
                console.log(err);
            });
        }
        else {
            setEmail(false);
            setEmaildisplayer(false);
            document.getElementById('emid').style.border = 'rgb(220 38 38) solid 2px';
        }
        if (delayid == '') {
            setEmail(true);
            setEmaildisplayer(false);
            setRegid(false);
            document.getElementById('emid').style.border = 'rgb(0 0 0) solid 2px';
        }
    }

    let passchecker = (e) => {
        setDisplayer(true);
        delaypass = e.target.value;
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
            document.getElementById('pword').style.border = 'rgb(34 197 94) solid 2px';
        }
        else {
            document.getElementById('pword').style.border = 'rgb(220 38 38) solid 2px';
        }



        if (delaypass == '') {
            setNoupperletter(false);
            setNosymbol(false);
            setNoeight(false);
            setNonum(false);
            setNolowerletter(false);
            setDisplayer(false);
            document.getElementById('pword').style.border = 'rgb(0 0 0) solid 2px';
        }

    };

    let fullnamecheck = (e) => {
        if (/[a-zA-Z]/.test(e.target.value)) {
            setNamechecker(true);
            document.getElementById('fname').style.border = 'rgb(34 197 94) solid 2px';
        }
        else {
            setNamechecker(false);
            document.getElementById('fname').style.border = 'rgb(220 38 38)  solid 2px';
        }
        if (e.target.value == "") {
            setNamechecker(false);
            document.getElementById('fname').style.border = 'rgb(0 0 0) solid 2px';
        }
    };


    let result = email && takenusername && invusr && noeight && nosymbol && nonum
        && noupperletter && nolowerletter && namechecker && regid;



    return (
        <>
            <div className='totaldiv'></div>
            <div className=" tw-h-108 tw-p-10 tw-top-1/2 tw-left-1/2 tw-transform tw--translate-x-1/2 tw--translate-y-1/2 tw-absolute tw-block tw-w-80 tw-rounded-lg tw-bg-white tw-shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                <form className="sform" onSubmit={preventer}>
                    <div className=' tw-relative tw-mb-4'>
                        <input name="email" className=" tw-pt-3 tw-peer tw-pl-2 tw-h-10 tw-w-50 tw-block tw-border-2 tw-border-solid  tw-rounded tw-outline-none signupemail" type="text" id='emid' onChange={idchecker} required />
                        <label htmlFor="emid" className=' tw-text-zinc-500 tw-pl-2.5 tw-pt-1 tw-cursor-text tw-absolute tw-top-0 tw-right-50 peer-focus:tw-text-xs peer-focus:-tw-top-1 peer-focus:tw-pointer-events-none peer-valid:tw-text-xs peer-valid:-tw-top-1 peer-valid:tw-pointer-events-none '>Email</label>
                    </div>
                    {!email && <p className=" tw-text-red-600 redemail"> Invalid email ID </p>}
                    {emaildisplayer && !regid && <p className=" tw-text-red-600 redemail"> email ID already registered. </p>}
                    {emaildisplayer && regid && <p className=" tw-text-green-600 greenemail" >valid email ID</p>}
                    <div className=' tw-relative tw-mb-4'>
                        <input name="fullname" className=" tw-pt-3 tw-peer tw-pl-2 tw-h-10 tw-w-50 tw-block tw-border-2 tw-border-solid  tw-rounded tw-outline-none signupfullname" type="text" id="fname" onChange={fullnamecheck} required />
                        <label htmlFor="fname" className='  tw-text-zinc-500 tw-pl-2.5 tw-pt-1 tw-cursor-text tw-absolute tw-top-0 tw-left-0 peer-focus:tw-text-xs peer-focus:-tw-top-1 peer-focus:tw-pointer-events-none peer-valid:tw-text-xs peer-valid:-tw-top-1 peer-valid:tw-pointer-events-none '>Full Name</label>
                    </div>
                    <div className=' tw-relative tw-mb-4'>
                        <input name="username" className=" tw-pt-3 tw-peer tw-pl-2 tw-h-10 tw-w-50 tw-block tw-border-2 tw-border-solid  tw-rounded tw-outline-none signupusername" type="text" id="uname" onChange={userchecker} required />
                        <label htmlFor="uname" className='  tw-text-zinc-500 tw-pl-2.5 tw-pt-1 tw-cursor-text tw-absolute tw-top-0 tw-left-0 peer-focus:tw-text-xs peer-focus:-tw-top-1 peer-focus:tw-pointer-events-none peer-valid:tw-text-xs peer-valid:-tw-top-1 peer-valid:tw-pointer-events-none '>Username</label>
                    </div>
                    {!invusr && <p className=" tw-text-red-600 redusername"> *Username must have atleast 4 characters and no spaces </p>}
                    {userdisplayer && !takenusername && <p className=" tw-text-red-600 redusername"> Username already in use. </p>}
                    {userdisplayer && takenusername && <p className=" tw-text-green-600 greenusername">valid username.</p>}
                    <div className=' tw-relative tw-mb-4'>
                        <input name="password" className=" tw-pt-3 tw-peer tw-pl-2 tw-h-10 tw-w-50 tw-block tw-border-2 tw-border-solid  tw-rounded tw-outline-none signuppassword" type="text" id="pword" onChange={passchecker} required />
                        <label htmlFor="pword" className='  tw-text-zinc-500 tw-pl-2.5 tw-pt-1 tw-cursor-text tw-absolute  tw-top-0 tw-left-0 peer-focus:tw-text-xs peer-focus:-tw-top-1 peer-focus:tw-pointer-events-none peer-valid:tw-text-xs peer-valid:-tw-top-1 peer-valid:tw-pointer-events-none '>Password</label>
                    </div>
                    {displayer && <Passwordchecker nosymbol={nosymbol} noeight={noeight} nonum={nonum} nolowerletter={nolowerletter} noupperletter={noupperletter} loc={true} />}
                    <hr className='signupruler'></hr>
                    <button className="tw-bg-blue-500 tw-block tw-m-10 letin " id="signbuttn" disabled={!result}>signup</button>
                </form>
                <p className=' tw-mt-9 alreadyacc'><Link to="/">Already have an account?<br></br> Log in here.</Link> </p>
            </div>
        </>

    );
}

export default Signup;
