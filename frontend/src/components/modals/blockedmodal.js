import ReactDom from 'react-dom';
import { useSelector } from "react-redux";
import { useState } from 'react';
import '../../corecss/blockedmodal.css';
import Loadingmodal from './loadingmodal';


const Blockedmodal = ({ text, doer, other, extra }) => {

  let curuser = useSelector((state) => { return state.youryr.value });
  let [loader, setLoader] = useState(false);

  let url = "http://localhost:3001";
  //let url = "https://social-media-app-backend-final.onrender.com";

  const unblocker = () => {

    async function unblocker() {

      await fetch(`${url}/users/unblock/${curuser.usrn}`, {
        method: 'PUT',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ "username": other }),
        credentials: 'include'
      })

      setLoader(true);
      setTimeout(() => {
        setLoader(false);
        extra.action(!extra.curstate);


      }, 3000);

    }

    unblocker();

  }


  return ReactDom.createPortal(
    <>

      {loader && <Loadingmodal />}

      <div className='blurremainb'></div>

      <div className='blockmodal'>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 noeye">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
        </svg>

        {doer === curuser.usrn

          ?

          <p className='helperp'>
            <span className='blocktext'>{text} <b>{other}</b></span>
          </p>
          :
          <p className='helperp'>
            <span className='blocktext'><b>{doer}</b> {text}</span>
          </p>

        }

        {doer === curuser.usrn && <button className='unblockpls' onClick={unblocker}>UNBLOCK</button>}

      </div>
    </>

    , document.getElementById('portal')
  );
}

export default Blockedmodal;