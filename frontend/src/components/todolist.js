import React, { Component } from 'react'
import './todolist.css';
import Header from './header';
import TodoItem from './todoitems';
import TodoForm from './todoform';
import * as apiCalls from './api';

/**
 * TodoList component performing crud operation
 * Async await ES7 is used for api calls from backend
 */ 

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      isEdit: false,
      todo: {}
    }
    this.addTodo = this.addTodo.bind(this);
  }

  componentDidMount() {
    this.loadTodos();
  }

  async loadTodos() {
    let todos = await apiCalls.getTodos();
    this.setState({ todos });
  }


  async addTodo(val){
    let newTodo = await apiCalls.createTodo(val);
    this.setState({todos: [...this.state.todos, newTodo]})
   }
  
   async deleteTodo(id){
    await apiCalls.removeTodo(id);
    const todos = this.state.todos.filter(todo => todo._id !== id);
    this.setState({todos: todos});
  }
  
  async editTodo(todo) {
    this.setState({isEdit: true, todo});
    let updatedTodo = await apiCalls.updateTodo(todo);
    const todos = this.state.todos.map(t =>
      (t._id === updatedTodo._id)
      ? {...t, name: t.name, completed: !t.completed}
      : t
      )
    console.log("in edit todo", todo);
    this.setState({todos: todos});
  }
 

  render() {
    console.log(this.state.todos)

    const todos = this.state.todos.map((t) => (
      <TodoItem
        key={t._id}
        {...t}
        onDelete={this.deleteTodo.bind(this,t._id)}
        onEdit={this.editTodo.bind(this,t)}
      />
    ));

    return (
          <div className="todolist-app">
          <div className="todo-wrapper">
          <Header />
          <TodoForm  addTodo={this.addTodo} isEdit={this.state.isEdit} todo={this.state.todo}/>
              <ul>
              {todos}
              </ul>
          </div>
          </div>
         
          
          
    );
  }
}

export default TodoList;