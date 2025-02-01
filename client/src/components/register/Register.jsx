import style from './Register.module.css'

export default function Register(){
    return(
 
               <main>
                    <form className={style['form-register']}>
                        <label htmlFor="email" className={style.email}>
                            <p className={style.email}>Email:</p><input type="text" name="email" className={style.email}/>
                        </label>
                        <label htmlFor="password" className={style.pass}>
                            <p className={style.pass}>Password:</p><input type="password" name="password" className={style.pass}/>
                        </label>
                        <label htmlFor="re-pass" className={style['re-pass']}>
                            <p className={style['re-pass']}>Repeat Password:</p><input type="password" name="password" className={style['re-pass']}/>
                        </label>
                        <button className={style['register-btn']}>Register</button>
                    </form>
               </main>
    )
}