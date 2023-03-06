import React, { useState } from "react";

//serializing the defaultFormData
interface DefaultFormData {
  answer:string; //dont change this
}
const defaultFormData: DefaultFormData  = {
  answer:"",
};

interface MyFormProps {
  valueToSave: string;
}

export default function Form(props: MyFormProps){
    const [formData, setFormData] = useState(defaultFormData); // formData = defaultFormData
    const {answer} = formData; //deconstructing object

    const [savedValue, setSavedValue] = useState('');
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({ //changes formData according to input value being typed from user.
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        setSavedValue(props.valueToSave);
        
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent the form from submitting and refreshing the page

        console.log(formData);
        console.log(savedValue);
        

        fetch('http://127.0.0.1:8000/submit-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
                      },
          body: JSON.stringify(formData), //convert to JSON string
           
        })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error(error));
        
         setFormData(defaultFormData); //resets formData
  }
    return(
        <>

       <form onSubmit = {onSubmit} action="/submit-form" method = "post">
       
       <br/>
       <input type = "text" name = "answer" value={answer} onChange={onChange} />
       <button type = "submit">Submit</button>

       </form>
       </>
    );
}