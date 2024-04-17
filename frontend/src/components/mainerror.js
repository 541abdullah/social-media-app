"use client";

import "../corecss/mainerror.css";
import Boundarymodal from "./modals/boundarymodal";



const Errorbound = ({ error, resetErrorBoundary }) => {

  return (

    <>
      <Boundarymodal goback={resetErrorBoundary} />
    </>


  );

}

export default Errorbound;