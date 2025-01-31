export default function ToDoRow(todo){
    return(
        <li>{todo.action}<div className="done-not"><i className="fas fa-check tick"></i><i className="fas fa-edit pen"></i><i className="fas fa-times x"></i></div></li>
    )
}