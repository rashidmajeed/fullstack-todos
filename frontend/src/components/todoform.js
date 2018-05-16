import React, { Component } from 'react';
import './todoinput.css';

class TodoForm extends Component {
  
  constructor(props){
    super(props);
    this.state = {inputValue: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e){
    this.setState({
      inputValue: e.target.value
    });
  }
  handleSubmit(){
    this.props.addTodo(this.state.inputValue);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.todo.name !== this.props.todo.name){
        this.setState({inputValue:nextProps.todo.name});
    }
}
  render() {
    const {isEdit} = this.props;
    return (
      <div className="Todo-list-main">
        
        <input 
          type="text" 
          value={this.state.inputValue}
          onChange={this.handleChange}
        />
        <button className="btn btn-primary"
          onClick={this.handleSubmit}
        >
         {isEdit ? "Update Todo" : "Add Todo"}
        </button>
        
      </div>
    );
  }
}

export default TodoForm;
