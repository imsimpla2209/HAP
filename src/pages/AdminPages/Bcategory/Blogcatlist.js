/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Space, Table, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getBlogcats, deleteBlogcat } from "../../../features/admin/blogcat/blogcatSlice";
import CustomModal from "../../../components/CustomModal";
import { Link } from "react-router-dom";
const columns = [
  {
    width: 100,
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
    dataIndex: "action",
    width: 150,

  },
];
const Blogcatlist = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [blogCatId, setblogCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setblogCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getBlogcats());
  }, [dispatch]);

  const deleteABlogcat = (e) => {
    dispatch(deleteBlogcat(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogcats());
    }, 100);
  };


  const blogcatstate = useSelector((state) => state.blogcat.blogcats);
  const data1 = [];
  for (let i = 0; i < blogcatstate.length; i++) {
    data1.push({
      key: i + 1,
      title: blogcatstate[i].title,
      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/blog-category/${blogcatstate[i]._id}`}
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(blogcatstate[i]._id)}
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
          deleteABlogcat(blogCatId);
        }}
        title="Are you sure you want to delete this blog category?"
      />
    </div>
  );
};
export default Blogcatlist;
