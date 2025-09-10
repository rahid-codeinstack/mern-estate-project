import React, { useEffect, useState } from 'react'
import './CreateListing.css'

function CreateListing() {
     
     const [listingData,setlistingData] = useState({
               name:"",description:"", address:"", type:"rent",parking:false,bath:0,
               bed:1,furnished:false,offer:false,images:[],regularPrice:50, discountPrice:0,          
     });
    const [FileData, setFileData] = useState({
          FileUploading:false, FileError:"",Files:{},
    })

    useEffect(()=>{
               if(FileData.Files.length+listingData.images.length-1 <= 5){
                    setFileData({...FileData,FileError:""})
               }
    },[FileData.Files])
    function handleUploadFile (){
         if(FileData.Files.length-1 < 0 || FileData.Files == {}){
                    setFileData({...FileData,FileError:'select your file '});
                    return;
          }
          if((FileData.Files.length - 1) + (listingData.images.length - 1)  > 5 ){
               return setFileData({...FileData,FileError:"you can upload atleast 5 images "})
          }
         
          if(FileData.Files.length > 5 ){
               setFileData({...FileData,FileError:"you can add atleast 5 images"});
               return;
          }
          const promiseList = [];
          setFileData({...FileData,FileUploading:true});
          for(let i = 0 ; i<=FileData.Files.length -1  ; i++){
               promiseList.push(createFilePromise(FileData.Files[i]))
          }
     Promise.all(promiseList).then((res)=>{
               res.forEach( async (image)=>{
                    const  imageData= await image.json()
                    console.log(imageData);
                    setlistingData(prev => ({...prev,images: [...prev.images, imageData.secure_url]}));
                    
               })
          setFileData({...FileData,FileUploading:false});
          setFileData({...FileData,Files:{}});
     
              
     }).catch((err)=>{
          setFileData({...FileData,FileError:err.messag});
     })
    }
async function createFilePromise(File){
     return new Promise((resolve,reject)=>{
        const fileData =  new FormData();
          fileData.append('file',File);
          fileData.append("upload_preset","estate_images");
          fetch("https://api.cloudinary.com/v1_1/dmooukppx/image/upload",{
                    method:"POST",
                    body:fileData,
          }).then((data)=>{
               resolve(data);
          }).catch((err)=>{
                    reject(err);
          })
     })
}
function handleDeletFile(deletFile){
     const filterFile = listingData.images.filter((file=>{
               return file !== deletFile;
     }))
     setlistingData((prev)=>({...prev,images:filterFile}));

}
useEffect(()=>{
          console.log(listingData.images);
},[listingData])
  return (
     <div className="container " >
          <div className="container listing-container rounded-2 w-75 mt-4 bg-white p-3 py-6 d-flex gap-4 justify-content-center align-items-center flex-column ">
               <h1 className='text-center text-capitalize text-black fwt-semibold'>Create Listing </h1>
               <div className="row  gutter gy-4 w-100">
                         <div className="col-12 col-lg-7 row-cols-7 w-full  d-flex gap-2 justify-content-center align-items-center flex-column ">
                              <input type="text" id='name' className='w-100 p-2  rounded-1  border-1 form-control' placeholder='name' />
                              <input type="text" id='address' className='w-100 p-2 rounded-1  border-1 form-control' placeholder='address' />
                              <textarea className='w-100 description-box p-2 rounded-1  border-1 form-control resize-none'  id="description" placeholder='description'></textarea>
                              <div className='d-flex gap-3 justify-content-start flex-wrap align-items-center '>
                                    <div className='d-flex justify-content-center gap-1 align-items-center '>
                                        <input type="checkbox" id='sale' />
                                        <label htmlFor="sale" className='text-black'>sale</label>
                                   </div>
                                    <div className='d-flex justify-content-center gap-1 align-items-center '>
                                        <input type="checkbox" id='rent' />
                                        <label htmlFor="rent" className='text-black'>rent</label>
                                   </div>
                                    <div className='d-flex justify-content-center gap-1 align-items-center '>
                                        <input type="checkbox" id='parking' />
                                        <label htmlFor="parking" className='text-black'>parking</label>
                                   </div>
                                    <div className='d-flex justify-content-center gap-1 align-items-center '>
                                        <input type="checkbox" id='furnished' />
                                        <label htmlFor="furnished" className='text-black'>furnished</label>
                                   </div>
                                    <div className='d-flex justify-content-center gap-1 align-items-center '>
                                        <input type="checkbox" id='offer' />
                                        <label htmlFor="offer" className='text-black'>offer</label>
                                   </div>

                              </div>
                              <div className='d-flex w-100 justify-start mt-2 align-items-center gap-3   '>
                                        <div className='d-flex justify-content-start align-items-center gap-2 '>
                                                  <input type="number" className='form-control w-50  ' id='bed' min={1}/>
                                                  <label htmlFor="bed" className='text-black'>bed</label>
                                        </div>
                                        <div className='d-flex justify-content-start align-items-center gap-2 '>
                                                  <input type="number" className='form-control w-50 ' id='bath' min={1}/>
                                                  <label htmlFor="bath" className='text-black'>bath</label>
                                        </div>
                              </div>
                              <div className='w-100 mt-4   '>
                                        <div className=' w-75  gap-3 d-flex  align-items-center '>
                                               <input type="text" id='regularPrice' className=' form-control m-0' placeholder='regularPrice' />   
                                               <span className='text-black'>($/month)</span>
                                        </div>
                                        <div className=' w-75 mt-3  gap-3 d-flex  align-items-center '>
                                               <input type="text" id='descountPrice' className=' form-control m-0' placeholder='descountPrice' />   
                                               <span className='text-black'>($/month)</span>
                                        </div>
                              </div>
                         </div>
                         <div className="col-12 col-lg-5 w-full  mt-4 mt-md-0 py-4 py-md-0 border border-black">
                                   <div className='mt-2 '>
                                             <input type="file" onChange={(e)=>setFileData({...FileData,Files:e.target.files})} id='file' className='w-100 p-2 bg-light text-black ' multiple accept='image/*' />
                                   </div>
                                   <div className='mt-2'>
                                        {
                                                  FileData.FileError  ? <span className='text-danger text-center '>{FileData.FileError}</span> :
                                                  !FileData.FileError  && FileData.FileUploading ? <span className='text-black text-center text-xl'>uploading...</span>:
                                                   !FileData.FileError  && !FileData.FileUploading && listingData.images && 
                                                   listingData.images.length > 0  && 
                                                   listingData.images.map((url) => {
                                                       return <div className='d-flex  py-2 px-1  border border-black mb-1 justify-content-between align-items-center'>
                                                                 <img src={url} alt='listing-image' width={30} height={30}></img>
                                                                 <span onClick={()=>handleDeletFile(url)} className='text-danger btn  text-uppercase '>delete</span>
                                                            </div>
                                                   })
                                        }
                                   </div>
                                   <div className='mt-2'>
                                             <button disabled={FileData.FileUploading === true } onClick={handleUploadFile} className='w-100 btn border border-success text-uppercase  text-success  '>upload</button>
                                   </div>
                         </div>
               </div>

                <div className='w-100 text-center mt-3'>
                    <button className='w-75 btn p-2 rounded-2 text-white ' style={{backgroundColor:"var(--slate-color)"}}> CREATE </button>
               </div>
          </div>
         
     </div>
  )
}

export default CreateListing