import React, { useContext, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Usercontextinfo } from '../Context/Usercontext'
import { useNavigate } from 'react-router-dom';


function Header() {

   //to use usenavigate
   const navigate= useNavigate()

  //const [username,setusername]=useState(null)


  const {setuserinfo,userinfo}=useContext(Usercontextinfo)

  useEffect(()=>{

   fetch("http://localhost:4000/profile",{
      credentials:'include',
      method:"GET"
    }).then((response)=>{
      response.json().then(userinfo=>{

       // setusername(userinfo.username)

       setuserinfo(userinfo)

        

      })
    })
  },userinfo?.username)
  //console.log(username);

  function logout(){
    fetch("http://localhost:4000/logout",{
      credentials:"include",
      method:"POST"
    })
    //setusername(null)
    setuserinfo(null)
         
       
    navigate("/")
  

  }
  

  const username= userinfo?.username
 
  
  return (
    <div>
       <header>
          <Link to="/" className='logo'>YourVoice</Link>
          <nav>
            {
              username && (
                <>
                 <Link to="/create">Create new post</Link>
                 <a onClick={logout}>Logout</a>
                </>
              )
              
            }
            {
             
              !username && (
                <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                </>
              )
          
            }
           
          </nav>
        </header>
    </div>
  )
}

export default Header
