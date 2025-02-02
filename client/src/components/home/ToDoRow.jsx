import { useContext } from "react";
import { updateTodo } from "../../api/todoAPI"
import { UserContext } from "../../contexts/UserContext";

export default function ToDoRow({todo, refreshTodos}){
    const {user} = useContext(UserContext);

    const onCheck = async(e) => {
        const id = e.target.parentElement.id;
        const res = await updateTodo(id, {
            ...todo,
            status : 'done',
            _ownerId: user._id,
            _id: id
        });

             refreshTodos();
    }

    return(
        <li>{todo.action}
        <div className="done-not" id={todo._id}>
            <i className="fas fa-check tick" onClick={onCheck}></i>
            <i className="fas fa-edit pen"></i>
            <i className="fas fa-times x"></i>
        </div>
        </li>
    )
}