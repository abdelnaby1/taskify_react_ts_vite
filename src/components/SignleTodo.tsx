import { Todo } from "../model";
import { AiFillEdit } from "react-icons/ai"
import { AiFillDelete } from "react-icons/ai"
import { MdDone } from "react-icons/md"
import classes from "./SingleTodo.module.css"
import React, {useRef,useEffect, useState } from 'react'
import { Draggable } from "react-beautiful-dnd";
interface Props {
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    index:number
}
const SignleTodo: React.FC<Props> = ({ todo, todos, setTodos ,index}) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editedTodo, setEditedTodo] = useState<string>(todo.title);
   const inputRef= useRef<HTMLInputElement>(null)
    const handleEdit = () => {
        if (!edit && !todo.isDone) {
            setEdit(!edit);
        }
    }
    const handleDone = (id: number) => {
        setTodos(todos.map((todo) => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo))
    }
    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>,id:number) =>{
        e.preventDefault();        
        setTodos(todos.map((todo)=> todo.id === id? {...todo,title:editedTodo}:todo));
        setEdit(false);
    }
    useEffect(()=>{
        inputRef.current?.focus();

    },[edit])
    
    return (
          <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided,snapshot) => (
                <form ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${classes.todos__single} ${snapshot.isDragging? 'drag':''}`}
                    onSubmit={(e) => handleSubmit(e,todo.id)}
                >
                    {edit ? (
                        <input ref={inputRef} className={classes.text} value={editedTodo} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedTodo(e.target.value)} />

                    ) : todo.isDone ? (
                        <s className={classes.text}>{todo.title}</s>

                    ) : (
                        <span className={classes.text}>{todo.title}</span>

                    )}
                    <div>
                        <span className={classes.icon}>
                            <AiFillEdit onClick={handleEdit} />
                        </span>
                        <span className={classes.icon}>
                            <AiFillDelete onClick={() => handleDelete(todo.id)} />
                        </span>

                        <span className={classes.icon}>
                            <MdDone onClick={() => handleDone(todo.id)} />
                        </span>
                    </div>

                </form >
            )}
            
        </Draggable>
    )
}
export default SignleTodo