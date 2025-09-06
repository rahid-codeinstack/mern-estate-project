import "./forms.css";
import {Link} from 'react-router-dom'
import {MdEmail,MdPassword} from 'react-icons/md'
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import {  useState } from "react";



function SignIn() {
  const [ ShowHidePassword  , setShowHidePassword ] = useState(false);
  const [ Error , setError] = useState({
      errorMessage:" ",
      fieldName:"",
  })
  const [ FormData , setFormData ] = useState({
      email:"",
      password:"",
  })
function handleChange(e){
    const key = e.target.id;
    const value = e.target.value;
    setFormData({...FormData,[key]:value});


}

function validatForm ( ) {

  if( !FormData.email.includes("@" || ".") ){
    setError({fieldName:"email", errorMessage:"incorrect email type"});
    return false ;
  };

  if(FormData.password.length < 6 ){
    setError({fieldName:"password", errorMessage:"password must be at least 6 character "});
    return false;
  };
  return true;
}
 async function handleFormSubmite (e) {
    e.preventDefault();
    if(validatForm()){
        alert("hellow world");
    }

 }

  
  return (
    <div className="container-fuid mt-4 ">
      <div className="container m-auto border-primary">
        <div className="form-container  px-2  3 m-auto w-sm-75">
        <form  onSubmit={handleFormSubmite} className="form d-flex px-2 py-4  justify-content-center align-item-center flex-column w-100 gap-2  ">
            <header className="text-center my-2  ">
              <h1 className="text-center text-black ">Sign In</h1>
            </header>
              {Error.fieldName === 'email' && <span className="text-danger error ps-3 ">{Error.errorMessage}</span>}
            <div className=" border inputbox  w-100 bg-white  border border-2 border-gray p-2 rounded-5 px-3 ">
                <input type="email" value={FormData.email} onChange={handleChange} id="email" className=" input w-100  pe-5 " placeholder="email" required  />
                <MdEmail className="text-secondary"/>
            </div>
              {Error.fieldName === 'password' && <span className="text-danger error ps-3 ">{Error.errorMessage}</span>}
            <div className=" border inputbox  w-100 bg-white  border border-2 border-gray p-2 rounded-5 px-3 ">
                <input type={ShowHidePassword  ? "text" : "password"}  onChange={handleChange} value={FormData.password} id="password" className=" input w-100  pe-5 " placeholder="password" required  />
                {
                    ShowHidePassword === true ? <IoEye onClick={()=>setShowHidePassword(false)} className="text-secondary showhid-icons "/>: <IoMdEyeOff onClick={()=>setShowHidePassword(true)} className="text-secondary showhid-icons"/>
                }
            </div>
            <div className="inputbox mt-2 w-full  border   text-center  rounded-5 ">
                <button  className="submite-button text-white  button ">Sign In</button>
            </div>
            <div className=" w-full d-flex justify-content-start gap-1 align-item-center flex-column text-center  rounded-5 ">
               <span className="text-dark p-0">have not already account ? </span>
               <Link to={'/sign-up'} className={'link-button '}>Sign Up</Link>
            </div>
            <div className="w-full text-center ">
              <span className="text-black">OR</span>
            </div>
             <div className="inputbox mt-2 w-full   border   text-center  rounded-5 ">
                <button  type="button" className="  google-button text-white button bg-success ">Sign in With Google</button>
            </div>

            <div className="d-flex justify-content-center align-item-center">
                  {
                  Error.errorMessage !== '' &&  Error.fieldName !== 'username' &&  Error.fieldName !== 'email' &&  Error.fieldName !== 'password' && 
                     <span className=" text-danger  error-danger  ">{Error.errorMessage}</span>
                  }
            </div>
        </form>
                
        </div>
      </div>
    </div>
  )
}


export default SignIn