import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import M from 'materialize-css';

export const Signup = () => {
  // const history = useHistory();
  const [name,setname] = useState("");
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const PostData = () =>{
    fetch("/signup",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name:name,
        password:password,
        email:email,

      })
    }).then(res=>res.json()).then(data=>{
      if(data.error){
        M.toast({html:data.error,classes:"#c62828 red darken-3"})
      }
      else{
        M.toast({html:data.message,classes:"#e93d8 purple lighten-3"})
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
                placeholder = 'Enter your name' 
                value={name}
                onChange={(e)=>{
                  setname(e.target.value)
                }}
            />

<input 
                type = "email"
                placeholder = 'Enter your email'
                value={email}
                onChange={(e)=>{
                  setemail(e.target.value)
                }}
            />

            <input 
                type = "password"
                placeholder = 'Enter your password'
                value={password}
                onChange={(e)=>{
                  setpassword(e.target.value)
                }}
            />

            <button 
            onClick={()=>PostData()}
            className = "btn waves-effect waves-light #e57373 red lighten-2 " type="submit" name ="action">SignUp
                <i className ="material-icons right">send</i>
                </button>
                <h6><Link to = "/signin">Already have an Account?</Link></h6>
       
      </div>
    </div>
  )
}