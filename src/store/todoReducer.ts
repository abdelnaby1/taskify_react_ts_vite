import { useReducer } from "react";
import TodoList from "../components/TodoList";
import { Todo } from "../model";

export type Actions = {
    type: "ADD_TODO" | "REMOVE_TODO" | "COMPLETE_TODO",
    payload: number | string,

}
export const TodRoeducer = (state: Todo[],action:Actions) => {
    switch (action.type) {
        case "ADD_TODO":
            return [
                ...state,
                {id: Date.now(), title:action.payload,isDone:false}
            ];
        case "REMOVE_TODO":
                return state.filter((todo) => todo.id ! == action.payload)
        case "COMPLETE_TODO":
            return state.map((todo) => {
                if(todo.id  !== action.payload){
                    return {...todo ,isDone:!todo.isDone}
                }
            })
        default:
            break;
    }
}