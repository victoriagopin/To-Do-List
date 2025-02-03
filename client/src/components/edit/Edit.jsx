import { useContext, useEffect, useState } from 'react';
import style from './Edit.module.css'
import { getAllTodos, updateTodo } from '../../api/todoAPI';
import { UserContext } from '../../contexts/UserContext';
import ToDoRow from "../home/ToDoRow";
import DoneToDos from '../home/DoneToDos';
import { useNavigate, useParams } from 'react-router-dom';

export default function Edit(){
    const {user} = useContext(UserContext);
    const {id} = useParams();
    const [toDos, setToDos] = useState([]);
    const [todoToEdit, setToDoToEdit] = useState({});
    const [doneOnes, setDoneOnes] = useState([]);
    const [values, setValues] = useState({
        action: todoToEdit?.action || '',
        _ownerId: user?._id,
        status: todoToEdit?.status || 'not done',
        _id: id,
    });
    const navigate = useNavigate();
    
       
    useEffect(() => {
        (async function getToDos(){
            try{
              const response = await getAllTodos(); 
    
              const done = response.filter(todo => todo.status == 'done' && todo._ownerId == user._id);
              const notDone = response.filter(todo => todo.status == 'not done' && todo._ownerId == user._id);
              const editTodo = response.find((todo) => todo._id == id)  

                setToDos(notDone);
                setDoneOnes(done);
                setToDoToEdit(editTodo);
                setValues(editTodo);
            } catch (err){
                console.log(err.message);
              }
        })();
    },[]);

    const onChangeHandler = (e) => {
        setValues(prevValues => ({
            ...prevValues,
            [e.target.name] : e.target.value
        }));
    }

    const onEdit = async(e) => {
        e.preventDefault();
            try{
                await updateTodo(id, values);
                navigate('/')

            } catch (err){
                    console.log(err.message);
            }   
    }
 

    return(
        <main>
            <div className="add-todo">
            <form onSubmit={onEdit}>
                <h2>Edit To Do:</h2>
                <label htmlFor="add-todo">
                    <input type="text" name="action" value={values.action || ''} onChange={onChangeHandler}/>
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