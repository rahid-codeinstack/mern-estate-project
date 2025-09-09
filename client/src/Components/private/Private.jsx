import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"


function Private() {
     const {user}  = useSelector(st =>st.user);
    
  return user ? <Outlet/> : <Navigate to={'/sign-in'}/>
}

export default Private