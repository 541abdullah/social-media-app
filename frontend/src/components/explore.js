import Leftpain from "./leftpain";
import Header from "./header";
import '../corecss/explore.css';
import { useState, useEffect, useRef, useCallback } from 'react';
import Searchpopup from "./modals/searchpopup";
import Postpopup from "./modals/postpopup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { nextrequested } from '../features/nextrequested.js';


const Explore = () => {


  let [searchopenmodal, setSearchopenmodal] = useState(false);
  let [proparray, setProparray] = useState([]);
  let [allusers, setAllusers] = useState([]);
  let [loader, setLoader] = useState(null);
  let [skipval, setSkipval] = useState(10);
  let [currentlayer, setCurrentLayer] = useState([]);
  let [defaultblock, setDefaultblock] = useState(null);
  let [currentpost, setCurrentpost] = useState(null);
  let [bigopen, setBigopen] = useState(null);
  let [limiter, setLimiter] = useState(true);
  let [currentblocks, setCurrentblocks] = useState([]);
  let [spacer, setSpacer] = useState(false);

  let nextrequestedimg = useSelector((state) => { return state.nextimgyr.value });
  let themer = useSelector((state) => { return state.themeyr.value });
  let curuser = useSelector((state) => { return state.youryr.value });

  let disp = useDispatch();

  let mainblockarea = useRef(null);
  let scrollstopper = useRef(1);
  let doublstopper = useRef(1);
  let lastloader = useRef(1);
  let commentheartobj = useRef({});
  let curview = useRef({});

  let url = "http://localhost:3001";
  //let url = "https://social-media-app-backend-final.onrender.com";

  const modalopener = (e) => {

    const piece = `^${e.target.value}.*$`;

    let regexx = new RegExp(piece, "g");

    const helper = allusers.map((each) => {
      if (regexx.test(each.usr) || regexx.test(each.fname)) {
        return each;
      }
    });

    const remover = helper.filter((each) => each != undefined);
    setProparray(remover);

    if (e.target.value !== "") {
      setSearchopenmodal(true);
    } else {
      setSearchopenmodal(false);
      mainblockarea.current.classList.add("mainfeed");
      mainblockarea.current.classList.remove("mainfeednoscroll");
    }

  }


  useEffect(() => {


    async function allusergetter() {
      const result = await fetch(`${url}/users/getall`, {
        credentials: 'include'
      })

      const data = await result.json();
      setAllusers(data);

    }

    allusergetter();

  }, [])


  useEffect(() => {


    async function initialtop() {

      const result = await fetch(`${url}/posts/nextten/${curuser.usrn}?skip=0`, {
        credentials: 'include',
      })


      const data = await result.json();


      data.map((each) => {

        commentheartobj.current[each._id] = {};

        each.comments.map((eachlet) => {

          if (eachlet.likes.includes(curuser.usrn)) {

            commentheartobj.current[each._id][eachlet._id] = true;

          }

        })

      })

      const defaultresult = await fetch(`${url}/posts/generalgetter`, {
        credentials: 'include',
      })

      const defdata = await defaultresult.json();

      setDefaultblock(defdata);

      setCurrentLayer((currentlayer) => [...currentlayer, 0]);
      setCurrentblocks(data);

    }

    initialtop();

  }, [])

  const fetchData = useCallback(async () => {

    const result = await fetch(`${url}/posts/nextten/${curuser.usrn}?skip=${skipval}`, {
      credentials: 'include',
    })

    const data = await result.json();

    data.map((each) => {

      commentheartobj.current[each._id] = {};

      each.comments.map((eachlet) => {

        if (eachlet.likes.includes(curuser.usrn)) {

          commentheartobj.current[each._id][eachlet._id] = true;

        }

      })
    })


    if (data.length != 0) {
      setCurrentLayer((currentlayer) => [...currentlayer, skipval]);
    }
    if (data.length < 10) {
      setLoader(false);
    }

    scrollstopper.current = data.length;
    setCurrentblocks((currentblocks) => [...currentblocks, ...data]);
    setLoader(false);
    doublstopper.current = 1;
    setSkipval((skipval) => skipval + 10);


  }, [loader]);





  useEffect(() => {


    if (nextrequestedimg) {

      disp(nextrequested(null));
      let idx = currentblocks.indexOf(curview.current);
      viewpost(currentblocks[idx + 1]);


    } else if (nextrequestedimg == false) {

      disp(nextrequested(null));
      let idx = currentblocks.indexOf(curview.current);
      viewpost(currentblocks[idx - 1]);

    }



    const handleScroll = () => {

      if (doublstopper.current == 1) {

        if (Math.abs(mainblockarea.current.scrollHeight - mainblockarea.current.clientHeight - mainblockarea.current.scrollTop) < 1) {

          if (scrollstopper.current != 0) {

            fetchData();
            setLoader(true);
            doublstopper.current = 0;

          }

          else if (scrollstopper.current < 10) {

            if (lastloader.current) {
              setLoader(true);
              lastloader.current = 0;
              setTimeout(() => {
                setLoader(false);
                setSpacer(true);
              }, 3000);
            }

          }



        }

      }


    };



    mainblockarea.current.addEventListener("scroll", handleScroll);
    return () => {
      if (mainblockarea.current != null) {
        mainblockarea.current.removeEventListener("scroll", handleScroll);
      }

    };

  });



  const viewpost = (post) => {


    curview.current = post;



    if (currentblocks[0] == post) {
      setLimiter("leftlim");
    } else if (currentblocks[currentblocks.length - 1] == post) {
      setLimiter("rightlim");
    } else {
      setLimiter(true);
    }

    setCurrentpost(post);
    setBigopen(true);




  }


  useEffect(() => {



    function isunsearch(event) {

      if (searchopenmodal) {

        if (!event.target.matches('.searchmodal') && !event.target.matches('.noresults') && !event.target.matches('.nosearchemoji')
          && !event.target.matches('.exploresearchbar') && !event.target.matches('.expsearchicon')) {
          setSearchopenmodal(false);
          mainblockarea.current.classList.add("mainfeed");
          mainblockarea.current.classList.remove("mainfeednoscroll");
        }


      }

    }


    if (searchopenmodal) {

      document.addEventListener("click", isunsearch);

      return () => {
        document.removeEventListener('click', isunsearch);
      }

    }

  })


  useEffect(() => {

    function preventscroll() {

      mainblockarea.current.scrollTo(0, 0);
      mainblockarea.current.classList.remove("mainfeed");
      mainblockarea.current.classList.add("mainfeednoscroll");



    }


    if (searchopenmodal) {

      if (document.querySelector('.mainfeed') != null) {
        document.querySelector('.mainfeed').addEventListener('scroll', preventscroll);
      } else {
        document.querySelector('.mainfeednoscroll').addEventListener('scroll', preventscroll);
      }


      return () => {

        if (document.querySelector('.mainfeed') != null) {
          document.querySelector('.mainfeed').removeEventListener('scroll', preventscroll);
        } else {
          document.querySelector('.mainfeednoscroll').removeEventListener('scroll', preventscroll);
        }


      }

    }


  })







  return (

    <>

      {bigopen && <Postpopup hider={limiter} trigger={setBigopen} data={currentpost} comheartobj={commentheartobj.current[currentpost._id]} type={'explore'} /*renderer={setSample} rendererval={sample} refresher={bigpreview}*/ />}

      <Header caller={'explore'} extra={null} />

      <div className={themer ? "mainexp" : 'mainexp mainexpnight'} >

        <div className="exploreleftpain">
          <Leftpain parent={'explore'} />
        </div>

        <div ref={mainblockarea} className="mainfeed">

          {allusers.length != 0 && <input type='text' className={themer ? "exploresearchbar" : "exploresearchbar exploresearchbarnight"} placeholder="search..." onChange={(e) => { modalopener(e) }} />}
          {allusers.length == 0 && <input type='text' className={themer ? "exploresearchbar" : "exploresearchbar exploresearchbarnight"} placeholder="search..." onChange={(e) => { modalopener(e) }} disabled />}

          {searchopenmodal && <Searchpopup open={searchopenmodal} slice={proparray} />}

          <div className="searchicondiv">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentcolor" class={themer ? "bi bi-search expsearchicon" : "bi bi-search expsearchicon expsearchiconnight"} viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>

          </div>




          <hr className="expruler"></hr>


          {
            currentlayer.length == 0

              ?

              <div className='loadingmoreblocksinitial'></div>


              :


              currentlayer.map((each) => (

                <div className={each == 0 ? "infinityfeed" : "infinityfeednext"} key={each}>
                  <div className="cont">

                    <img className="feedcell" src={currentblocks[each + 0] != undefined ? currentblocks[each + 0].img : defaultblock.img} onClick={currentblocks[each + 0] != undefined ? () => { viewpost(currentblocks[each + 0]) } : console.log('no-op')}></img>

                  </div>
                  <div className="cont">

                    <img className="feedcell" src={currentblocks[each + 1] != undefined ? currentblocks[each + 1].img : defaultblock.img} onClick={currentblocks[each + 1] != undefined ? () => { viewpost(currentblocks[each + 1]) } : console.log('no-op')}></img>

                  </div>
                  <div className="contbig">


                    <img className="feedcellbig" src={currentblocks[each + 2] != undefined ? currentblocks[each + 2].img : defaultblock.img} onClick={currentblocks[each + 2] != undefined ? () => { viewpost(currentblocks[each + 2]) } : console.log('no-op')}></img>

                    <div className="incont">


                      <img className="feedcell" src={currentblocks[each + 3] != undefined ? currentblocks[each + 3].img : defaultblock.img} onClick={currentblocks[each + 3] != undefined ? () => { viewpost(currentblocks[each + 3]) } : console.log('no-op')}></img>

                    </div>
                    <div className="inconter">


                      <img className="feedcell" src={currentblocks[each + 4] != undefined ? currentblocks[each + 4].img : defaultblock.img} onClick={currentblocks[each + 4] != undefined ? () => { viewpost(currentblocks[each + 4]) } : console.log('no-op')}></img>

                    </div>

                  </div>
                  <div className="contbig">


                    <img className="feedcellbig" src={currentblocks[each + 5] != undefined ? currentblocks[each + 5].img : defaultblock.img} onClick={currentblocks[each + 5] != undefined ? () => { viewpost(currentblocks[each + 5]) } : console.log('no-op')}></img>

                    <div className="inconttwo">

                      <img className="feedcell" src={currentblocks[each + 9] != undefined ? currentblocks[each + 9].img : defaultblock.img} onClick={currentblocks[each + 9] != undefined ? () => { viewpost(currentblocks[each + 9]) } : console.log('no-op')}></img>

                    </div>
                    <div className="incontertwo">


                      <img className="feedcell" src={currentblocks[each + 8] != undefined ? currentblocks[each + 8].img : defaultblock.img} onClick={currentblocks[each + 8] != undefined ? () => { viewpost(currentblocks[each + 8]) } : console.log('no-op')}></img>

                    </div>

                  </div>
                  <div className="cont">


                    <img className="feedcell" src={currentblocks[each + 6] != undefined ? currentblocks[each + 6].img : defaultblock.img} onClick={currentblocks[each + 6] != undefined ? () => { viewpost(currentblocks[each + 6]) } : console.log('no-op')}></img>

                  </div>
                  <div className="cont">


                    <img className="feedcell" src={currentblocks[each + 7] != undefined ? currentblocks[each + 7].img : defaultblock.img} onClick={currentblocks[each + 7] != undefined ? () => { viewpost(currentblocks[each + 7]) } : console.log('no-op')} ></img>

                  </div>
                </div>

              ))

          }

          {spacer && <div className="spacediv"></div>}
          {loader && <div className='loadingmoreblocks'></div>}

        </div>

      </div>

    </>

  );
}

export default Explore;


