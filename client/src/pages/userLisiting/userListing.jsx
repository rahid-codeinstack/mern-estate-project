import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux"
import { Link, Navigate } from "react-router-dom";
import './listing.css'

export default function UserListing (     ) {
     const {user} = useSelector((st)=>st.user);
     const [pageLength , setPageLenght ] = useState([]);
     const [listingLimite , setlistingLimite ] = useState(5);
     const [skipLimite , setPskipLimite] = useState(0);
     const [listingError , setListingError] = useState("");
     const [listingLoading,setListingLoading ] = useState(false);
     const [listing , setlisting ] = useState([]);
     const [pageButtons , setPageButtons] = useState([]);
     const [pagNextButtonIndex , setpageNextButtonIndex] =  useState(5);
     const [pagePrevButtonIndex , setpagePrevButtonIndex] = useState(0);


     
     function handleChangePage(pageindex){
        setlistingLimite(pageindex * 5)  ;
        setPskipLimite((pageindex - 1 ) * 5)

     }


     function handlePaginationButton({type}){
        if(type==='next' && pagNextButtonIndex > pageButtons.length)return;
        if(type=='prev'){
          if( pagePrevButtonIndex > 0  && pagNextButtonIndex > 5){
              setpagePrevButtonIndex(pagePrevButtonIndex - 1 );
              setpageNextButtonIndex(pagNextButtonIndex - 1 );
              alert('hellow world prev page ')
          }else{
            return;
          }
        }else if(type==='next'){
           if (pagePrevButtonIndex >= 0 && pagNextButtonIndex >= 5) {
             setpagePrevButtonIndex(pagePrevButtonIndex + 1);
             setpageNextButtonIndex(pagNextButtonIndex + 1);
             alert("hellow next page ")
           } else {
             return;
           }
        }
     }

     console.log(pageButtons);
     useEffect(()=>{
          getAllUserListing();

     },[listingLimite , skipLimite])

     async function getAllUserListing(){
          const userid = user._id;
   
          try {
                    setListingLoading(true);
                    const res = await fetch(`/api/user/all-listing/${userid}/?listingLimite=${listingLimite}&skipLimite=${skipLimite}`);
                    const data= await res.json();
                    
                   if( !data.success){
                         setListingError(data.message);
                         return;
                   }

                   setListingLoading(false);
                   setlisting(data.userlistings);
                   const buttonarray = [];
                   if(data.totalbuttonlength){
                        for (let i = 1; i <= data.totalbuttonlength; i++) {
                                   buttonarray.push(i);
                        }
                   }
                   setPageButtons(buttonarray);

          } catch (error) {
              setListingError(error.message);   
          }
     }


      async function handleDeleteListing (listingId) { 
        alert(listingId);
        try {
          const res = await fetch( `/api/user/deletelisting/${listingId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await res.json();
          if(!data.success){
            listingError(data.message);
            return;
          }
        
          const filterListing = listing.filter((list,index)=>{
            return list._id !== listingId;
          })
          setlisting(filterListing);
        } catch (error) {
          setListingError(error.message);   
        }
     }
   
     
     return (
       <>
         {user ? (
           <div className="container-fluid">
             <div className=" user-listing contaoiner d-flex flex-wrap flex-md-nowrap justify-content-center align-items-start gap-2 flex-column w-50 mt-3  border border-2 border-white mx-auto py-3 px-2  bg-white rounded-1">
               <h1 className="text-center w-100 text-black fw-semibold h1  py-2  ">
                 Your All Listing{" "}
               </h1>
               {listingLoading && (
                 <button
                   class="btn bg-light text-black w-100 text-center "
                   type="button"
                   disabled
                 >
                   <span
                     class="spinner-border spinner-border-xxl text-black text-lg"
                     role="status"
                     aria-hidden="true"
                   ></span>
                   Loading...
                 </button>
               )}
               {listingLoading === false &&
                 listingError === "" &&
                 listing?.length > 0 &&
                 listing?.map((list, index) => {
                   return (
                     <div className="d-flex w-100 rounded-2  p-3  border  border-1 border-black ">
                       <Link to={"/listing/" + list._id}>
                         <img
                           src={list.images[0]}
                           className="listing-image"
                           alt="images"
                         />
                       </Link>
                       <Link
                         className="listing-name w-100 px-2"
                         to={"/listing/" + list._id}
                       >
                         <span>{list.name}</span>
                       </Link>
                       <div className="d-flex justify-content-start  align-items-center gap-2 flex-wrap flex-md-nowrap">
                         <button
                           onClick={() => handleDeleteListing(list._id)}
                           className="btn btn-danger "
                         >
                           delete
                         </button>
                         <Link to={"/update-listing/" + list._id}>
                           <button className="btn btn-success">update</button>
                         </Link>
                       </div>
                     </div>
                   );
                 })}
             </div>
             <div className="pagination mt-1  ">
               <div className="bg-white w-50 mx-auto d-flex justify-content-center aling-items-center ">
                 <div className="pagination-button  d-flex justify-content-start align-items-center bg-white p-3 py-2  gap-2  rounded-2 ">
                   <button
                     onClick={() => handlePaginationButton({ type: "prev" })}
                     className="next-button btn btn-light  border  border-1 border-black text-black bg-light "
                   >
                     prev
                   </button>
                   {pageButtons.length > 1 &&
                     pageButtons.map((item, index) => {
                       if (
                         pageButtons.length > 5 &&
                         item >= pagePrevButtonIndex &&
                         item <= pagNextButtonIndex
                       ) {
                         return (
                           <button
                             onClick={() => handleChangePage(Number(item))}
                             className="border-0 outline-0  p-1 px-2 "
                           >
                             {item}
                           </button>
                         );
                       } else{
                         return (
                           <button
                             onClick={() => handleChangePage(Number(item))}
                             className="border-0 outline-0  p-1 px-2 "
                           >
                             {item}
                           </button>
                         );
                       }
                     })}
                   <button
                     onClick={() => handlePaginationButton({ type: "next" })}
                     className="next-button btn btn-light  border  border-1 border-black text-black bg-light"
                   >
                     next
                   </button>
                 </div>
               </div>
             </div>
           </div>
         ) : (
           <Navigate to={"/"} />
         )}
       </>
     );
}