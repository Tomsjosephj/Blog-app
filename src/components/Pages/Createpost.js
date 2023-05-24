import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';


function Createpost() {
  const [title,settitle]=useState('')
  const [summary,setsummary]= useState('')
  const [content,setcontent]=useState('')
  const [file,setfile]=useState('')

  const [redirect,setredirect]=useState(false)
  
  console.log(file[0]);
  
  const data =new FormData()

   data.append('title',title)
   data.append('summary',summary)
   data.append('content',content)
   data.append('file',file[0])

  async function createnewpost(ev){
    ev.preventDefault()

   const response= await fetch("http://localhost:4000/post",{
      method:"POST",
      body:data,
      credentials:'include'
    })
    if(response.ok){
      setredirect(true)
    }


  }

 


  if(redirect){
    return  <Navigate to={"/"}></Navigate>
  }


  const modules={
      'toolbar': [
        [{ 'font': [] }, { 'size': [] }],
        [ 'bold', 'italic', 'underline', 'strike' ],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'super' }, { 'script': 'sub' }],
        [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block' ],
        [{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
        [ 'direction', { 'align': [] }],
        [ 'link', 'image', 'video', 'formula' ],
        [ 'clean' ]
  ]
} 
 const formats = [
    "header", "font", "size","bold",
    "italic",
    "underline",
    "align", "strike", "script", "blockquote","background",
    "list",
    "bullet",
    "indent",
    "link","image",
    "color", "code-block"
  ]


  return (
 <div className='createpost'>
 <form onSubmit={createnewpost}>
 <input type="title" placeholder='Title' value={title} onChange={ev=>settitle(ev.target.value)} />
 <input type="summary" placeholder='summary' value={summary}  onChange={ev=>setsummary(ev.target.value)}/>
 <input type="file"  onChange={ev=>setfile(ev.target.files)}/>
 <ReactQuill theme="snow" value={content} modules={modules} formats={formats} onChange={newValue=>setcontent(newValue)} />
 <button  style={{'margin-top':'50px'}}>Create new post</button>

 </form>
 
 </div>
  )
}

export default Createpost
