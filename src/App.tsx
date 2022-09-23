import { useState } from 'react';

import './App.css';
import Input from './components/Input';
import TodoList from './components/TodoList';
import { Todo } from './model';
import {DragDropContext, DropResult} from 'react-beautiful-dnd'

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos,setCompletedTodos] = useState<Todo[]>([]);
  const AddTodoHandler = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), title: todo, isDone: false }]);
      setTodo("")
    }
  }
  const onDragEnd = (result: DropResult) => {
    
    const { destination, source } = result;


    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = completedTodos;
    // Source Logic
    if (source.droppableId === "todos") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "todos") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div className="App">
          <span className="heading">Taskify</span>
          <Input todo={todo} setTodo={setTodo} AddTodoHandler={AddTodoHandler} />
          <TodoList 
            todos={todos}
            setTodos={setTodos} 
            completedTodos={completedTodos} 
            setCompletedTodos={setCompletedTodos} 
          />
        </div >
    </DragDropContext>
  );
}

export default App;
