import React from 'react';
import {Link} from 'react-router-dom';

export const Login = () => {
  return (
    <div className='mycard'>
         <div className="card auth-card">
            <h2>The Social Network</h2>
            <input 
                type = "text"
                placeholder = 'email' 
            />

            <input 
                type = "password"
                placeholder = 'password'
            />

            <button className = "btn waves-effect waves-light #e57373 red lighten-2 " type="submit" name ="action">Login
                <i className ="material-icons right">send</i>
                </button>
                <h6><Link to = "/signup">Dont have an account? Signup</Link></h6>

       
      </div>
    </div>
  )
}