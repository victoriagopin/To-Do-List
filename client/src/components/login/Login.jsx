import style from './Login.module.css'

export default function Login(){
    return(
 
               <main>
                    <form className={style['form-login']}>
                        <label htmlFor="email" className={style.email}>
                            <p className={style.email}>Email:</p><input type="text" name="email" className={style.email}/>
                        </label>
                        <label htmlFor="password" className={style.pass}>
                            <p className={style.pass}>Password:</p><input type="password" name="password" className={style.pass}/>
                        </label>
                        <button className={style['login-btn']}>Log In</button>
                    </form>
               </main>
    )
}