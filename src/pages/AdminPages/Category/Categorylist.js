/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Table, } from "antd";
import {
  deleteCategory,
  getCategorys,
} from "../../../features/category/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomModal from "../../../components/CustomModal";

const columns = [
  {
    title: "Thứ tự",
    dataIndex: "key",
  },
  {
    title: "Tên",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },

  {
    title: "Hành động",
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
    console.log(e)
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
      title: categoryState[i].categoryName,
      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/category/${categoryState[i].categoryId}`}
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(categoryState[i].categoryId)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Danh sách danh mục sản phẩm</h3>
      <Table columns={columns} dataSource={data1} />
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteACategory(categoryId);
          
        }}
        title="Bạn có chắc chắn khi xoá không?"
      />
    </div>
  );
};
export default Categorylist;
