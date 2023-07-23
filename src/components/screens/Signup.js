import React from 'react';
import {Link} from 'react-router-dom';

export const Signup = () => {
  return (
    <div className='mycard'>
         <div className="card auth-card">
            <h2>The Social Network</h2>
            <input 
                type = "text"
                placeholder = 'Enter your name' 
            />

<input 
                type = "email"
                placeholder = 'Enter your email'
            />

            <input 
                type = "password"
                placeholder = 'Enter your password'
            />

            <button className = "btn waves-effect waves-light #e57373 red lighten-2 " type="submit" name ="action">Login
                <i className ="material-icons right">send</i>
                </button>
                <h6><Link to = "/signin">Already have an Account?</Link></h6>
       
      </div>
    </div>
  )
}