/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getBlog } from "../../features/customer/blogs/blogSlice";

const SingleBlog = () => {

  const blogState = useSelector((state) => state?.blog?.singleBlog);
  const location = useLocation();
  console.log(location);
  const getBlogId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  useEffect(() => {
    getABlog();
  }, []);
  const getABlog = () => {
    dispatch(getBlog(getBlogId));
  };
  return (
    <>
      <Meta title={blogState?.title} />
      <BreadCrumb title={blogState?.title} />
      <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="single-blog-card">
                <Link to="/blogs" className="d-flex align-items-center gap-10">
                  <HiOutlineArrowLeft className="fs-4" /> Go back to Blogs
                </Link>
                <h3 className="title">{blogState?.title}</h3>
                <img
                  src={
                    blogState?.images[0]?.url ? blogState?.images?.[0] :"blog"
                  }
                  alt="blog"
                  className="img-fluid w-100 my-4"
                />
                <p
                  className="desc"
                  dangerouslySetInnerHTML={{
                    __html: blogState?.description,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleBlog;
