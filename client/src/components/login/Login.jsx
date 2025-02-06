import { useContext, useState} from 'react'
import { useNavigate} from "react-router-dom";
import style from './Login.module.css'
import { post } from '../../api/requester'
import { UserContext } from '../../contexts/UserContext';

export default function Login(){
    const {setUser, updateIsAuthenticated} = useContext(UserContext);
    const [values, setValues] = useState({
        email : '',
        password : ''
    });
    const [errors, setErrors] = useState(false);
    const navigate = useNavigate();

    const onChangeHandler = (e) =>{
        setValues(prevValues => ({
            ...prevValues,
            [e.target.name] : e.target.value
        }))
    }

    const onSubmit = async (e) =>{
        e.preventDefault();

          let hasErrors = false;

    if(!values.email){
      setIsAvaliable(false);
        hasErrors = true;
        setTimeout(() => setIsAvaliable(true), 3000);
        return;
    }
    if (values.password.length < 6) {
      setIsPasswordLongEnough(false);
      hasErrors = true;
      setTimeout(() => setIsPasswordLongEnough(true), 3000);
      return;
    }

    if (values.password !== values.repass) {
      setPasswordsMatch(false);
      hasErrors = true;
      setTimeout(() => setPasswordsMatch(true), 3000);
      return;
    }

         try{
            const res = await post('users/login', values);

            if(typeof res == 'number') {
                setErrors(true);
                setTimeout(() => setErrors(false), 3000);
                return;
            }

            setUser(res);
            updateIsAuthenticated();
            localStorage.setItem('auth', JSON.stringify(res.accessToken));
            navigate('/')
         } catch (err){
            console.log(err.message);
         }
    }

    return(
               <main>
                    <form className={style['form-login']} onSubmit={onSubmit}>
                    {errors ? <p className="error">Incorrect email or password!</p> : null}
                        <label htmlFor="email" className={style.email}>
                            <p className={style.email}>Email:</p><input type="text" name="email" className={style.email} value={values.email} onChange={onChangeHandler}/>
                        </label>
                        <label htmlFor="password" className={style.pass}>
                            <p className={style.pass}>Password:</p><input type="password" name="password" className={style.pass} value={values.password} onChange={onChangeHandler}/>
                        </label>
                        <button className={style['login-btn']}>Log In</button>
                    </form>
               </main>
    )
}