import Share from "./sharing";
import "../corecss/homepagefeed.css"

const Homepagefeed = ({refer}) => {
    return (  
        <div className="feedpane">

          <Share refer={refer}/>
        
        </div>
        
    );
}
 
export default Homepagefeed;

