/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import {  Table,  } from "antd";
import {
  deleteCategory,
  getCategorys,
} from "../../../features/customer/category/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomModal from "../../../components/CustomModal";

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
    dataIndex: "action",
    width: 150,
  },
];

const Categorylist = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [categoryId, setcategoryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcategoryId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getCategorys());
  }, [dispatch]);

  const deleteACategory = (e) => {
    dispatch(deleteCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategorys());
    }, 100);
  };

  const categoryState = useSelector((state) => state.category.categorys);
  const data1 = [];
  for (let i = 0; i < categoryState.length; i++) {
    data1.push({
      key: i + 1,
      title: categoryState[i].title,
      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/category/${categoryState[i]._id}`}
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(categoryState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">category List</h3>
      <Table columns={columns} dataSource={data1} />
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteACategory(categoryId);
        }}
        title="Are you sure you want to delete this category?"
      />
    </div>
  );
};
export default Categorylist;
