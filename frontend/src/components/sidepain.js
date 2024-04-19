import "../corecss/welcomepage.css";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { followunfollowobj } from "../features/followunfollow";
import { useNavigate } from "react-router-dom";
import { currview } from '../features/profile';
import Shimmer from './shimmer.js';


const Sidepain = () => {

    let [randomsuggestion,setRandomsuggestion] = useState([]);
    let [isrequested,setIsrequested]=useState({});
    let [cancelreq,setCancelreq]=useState({});
    let [showrandom,setShowrandom] = useState(false);

    let samplee = useSelector((state) => { return state.followyr.value });
    let theme = useSelector((state)=> {return state.themeyr.value});
    let curuser = useSelector((state) => { return state.youryr.value });

    let setDone = useRef(false);

    let disp=useDispatch();
    let nav = useNavigate();

    let url = "http://localhost:3001";
    //let url = "https://social-media-app-backend-final.onrender.com";


    useEffect(()=>{

        setIsrequested(samplee.isrequested);
        setCancelreq(samplee.cancelreq);

    },[samplee])


    const followtry = (each) => {

        fetch(`${url}/users/follow/${each.usr}`,{
            method: 'PUT',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ "username": curuser.usrn }),
            credentials: 'include'
        })    

        const newnotif =
        {
            username: curuser.usrn,
            type: "followreq",
            attachement: null,
            commentifany: null,
            pfp: curuser.pfp,
            fullname: curuser.fullname,
            reference: null

        };

        fetch(`${url}/notif/${each.usr}`, {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(newnotif),
            credentials: 'include'
        })

        setIsrequested((prev)=>({...prev,[each.id]:true}));
        setCancelreq((prev)=>({...prev,[each.id]:true}));
    }

    useEffect(()=>{

        disp(followunfollowobj({isrequested:isrequested, cancelreq:cancelreq}));

    },[isrequested])

    const requested = (each) => {

    
        const delnotif =
        {
            username: curuser.usrn,
            type: "followreqdel",
            
        };

        fetch(`${url}/notif/rem/${each.usr}`, {
            method: 'DELETE',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(delnotif),
            credentials: 'include'
        })


        fetch(`${url}/users/followcancel/${each.usr}`, {
            method: 'PUT',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({"username":curuser.usrn}),
            credentials: 'include'
        })

        setIsrequested((prev)=>({...prev,[each.id]:false}));
        setCancelreq((prev)=>({...prev,[each.id]:false}));
    }


    useEffect(()=>{

        async function randomsuggest() {

            const result = await fetch(`${url}/users/getall`, {
              credentials: 'include',
            })
            
            const data = await result.json();


            let newarray = data.filter((each)=>{

                for(let i = 0; i<curuser.following.length; i++){

                    if (each.id == curuser.following[i]){
                        return false;
                    }

                }

                if (each.id == curuser.userid){
                    return false;
                }

                return true;

            })

            for (let i = newarray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newarray[i], newarray[j]] = [newarray[j], newarray[i]];
            }

            newarray = newarray.slice(0, 5);

            setRandomsuggestion(newarray);
            setShowrandom(true);
        }

        if (curuser.userid.length!=0 && setDone.current == false){

            randomsuggest();
            setDone.current = true; 
        }
                
    },[curuser])


    const profview = (username)=>{
        
        disp(currview(username));
        nav(`/profile/${username}`);

    }


    return ( 

        <>
           <div className="sidepaincont1">
              <span className={ theme ? "sugge" : "suggenight"}>Suggested for you</span>
              <ul className="followusers">

                {showrandom 
                 

                    ?

                    randomsuggestion.map((each)=>(

                        <li key = {each.id} className="userlistitem">
                            <div className="listdiv">
                                <span className={ theme ? "listusernameshorte" : "listusernameshortenight" } onClick={()=>{profview(each.usr)}}>{each.usr}</span>
                                <span className={ theme ? "listfnameshorte" : "listfnameshortenight" } onClick={()=>{profview(each.usr)}}>{each.fname}</span>

                                <img className = "listpfpsp" src={each.pfp} onClick={()=>{profview(each.usr)}} ></img>
                               
                                <button className= {cancelreq[each.id] ? "blue_follow_buttonhidden" : "blue_follow_button"} onClick={()=>{followtry(each)}} >Follow </button>
                                <AddIcon className={cancelreq[each.id] ? "justplushidden" : "justplus" } onClick={()=>{followtry(each)}}/>
                                <button className={ isrequested[each.id] ? "silver_requested_button" : "silver_requested_buttonhidden"}   onClick = {()=>{requested(each)}} >Requested </button>
                            </div>
                        </li>

                    ))

                    :

                    <>
                        <div className='falsesuggestions'>
                            <div className="eachfalsesugg">

                            <div className='falsesuggcircle'>
                               <Shimmer></Shimmer>
                            </div>
                            <div className='falsesuggusername'>
                                    <Shimmer></Shimmer>
                            </div>
                            <div className='falsesugguserfname'>
                                    <Shimmer></Shimmer>
                            </div>

                            </div>

                            <div className="eachfalsesugg">

                            <div className='falsesuggcircle'>
                               <Shimmer></Shimmer>
                            </div>
                            <div className='falsesuggusername'>
                                    <Shimmer></Shimmer>
                            </div>
                            <div className='falsesugguserfname'>
                                    <Shimmer></Shimmer>
                            </div>

                            </div>

                            <div className="eachfalsesugg">

                            <div className='falsesuggcircle'>
                               <Shimmer></Shimmer>
                            </div>
                            <div className='falsesuggusername'>
                                    <Shimmer></Shimmer>
                            </div>
                            <div className='falsesugguserfname'>
                                    <Shimmer></Shimmer>
                            </div>

                            </div>

                            <div className="eachfalsesugg">

                            <div className='falsesuggcircle'>
                               <Shimmer></Shimmer>
                            </div>
                            <div className='falsesuggusername'>
                                    <Shimmer></Shimmer>
                            </div>
                            <div className='falsesugguserfname'>
                                    <Shimmer></Shimmer>
                            </div>

                            </div>

                            <div className="eachfalsesugg">

                            <div className='falsesuggcircle'>
                               <Shimmer></Shimmer>
                            </div>
                            <div className='falsesuggusername'>
                                    <Shimmer></Shimmer>
                            </div>
                            <div className='falsesugguserfname'>
                                    <Shimmer></Shimmer>
                            </div>

                            </div>
                           
                        </div>

                    </>

                }

              </ul>

           </div>
        
        </>
    
    );
}
 
export default Sidepain;