import { useContext } from "react";
import { deleteTodo, updateTodo } from "../../api/todoAPI"
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function ToDoRow({todo, refreshTodos}){
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

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

    const onDelete = async (e) => {
        const id = e.target.parentElement.id;

        try{
            const hasConfirmed = confirm(`Are you sure you want to delete this to-do?`);
            if(hasConfirmed){
            await deleteTodo(id);
            } else{
                return;
            }
        } catch (err){
            console.log(err.message)
        }

        refreshTodos();
    }

    const onEdit = (e) => {
        const id = e.target.parentElement.id;
        navigate(`/edit/${id}`);
    }

    return(
        <li>{todo.action}
        <div className="done-not" id={todo._id}>
            <i className="fas fa-check tick" onClick={onCheck}></i>
            <i className="fas fa-edit pen" onClick={onEdit}></i>
            <i className="fas fa-times x" onClick={onDelete}></i>
        </div>
        </li>
    )
}