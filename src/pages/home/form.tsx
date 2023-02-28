import { Input } from "antd";
import React, {MouseEventHandler, useState} from "react";


type button ={
    onClick: (event: MouseEventHandler<HTMLButtonElement>) => void
}


const Form = () => {

    const [values,setValues] = useState([""]   
    );

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const inputName = e.target.name;

        setValues((prevValue) => {
            return [newValue] })};
    

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log(values)
    }

    return (
        
            <form>
                <Input type = {"text"} onChange={inputChange} name={"inputName"}/>
                <button onClick={handleSubmit} type={"submit"} >Submit</button>
            </form>
       
    );
}

export default Form;