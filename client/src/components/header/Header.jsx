import { Link } from "react-router-dom";
import { formatDate } from "../../heplers/dateFormatter";
import Login from "../login/Login";

export default function Header(){
      const date = formatDate();

    return (
        <header>
        <div className="auth">
           <Link to="/login">Log In</Link>
           <Link to="/register">Register</Link>
        </div>
        <h1>To Do List</h1>
        <p className="date">Date: {date.day}.{date.formattedMonth}.{date.year}</p>
    </header>
    )
}