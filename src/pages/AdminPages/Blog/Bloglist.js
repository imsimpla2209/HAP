/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Segmented, Space, Switch, Table, Typography } from "antd";
import { deleteBlog, getBlogs } from "../../../features/blog/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomModal from "../../../components/CustomModal";
import { resetState } from "../../../features/blog/blogSlice";
import { useState } from "react";
// import { getBlogcats } from "../../../features/admin/blogcat/blogcatSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },

  {
    title: "Action",
    width: 150,
    dataIndex: "action",
  },
];

const Bloglist = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [blogId, setblogId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setblogId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    // dispatch(resetState());
    dispatch(getBlogs());
    // dispatch(getBlogcats())  
  }, [dispatch]);

  const deleteABlog = (e) => {
    dispatch(deleteBlog(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 100);
  };

  const blogstate = useSelector((state) => state.blog.blogs);


  const data1 = [];
  console.log(blogstate)
  for (let i = 0; i < blogstate.length; i++) {
    data1.push({
      key: i + 1,
      title: blogstate[i].title,
      // bcategories: blogcat ? blogcat.title : "",
      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/blog/${blogstate[i].postId}`}
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(blogstate[i].postId)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }


  return (
    <div>
      <h3 className="mb-4 title">Danh Sách Bài Đăng</h3>
      <Table columns={columns} dataSource={data1} />
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteABlog(blogId);
        }}
        title="Bạn có chắc chắn khi xoá không?"
      />
    </div>
  );
};
export default Bloglist;
