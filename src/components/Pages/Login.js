import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Usercontextinfo } from '../../Context/Usercontext'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

    const [username,setusername]=useState('')
    const [password,setpassword]=useState('')

    const [redirect,setredirect]=useState(false)

    const {setuserinfo}=useContext(Usercontextinfo)

    async function login(ev){

        ev.preventDefault()

        const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            body: JSON.stringify({username,password}),
            headers: { 'Content-Type': 'application/json' },
            credentials:'include'
        })
        

        if(response.ok){
            response.json().then(userinfo=>{

                console.log(userinfo);
                  
                setuserinfo(userinfo)

                toast.success("Login succesfull")

                setTimeout(() => {
                    setredirect(true)
                }, 4000);

               
            })
            
        }
        else{
            toast.error("Invalid Login details")
        }

}


if(redirect){
    return <Navigate to={"/"}></Navigate>
}
    return (
        <>
            <form className='login' onSubmit={login}>
                <h1>Login</h1>
                <input type="text" placeholder='Username' onChange={ev=>setusername(ev.target.value)}  value={username}/>
                <input type="password" placeholder='Password' value={password} onChange={ev=>setpassword(ev.target.value)}  />
                <button>Login</button>
            </form>

            <ToastContainer  position='top-center' autoClose={3000} />

        </>
    )
}

export default Login
