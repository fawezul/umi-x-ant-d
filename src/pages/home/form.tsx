import React, {useState} from "react";

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
  IDToSave: number //for passing in the question ID  
  onSubmit: (ccId: number, helpAnswer: string) => void; //structures the onSubmit attribute to match nextQuestion parameters (numberID: number, theirAnswer: string)
}
//deconstructing
const formProps: MyFormProps = {
  IDToSave:0,
  onSubmit: (ccId: number, helpAnswer: string) => {} //only for structure for nextQuestion in index
};
export default function Form({ IDToSave, onSubmit }: MyFormProps){//exporting these two props as a requirement in the index.tsx, also passing in ID from IDToSave
    const [formData, setFormData] = useState(defaultFormData); // formData = defaultFormData
    const {answer} = formData; //deconstructing object

    
    const [savedValue, setSavedValue] = useState(IDToSave);
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSavedValue(IDToSave);
  
      setFormData({
        ...formData,
        [e.target.name]: e.target.value, //in the event of input
        id: savedValue,
      });
    };

    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent the form from submitting and refreshing the page

        onSubmit(formData.id, formData.answer); //uses the nextQuestion function from index.tsx, also for user's answer parameter in index

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