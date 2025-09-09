import { useEffect, useRef, useState } from "react";
import "./Profile.css";
import { useSelector , useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {  signOutFailure , signOutSuccess , updateStart , updateFailure , updateSuccess  , deleteUser , deleteFailure   } from "../../Redux/userSlice";


function Profile() {
  const {user , Loading , Error } = useSelector(st=>st.user);
  const fileRef = useRef("");
  const [fileLoading , setfileLoading ] = useState(false);
  const [isUploaded , setisUploaded ] = useState(false);
  const [sucessMessage , setsuccessMessage] = useState("");
  const [profileData , setprofileData ] = useState(()=> user && {username:user.username , email:user.email , evater:user.evater , password:""});
  const dispatch = useDispatch();
  
  useEffect(()=>{console.log(user)},[user])
  async function changeProfile (e){
    const file = e.target.files[0];

    const fileData =  new FormData();
    fileData.append("file",file);
    fileData.append("upload_preset","profile_images");
  
    try {
        setfileLoading(true);
    const res = await fetch("https://api.cloudinary.com/v1_1/dmooukppx/image/upload",{
        method:"POST",
        body:fileData,

    })
    const data = await res.json();
    setprofileData({...profileData,evater:data.url});
    setfileLoading(false);
    setisUploaded(true);
    setTimeout(() => {
        setisUploaded(false);
    }, 2000);
    } catch (error) {
        
    }

    
  }


  function ChangeField(e){
      const value = e.target.value;
      const key = e.target.id;
      setprofileData({...profileData,[key]:value});

  }



  async function updateUser(e) {
      e.preventDefault();
      const updatedUser = {
          ...profileData,
          id:user._id,
      }
      try {
        dispatch(updateStart());
        const res = await fetch('/api/user/update',{
          method:"POST",
          headers:{
            'Content-Type':'application/json',
          }
          ,
          body: JSON.stringify(updatedUser),

        })
        const data = await res.json();
   
        // console.log(data);

        if(!data.success){
          alert('faile')
            dispatch(updateFailure(data.message));
            return;
        }
     
        dispatch(updateSuccess(data.user));
          setsuccessMessage("updated successfully");
          
          setTimeout(() => {
              setsuccessMessage('');
          }, 2000);
        
      } catch (error) {
        dispatch(updateFailure(error.message));

      }
    
  }


   async function DeleteAccount(){
      const userid = user._id;
      try {
          const res = await fetch('/api/user/delete/'+userid,{
            method:"DELETE",
            headers:{
                'Content-Type':'application/json'
            }
            
          })
          const data = await res.json();
          if(!data.success){
            dispatch(deleteFailure(data.message));
            return;
          }
          dispatch(deleteUser(null)); 
          
      } catch (error) {
          dispatch(deleteFailure(error.message))
      }
  }


  async function  signOutUser() {
    try {
        const res = await fetch('/api/user/signout/'+user._id);
        const data =await res.json();
        if(!data.success){
            dispatch(signOutFailure(data.message));
            return;
        }
        dispatch(signOutSuccess(null));

    } catch (error) {
        dispatch(signOutFailure(error.message));

    }
    
  }
  return <div className="container-fluid">
    <div className="container m-auto my-4 ">
        <div className="profile-container bg-white  rounded-3 text-black d-flex flex-column justify-content-star align-items-start border borde-2 border-white m-auto p-2 py-5 w-50">


            <div className="profile-box border border-white m-auto  d-flex justify-content-center align-items-center flex-column">
                <input hidden type="file" ref={fileRef} onChange={changeProfile} id="file" accept="jpg/*" />
                <div className="image text-center">
                    {user  && 
                      <img  onClick={()=>fileRef.current.click()} src={profileData.evater} className="m-auto profile-image rounded-pill" alt="profile" />  
                    }
                </div>
                <span className="text-black">
                    {
                        fileLoading ? <span style={{color:"var(--slate-color)"}}> uploading....</span>: isUploaded ? <span className="text-success">uploaded successfully</span>:""
                    }
                </span>
            </div>

            <form onSubmit={updateUser} className="user-field m-auto mt-3  w-75 d-flex justify-content-center align-items-center flex-column gap-2">
                    <input type="text" onChange={ChangeField} value={profileData.username} className=" user-field p-2 d-block w-100 borde border-1 border-green  " id="username" placeholder="username" />
                    <input type="email" onChange={ChangeField}  value={profileData.email} className=" user-field p-2 d-block w-100 borde border-1 border-green  " id="email" placeholder="email" />
                    <input type="password" onChange={ChangeField} id="password"  value={profileData.password} className=" user-field p-2 d-block w-100 borde border-1 border-green  " placeholder="password" />
                     <div className="w-100 mt-3">
                      <button type="submit" className="update-profile-button text-bg-success mb-2 p-2 py-2 rounded-2 border-0 outline-0 w-100  ">UPDATE</button>
                      <Link to={'/create-listing'} className="w-100">
                       <button type="button" className="update-profile-button p-2 rounded-2 border-0 outline-0 w-100 text-white  " style={{backgroundColor:"var( --slate-color)"}}>CREATE LISTING</button>
                      </Link>
                        <div className="mt-3  text-center ">
                            {
                                Error ? <span className="text-danger text-sm text-capitalize">{Error}</span>:<span className="text-success text-sm text-capitalize">{sucessMessage}</span>
                            }
                        </div>
                     </div>
                    <div className="w-100 py-1  d-flex justify-content-between align-items-center ">
                       <button onClick={DeleteAccount} type="button" className="delet-button p-2 border-0 outline-none rounded-2 px-3 bg-danger text-white text-capitalize shadow-sm">
                          Delete Account
                      </button> 
                       <button onClick={signOutUser} type="button" className="delet-button p-2 border-0 outline-none rounded-2 px-3 bg-danger text-white text-capitalize shadow-sm">
                          Sign Out
                      </button> 
                      
                    </div>
            </form>
          

        </div>
    </div>
  </div>
}

export default Profile