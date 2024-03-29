import React, {Component}  from 'react';

import AppHeader from '../app-header';
import TodoList from '../todo-list';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component{

  maxId = 100;
  //state - объект, в котором есть свойство todoData
  state = {
    todoData: [
      this.createTodoItem('Выпить кофе'),
      this.createTodoItem('Написать приложение'),
      this.createTodoItem('Покушать')
    ],
    term: '',
    filter: 'all'
  };

  createTodoItem (label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  };

  deleteItem = (id) => {

    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      };
    });
  };

  addItem = (text) => {
    const newItem  = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const newArr = [
        ...todoData,
        newItem
      ];
      return {

        todoData: newArr
      };
    });
 };

 toggleProperty(arr, id, propName){
   const idx = arr.findIndex((el) => el.id === id);
   const oldItem = arr[idx];
   const newItem = {...oldItem,
       [propName]: !oldItem[propName]};

   return [
     ...arr.slice(0, idx),
     newItem,
     ...arr.slice(idx + 1)
   ];
 }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
    return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
    return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  search(items, term){
    if(term.length === 0){
      return items;
    }
    return items.filter((item) => {
      return item.label.toLowerCase(term.toLowerCase).indexOf(term) > -1;
    });
  }

  onSerchChange = (term) => {
    this.setState({ term });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  filter(items, filter){
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  render(){
    const { todoData, term, filter } = this.state;

    const visiableItem = this.filter(
    this.search(todoData, term), filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel
            onSerchChange = {this.onSerchChange}/>
          <ItemStatusFilter
            filter = {filter}
            onFilterChange={this.onFilterChange} />
        </div>

        <TodoList
          todos={visiableItem}
          onDeleted={ this.deleteItem}
          onToggleImportant = {this.onToggleImportant}
          onToggleDone = {this.onToggleDone}
          />
        <ItemAddForm onItemAdded = {this.addItem}/>
      </div>
    );
  }

};
