import React, { Component } from 'react';

import AppHeader from '../app-header';
import TodoList from '../todo-list';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import AddItem from '../add-item';

import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make awesome App'),
            this.createTodoItem('Have a lunch')
        ],
        text: '',
        statusFilter: 'all'
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({ todoData}) => {

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

        const newItem = {
            label: text,
            important: false,
            id: this.maxId++
        }

        this.setState(({ todoData }) => {


            const newArray = [...todoData, newItem];
            return {
                todoData: newArray
            };
        });
    };

    toggleProperty = (arr, id, propName) => {
        
            const idx = arr.findIndex((el) => el.id === id);

            const oldItem = arr[idx];

            const newItem = {...oldItem,
                [propName]: !oldItem[propName] };

            return [ 
                    ...arr.slice(0, idx),
                    newItem,
                    ...arr.slice(idx + 1)
                ];
    };

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

    isVisible = (items, text) => {
        if(text.length === 0)
            return items;
        
        return items.filter((el) => {

            return el.label.toLowerCase().includes(text.toLowerCase());
        });
    };

    onSearchChange = (text) => {
        this.setState({ text });
    };

    isVisibleStatus = (items, status) => {
        if(status === 'all')
            return items;

        if(status === 'done')
            return items.filter((el) => {
                return el.done;
            });

        return items.filter((el) => {
                return !el.done;
            });
        
    };
    onStatusFilterChange = (statusFilter) => {
        this.setState({statusFilter});
    };

     
    render() {

        const { todoData, text, statusFilter } = this.state;
        const visivleItems = this.isVisibleStatus(this.isVisible(todoData, text), statusFilter);
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        return (
            <div>
                <AppHeader toDo={todoCount} done={doneCount} />
                <SearchPanel onSearch={this.onSearchChange} />
                <ItemStatusFilter
                    statusFilter={ statusFilter }
                    onStatusFilterChange={this.onStatusFilterChange} />
                <TodoList 
                    todos={visivleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <AddItem 
                    onAdd={ (text) => this.addItem(text) }/>
            </div>
        );
    }
}