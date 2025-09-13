import { Link, useParams } from 'react-router-dom'
import './Listing.css'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdBed, MdBathroom,  MdLocationOn, MdCarRental } from "react-icons/md";
import { FaParking, FaTools } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";




function Listing() {
  const {listid} = useParams();
  const {user}=useSelector((st)=>st.user);
  const [loading , setloading] = useState(false);
  const [error,seterror]=useState(undefined);
  const [listing,setlisting]=useState({});
  const [iShowMessageBox , setiShowMessageBox] = useState(false);
  const [message,setmessage] = useState("");

    useEffect(() => {
      if (listid) {
        async function getlisting() {
          try {
            setloading(true);
            const res = await fetch("/api/listing/getlisting/" + listid);
            const data = await res.json();
            if (!data.success) {
              setloading(false);
              seterror({ message: data.message, status: data.stautsCode });
              return;
            }
            setloading(false);
            setlisting(data.listing);
          } catch (error) {
            setloading(false);
            seterror({ message: error.message, status: error.statusCode });
          }
        }
        getlisting();
      }
    }, []);




  if (loading === true) {
    return (
      <div className="constinaer-fluid">
        <div className="container mt-5 text-center">
          <button
            class="btn bg-white py-5 text-center text-black w-25"
            type="button"
            disabled
          >
            <span
              class="spinner-border spinner-border h2"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="constinaer-fluid">
        <div className="container mt-5 text-center">
          <div class="alert alert-danger " role="alert">
            <div className="alert-heading text-black h3">{error.status}</div>
            <p>{error.message}</p>
          </div>
        </div>
      </div>
    );
  }


  
  return (
    <>
      {!loading && !error && listing ? (
        <div className="container-fluid p-0 bg-white">
          <div className="image-container w-100">
            <Swiper
              // install Swiper modules
              style={{ height: "88vh" }}
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
            >
              {listing.images?.map((url, index) => {
                return (
                  <SwiperSlide className="border border-white">
                    <img
                      src={url}
                      class="img-fluid rounded-top w-100 h-100 object-fit-cover"
                      alt="images"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className="container listing-content ">
            <header>
              <h2 className="text-black fw-semibold ">
                {listing.name} with ($
                {listing.discountPrice
                  ? listing.discountPrice
                  : listing.regularPrice}
                {listing.type == "sale" ? "sale" : "rent"})
              </h2>
            </header>
            <div className="mt-2">
              <span>
                <MdLocationOn className="h3 text-success" />
              </span>
              <span className="text-black">{listing.address}</span>
            </div>
            <div className="mt-3 mb-3 ">
              <span
                className=" p-2 rounded-2  text-white bg-danger  px-3 w-50 m-1 "
                disabled={true}
              >
                {listing.type == "rent" ? "For Rent" : "For Sale"}
              </span>
              {listing.discountPrice && (
                <span
                  className=" text-white p-2 rounded-2   bg-success w-25  ml-3 m-1  px-3  "
                  disabled={true}
                >
                  $
                  {listing.regularPrice && listing.discountPrice
                    ? listing.regularPrice - listing.discountPrice
                    : "0"}{" "}
                  Discount
                </span>
              )}
            </div>
            <div className="mt-2 ">
              <span className="fw-semibold text-xl text-black ">
                discription -{" "}
              </span>
              <span className="text-secondary">{listing.description}</span>
            </div>
            <ul className="mt-2 d-flex p-0 mx-0 py-2  flex-wrap flex-md-no-wrap justify-content-start  gap-4  align-items-center gap-2">
              <li className="list-item">
                <span className="text-success h4">
                  <MdBed />
                </span>
                <span className="   text-secondary ms-1 ">
                  {listing.bed} bed
                </span>
              </li>
              <li className="list-item">
                <span className="text-success h4">
                  <MdBathroom />
                </span>
                <span className="   text-secondary ms-1 ">
                  {listing.bath} bath
                </span>
              </li>
              <li className="list-item">
                <span className="text-success h4">
                  <FaParking />
                </span>
                <span className="   text-secondary ms-1 ">
                  {listing.parking ? "parking" : "no parking"}
                </span>
              </li>
              <li className="list-item">
                <span className="text-success h4">
                  <FaTools />
                </span>
                <span className="   text-secondary ms-1 ">
                  {listing.furnished ? "furnished" : "no furnished"}
                </span>
              </li>
            </ul>
            {iShowMessageBox && (
              <div className="mt-2">
                <p className="h4 text-black  ">Contact For {listing.name}</p>
                <p>
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Write message"
                    className="resize-none  w-50 p-2 outline-0 form-control message-input "
                    cols={6}
                    value={message}
                    onChange={(e)=>setmessage(e.target.value)}
                    rows={6}
                  ></textarea>
                </p>
                <p>
                  <Link
                  
                    to={
                      message
                        ? `https://mail.google.com/mail/?view=cm&fs=1&to=#${listing.email}&su=Hello&body=This%20is%20a%20message`
                        : ""
                    }
                    target={message && "_blank"}
                    class="nav-link btn btn-secondary w-25 bg-secondary p-2 rounded-2 "
                  >
                    Send Message 
                  </Link>
                 
                </p>
              </div>
            )}
            {!iShowMessageBox && user._id !== listing.userid && (
              <div className="mt-2">
                <button
                  onClick={() => setiShowMessageBox(true)}
                  className="btn bg-secondary  text-white w-75  "
                >
                  Contact LandLord
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Listing
