import "./Header.css"
import { Link } from 'react-router-dom'
import {MdSearch} from 'react-icons/md'
import { useSelector } from "react-redux"



function Header() {
const {user} = useSelector((st)=>st.user);


  return (
    <div className="container-fluid header py-2  ">
     <div className="container nav-bar m-auto  d-flex justify-content-between align-items-center">
          <div className="logo flex-shrink-1   d-flex align-item-center">
               <h3 className="d-flex gap-2 gap-md-3 p-0 m-0">
                    <span className="first-name">Rahid</span>
                    <span className="last-name">Estate</span>
               </h3>
          </div>
          <form  className="search-form flex-shrink-1  ">
                <input type="text" placeholder="search" className="search-input   px-1 " />
                <button className='search-button'>
                    <MdSearch className="text-2"/>
                </button>
          </form>
          <ul className="nav-item  flex-shrink-1 list-inline d-flex justify-content-center   align-items-center p-0 m-0 gap-2 gap-md-2 gap-lg-3">
               <li className='nav-tabe d-none d-md-inline-block'>
                    <Link to={'/'} className='nav-link '>Home</Link>
               </li>
               <li className='nav-tabe '>
                    <Link to={'/about'} className='nav-link'>About</Link>
               </li>
               <li className='nav-tabe '>
                    <Link className="nav-link" to={'/profile'}>
                              { 
                                        user ? <img className="profile-evater" src={user.evater} alt="profile" />
                                        : <span className="text-white nav-link">Sign In</span>
                              }
                    </Link>
               </li>
          </ul>
     </div>
    </div>
  )
}

export default Header