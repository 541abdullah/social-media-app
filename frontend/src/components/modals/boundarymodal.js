import ReactDom from 'react-dom';
import '../../corecss/boundarymodal.css';
import { useSelector } from "react-redux";

const Boundarymodal = ({ goback }) => {

  let theme = useSelector((state) => { return state.themeyr.value });

  return ReactDom.createPortal(
    <>


      <div className='blurremainfault'></div>


      <div className={theme ? 'mainfaultdiv' : 'mainfaultdivnight'}>

        <span className={theme ? 'faulttext' : 'faulttextnight'}>sorry, this feature is under construction, please try later</span>
        <div className={theme ? 'returnerfault' : 'returnerfaultnight'} onClick={goback}>
          <span className={theme ? 'faultaction' : 'faultactionnight'}>return to homepage</span>
        </div>

      </div>



    </>

    , document.getElementById('portal')
  );

}

export default Boundarymodal;


