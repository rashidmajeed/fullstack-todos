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
    this.editTodo = this.editTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this)
    this.updateTodoAPI = this.updateTodoAPI.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this)
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

   async deleteTodo({ _id }){
     debugger
    await apiCalls.removeTodo(_id);
    const todos = this.state.todos.filter(todo => todo._id !== _id);
    this.setState({todos: todos});
  }

  async editTodo(todo) {
    this.setState({isEdit: true, todo});
  }

   async updateTodoAPI(newName) {
     let updateTodo = {
       ...this.state.todo,
       name: newName
     };

    let updatedTodo = await apiCalls.updateTodo(updateTodo);

    const todos = this.state.todos.map(t =>
      (t._id === updateTodo._id)
      ? updateTodo
      : t
    );

    this.setState({ todos: todos, isEdit: false, todo: {} });
  }

  async toggleCompleted(todo){
   await apiCalls.updateTodo(todo);

   const todos = this.state.todos.map(t =>
     (t._id === todo._id)
     ? {...t, completed: !t.completed }
     : t
   );

   this.setState({ todos: todos });
  }


  render() {
    console.log(this.state.todos)

    const todos = this.state.todos.map((t) => (
      <TodoItem
        key={t._id}
        todo={t}
        onDelete={this.deleteTodo}
        toggleCompleted={this.toggleCompleted}
        onEdit={this.editTodo}
      />
    ));

    return (
          <div className="todolist-app">
          <div className="todo-wrapper">
          <Header />
          <TodoForm  updateTodoAPI={this.updateTodoAPI} addTodo={this.addTodo} isEdit={this.state.isEdit} todo={this.state.todo}/>
              <ul>
              {todos}
              </ul>
          </div>
          </div>



    );
  }
}

export default TodoList;
