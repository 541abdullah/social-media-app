import ReactDom from 'react-dom';
import '../../corecss/ffmodal.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { currview } from '../../features/profile';


const Ffmodal = ({ trigger, visit, visitval, heading, array, setPersondets }) => {

    let theme = useSelector((state) => { return state.themeyr.value });

    let nav = useNavigate();
    let disp = useDispatch();

    const closemodal = () => {
        trigger(false);
    }

    const profviewer = (key) => {

        trigger(false);
        visit(!visitval);
        setPersondets(null);
        disp(currview(key.username));
        nav(`/profile/${key.username}`);

    }


    return ReactDom.createPortal(
        <>

            <div className='blurremainff'></div>
            <div className={array.length <= 3 ? theme ? 'createformff' : 'createformff nightffbg' : theme ? 'createformplusff' : "createformplusff nightffbg"}>

                <h1 className={theme ? 'headerff' : "headerff textnightff"}>{heading}</h1>

                <hr className='afterheading'></hr>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={theme ? "w-6 h-6 cancelff" : "w-6 h-6 cancelff textnightff"} onClick={closemodal} >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>


                <div className={array.length <= 3 ? theme ? 'allff' : "allff allffnight" : theme ? "allffplus" : "allffplus allffplusnight"}>

                    {
                        array.map((each) => (
                            <div className="eachperson" onClick={() => { profviewer(each) }}>
                                <img src={each.pfp} alt="" className='ffpfp'></img>
                                <span className={theme ? 'ffname' : "ffname textnightff "}>{each.username}</span>
                            </div>
                        ))
                    }

                </div>

            </div>

        </>

        , document.getElementById('portal')
    );
}

export default Ffmodal;