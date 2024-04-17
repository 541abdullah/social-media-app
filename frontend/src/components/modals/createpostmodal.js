import ReactDom from 'react-dom';
import '../../corecss/createpostmodal.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Loadingmodal from './loadingmodal';
import { useDispatch } from 'react-redux';
import { newpostadded } from '../../features/newpost';



const Createmodal = ({ trigger, extra }) => {

    let curuser = useSelector((state) => { return state.youryr.value });
    let newpost = useSelector((state) => { return state.newpostadder.value });
    let theme = useSelector((state) => { return state.themeyr.value });

    const disp = useDispatch();

    let [sample, setSample] = useState(false);
    let [loader, setLoader] = useState(false);
    let [selectanother, setSelectanother] = useState(false);
    let [postvis, setPostvis] = useState(false);
    let [extensionerror, setExtensionerror] = useState(false);
    let [failure, setFailure] = useState(true);
    let [data, setData] = useState({
        capt: null,
        thepost: null
    })

    function resizeBase64Img(base64, newWidth, newHeight) {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement("canvas");
            canvas.width = newWidth;
            canvas.height = newHeight;
            let context = canvas.getContext("2d");
            let img = document.createElement("img");
            img.src = base64;
            img.onload = function () {
                context.scale(newWidth / img.width, newHeight / img.height);
                context.drawImage(img, 0, 0);
                resolve(canvas.toDataURL());
            }
        });
    }


    const closemodal = () => {
        trigger(false);
        if (extra != null) {
            extra(null);
        }

    }


    const creator = async (e) => {

        e.preventDefault();

        const finaldata = data;
        finaldata.userid = curuser.userid;
        finaldata.username = curuser.usrn;
        finaldata.pfp = curuser.pfp;

        const result = await fetch(`http://localhost:3001/posts/create`, {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(finaldata),
            credentials: 'include'
        })


        const datareal = await result.json();

        if (datareal === 'compression required') {

            const secondresult = await resizeBase64Img(finaldata.thepost, 3200, 3200);

            let newobj = {
                capt: finaldata.capt,
                thepost: secondresult,
                userid: curuser.userid,
                username: curuser.usrn,
                pfp: curuser.pfp
            }

            const thirdresult = await fetch(`http://localhost:3001/posts/create`, {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(newobj),
                credentials: 'include'
            })


            const redo = await thirdresult.json();

            if (redo === 'compression required') {

                setSelectanother(true);
                setTimeout(() => {
                    setSelectanother(false);
                }, 2000)


            } else {
                setLoader(true);

                setTimeout(() => {

                    trigger(false);
                    if (extra != null) {
                        extra(null);
                    }

                    setLoader(false);
                    disp(newpostadded(!newpost));


                }, 3000)
            }

        } else {

            setLoader(true);

            setTimeout(() => {

                trigger(false);
                if (extra != null) {
                    extra(null);
                }

                setLoader(false);
                disp(newpostadded(!newpost));


            }, 3000)

        }


    }


    const changesetter = (e) => {
        let type = e.target.name;
        let val = e.target.value;

        setData({ ...data, [type]: val });
        setSample(!sample);

    }

    const imgupload = (e) => {


        if (e.target.files[0] != undefined) {
            setSample(!sample);
            const reader = new FileReader();

            let datatype = e.target.files[0].name.split('.').pop();
            if (datatype != 'jpg' && datatype != 'jpeg' && datatype != 'png' && datatype != 'webp') {

                setFailure(false);
                setExtensionerror(true);
                setPostvis(false);

                setTimeout(() => {
                    setExtensionerror(false);
                }, 5000);


                return;
            } else {
                setFailure(true);
            }

            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                setData({ ...data, thepost: reader.result });
            }

            reader.onerror = error => {
                console.log(error);
            }

            setPostvis(true);

        }
    }


    return ReactDom.createPortal(
        <>

            {loader && <Loadingmodal trigger={setLoader} />}
            <div className='blurremainc'></div>

            <div className={postvis ? theme ? 'createformbig' : "createformbig nightbgpost" : theme ? 'createform' : "createform nightbgpost "}>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={theme ? "w-6 h-6 cancelpost" : "w-6 h-6 cancelpost nighttextpost"} onClick={closemodal} >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>

                <h1 className={theme ? 'postheading' : "postheading nighttextpost"}>create a post</h1>
                <form id='form'>

                    <input name='capt' id={theme ? 'capt' : "captnight"} placeholder="enter caption here..." onChange={(e) => { changesetter(e) }} />
                    <div className="input-group">
                        <div className={theme ? 'hider' : "hider hidernight"}>
                            choose an image
                            <input id='files' onChange={(e) => { imgupload(e) }} name='thepost' type="file" />
                        </div>
                    </div>

                    {selectanother && <span className="fallbackimgred">please select a smaller image</span>}
                    {extensionerror && <span className="wrongextensionred">please select .jpg , .jpeg , .png or .webp files only</span>}
                    {failure && data.thepost && <button className="submit" onClick={(e) => { creator(e) }}>post</button>}
                </form>
            </div>

        </>

        , document.getElementById('portal')
    );
}

export default Createmodal;