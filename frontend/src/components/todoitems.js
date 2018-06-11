import React from 'react'

import './todoitems.css';

class TodoItem extends React.Component {
  onDelete = () => {
      this.props.onDelete(this.props.todo)
  }

  onEdit = () => {
      this.props.onEdit(this.props.todo)
  }

  toggleCompleted = () => {
      this.props.toggleCompleted(this.props.todo)
  }

  render(){
    const { todo } = this.props;
     return (
      <div className="todoWrapper">
       <span>
     <button className="DeleteTodo"
          onClick={this.onDelete}
        >
         Delete
        </button>
    </span>
    <span>
     <button className="EditTodo"
          onClick={this.onEdit}
        >
         Edit
        </button>
    </span>
      <span
      onClick={this.toggleCompleted}
      style={{
          textDecoration: todo.completed ? 'line-through': 'none'
      }}
       >
      {todo.name}
     </span>

  </div>
    );
  }
}

export default TodoItem;
