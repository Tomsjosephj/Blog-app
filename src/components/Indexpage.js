import React, { useEffect, useState } from 'react'
import Posts from './Posts'

function Indexpage() {

  const[allpost,setallpost]=useState('')

  useEffect(()=>{
          fetch("http://localhost:4000/allposts",{
            method:'GET'
          }).then(result=>{
            result.json().then(allblogs=>{
              setallpost(allblogs)
            })
          })
  },[])

  console.log(allpost);
  return (
    <>

    {
      allpost.length>0 && allpost.map(items=>(
        <Posts {...items}/>
      ))
    }
  
   
      
    </>
  )
}

export default Indexpage
