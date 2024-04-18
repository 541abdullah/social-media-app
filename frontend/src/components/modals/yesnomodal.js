import ReactDom from 'react-dom';
import '../../corecss/yesno.css';
import Loadingmodal from './loadingmodal';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
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

const Yesnomodal = ({ trigger, text, bold, extra }) => {

  let [loader, setLoader] = useState(false);
  let theme = useSelector((state) => { return state.themeyr.value });

  let nav = useNavigate();
  const disp = useDispatch();

   //let url = "http://localhost:3001";
   let url = "https://social-media-app-backend-final.onrender.com";

  const closemodal = () => {

    if (extra.purpose == "logger") {

      extra.setCursel(null);
    }

    if (extra.purpose != "newconv") {
      trigger(false);
    } else {

      trigger({});
    }

  }

  const purpose = () => {


    if (extra.purpose == 'newconv') {
      extra.startconvhandler(extra.main);
      extra.setOnlchatclicked(!extra.skeletonidentity);
      trigger({});
    }

    if (extra.purpose == "cancelreq") {


      fetch(`${url}/users/followcancel/${extra.viewperson}`, {
        method: 'PUT',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ "username": extra.curuser.usrn }),
        credentials: 'include'
      })

      extra.setAsktofollow(false);

      trigger(false);

      const delnotif =
      {
        username: extra.curuser.usrn,
        type: "followreqdel",

      };

      fetch(`${url}/notif/rem/${extra.viewperson}`, {
        method: 'DELETE',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(delnotif),
        credentials: 'include'
      })

    }

    if (extra.purpose == 'delpost') {

      let newobj = {
        username: extra.curuser.usrn
      }

      fetch(`${url}/posts/delete/${extra.thepost._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(newobj),
        credentials: 'include'
      })

      fetch(`${url}/notif/postdel/${extra.thepost._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ name: 'user' }),
        credentials: 'include'
      })

      setLoader(true);
      setTimeout(() => {
        setLoader(false);
        trigger(false);
        extra.setDelsuccess(true);
      }, 3000);

    }

    if (extra.purpose == 'logger') {

      setLoader(true);
      setTimeout(() => {
        setLoader(false);
        trigger(false);

        fetch(`${url}/logout`, {
          credentials: 'include',
        })

        disp(loadersets(false));
        nav('/', { replace: true });

      }, 3000);

      setTimeout(() => {

        disp(clearfollowunfollow(true));
        disp(clearsettings(true));
        disp(cleariconreset(true));
        disp(clearleftp(true));
        disp(clearloader(true));
        disp(clearnextreqprof(true));
        disp(clearnextreq(true));
        disp(clearnotif(true));
        disp(clearprof(true));
        disp(clearstory(true));
        disp(clearstorydat(true));
        disp(clearyourdets(true));
        disp(clearnewpost(true));
        disp(cleartheme(true));

      }, 5000)


    }

  }


  return ReactDom.createPortal(
    <>


      <div className='blurremainy'></div>

      {loader && <Loadingmodal />}

      {!loader && <div className={theme ? 'yesnomodal' : "yesnomodal yesnomodalnight"}>

        {
          extra.purpose == 'newconv'

            ?

            <span className={theme ? 'thetextnewconv' : "thetextnewconv nighttextyesno"}>{text} <b>{bold}</b> ?</span>

            :

            extra.purpose == 'delpost'

              ?

              <span className={theme ? 'thetextdel' : "thetextdel nighttextyesno "}><b>{bold}</b> {text} ?</span>

              :

              extra.purpose == 'logger'

                ?

                <span className={theme ? 'thetextlogout' : "thetextlogout nighttextyesno "}>{text} <b>{bold}</b> ?</span>

                :

                <span className={theme ? 'thetext' : "thetext nighttextyesno "}>{text} <b>{bold}</b> ?</span>

        }

        <div className={theme ? 'nobutdiv' : 'nobutdiv nobutdivnight'} onClick={closemodal}>
          <button className={theme ? 'nobut' : "nobut nighttextyesno"}>NO</button>
        </div>

        <div className={theme ? 'yesbutdiv' : "yesbutdiv yesbutdivnight"} onClick={purpose}>
          <button className={theme ? 'yesbut' : 'yesbut nighttextyesno'}  >YES</button>
        </div>
      </div>}
    </>

    , document.getElementById('portal')
  );

}

export default Yesnomodal;


