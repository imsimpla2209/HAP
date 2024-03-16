/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Space, Table, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteUnit,
  getUnits,
} from "../../../features/unit/unitsSlice";
import { resetState } from "../../../features/unit/unitsSlice";
import CustomModal from "../../../components/CustomModal";

const columns = [
  {
    width: 100,
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
    width: 150,
    dataIndex: "action",
  },
];

const UnitList = () => {
  const [open, setOpen] = useState(false);
  const [unitId, setunitId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setunitId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getUnits());
  }, []);


  const deleteAUnit = (e) => {
    console.log(e)
    dispatch(deleteUnit(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getUnits());
    }, 100);
  };

  
  const unitState = useSelector((state) => state.unit.units);
  console.log(unitState)
  const data1 = [];
  for (let i = 0; i < unitState.length; i++) {
    data1.push({
      key: i + 1,
      title: unitState[i].unitName,
      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/unit/${unitState[i].unitId}`}
          >
            <BiEdit />
          </Link>

          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(unitState[i].unitId)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }


  return (
    <div>
      <h3 className="mb-4 title">Danh sách đơn vị</h3>
      <Table columns={columns} dataSource={data1} />
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteAUnit(unitId);
        }}
        title="Bạn có chắc chắn khi xoá không?"
      />
    </div>
  );
};
export default UnitList;
