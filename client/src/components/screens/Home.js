import { set } from 'mongoose';
import React, { useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';

export const Home = () => {
  const {state,dispatch} = UserContext(UserContext)
  const [data,setData] = useState([])
  useEffect(()=>{
    fetch('/allpost',{
      headers : {
        "Authorization" : "Bearer" + localStorage.getItem("jwt")
      }
    }).then(res=>res.json()).then(result=>{
      console.log(result)
      setData(result.post)
    })
  })

  const likePost = (id) =>{
    fetch('/like',{
      method : "put",
      header : {
        "Content-Type":"application/json",
        "Authorization" : "Bearer" + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId:id
      })

    }).then(res=>res.json())
    .then(result=>{
      const newData = data.map(item=>{
        if(item._id==result._id){
          return result
        }else{
          return item
        }
      })
      setData(newData)
    }).catch(err=>{
      console.log(err)
    })
  }

  const unlikePost = (id) =>{
    fetch('/unlike',{
      method : "put",
      header : {
        "Content-Type":"application/json",
        "Authorization" : "Bearer" + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId:id
      })

    }).then(res=>res.json())
    .then(result=>{
      const newData = data.map(item=>{
        if(item._id==result._id){
          return result
        }else{
          return item
        }
      })
      setData(newData)
    }).catch(err=>{
      console.log(err)
    })
  }


  const deletePost = (postId) => {
    fetch(`/deletepost/${postId}`,{
      method : "delete",
      headers : {
        "Authorization"  : "Bearer" +  localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>{
      const newData = data.filter(item=>{
        return item._id!==result.id
      })
      setData(newData)
    })
  }


  const makeComment = (text,postId)=>{
    fetch('/comment',{
      method : "put",
      headers : {
        "Content-Type"  : "application/json",
        "Authorization"  : "Bearer" + localStorage.getItem('jwt')
      },
      body :JSON.stringify({
        postId,
        name: localStorage.getItem('user').name,
        text
      })
    }).then(res=>res.json()).then(result=>{
      console.log(result)
      const newData = data.map(item=>{
        if(item._id==result._id){
          return result
        }else{
          return item
        }
      })
      setData(newData)
 
    }).catch(err=>{
      console.log(err)
  })
  }

  return (
    <div className='"home'>
     {data.map(item=>{
      return(
        <div className='card home-card' key = {item._id}>
        <h5><Link to = {"/profile/"+item.postedby._id}>
          {item.postedby.name}
          <i class="material-icons"  style = {{float : 'right'}}onClick={()=>{deletePost(item._id)}}>delete</i> : 
          </Link>
        </h5>
        <div className='card-image'>
          <img src ={item.photo} />
        </div>
        <div className='card-content'>
          {item.likes.includes(state._id)?
          <i class="material-icons" onClick={()=>{unlikePost(item._id)}}>thumb_down</i> : 
          <i class="material-icons" onClick={()=>{likePost(item._id)}}>thumb_up</i>
          }
          <h6>{item.likes.length} likes</h6>
          <h5>{item.title}</h5>
          <p>{item.body}</p>
          {
            items.comments.map(record=>{
              return(
                <h6><span style={{fontWeight:'600'}}>{record.postedby.name}</span>{record.text}</h6>
              )
            })
          }
          <from onSubmit = {(e)=>{
            e.preventDefault()
            makeComment(e.target[0].value,item._id)
          }}>

          </from>
          <input type = "text" placeholder='add a comment'></input>
        </div>
      </div>
      )
     })}  
    </div>
  )
}
