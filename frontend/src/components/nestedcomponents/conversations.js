import "../../corecss/conversation.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { yoursets } from '../../features/you'
import { useDispatch } from 'react-redux';
import Shimmer from '.././shimmer.js';

const Conversation = ({ conver, latestchat, setFromconv, fromconv }) => {


    let curuser = useSelector((state) => { return state.youryr.value });
    let theme = useSelector((state) => { return state.themeyr.value });


    let [fre, setFre] = useState("");
    let [isnow, setIsnow] = useState(false);
    let [newunblocks, setNewunblocks] = useState([]);

    let disp = useDispatch();

    useEffect(() => {

        let friendid = conver.members?.find((fren) => fren !== curuser.userid);

        fetch(`http://localhost:3001/messenger/getconvostuff/${friendid}`, {
            credentials: 'include'
        }).then((res) => {
            return res.json();
        }).then((data) => {
            setFre(data);
            setIsnow(c => true);
            setFromconv((fromconv) => ({ ...fromconv, [conver._id]: data }));
        }).catch((err) => {
            console.log(err);
        });

    }, [curuser, conver, setFromconv]);

    const unblock = () => {

        async function unblocked() {

            setNewunblocks([...newunblocks, fre.username]);

            await fetch(`http://localhost:3001/users/unblock/${curuser.usrn}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ username: fre.username }),
            })


            fromconv[conver._id].unblockattempt = true;
            setFromconv((fromconv) => ({ ...fromconv }));

            const newblocked = curuser.blocked.filter((each) => each != fre.username);

            const newobj = {
                pfp: curuser.pfp,
                usrn: curuser.usrn,
                email: curuser.email,
                fullname: curuser.fullname,
                userid: curuser.userid,
                following: curuser.following,
                blocked: newblocked
            };


            disp(yoursets(newobj));

        }

        unblocked();


    }


    return (
        <div className={newunblocks.includes(fre.username) ? latestchat[conver._id] ? "convonewer" : theme ? "convo" : "convonight" : fre?.blocked?.includes(curuser.usrn) ? "convotheyblocked" : curuser.blocked.includes(fre.username) ? 'convoyoublocked' : latestchat[conver._id] ? "convonewer" : theme ? "convo" : "convonight"}>

            {

                isnow

                    ?

                    <>

                        <img className="convoimg" alt=" " src={fre.pfp} />
                        <span className={theme ? "convoname" : "convoname convonamenightmode"}>{fre.fname}</span>

                    </>

                    :

                    <>

                        <div className="chatpfpskeleton">
                            <Shimmer></Shimmer>
                        </div>

                        <div className="chatfnameskeleton">
                            <Shimmer></Shimmer>
                        </div>

                    </>



            }

            {!newunblocks.includes(fre.username) && curuser.blocked.includes(fre.username) && <button className="unblocker" onClick={unblock}>UNBLOCK</button>}

        </div>
    );

}

export default Conversation;




