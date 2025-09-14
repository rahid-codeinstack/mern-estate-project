import { lazy, useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import "./search.css"
import { FaParking } from 'react-icons/fa';
import { MdBathroom, MdBed, MdLocationOn, MdPark } from 'react-icons/md';



function Search() {
  const [searFormData , setsearchFormData ] = useState({
    type:"all",
    furnished:'false',
    offer:'false',
    parking:'false',
    sort:'createdate',
    order:'desc',
    searchterm:'',

  });
  const navigate = useNavigate();
  const [ listing , setlisting ] = useState([]);





  function handleChangeSearchTerm(e){
    setsearchFormData({...searFormData,searchterm:e.target.value})
  }




  function handleChangeType(e){

    if( e.target.id === 'offer'){
      setsearchFormData({...searFormData,offer:e.target.checked ? 'true':'false'})
      return;
    }
    setsearchFormData({...searFormData,type:e.target.id})


  }



  function handleAmenitesChange(e){
      const key = e.target.id;
      if(key === 'parking')
      {
        setsearchFormData({...searFormData,parking:e.target.checked  ? "true" : "false"})
        return;
      }else{
        setsearchFormData({...searFormData,furnished:e.target.checked ? "true" : "false"})
      }
  }




function handlesortingChange(e){
const [sort,order]= e.target.value.split("_");
  setsearchFormData({...searFormData,order:order,sort:sort})

}


function handleSubmiteSearchForm(e){
  e.preventDefault();
  const searchParams = new URLSearchParams(location.search);
    searchParams.set("searchterm",searFormData.searchterm);
    searchParams.set("parking",searFormData.parking)
    searchParams.set("offer",searFormData.offer)
    searchParams.set("furnished",searFormData.furnished);
    searchParams.set("sort",searFormData.sort);
    searchParams.set("order",searFormData.order);
    searchParams.set("type",searFormData.type);
   const searchQuery =searchParams.toString();
    navigate(`/search/?${searchQuery}`)
}

useEffect(()=>{
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get("type");
    const offer =(searchParams.get("offer"));
    const parking =(searchParams.get("parking"));
    const furnished =(searchParams.get("furnished"));
    const sort = searchParams.get("sort")
    const order = searchParams.get("order")
    const searchTerm = searchParams.get("searchterm");
    const searchQuery = searchParams.toString();
    if(searchTerm || type || offer || parking || furnished || sort || order)
    {
       setsearchFormData({
         type:type || "all",
         searchterm: searchTerm,
         offer:offer || false,
         parking:parking || false,
         sort:sort || "createdAt",
         order:order || 'desc',
         furnished:furnished || false,
       });
      findListing(searchQuery);
    }



},[location.search])

async function findListing(searchQuery) {
  try {
      const res = await fetch("/api/listing/searchlisting/?"+searchQuery);
      const data = await res.json();
     setlisting(data);


  } catch (error) {
    console.log(error);

  }

}




  return (
    <div className="container-fluid search-container py-0 ">
      <div className="row ">
        {/* -------------------- left columns ----------------------------------  */}
        <div
          className="col-12 col-md-5 col-lg-4 text-black py-3 "
          style={{ borderRight: "2px solid gray" }}
        >
          <form onSubmit={handleSubmiteSearchForm} className="w-100">
            <div className="d-flex mb-3 mt-3 justify-content-center flex-column  gap-2  ">
              <label>SearchTerm : </label>
              <input
                onChange={handleChangeSearchTerm}
                type="text"
                id="searchterm"
                value={searFormData.searchterm}
                placeholder="search"
                className="form-control"
              />
            </div>

            <div className="types d-flex  mb-3 align-items-center gap-2 flex-wrap flex-md-no-wrap ">
              <span> Type:</span>
              <div className="d-flex justify-content-center align-items-center ">
                <input
                  type="checkbox"
                  onChange={handleChangeType}
                  id="all"
                  checked={searFormData.type === "all"}
                />
                <label className="ms-1 " htmlFor="all">
                  Rent & Sale
                </label>
              </div>

              <div className="d-flex justify-content-center align-items-center ">
                <input
                  type="checkbox"
                  onChange={handleChangeType}
                  id="rent"
                  checked={searFormData.type === "rent"}
                />
                <label className="ms-1 " htmlFor="rent">
                  Rent
                </label>
              </div>

              <div className="d-flex justify-content-center align-items-center ">
                <input
                  type="checkbox"
                  onChange={handleChangeType}
                  id="sale"
                  checked={searFormData.type === "sale"}
                />
                <label className="ms-1 " htmlFor="sale">
                  Sale
                </label>
              </div>

              <div className="d-flex justify-content-center align-items-center ">
                <input
                  type="checkbox"
                  onChange={handleChangeType}
                  checked={searFormData.offer === "true" ? true : false}
                  id="offer"
                />
                <label className="ms-1 " htmlFor="offer">
                  Offer
                </label>
              </div>
            </div>
            <div className="Amenities mb-3 d-flex align-items-center gap-2 gap-lg-3  ">
              <span>Amenities:</span>

              <div className="d-flex justify-content-center align-items-center ">
                <input
                  type="checkbox"
                  onChange={handleAmenitesChange}
                  id="parking"
                  checked={searFormData.parking === "true" ? true : false}
                />
                <label className="ms-1 " htmlFor="parking">
                  parking
                </label>
              </div>

              <div className="d-flex justify-content-center align-items-center ">
                <input
                  type="checkbox"
                  onChange={handleAmenitesChange}
                  id="furnished"
                  checked={searFormData.furnished === "true" ? true : false}
                />
                <label className="ms-1 " htmlFor="parking">
                  furnished
                </label>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3 ">
              <span>Sort :</span>
              <select
                className="py-2 px-3 px-md-4 border-2 outline-0 rounded-2 bg-white cursor-pointer "
                name="sort"
                id="sort"
                style={{ outline: "none" }}
                onChange={handlesortingChange}
              >
                <option value="createdat_asc">Latest</option>
                <option value="createdat_desc">Oldest</option>
                <option value="regularPrice_desc">High price</option>
                <option value="regularPrice_asc">Low price</option>
              </select>
            </div>
            <button
              className="btn text-white w-75 mt-4 "
              style={{ backgroundColor: "var(--slate-color)" }}
            >
              Search
            </button>
          </form>
        </div>

        {/* ----------------------------------------- right --------------------------------------------- */}
        <div className="col  col-lg-8 cole-md-7 pt-2">
          <h1 className="text-black text-capitalize  py-2   ">Listing Resulte : </h1>
          <div className=" card-container">
            <div className="row gutter gy-3 ">
              {listing &&
                listing.length > 0 &&
                listing.map((list, index) => {
                  return (
                    <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xl-4 col-xxl-3 text-black">
                      <Link to={'/listing/'+list._id}>
                        <div className="shadow listing-card  ">
                          <div className="card-image">
                            <img src={list.images[0]} alt="image" />
                          </div>
                          <div className="py-3">
                            <div className="card-title px-3 mb-2 ">
                              <h4 className="h4 text-capitalize fw-bolder ">
                                {list.name.length > 14
                                  ? list.name.substring(0, 15)
                                  : list.name}
                              </h4>
                            </div>
                            <div className="px-3 mb-3 ">
                              <span className="text-success h5 ">
                                <MdLocationOn />
                              </span>
                              <span className="text-dark">{list.address}</span>
                            </div>
                            <p className="card-description  px-3 ">
                              {list.description.length > 80
                                ? list.description.substring(0, 80) + "..."
                                : list.description}
                            </p>
                            <p className="px-3 fw-bold">
                              $
                              {list.discountPrice
                                ? list.discountPrice
                                : list.regularPrice}
                              /Month
                            </p>
                            <p className="px-3 d-flex gap-2 ">
                              <div className="d-inline">
                                <span>
                                  <MdBed className="text-success" />
                                </span>{" "}
                                <span className="text-black text-capitalize ">
                                  bed {list.bed}
                                </span>
                              </div>
                              <div className="d-inline">
                                <span>
                                  <MdBathroom className="text-success" />
                                </span>{" "}
                                <span className="text-black text-capitalize ">
                                  bath {list.bath}
                                </span>
                              </div>
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search
