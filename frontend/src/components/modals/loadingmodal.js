import ReactDom from 'react-dom';
import { Ring } from '@uiball/loaders'
import '../../corecss/loadingmodal.css';

const Loadingmodal = ({trigger}) => {


    return ReactDom.createPortal(  
        <>
            <div className='blurremainload'></div>
            <div className='loadring'><Ring size={40} lineWeight={5} speed={2} color="white"/></div>
        </>

        , document.getElementById('portal')
    );
}
 
export default Loadingmodal;