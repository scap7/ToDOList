import React from "react";
import ListElement from "./ListElement";
import {RiAddCircleLine} from "react-icons/ri";
import {FaRegEdit} from "react-icons/fa";
export default function ToDOList() {
    const [inputText,setInputText]=React.useState("");
    const [listArray,setListArray]=React.useState([]);
    const[list,setList]=React.useState(null  );
    const[toggleSubmit,setToggleSubmit]=React.useState(true);
    const[isEditElement,setIsEditElement]=React.useState(null);
  const inputHandle=(e)=>{
     setList(e.target.value);
     setInputText(e.target.value);
  }
  const listArrayHandler=()=>{
    if(list!=null){
        const listItem={id:new Date().getTime().toString(),name:list}
        setListArray(prevArray=>[...prevArray,listItem]);
       
    }else if(inputText&& !toggleSubmit){
           setListArray(listArray.map(e=>{
            if(e.id===isEditElement){
                return {...e,name:inputText};
            }
            return e;
           })) 
    }else{
        alert("add element first")
    }
   
   setList(null);
   setInputText("");
  }
  const deleteElement=(id)=>{
   const newArray=listArray.filter(e=>e.id!=id);
   setListArray(newArray);
  }
  const editElement=(id)=>{
     let newEditElement=listArray.find(e=>e.id===id);
     console.log(newEditElement);
     setToggleSubmit(false);
     setInputText(newEditElement.name);
     setIsEditElement(id);
  }

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
        </div>
    )
}