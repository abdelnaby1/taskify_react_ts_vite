import classes from './Input.module.css'
import { useRef } from 'react'
interface Props {
    todo: string,
    setTodo: React.Dispatch<React.SetStateAction<string>>,
    AddTodoHandler: (e: React.FormEvent<EventTarget>) => void
}
const Input: React.FC<Props> = ({ todo, setTodo, AddTodoHandler }) => {
    const inputRef = useRef<HTMLInputElement>(null)
    return (
        <form onSubmit={(e) => {
            AddTodoHandler(e);
            inputRef.current?.blur();
        }} className={classes.input}>
            <input
                className={classes.input__box}
                type="input"
                placeholder="Enter a task"
                onChange={(e) => setTodo(e.target.value)}
                ref={inputRef}
                value={todo}
            />
            <button className={classes.input_submit} type="submit">
                GO
            </button>
        </form>
    )
}


export default Input;