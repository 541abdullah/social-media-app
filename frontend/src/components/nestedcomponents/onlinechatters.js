import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "../../corecss/onlinechatters.css";
import Yesnomodal from "../modals/yesnomodal";

const Onlinechatters = ({ onl, setCurrentchat, Currentchat, setDraft, draft, outsider, setOutsider, semaphore, setOnlchatclicked, onlchatclicked }) => {


  let [friends, setFriends] = useState([]);
  let [onlfriends, setOnlFriends] = useState([]);
  let [isnow, setIsnow] = useState(false);
  let [startconv, setStartconv] = useState({});
  let [classadder, setClassadder] = useState(true);

  let curuser = useSelector((state) => { return state.youryr.value });
  let theme = useSelector((state) => { return state.themeyr.value });

  let selref = useRef(false);

  useEffect(() => {

    fetch(`http://localhost:3001/messenger/getfren/${curuser.userid}`, {
      credentials: 'include'
    }).then((res) => {
      return res.json();
    }).then((data) => {

      setFriends(data);
      setIsnow(c => true);
    }).catch((err) => {
      console.log(err);
    });

  }, [curuser, onl]);


  useEffect(() => {
    setOnlFriends(friends.filter((each) => onl.includes(each._id)));
  }, [friends, onl]);


  if (outsider.verdict) {

    setOutsider(false);

    let checkifconvo = [curuser.userid, outsider.data];

    fetch(`http://localhost:3001/messenger/alreadyconv/checker`, {
      method: 'POST',
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify(checkifconvo),
      credentials: 'include'
    }).then((res) => {
      return res.json();
    }).then((data) => {
      if (data != null) {

        setCurrentchat(data);
      }
      else {

        let newobj = {
          senderId: curuser.userid,
          receiverId: outsider.data
        };

        fetch(`http://localhost:3001/messenger/create`, {
          method: 'POST',
          headers: { 'Content-Type': "application/json" },
          body: JSON.stringify(newobj),
          credentials: 'include'
        }).then((res) => {
          return res.json();
        }).then((datae) => {

          setCurrentchat(datae);

          setDraft(datae);

          fetch(`http://localhost:3001/messenger/delconv/${datae._id}`, {
            method: 'DELETE',
            credentials: 'include'
          }).then((res) => {
            return res.json();
          }).then((data) => {

          }).catch((err) => {
            console.log(err);
          });

        }).catch((err) => {
          console.log(err);
        });

      }
    }).catch((err) => {
      console.log(err);
    });

  }


  let handleclicker = (o) => {

    let checker = null;
    if (draft?.members[0] != curuser.userid) {
      checker = draft?.members[0];
    }
    else {
      checker = draft?.members[1];
    }


    if (!(o._id == checker) || (Currentchat != draft)) {

      let checkifconvo = [curuser.userid, o._id];

      fetch(`http://localhost:3001/messenger/alreadyconv/checker`, {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(checkifconvo),
        credentials: 'include'
      }).then((res) => {
        return res.json();
      }).then((data) => {
        if (data != null) {

          setCurrentchat(data);
          setOnlchatclicked(!onlchatclicked);

        }
        else {

          setStartconv((prev) => ({ ...prev, [o._id]: true }));
          selref.current = true;
        }
      }).catch((err) => {
        console.log(err);
      });

    }


  }


  let startconvhandler = (o) => {

    setStartconv((prev) => ({ ...prev, [o._id]: false }));


    let newobj = {
      senderId: curuser.userid,
      receiverId: o._id
    };

    fetch(`http://localhost:3001/messenger/create`, {
      method: 'POST',
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify(newobj),
      credentials: 'include'
    }).then((res) => {
      return res.json();
    }).then((datae) => {

      setCurrentchat(datae);
      setDraft(datae);


      fetch(`http://localhost:3001/messenger/delconv/${datae._id}`, {
        method: 'DELETE',
        credentials: 'include'
      }).then((res) => {
        return res.json();
      }).then((data) => {

      }).catch((err) => {
        console.log(err);
      });

    }).catch((err) => {
      console.log(err);
    });



  }


  return (
    <div className="online">
      {onlfriends.map((o) => (
        <div key={o._id}>
          <div className="allonline" onClick={() => handleclicker(o)}>
            <div className={classadder ? "onlinepfpcont" : "onlinepfpcont"}>
              {isnow && <img className="onlinepfp" alt=" " src={o.profpic} />}

              <div className="onlinemark"></div>
            </div>
            <span className={classadder ? theme ? "onlineusername" : "onlineusername onlnight" : theme ? "onlineusername" : "onlineusername onlnight"}>{o.fullname}</span>
          </div>

          {startconv[o._id] && <Yesnomodal trigger={setStartconv} text={`Do you want to start conversation with `} bold={o.fullname} extra={{ purpose: "newconv", main: o, startconvhandler, setOnlchatclicked, skeletonidentity: onlchatclicked }} />}
        </div>

      ))}

    </div>
  );
}

export default Onlinechatters;