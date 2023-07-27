import React, { useEffect } from 'react'
import Mo from 'react-router-dom';

function CreatePost() {
  const [Title,setTitle] = useState("");
  const [Body,setBody] = useState("");
  const [Image,setImage] = useState("");
  const [url,seturl] = useState("");


  useEffect(()=>{
    if(url){
      fetch("/createpost",{
        method:"post",
        headers:{
          "Content-Type":"application/json",
          "Authorization" : "Bearer" + localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          Title,
          Body,
          pic:url
  
        })
      }).then(res=>res.json()).then(data=>{
        if(data.error){
          Mo.toast({html:data.error,classes:"#c62828 red darken-3"})
        }
        else{
          localStorage.setItem("jwt",data.token)
          localStorage.setItem("user",JSON.stringify(data.user))
          Mo.toast({html:"Crete post successfully created!",classes:"#e93d8 purple lighten-3"})
          // history.push("/signin")
        }
      })

    }
  },[url])

  const postDetails=()=>{
      const data = new FormData()
      data.append('file',Image)
      data.append("upload_preset","social network")
      data.append("cloud_name","dafkmyvul")
      fetch("https://api.cloudinary.com/v1_1//image/upload",{
        method:"post",
        body:"data"
      }).then(res=>res.json())
      .then(data=>{
        seturl(data.url)
      }).catch(err=>{
        console.log(err)
      })

     

  }

  return (
    <div className='card input-filed' style={{
        margin:"10px auto",
        maxWidth:"550px",
        padding:"20px",
        textAlign:"center"
    }}>
        <input
        value={Title}
        onChange={(e)=>{
          setTitle(e.target.value)
        }}
        type = "text" placeholder='title'/>
        <input
        value={Body}
        onChange={(e)=>{
          setBody(e.target.value)
        }}
        type = "text" placeholder='Description'/>
        <div className='file-field input-field'>
        <div className='btn waves-effect waves-light #e57373 red lighten-2'>
            <span>Upload Photo</span>
            <input 
            value={Image}
            onChange={(e)=>{
              setImage(e.target.files[0])
            }}
            type = "file"/>
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