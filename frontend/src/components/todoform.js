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
    if(this.props.isEdit){
      this.props.updateTodoAPI(this.state.inputValue);

    } else {
      this.props.addTodo(this.state.inputValue);
    }

    this.setState({
      inputValue: ""
    })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.todo._id !== this.props.todo._id){
        this.setState({ inputValue: nextProps.todo.name });
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
         {isEdit ? "Update" : "Add"}
        </button>

      </div>
    );
  }
}

export default TodoForm;
