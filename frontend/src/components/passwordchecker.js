import '../corecss/pwordchecker.css';
import { useSelector } from "react-redux";


const Passwordchecker = ({ nosymbol, noeight, nonum, nolowerletter, noupperletter, loc }) => {

   let theme = useSelector((state) => { return state.themeyr.value });

   return (

      loc

         ?

         <>
            {!nosymbol && <p className=" tw-text-red-600 nopass">*needs atleast one symbol</p>}
            {!noeight && <p className=" tw-text-red-600 nopass">*needs atleast eight characters</p>}
            {!nonum && <p className=" tw-text-red-600 nopass">*needs atleast one number</p>}
            {!noupperletter && <p className=" tw-text-red-600 nopass">*needs atleast one uppercase letter</p>}
            {!nolowerletter && <p className=" tw-text-red-600 nopass">*needs atleast one lowercase letter</p>}
            {nonum && noeight && nolowerletter && noupperletter && nosymbol && <p className=" tw-text-green-600 nopass">Valid Password.</p>}
         </>

         :

         <>

            {(!nonum || !noeight || !nolowerletter || !noupperletter || !nosymbol) && <p><span className={!nosymbol ? "tw-text-red-600 constraintone " : theme ? "tw-text-green-600 constraintone" : "tw-text-green-800 constraintone"}>*one symbol atleast</span> <span className={!noeight ? "tw-text-red-600 constrainttwo" : theme ? "tw-text-green-600 constrainttwo" : "tw-text-green-800 constrainttwo"} >*eight characters atleast</span></p>}
            {(!nonum || !noeight || !nolowerletter || !noupperletter || !nosymbol) && <p><span className={!nonum ? "tw-text-red-600 constraintthree" : theme ? "tw-text-green-600 constraintthree" : "tw-text-green-800 constraintthree"}>*one number atleast</span> <span className={!noupperletter ? "tw-text-red-600 constraintfour" : theme ? "tw-text-green-600 constraintfour" : "tw-text-green-800 constraintfour"} >*one uppercase letter atleast</span></p>}
            {(!nonum || !noeight || !nolowerletter || !noupperletter || !nosymbol) && <p><span className={!nolowerletter ? "tw-text-red-600 constraintfive" : theme ? "tw-text-green-600 constraintfive" : "tw-text-green-800 constraintfive"}>*one lowercase letter atleast</span></p>}
            {nonum && noeight && nolowerletter && noupperletter && nosymbol && <p className={theme ? " tw-text-green-600 constraintthree" : "tw-text-green-800 constraintthree"}>Valid Password.</p>}

         </>

   );


}


export default Passwordchecker;