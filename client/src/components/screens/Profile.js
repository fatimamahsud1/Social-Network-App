import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';


export const Profile = () => {
  const {state,dispatch} = useContext(UserContext)
  const [mypics,setPics] = useState([])
  useEffect(()=>{
    fetch('/mypost',{
      headers:{
        "Authorization":"Bearer" + localStorage.getItem('jwt')
      }
    }).then(res=>
      res.json()).then(result=>{
        setPics(result.mypost)
    })

  },[])


  return (
    <div style={{maxWidth:"550px", margin:"0px auto"}}>
      <div style = {{display:"flex",justifyContent:'space-around',margin:"18px 0px",borderBottom:"1px solid grey"}}>
        <div>
          <img style = {{width:"160px",height:"160px",borderRadius:"80px"}} src = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"/>
        </div>
        <div><h4>{state?state.name:"loading"}</h4></div>
        <div style = {{display:"flex",justifyContent:'space-around',width:"108%"}}>
          <h6>30 posts</h6>
          <h6>30 Followers</h6>
          <h6>30 Followings</h6>

        </div>
      
      
      </div>
    <div className= "gallery">
      {
        mypics.map(item=>{
          return(
            <img key = {item._id} className='item' src = {item.photo}/>
          )
        })
      }
    </div>


    </div>
  )
}