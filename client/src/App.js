import {Home} from './components/screens/Home';
import { Login } from './components/screens/Login';
import { Signup } from './components/screens/Signup';
import { Profile } from './components/screens/Profile';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import './App.css';
import CreatePost from './components/screens/CreatePost';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { initialState, reducer } from './Reducers/userReducer';
import Navbar from './components/navbar';
import { UserProfile } from './components/screens/UserProfile';
import { SubscribedUserPosts } from './components/screens/SubscribedUserPosts';


export const UserContext = createContext()
const Routing = () => {
    const {state,dispatch} = UserContext(UserContext)
  // useEffect(()={
  //   const user = JSON.parse(localStorage.getItem("user"))
  //   if(user){
    // dispatch({type:"USER",payload:user})
  //   console.log("hello")
  //   }else{

  //     console.log("hello")
  //   }
  // })
  return(
    <Switch>
    <Routes>
    <Route exact path="/" element={<Home />} />
    <Route path="/signin" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route exact path="/profile" element={<Profile />} />
    <Route path="/create" element={<CreatePost />} />
    <Route path="/profile/:userid" element={<UserProfile />} />
    <Route path="/myfollowersposts" element={<SubscribedUserPosts/>} />



  </Routes>
  </Switch>
  )
}


function App() {

  const [state, dispatch] = useReducer(reducer,initialState)

  return (
    <UserContext.Provider  value = {{state,dispatch}}>
    <BrowserRouter>
      <Navbar />
     <Routing/>
    </BrowserRouter>
 </UserContext.Provider>

  );
}

export default App;
