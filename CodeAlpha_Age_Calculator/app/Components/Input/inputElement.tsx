import type React from "react";
import { useEffect, useState, type FormEvent } from "react";

export default function InputElement({type,ref,validationError=""}:{type:string,validationError:string,ref:React.Ref<HTMLInputElement>}){
    const [error,updateError] = useState(()=>"");
    useEffect(()=>{
        updateError(validationError);
    },[validationError]);
    function vaildation(e:FormEvent<HTMLInputElement>) {
        let yearNow = new Date().getFullYear();
        //test if empty
        if (!e.currentTarget.value) 
            updateError("this field is required");
        //test if the time less than the current time
        else if (type==="Year" && !(parseInt(e.currentTarget.value) <= yearNow)) 
            updateError("Must be in the past");
        //check if months between 1 and 12
        else if (type==="Month" && !(parseInt(e.currentTarget.value) <= 12 && (parseInt(e.currentTarget.value) > 0))) {
            console.log("error Month")
            updateError("Must be a valid month");
        }
        //check if days between 0 and 31
        else if (type==="Day" && !(parseInt(e.currentTarget.value) <= 31 && parseInt(e.currentTarget.value) > 0)) 
            updateError("Must be a valid Day");
        else if(validationError)
            updateError(validationError);
        else
        updateError("");
    }
    return (
        <div>
            <label htmlFor={type} id="dlabel" className={error?"error":""}>{type.toUpperCase()}</label>
            <input ref={ref} onInput={vaildation} type="text" name={type} className={error?"errorBorder":""} id={type.toLowerCase()} placeholder={type!=="Year"?type[0].repeat(2):type[0].repeat(4)} />
            <span id={type[0].toLocaleLowerCase()+"Error"} className="error showError">{error||""}</span>
        </div>
    );
}