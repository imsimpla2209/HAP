/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Segmented, Space, Switch, Table, Typography } from "antd";
import { deleteBlog, getBlogs } from "../../../features/admin/blog/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomModal from "../../../components/CustomModal";
import { resetState } from "../../../features/admin/blog/blogSlice";
import { useState } from "react";
import { getBlogcats } from "../../../features/admin/blogcat/blogcatSlice";

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
    title: "Category",
    dataIndex: "bcategories",
    sorter: (a, b) => a.bcategories.length - b.bcategories.length,
  },

  {
    title: "Action",
    width: 150,
    dataIndex: "action",
  },
];

const Bloglist = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setblogId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setblogId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
    dispatch(getBlogcats())
  }, []);
  const blogstate = useSelector((state) => state.blog.blogs);
  const blogCatState = useSelector((state) => state.blogcat.blogcats);
  const data1 = [];
  for (let i = 0; i < blogstate.length; i++) {
    const blogcat = blogCatState.find((blogcat) => blogcat._id === blogstate[i].bcategories);
    data1.push({
      key: i + 1,
      title: blogstate[i].title,
      bcategories: blogcat ? blogcat.title : "",
      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/blog/${blogstate[i]._id}`}
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(blogstate[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteABlog = (e) => {
    dispatch(deleteBlog(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">blog List</h3>
      <Table columns={columns} dataSource={data1} />
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteABlog(blogId);
        }}
        title="Are you sure you want to delete this blog?"
      />
    </div>
  );
};
export default Bloglist;
