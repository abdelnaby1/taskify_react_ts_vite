import classes from "./TodoList.module.css"
import { Todo } from "../model"
import SignleTodo from "./SignleTodo"
import React from "react"
import {  Droppable } from "react-beautiful-dnd"

interface Props {
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    completedTodos:Todo[],
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}
const TodoList: React.FC<Props> = ({ todos, setTodos,completedTodos,setCompletedTodos }) => {
    return (
        <div className={classes.container}>
            <React.StrictMode>
            <Droppable droppableId="todos">
                {
                    (provided,snapshot)=>(
                        <div className={`${classes.todos} ${snapshot.isDraggingOver?'dragactive':""}`} ref={provided.innerRef}  {...provided.droppableProps}>
                            <span className={classes.todos_heading}>Active Tasks</span>
                            <ul>
                                {todos.map((todo,index) => (
                                    <SignleTodo 
                                        index={index}
                                        key={todo.id} 
                                        todo={todo} 
                                        todos={todos} 
                                        setTodos={setTodos} 
                                    />
                                ))}
                                {provided.placeholder}

                            </ul>
                        </div>
                        
                    )
                }
            </Droppable>
            <Droppable droppableId="todosCompleted">
                {
                    (provided,snapshot)=> (
                        <div className={`${classes.todos} ${snapshot.isDraggingOver?'dragcomplete':""} ${classes.remove}`} ref={provided.innerRef}{...provided.droppableProps}>
                        <span className={classes.todos_heading}>Completed Tasks</span>
                             <ul>
                                {completedTodos.map((todo,index) => (
                                    <SignleTodo index={index} key={todo.id} todo={todo} todos={completedTodos} setTodos={setCompletedTodos} />
                                ))}
                             </ul>
                            {provided.placeholder}

                        </div>
                    )
                }
            </Droppable>
            </React.StrictMode>

        </div>
        )   
}
export default TodoList