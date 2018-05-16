import React from 'react'
import './todoitems.css';

 const TodoItems = ({name, completed, onDelete, onEdit}) => {
  
    return (
      <div class="todoWrapper">
       <span>  
     <button className="DeleteTodo"
          onClick={onDelete}
        >
         Delete
        </button>
    </span>
    <span>  
     <button className="EditTodo"
          onClick={onEdit}
        >
         Edit
        </button>
    </span>
      <span
      style={{
          textDecoration: completed? 'line-through': 'none'
      }}
       >
      {name}
     </span>
    
  </div>
    );
  }


export default TodoItems;