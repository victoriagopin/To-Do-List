import { Link } from "react-router-dom";
import { formatDate } from "../../heplers/dateFormatter";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function Header(){
      const date = formatDate();
      const {user} = useContext(UserContext);

    return (
        <header>
            {user ? 
            <>
            <div className="auth">
                <Link to="" className="logout">Log Out</Link>
            </div>
            <p className="date">Date: {date.day}.{date.formattedMonth}.{date.year}</p>
            </>
            :
            (<>    
            <div className="auth">
                <Link to="/login">Log In</Link>
                <Link to="/register">Register</Link>
            </div>
        </>)}
        <h1>To Do List</h1>
        
    </header>
    )
}