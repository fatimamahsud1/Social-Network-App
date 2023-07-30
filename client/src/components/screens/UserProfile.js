import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { useParams } from 'react-router-dom';

export const UserProfile = () => {
  const {state,dispatch} = useContext(UserContext)
  const [userprofile,setuserprofile] = useState("")
  const [useremail,setuseremail] = useState("")
  const [Profile,setProfile] = useState("")
  const [posts,setposts] = useState([])



  const {userid} = useParams()
 
  useEffect(()=>{
    fetch(`/user/${userid}`,{
      headers:{
        "Authorization":"Bearer" + localStorage.getItem('jwt')
      }
    }).then(res=>
      res.json()).then(result=>{
        console.log(result)
        setuserprofile(result.user.name)
        setuseremail(result.user.email)
        setProfile(result.posts.length)
        setposts(result.posts)


    })

  },[])


  return (
    <>
    {
        posts?
        <div style={{maxWidth:"550px", margin:"0px auto"}}>
      <div style = {{display:"flex",justifyContent:'space-around',margin:"18px 0px",borderBottom:"1px solid grey"}}>
        <div>
          <img style = {{width:"160px",height:"160px",borderRadius:"80px"}} src = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"/>
        </div>
        <div><h4>{userprofile}</h4>
        <h5>{useremail}</h5>
        </div>
        <div style = {{display:"flex",justifyContent:'space-around',width:"108%"}}>
          <h6>{Profile}</h6>
          <h6>30 Followers</h6>
          <h6>30 Followings</h6>

        </div>
      
      
      </div>
    <div className= "gallery">
      {
        posts.map(item=>{
          return(
            <img key = {item._id} className='item' src = {item.photo}/>
          )
        })
      }
    </div>


    </div>
    :
    "Loading..."
    }
    
    </>
  )
}