import Navbar from './components/Navbar';
import {Home} from './components/screens/Home';
import { Login } from './components/screens/Login';
import { Signup } from './components/screens/Signup';
import { Profile } from './components/screens/Profile';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import './App.css';
import CreatePost from './components/screens/CreatePost';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreatePost />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
