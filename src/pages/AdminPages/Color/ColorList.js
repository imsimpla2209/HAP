/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import {  Table,  } from "antd";
import {
  deleteColor,
  getColors,
} from "../../../features/color/colorsSlice";

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

const ColorList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);

  const deleteAColor = (e) => {
    console.log(e)
    dispatch(deleteColor(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  };

  const colorState = useSelector((state) => state.color.colors);
 
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i + 1,
      title: colorState[i].colorName,
      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/color/${colorState[i].colorId }`}
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(colorState[i].colorId)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Danh sách màu</h3>
      <Table columns={columns} dataSource={data1} />
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteAColor(colorId);
          
        }}
        title="Bạn có chắc chắn khi xoá không?"
      />
    </div>
  );
};
export default ColorList;
