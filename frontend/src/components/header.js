import React, { Component } from 'react';
import './todolist.css';
class Header extends Component {
  render() {
    return (
      <div className="Header">
      <h1>Todo<span> list</span></h1>
      <h3>A simple todo list app using MERN stack</h3>
      </div>
        );
    }
}

export default Header;
