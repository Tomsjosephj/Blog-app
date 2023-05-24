import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Usercontextinfo } from '../../Context/Usercontext'



function Viewpage() {

    const {id} = useParams()

    const {userinfo} = useContext(Usercontextinfo)

    const [singlepost, setsinglepost] = useState('')

    const [redirect,setredirect]=useState(false)

  useEffect(() => {
    
        fetch(`http://localhost:4000/view/${id}`, {
            method: 'GET',

        }).then(response => {
            response.json().then(result => {
                setsinglepost(result)
 
            })
        })
        
        
    },[])

    console.log(userinfo);

   async function deletepost(ev){

    ev.preventDefault()

        await fetch(`http://localhost:4000/deletepost/${id}`,{
            method:'DELETE',
            credentials:'include'
        }).then(response=>{
            response.json().then(result=>{
                console.log(result);
            })
        })

        alert('Post deleted')
        setredirect(true)

    }

    if(redirect){
        return  <Navigate to={"/"}></Navigate>
      }
    
    if(!singlepost) return ''


   // console.log(singlepost.author.username);
    return (
        <div className='singlemain'>
          
            <h4 className='singleh4' style={{ textAlign: "center" }}>{singlepost.title}</h4> 
            {
            userinfo?
            userinfo.username === singlepost.author.username && (
                <div className='editsection'>
                   <Link to={`/edit/${singlepost._id}`}className='edit-btn'>Edit post</Link>
                </div>

            ):''}
            <div className='singleimage'>
                <img src={`http://localhost:4000/${singlepost.image}`} alt="" />
                <h5 style={{ fontSize: '20px', textAlign: 'justify' }}>{singlepost.summary}</h5>
                <div className='singlecontent' dangerouslySetInnerHTML={{ __html: singlepost.content }}></div>
            </div>
           
                {
                    userinfo?
                    userinfo.username === singlepost.author.username && (
                        <div className="deletesection">
                        <button onClick={deletepost} className='deletebtn'>Delete <i class="fa-solid fa-trash"></i></button>
                        </div>

                    ):''

                }
          
           

        </div>
    )
}

export default Viewpage
