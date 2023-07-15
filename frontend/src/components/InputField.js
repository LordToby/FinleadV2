import React from "react";
import { useState } from "react";
import InlineImage from "./InlineImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
const closedEye = <FontAwesomeIcon icon={faEyeSlash}/>;

function InputField({ type, value, onChange, name }) {

    const[values, setValues] = useState({
        inputType: type,
        image: closedEye
    });
    
    function handleClick(){
        values.inputType ==="password" ?
            setValues({
                inputType: "text",
                image: eye,
            })
        : setValues({
            inputType: "password",
            image: closedEye,
        })
        
    } 
    return (
      <div style={{ position: "relative !important" }}>
        <input type={values.inputType} placeholder={type} value={value} onChange={onChange} name={name}  />
        {type === "password" && 
        <InlineImage className = "eye" name="eye" clickEvent={handleClick} image={values.image}       
        />}     
        <br />
      </div>
    );
        
    
}

export default InputField;
