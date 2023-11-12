import { Fragment, react } from "react"
import { CommentField } from "../components/CommentField"
import "../styles/user.css"

export const Test = () =>{
   
    const names =["DamnDaniel", "LordToby", "Dinmor"]

    return(
        <Fragment>
        <div className="comments">
         {names.map((aName, index)=>(
            <CommentField key={index} userName={aName}/>
         ))}
         </div>
        </Fragment>
        );
}