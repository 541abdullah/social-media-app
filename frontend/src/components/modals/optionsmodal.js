import ReactDom from 'react-dom';
import '../../corecss/threedotsoptions.css';
import { useSelector } from "react-redux";
import { useState } from 'react';
import Loadingmodal from './loadingmodal';
import { useDispatch } from 'react-redux';
import { loadersets } from '../../features/loader.js'
import { useNavigate } from 'react-router-dom';
import { clearfollowunfollow } from '../../features/followunfollow.js';
import { clearsettings } from '../../features/forsettings.js';
import { cleariconreset } from '../../features/iconreseter.js';
import { clearleftp } from '../../features/leftp.js';
import { clearloader } from '../../features/loader.js';
import { clearnextreqprof } from '../../features/nextreqprofile.js';
import { clearnextreq } from '../../features/nextrequested.js';
import { clearnotif } from '../../features/notifvisit.js';
import { clearprof } from '../../features/profile.js';
import { clearstory } from '../../features/story.js';
import { clearstorydat } from '../../features/storydata.js';
import { clearyourdets } from '../../features/you.js';
import { clearnewpost } from '../../features/newpost.js';
import { cleartheme } from '../../features/theme.js';


const Optmodal = ({ trigger, contplayer, optionsarray, special, action }) => {

  let [loader, setLoader] = useState(false);

  let dis = useDispatch();
  let nav = useNavigate();

  let curuser = useSelector((state) => { return state.youryr.value });
  let theme = useSelector((state) => { return state.themeyr.value });

  //let url = "http://localhost:3001";
  let url = "https://social-media-app-backend-final.onrender.com";

  const closemodal = () => {
    trigger(false);
    if (!action.purpose == 'profile') {
      contplayer(false);
    }

  }


  const actionperformer = (each) => {


    if (each == 'Views') {

      action[each][0](false);
      action[each][1](false);
      action[each][2](false);
      trigger(false);
    }

    if (each == 'Delete') {

      action[each](true);
      trigger(false);
    }

    if (each == 'Delete Account') {

      setLoader(true);
      setTimeout(() => {

        setLoader(false);
        trigger(false);
        dis(loadersets(false));
        fetch(`${url}/logout`, {
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

      let deleteobj = { "username": curuser.usrn };

      fetch(`${url}/users/userdelete/${curuser.userid}`, {
        method: 'DELETE',
        headers: { 'content-type': "application/json" },
        body: JSON.stringify(deleteobj),
        credentials: 'include',
      })


    }

    if (each == 'Unfollow') {

      async function unfollower() {

        await fetch(`${url}/users/unfollow/${action.viewperson}`, {
          method: 'PUT',
          headers: { 'Content-Type': "application/json" },
          body: JSON.stringify({ "username": curuser.usrn }),
          credentials: 'include'
        })

        setLoader(true);
        setTimeout(() => {
          setLoader(false);
          trigger(false);
        }, 3000);

      }

      unfollower();

    }

    if (each == 'Report') {

      setLoader(true);
      setTimeout(() => {
        setLoader(false);
        trigger(false);
      }, 3000);

    }

    if (each == 'Block') {

      async function blocker() {

        await fetch(`${url}/users/block/${curuser.usrn}`, {
          method: 'PUT',
          headers: { 'Content-Type': "application/json" },
          body: JSON.stringify({ "username": action.viewperson }),
          credentials: 'include'
        })

        setLoader(true);
        setTimeout(() => {
          setLoader(false);
          trigger(false);
        }, 5000);

      }

      blocker();



    }

    if (each == 'Remove follower') {

      async function folrem() {

        await fetch(`${url}/users/removal/${curuser.usrn}`, {
          method: 'PUT',
          headers: { 'Content-Type': "application/json" },
          body: JSON.stringify({ "username": action.viewperson }),
          credentials: 'include'
        })

        setLoader(true);
        setTimeout(() => {
          setLoader(false);
          trigger(false);
        }, 3000);

      }

      folrem();

    }

  }

  return ReactDom.createPortal(
    <>

      {loader && <Loadingmodal />}
      <div className='blurremaino'></div>

      <div className={theme ? 'alloptions' : "alloptions alloptionsnight"}>


        {optionsarray.map((each) =>

          <div className={theme ? 'optionx' : "optionx optionxnight"} onClick={() => { actionperformer(each) }} id={theme ? `bar${optionsarray.indexOf(each)}` : `barnight${optionsarray.indexOf(each)}`}>
            <button className={special.includes(each) ? 'eachoptred' : theme ? 'eachopt' : "eachopt textnightthreeops"} >{each}</button>
          </div>

        )}


        <div className={theme ? 'optionlast' : "optionlast optionlastnight"} onClick={closemodal}>
          <button className={theme ? 'eachopt' : "eachopt textnightthreeops"}>Cancel</button>
        </div>
      </div>


    </>

    , document.getElementById('portal')
  );
}

export default Optmodal;