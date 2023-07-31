import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { useParams } from 'react-router-dom';

export const UserProfile = () => {
  const [showfollow,setshowfollow] = useState(state?!state.following.includes(userid):true)
  const {state,dispatch} = useContext(UserContext)
  const [userprofile,setuserprofile] = useState("")
  const [useremail,setuseremail] = useState("")
  const [Profile,setProfile] = useState("")
  const [posts,setposts] = useState([])
  const [prof,setProf] = useState(null)



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
        setProf(result)


    })

  },[])

  const followUser = () => {
    fetch('/follow',{
      method : "put",
      headers : {
        "Content-Type" : "application/json",
        "Authorization"  : "Bearer" + localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        followId : userid
      })

    }).then(res=>res.json())
    .then(data=>{
      dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
      localStorage.setItem("user",JSON.stringify(data))
      setProf((prevState)=>{
        return{
          user:{
            ...prevState.user,
            followers:[...prevState.user.followers,data._id]
          }
        }
      })
      setshowfollow(false)
    })
  }

  const unfollowUser = () => {
    fetch('/unfollow',{
      method : "put",
      headers : {
        "Content-Type" : "application/json",
        "Authorization"  : "Bearer" + localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        followId : userid
      })

    }).then(res=>res.json())
    .then(data=>{
      dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
      localStorage.setItem("user",JSON.stringify(data))
      setProf((prevState)=>{
        const newFollower = prevState.user.followers.filter(item=>item!=data._id)
        return{
          user:{
            ...prevState,
            users:{
              ...prevState.user,
              followers:newFollower
            }
          }
        }
      })
      setshowfollow(true)
      window.location.reload()

    })
  }

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
          <h6>{prof.user===undefined ? "loading" : prof.user.followers===undefined?"loading...":prof.user.followers.length} Followers</h6>
          <h6>{prof.user===undefined ? "loading" : prof.user.following===undefined ? "loading...":prof.user.following.length} Followings</h6>

        </div>
        {!JSON.parse(localStorage.getItem("user")).following.includes(userid) && showfollow ? <button 
            onClick={()=>followUser()}
            className = "btn waves-effect waves-light #e57373 blue lighten-2 " type="submit" name ="action">Follow
                </button> :<button 
                  onClick={()=>unfollowUser()}
                  className = "btn waves-effect waves-light #e57373 red lighten-2 " type="submit" name ="action">Unfollow
                      </button>  }
        {/* {showfollow ?<button 
            onClick={()=>followUser()}
            className = "btn waves-effect waves-light #e57373 blue lighten-2 " type="submit" name ="action">Follow
                </button> :
                  } */}
        
              
      
      
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