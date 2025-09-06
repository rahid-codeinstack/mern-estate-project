import "./App.css";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SignOut from "./pages/user pages/signout";
import SignIn from "./pages/user pages/signin";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import SignUp from "./pages/user pages/Signup";
import Profile from "./pages/Profile/Profile";



function App() {
  return (
    <BrowserRouter>
      <Routes>
           <Route path="/"        element={<Home/>}/>
           <Route path="/sign-up" element={<SignUp/> } />
           <Route path="/sign-in" element={<SignIn/> } />
           <Route path="/about"   element={<About/>  } />
           <Route path="/profile" element={<Profile/> } />

      </Routes>
    </BrowserRouter>
  );
};

export default App;