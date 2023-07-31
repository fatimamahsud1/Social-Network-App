import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import { UserContext } from '../App';

const Navbar = () => {
  // const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  const renderList = () => {
    if(state){
      return[
        <>
     <li><Link to="/profile">Profile</Link></li>
    <li><Link to="/create">CreatePost</Link></li>
    <li><Link to="/myfollowersposts">My Followings Posts</Link></li>

        <li>
        <button 
        onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          // history.push('/signin')
        }}
            className = "btn waves-effect waves-light #e57373 blue lighten-2 " type="submit" name ="action">Logout
                </button>
        </li>
    
    </>
      ]
    }
    else{
      return[
        <>
      <li><Link to="/signin">Sign In</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
    
    </>
      ]
    }
    
  }
    return <nav>
    <div className="nav-wrapper">
      <Link to={state?"/":"/signin"} className="brand-logo b">The Social Network</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        {renderList()}
      </ul>
    </div>
  </nav>
}

export default Navbar;
