import { useContext, useEffect, useState } from "react"
import { createTodo, getAllTodos, getSingleTodo } from "../../api/todoAPI";
import ToDoRow from "./ToDoRow";
import DoneToDos from "./DoneToDos";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";

export default function Home(){
    const {user} = useContext(UserContext);
    const [values, setValues] = useState({
        action: '',
        status: 'not done',
        _ownerId: user?._id
    })
    const [toDos, setToDos] = useState([]);
    const [doneOnes, setDoneOnes] = useState([]);

    useEffect(() => {
        (async function getToDos(){
          try{
          const response = await getAllTodos(); 
          
          const done = response.filter(todo => todo.status == 'done' && todo._ownerId == user?._id);
          const notDone = response.filter(todo => todo.status == 'not done' && todo._ownerId == user?._id);

            setToDos(notDone);
            setDoneOnes(done);

          } catch (err){
            console.log(err.message);
          }
        })();
      },[]);

      const onChnageValue =  (e) => {
        setValues(prevValues => ({
            ...prevValues,
            [e.target.name]: e.target.value
        }))
      }

      const onAdd = async (e) => {
        e.preventDefault();
        try{
            await createTodo(values);
            const newToDos = await getAllTodos(); 
            const notDone = newToDos.filter(todo => todo.status == 'not done' && todo._ownerId == user?._id);
            
            setToDos(notDone);
            setValues({
              action: '',
              status: 'not done',
              _ownerId: user?._id
            })
          } catch (err){
            console.log(err.message);
          }   
      }

      const refreshTodos = async () => {
        try {
          const response = await getAllTodos();
          const done = response.filter(todo => todo.status === 'done' && todo._ownerId === user?._id);
          const notDone = response.filter(todo => todo.status === 'not done' && todo._ownerId === user?._id);
      
          setToDos(notDone);
          setDoneOnes(done);
        } catch (err) {
          console.log(err.message);
        }
      };

    return(
  
        <main>
            {user ? (<>
                <div className="add-todo">
                <form onSubmit={onAdd}>
                    <h2>Add To Do:</h2>
                    <label htmlFor="add-todo">
                        <input type="text" name="action" value={values.action || ''} onChange={onChnageValue}/>
                        <button>Add</button>
                    </label>
                </form>
            </div>

            <div className="today-todo">
                <h2>Today ToDo's</h2>
                <ul>
                {toDos.length > 0 ?
                toDos.map(todo => 
                    <ToDoRow 
                        key={todo._id}
                        todo= {todo}
                        refreshTodos={refreshTodos} 
                    />
                )
                : <p className="empty">Everything done/No To Do's yet</p>  
                }
                </ul> 
            </div>

            <div className="done">
                <h2>Done</h2>
                <ul>
                    {doneOnes.length > 0 ?
                    doneOnes.map(todo => 
                        <DoneToDos 
                        key={todo._id}
                        action={todo.action}
                        />
                    )
                    : null}
                </ul>
            </div>
            </>): <p className="no-user"><Link to="/login">Log In</Link> or <Link to="/register">Register</Link> to be able to see or create your To Do List</p>}
           
        </main>
    )
}