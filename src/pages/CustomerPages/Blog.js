/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import BlogCard from "../../components/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "features/blog/blogSlice";



const Blog = () => {
  const blogState = useSelector((state) => state?.blog?.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllBlogs();
  }, []);

  const getAllBlogs = () => {
    dispatch(getBlogs());
  };

  console.log(blogState)

  return (
    <>
      <Meta title={"Bài Đăng"} />
      <BreadCrumb title="Bài Đăng" />
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
                        postId={item?.postId}
                        title={item?.title}
                        content={item?.content}
                        image="https://img.freepik.com/premium-vector/global-network-connection-world-map-point-line-composition-concept-global-business-internet-technology-social-network-vector-illustration_230610-458.jpg"
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
