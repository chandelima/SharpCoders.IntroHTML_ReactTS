import { Status, Todo } from "./interfaces/todo";
import "./style.css";

interface Props {
    todo: Todo,
    preUpdateTodo: Function
    changeTodoStatus: Function,
    deleteTodo: Function
}

const TodoCard = ({todo, preUpdateTodo, changeTodoStatus, deleteTodo}: Props) => {
    const statusPendingCard = (
        <div className="todoCard">
            <p>{todo.description}</p>
            <span className="material-symbols-rounded" 
              onClick={() => changeTodoStatus(todo.id, Status.Done)}>
                done
            </span>
            <span className="material-symbols-rounded" 
              onClick={() => preUpdateTodo(todo.id)}>
                edit
            </span>
            <span className="material-symbols-rounded" 
              onClick={() => deleteTodo(todo.id)}>
                delete
            </span>
        </div>
    )
    
    const statusDoneCard = (
        <div className="todoCard todoDone">
            <p className="todoTextDone">{todo.description}</p>
            <span className="material-symbols-rounded" 
              onClick={() => changeTodoStatus(todo.id, Status.Pending)}>
                undo
            </span>
            <span className="material-symbols-rounded" 
              onClick={() => preUpdateTodo(todo.id)}>
                edit
            </span>
            <span className="material-symbols-rounded" 
              onClick={() => deleteTodo(todo.id)}>
                delete
            </span>
        </div>
    )
    
    return (
        todo.status == Status.Pending ? statusPendingCard : statusDoneCard
    );
}
 
export default TodoCard;