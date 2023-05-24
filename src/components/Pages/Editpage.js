import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import { Navigate, useParams } from 'react-router-dom'


function Editpage() {

    const {id} = useParams()
    const [title,settitle]=useState('')
    const [summary,setsummary]= useState('')
    const [content,setcontent]=useState('')
    const [file,setfile]=useState('')
    
    const [redirect,setredirect]=useState(false)

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
useEffect(() => {
    
    fetch(`http://localhost:4000/view/${id}`, {
        method: 'GET',

    }).then(response => {
        response.json().then(result => {
            settitle(result.title)
            setsummary(result.summary)
            setcontent(result.content)

        })
    })
    
    
},[])

async function Updatepost(ev){
           ev.preventDefault()
    const data =new FormData()

   data.append('title',title)
   data.append('summary',summary)
   data.append('content',content)
   data.append('file',file?.[0])
   data.append('id',id)

   await fetch (`http://localhost:4000/edit`,{
    method:'PUT',
    body:data,
    credentials:'include'
   })

   setredirect(true)

}

if(redirect){
    return  <Navigate to={`/view/${id}`}></Navigate>
  }

    return (
        <div>
            <div className='createpost'>
                <form  onSubmit={Updatepost}>
                    <input type="title" placeholder='Title' value={title} onChange={ev => settitle(ev.target.value)} />
                    <input type="summary" placeholder='summary' value={summary} onChange={ev => setsummary(ev.target.value)} />
                    <input type="file" onChange={ev => setfile(ev.target.files)} />
                    <ReactQuill theme="snow" value={content} modules={modules} formats={formats} onChange={newValue => setcontent(newValue)} />
                    <button style={{ 'margin-top': '50px' }}>Edit post</button>

                </form>

            </div>
        </div>
    )
}

export default Editpage
