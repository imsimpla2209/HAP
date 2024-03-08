/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import BlogCard from "../../components/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllBLogs } from "../../features/customer/blogs/blogSlice";


const Blog = () => {
  const blogState = useSelector((state) => state?.blog?.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = () => {
    dispatch(getAllBLogs());
  };

  return (
    <>
      <Meta title={"Blogs"} />
      <BreadCrumb title="Blogs" />
      <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="">
            <div className="">
            </div>
            <div className="">
              <div className="row">
                {Array.isArray(blogState) &&
                  blogState.map((item, index) => (
                    <div className="col-6 mb-3" key={index}>
                      <BlogCard
                        id={item?._id}
                        title={item?.title}
                        description={item?.description}
                        image={item?.images[0]?.url}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Blog;
