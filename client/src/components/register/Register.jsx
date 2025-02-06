import style from './Register.module.css'
import { useNavigate} from "react-router-dom";
import { useContext, useState} from 'react'
import { UserContext } from '../../contexts/UserContext';
import { post } from '../../api/requester'

export default function Register(){
    const {setUser, updateIsAuthenticated} = useContext(UserContext);
    const [values, setValues] = useState({
        email : '',
        password : '',
        repass: ''
    });
    const [isAvaliable, setIsAvaliable] = useState(true);
    const [isPasswordLongEnough, setIsPasswordLongEnough] = useState(true);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
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
            const response = await post('users/register', values);


            if(typeof response == 'number'){
                setIsAvaliable(false);
                hasErrors = true;
                setTimeout(() => setIsAvaliable(true), 3000);
                return;
            }

            setUser(response);
            updateIsAuthenticated();
            localStorage.setItem('auth', JSON.stringify(response.accessToken));
            navigate('/')
         } catch (err){
            console.log(err.message);
         }
    }

    return(
 
               <main>
                    <form className={style['form-register']} onSubmit={onSubmit}>
                    {!isAvaliable && <p className="error-register">Email is already taken!</p>}
                    {!passwordsMatch && <p className="error-register">Passwords do not match!</p>}
                    {!isPasswordLongEnough && <p className="error-register">Password must be at least 6 characters long!</p>}
                        <label htmlFor="email" className={style.email}>
                            <p className={style.email}>Email:</p><input type="text" name="email" className={style.email} value={values.email} onChange={onChangeHandler}/>
                        </label>
                        <label htmlFor="password" className={style.pass}>
                            <p className={style.pass}>Password:</p><input type="password" name="password" className={style.pass} value={values.password} onChange={onChangeHandler}/>
                        </label>
                        <label htmlFor="re-pass" className={style['re-pass']}>
                            <p className={style['re-pass']}>Repeat Password:</p><input type="password" name="repass" className={style['re-pass']} value={values.repass} onChange={onChangeHandler}/>
                        </label>
                        <button className={style['register-btn']}>Register</button>
                    </form>
               </main>
    )
}