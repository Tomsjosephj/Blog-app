import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

function Posts({_id, title, summary, content, image, createdAt, author }) {
  return (
    <div className="post">
      <Link to={`/view/${_id}`}>
        <div className="image">
          <img style={{height:'300px'}} src={`http://localhost:4000/${image}`} alt="" />
        </div>
      </Link>

      <div className="content">

        <Link to={`/view/${_id}`}>  <h2>{title}</h2> </Link>
        <div className="info">
          <span style={{ marginRight: "20px" }}>{author.username}</span>

          <time>{format(new Date(createdAt), 'MMM d,yyy HH:mm')}</time>
        </div>
        <p style={{ textAlign: 'justify' }}>{summary}</p>
      </div>
    </div>
  )
}

export default Posts
