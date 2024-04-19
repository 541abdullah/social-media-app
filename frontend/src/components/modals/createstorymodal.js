import ReactDom from 'react-dom';
import '../../corecss/createstorymodal.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Loadingmodal from './loadingmodal';


const Storymodal = ({ trigger, changes, current }) => {


    let [sample, setSample] = useState(false);
    let [loader, setLoader] = useState(false);
    let [postvis, setPostvis] = useState(false);
    let [selectanother, setSelectanother] = useState(false);
    let [extensionerror, setExtensionerror] = useState(false);
    let [failure, setFailure] = useState(true);
    let [data, setData] = useState({
        type: 'private',
        thepost: null
    })

    let theme = useSelector((state) => { return state.themeyr.value });
    let curuser = useSelector((state) => { return state.youryr.value });

    let url = "http://localhost:3001";
    //let url = "https://social-media-app-backend-final.onrender.com";



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
    }

    const creator = async (e) => {

        e.preventDefault();

        const result = await fetch(`${url}/story/create/${curuser.usrn}`, {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(data),
            credentials: 'include'
        })

        const datareal = await result.json();
        if (datareal === 'compression required') {

            const secondresult = await resizeBase64Img(data.thepost, 3200, 3200);

            let newobj = {
                type: data.type,
                thepost: secondresult
            }
            const thirdresult = await fetch(`${url}/story/create/${curuser.usrn}`, {
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
                    setLoader(false);
                    changes(!current);

                }, 5000)
            }

        } else {

            setLoader(true);
            setTimeout(() => {

                trigger(false);
                setLoader(false);
                changes(!current);

            }, 5000)

        }

    }

    const changesetter = (e) => {

        let val = e.target.value;
        setData({ ...data, type: val });
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

            <div className='blurremains'></div>
            <div className={postvis ? theme ? 'storyformbig' : "storyformbig nightbgstory" : theme ? 'storyform' : "storyform nightbgstory"}>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={theme ? "w-6 h-6 cancelspost" : "w-6 h-6 cancelspost nighttextstory"} onClick={closemodal} >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>

                <h1 className={theme ? 'theheading' : "theheading nighttextstory"}>post a story</h1>
                <form id='form'>

                    <span className={theme ? "typelabel" : "typelabel nighttextstory "}>select story type</span>
                    <select name="storytype" id={theme ? "storytype" : "storytypenight"} onChange={(e) => { changesetter(e) }}>
                        <option value="private">private</option>
                        <option value="public">public</option>
                    </select>

                    {selectanother && <span className="fallbackimg">please select a smaller image</span>}
                    {extensionerror && <span className="wrongextension">please select .jpg , .jpeg , .png or .webp files only</span>}

                    <div className="input-groups">
                        <div className={theme ? 'hiders' : "hiders hidersnight"}>
                            choose an image
                            <input id='filess' onChange={(e) => { imgupload(e) }} name='thepost' type="file" />
                        </div>
                    </div>

                    {failure && data.thepost && <button className="submits" onClick={(e) => { creator(e) }}>post</button>}
                </form>
            </div>

        </>
        , document.getElementById('portal')
    );
}

export default Storymodal;