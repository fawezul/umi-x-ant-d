import { useState } from "react";
import { Input } from "antd";
const defaultFormData ={
    title:"",
    body:""
};

export default function Login(){
    const [formData, setFormData] = useState(defaultFormData);
    const {title, body} = formData; //deconstructing object

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);

        setFormData(defaultFormData);
    };

    return(
        <>

       <form onSubmit = {(e) => onSubmit}>
       <label htmlFor="title">Write something</label>
       <br/>
       <Input type = "text" id = "title" value={title} onChange={onChange} />
       <button type = "submit">Submit</button>

       </form>
       </>
    );
}