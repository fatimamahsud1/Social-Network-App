import React from 'react'

function CreatePost() {
  return (
    <div className='card input-filed' style={{
        margin:"10px auto",
        maxWidth:"550px",
        padding:"20px",
        textAlign:"center"
    }}>
        <input type = "text" placeholder='title'/>
        <input type = "text" placeholder='Description'/>
        <div className='file-field input-field'>
        <div className='btn waves-effect waves-light #e57373 red lighten-2'>
            <span>Upload Photo</span>
            <input type = "file"/>
        </div>
        </div>
        <div className='file-path-wrapper'>
            <input className='file-path validate' type='text'/>
        </div>
        <button className = "btn waves-effect waves-light #e57373 red lighten-2">Create Post
                </button>

    </div>
  )
}

export default CreatePost