import { useEffect, useState } from "react"
import { createTodo, getAllTodos } from "../../api/todoAPI";
import ToDoRow from "./ToDoRow";
import DoneToDos from "./DoneToDos";
import { formatDate } from "../../heplers/dateFormatter";

export default function Home(){
    const [values, setValues] = useState({
        action: '',
        status: 'not done'
    })
    const [toDos, setToDos] = useState([]);
    const [doneOnes, setDoneOnes] = useState([]);
    const date = formatDate();


    useEffect(() => {
        (async function getToDos(){
          try{
          const response = await getAllTodos(); 

          const done = response.filter(todo => todo.status == 'done');
          const notDone = response.filter(todo => todo.status == 'not done');

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
            const notDone = newToDos.filter(todo => todo.status == 'not done');
            
            setToDos(notDone)
          } catch (err){
            console.log(err.message);
          }   
      }

    return(
  
        <main>
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
                        action = {todo.action}
                    />
                )
                : <p>No To Do's yet.</p>  
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