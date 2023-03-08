import React, { useEffect, useState } from "react";

//serializing the defaultFormData
interface DefaultFormData {
  answer:string; //dont change this
  id:number
}
const defaultFormData: DefaultFormData  = {
  answer:"",
  id:0
};

interface MyFormProps {
  valueToSave: number;
  onSubmit: (questionId: number, answer: string) => void; //create this prop to pass in nextQuestion function from index.tsx
}

export default function Form({ valueToSave, onSubmit }: MyFormProps){//exporting these two props as a requirement in the index.tsx
    const [formData, setFormData] = useState(defaultFormData); // formData = defaultFormData
    const {answer} = formData; //deconstructing object

    
    const [savedValue, setSavedValue] = useState(formData.id);
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSavedValue(valueToSave);
  
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        id: savedValue,
      });
    };

    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent the form from submitting and refreshing the page

        onSubmit(formData.id, formData.answer); //calls the nextQuestion function from index.tsx

        console.log(formData); 

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

       <form onSubmit = {formSubmit} action="/submit-form" method = "post">
       
       <br/>
       <input type = "text" name = "answer" value={answer} onChange={onChange} />
       <button type = "submit">Submit</button>

       </form>
       </>
    );
}