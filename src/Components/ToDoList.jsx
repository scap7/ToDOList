import React, { useEffect } from "react";
import ListElement from "./ListElement";
import {RiAddCircleLine} from "react-icons/ri";
import {FaRegEdit} from "react-icons/fa";

const getLSList=()=>{
    const LSList=localStorage.getItem("list");
    
    if(LSList){
        return JSON.parse(LSList);
    }else{
      return  [];
    }
    
  }
export default function ToDOList() {
    const [inputText,setInputText]=React.useState("");      //top input text 
    const [listArray,setListArray]=React.useState(getLSList());  // wholelist // retreiving from localstorage 
    const[list,setList]=React.useState(null  );                    // display typing 
    const[toggleSubmit,setToggleSubmit]=React.useState(true);      // helper
    const[isEditElement,setIsEditElement]=React.useState(null);    //helper
  const inputHandle=(e)=>{    // storing state of input text
     setList(e.target.value);
     setInputText(e.target.value);
  }
  const listArrayHandler=()=>{    // for adding elements to list //CREATE
    if(inputText && toggleSubmit){
        const listItem={id:new Date().getTime().toString(),name:inputText}
        setListArray(prevArray=>[...prevArray,listItem]);
       
    }else if(inputText && !toggleSubmit){    //  UPDATE
           setListArray(listArray.map(e=>{
            if(e.id===isEditElement){
                return {...e,name:inputText};
            }
            return e;
           })) 
            setToggleSubmit(true);
           
            setIsEditElement(null);
           

    }else{
        alert("add element first")
    }
   
   setList(null);
   setInputText("");
  }
  const deleteElement=(id)=>{      // DELETE
   const newArray=listArray.filter(e=>e.id!=id);
   setListArray(newArray);
  }
  const deleteAll=()=>{             //DELETE ALL
    setListArray([]);
  }
  const editElement=(id)=>{         //UPDATE 
     let newEditElement=listArray.find(e=>e.id===id);
     console.log(newEditElement);
     setToggleSubmit(false);
     setInputText(newEditElement.name);
     setIsEditElement(id);
  }
  //useEffect =>storing in localstorage 
  useEffect(()=>{
    localStorage.setItem("list",JSON.stringify(listArray));
  }   
  ,[listArray])
  

    return (
        <div className="todolist-container">
            <h1 className="title">Todo list</h1>
            <div className="underline"></div>
            <div className="input-container">
               <input
                className="top-input"
                type="text"
                placeholder="type here"
                value={inputText}
                onChange={inputHandle}
               />
          {toggleSubmit?<button onClick={listArrayHandler}><RiAddCircleLine/></button>:<button onClick={listArrayHandler}><FaRegEdit/></button> }
            </div>
            
            <ol>
                <li>
                    {list}
                </li>
               {
                listArray.map((e)=>{
                    return(
                        <ListElement 
                        key={e.id} 
                        id={e.id} 
                        element={e} 
                        deleteElement={deleteElement}
                        editElement={editElement}
                       
                        />
                    )
                })
               }
            </ol>
            <button className="clear-btn" onClick={deleteAll}>Clear List</button>
        </div>
    )
}