import React, { useState } from "react";


function Image(props){

    //const[image, setImage] = useState(props.source);
    
    return(
        <img src={props.source} name={props.name} className={props.class} onClick = {props.clickEvent}/>    
    )
    
}


export default Image;