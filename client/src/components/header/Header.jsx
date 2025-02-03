import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../heplers/dateFormatter";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { logout } from "../../api/todoAPI";

export default function Header(){
      const date = formatDate();
      const {user, setUser, updateIsAuthenticated} = useContext(UserContext);
      const navigate = useNavigate();

    const loggingOut = async () => {
        try {
            await logout();

            setUser(null);
            updateIsAuthenticated();
            localStorage.clear();
            navigate('/');
        }catch (err){
            console.log(err.message);
          }
    }

    return (
        <header>
            {user ? 
            <>
            <div className="auth">
                <Link to="" className="logout" onClick={loggingOut}>Log Out</Link>
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