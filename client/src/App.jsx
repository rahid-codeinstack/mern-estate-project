import "./App.css";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SignOut from "./pages/user pages/signout";
import SignIn from "./pages/user pages/signin";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import SignUp from "./pages/user pages/Signup";
import Profile from "./pages/Profile/Profile";
import Header from "./Components/Header/Header";
import Private from "./Components/private/Private";
import CreateListing from "./pages/create-listing/CreateListing";




function App() {
  return (
    <BrowserRouter>
           <Header/>
      <Routes>
           <Route path="/"        element={<Home/>}/>
           <Route path="/sign-up" element={<SignUp/> } />
           <Route path="/sign-in" element={<SignIn/> } />
           <Route path="/about"   element={<About/>  } />
           <Route element={<Private/>}>
                <Route path="/profile" element={<Profile/> } />
                <Route path="/create-listing" element={<CreateListing/>}/>
           </Route>
         

      </Routes>
    </BrowserRouter>
  );
};

export default App;