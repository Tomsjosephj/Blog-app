import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Register() {

    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [email, setemail] = useState('')

    const [redirect, setredirect] = useState(false)

    async function registerme(ev) {
        ev.preventDefault()

        const response = await fetch("http://localhost:4000/register", {
            method: "POST",
            body: JSON.stringify({ username, password, email }),
            headers: { 'Content-Type': 'application/json' }
        })

        console.log(response)

        if (response.status === 200) {

        toast.success('Registration Succesfull')
         
        toast("You will receive an email", 
            
        setTimeout(() => {
            setredirect(true)
        }, 4000)
       

        );

            
                
}
        else {

            toast.error("Registration failed! User already exists")

            setusername('')
            setpassword('')
            setemail('')
        }

    }

    if (redirect) {
        return <Navigate to={"/login"}></Navigate>
    }

    return (
        <>
            <form className='register' onSubmit={registerme}>
                <h1>Register</h1>
                <input onChange={ev => setusername(ev.target.value)} type="text" placeholder='Username' value={username} />
                <input onChange={ev => setemail(ev.target.value)} type="email" placeholder='@gmail.com' value={email} />
                <input onChange={ev => setpassword(ev.target.value)} type="password" placeholder='Password' value={password} />
                <button>Register</button>
            </form>
            <ToastContainer  position='top-center' autoClose={3000} />
        </>
    )
}

export default Register
