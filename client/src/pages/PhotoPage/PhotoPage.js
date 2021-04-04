import React from 'react';
import { Link } from "react-router-dom";

const PhotoPage = (props) => {
    return ( 
        <div className="container">
            <h1>This is the photo page</h1>
            <Link to="/rovers">Back</Link>
        </div>
     );
}
 
export default PhotoPage;