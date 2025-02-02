import { useContext, useEffect, useState } from 'react';
import style from './Edit.module.css'
import { getAllTodos } from '../../api/todoAPI';
import { UserContext } from '../../contexts/UserContext';
import ToDoRow from "../home/ToDoRow";
import DoneToDos from '../home/DoneToDos';

export default function Edit(){
    const {user} = useContext(UserContext)
    const [toDos, setToDos] = useState([]);
    const [doneOnes, setDoneOnes] = useState([]);
    
       
    useEffect(() => {
        (async function getToDos(){
            try{
              const response = await getAllTodos(); 
    
              const done = response.filter(todo => todo.status == 'done' && todo._ownerId == user._id);
              const notDone = response.filter(todo => todo.status == 'not done' && todo._ownerId == user._id);
    
                setToDos(notDone);
                setDoneOnes(done);
    
            } catch (err){
                console.log(err.message);
              }
        })();
    },[]);

    return(
        <main>
            <div className="add-todo">
            <form>
                <h2>Edit To Do:</h2>
                <label htmlFor="add-todo">
                    <input type="text" name="action"/>
                    <button>Edit</button>
                </label>
            </form>
        </div>

        <div className={`today-todo ${style.edit}`}>
            <h2>Today ToDo's</h2>
            <ul>
            {toDos.length > 0 ?
            toDos.map(todo => 
                <ToDoRow 
                    key={todo._id}
                    todo= {todo}
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
    </main>
    )
}