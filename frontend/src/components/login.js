import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loadersets } from '../features/loader.js';

import "../corecss/loginpage.css"



const Login = () => {

    let [faultylogin, setFaultyLogin] = useState(false);

    let dis = useDispatch();
    let nav = useNavigate();


    let preventer = (e) => {
        e.preventDefault();

        let formelement = document.querySelector('.form');
        let formdata = new FormData(formelement);
        let pass = formdata.get('password');
        let user = formdata.get('username');
        let logincred = { username: user, password: pass };

        fetch("http://localhost:3001/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(logincred),
            credentials: 'include'

        }).then((res) => {
            return res.json();
        }).then((data) => {

            if (data === 'failure') {
                setFaultyLogin(true);
            }
            else {
                setFaultyLogin(false);
                dis(loadersets(true));
                nav('/welcome', { replace: true });
            }
        }).catch((err) => {
            console.log(err);
        });

    };

    return (

        <>
            {!useSelector((state) => { return state.loadyr.value }) &&
                <>
                    <div className='totaldivlog'></div>
                    <div className=" tw-h-96 tw-p-10 tw-top-1/2 tw-left-1/2 tw-transform  tw--translate-x-1/2 tw--translate-y-1/2 tw-absolute tw-block tw-rounded-lg tw-bg-white tw-shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] mainblock">
                        <form className="form" onSubmit={preventer}>
                            <input name="username" className="tw-mb-4 block usernamelog" id="usr" type="text" placeholder="username" />
                            <input name="password" className="tw-block passlog" id="pass" type="text" placeholder="password" />
                            <button className="tw-bg-blue-500 tw-block tw-m-10 logger ">Login</button>
                        </form>
                        {faultylogin && <p className=" tw-text-red-600 wrongentry"> username or password incorrect</p>}
                        <hr className='rulerlog'></hr>
                        <p className=' tw-mt-9 unreg'> <Link to="/signup">Not registered ? sign up here</Link> </p>

                    </div>
                </>
            }

        </>
    );
}

export default Login;
