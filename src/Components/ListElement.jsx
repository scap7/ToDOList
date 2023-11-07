import {FaRegTimesCircle,FaRegEdit} from "react-icons/fa";
import PropTypes from "prop-types";
export default function ListElement({element,deleteElement,id,editElement}){
    return(
        <li>
    <div className="list-element">
         <h3 >{element.name}</h3>
        <button onClick={()=>{deleteElement(id)}}><FaRegTimesCircle/></button>
        <button onClick={()=>{editElement(id)}}><FaRegEdit/></button>
    </div>       
       </li>
    )
}
ListElement.propTypes={
  element:PropTypes.string.isRequired,
  deleteElement:PropTypes.func.isRequired,
  editElement:PropTypes.func.isRequired,
 id:PropTypes.number.isRequired
}