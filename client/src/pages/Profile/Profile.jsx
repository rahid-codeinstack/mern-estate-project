import { useRef, useState } from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Profile() {
  const [evater,setevater] = useState("");
  const {user} = useSelector(st=>st.user);
  const fileRef = useRef("");
  const [fileLoading , setfileLoading ] = useState(false);
  const [isUploaded , setisUploaded ] = useState(false);
  
  
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
    setevater(data.url);
    setfileLoading(false);
    setisUploaded(true);
    setTimeout(() => {
        setisUploaded(false);
    }, 2000);
    } catch (error) {
        
    }

    
  }


  return <div className="container-fluid">
    <div className="container m-auto my-4 ">
        <div className="profile-container bg-white  rounded-3 text-black d-flex flex-column justify-content-star align-items-start border borde-2 border-white m-auto p-2 py-5 w-50">


            <div className="profile-box border border-white m-auto  d-flex justify-content-center align-items-center flex-column">
                <input hidden type="file" ref={fileRef} onChange={changeProfile} id="file" accept="jpg/*" />
                <div className="image text-center">
                    {user  && 
                      <img  onClick={()=>fileRef.current.click()} src={evater  ? evater : user.evater } className="m-auto profile-image rounded-pill" alt="profile" />  
                    }
                </div>
                <span className="text-black">
                    {
                        fileLoading ? <span style={{color:"var(--slate-color)"}}> uploading....</span>: isUploaded ? <span className="text-success">uploaded successfully</span>:""
                    }
                </span>
            </div>

            <form className="user-field m-auto mt-3  w-75 d-flex justify-content-center align-items-center flex-column gap-2">
                    <input type="text" className=" user-field p-2 d-block w-100 borde border-1 border-green  " id="username" placeholder="username" />
                    <input type="email" className=" user-field p-2 d-block w-100 borde border-1 border-green  " id="email" placeholder="email" />
                    <input type="password" className=" user-field p-2 d-block w-100 borde border-1 border-green  " placeholder="password" />
                     <div className="w-100 mt-3">
                      <button type="submit" className="update-profile-button text-bg-success mb-2 p-2 py-2 rounded-2 border-0 outline-0 w-100  ">UPDATE</button>
                      <Link to={'/create-listing'} className="w-100">
                       <button type="button" className="update-profile-button p-2 rounded-2 border-0 outline-0 w-100 text-white  " style={{backgroundColor:"var( --slate-color)"}}>CREATE LISTING</button>
                      </Link>
                     </div>

            </form>
          

        </div>
    </div>
  </div>
}

export default Profile