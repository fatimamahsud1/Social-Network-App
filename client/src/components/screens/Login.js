import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Mo from 'materialize-css';

 
export const Login = () => {
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const PostData = () =>{
    fetch("/signin",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        password,
        email,

      })
    }).then(res=>res.json()).then(data=>{
      if(data.error){
        Mo.toast({html:data.error,classes:"#c62828 red darken-3"})
      }
      else{
        Mo.toast({html:"signin successfully",classes:"#e93d8 purple lighten-3"})
        // history.push("/signin")
      }
    })
  }
  return (
    <div className='mycard'>
         <div className="card auth-card">
            <h2>The Social Network</h2>
            <input 
                type = "text"
                placeholder = 'email' 
                value={email}
                onChange={(e)=>{
                  setemail(e.target.value)
                }}
            />

            <input 
                type = "password"
                placeholder = 'password'
                value={password}
                onChange={(e)=>{
                  setpassword(e.target.value)
                }}
            />

            <button 
            onClick={()=>PostData}
            className = "btn waves-effect waves-light #e57373 red lighten-2 " type="submit" name ="action">Login
                <i className ="material-icons right">send</i>
                </button>
                <h6><Link to = "/signup">Dont have an account? Signup</Link></h6>

       
      </div>
    </div>
  )
}