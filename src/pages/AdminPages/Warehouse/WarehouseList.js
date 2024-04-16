/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Pagination, Segmented, Space, Switch, Table, Typography } from "antd";
// import { deleteCollection, getCollections } from "../../../features/blog/blogSlice";
import { getCollections, deleteCollection } from "features/collections/collectionsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomModal from "../../../components/CustomModal";
import { resetState } from "../../../features/blog/blogSlice";
import { useState } from "react";
import { deleteWarehouse, getWarehouses } from "features/warehouse/warehousesSlice";
// import { getBlogcats } from "../../../features/admin/blogcat/blogcatSlice";

const columns = [
  {
    title: "No.",
    dataIndex: "warehouseLogId",
  },
  {
    title: "Mã Mẫu",
    dataIndex: "modelId",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Số Lượng Nhập",
    dataIndex: "quantity",
    sorter: (a, b) => a - b,
  },
  {
    title: "Ghi Chú",
    dataIndex: "note",
    render: (text) => <div style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: text }}></div>
  },
  // {
  //   title: "Action",
  //   width: 150,
  //   dataIndex: "action",
  // },
];

const WarehouseList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [warehouseLogId, setWarehouseLogId] = useState("");
  const [page, setPage] = useState(1);

  const showModal = (e) => {
    setOpen(true);
    setWarehouseLogId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    // dispatch(resetState());
    dispatch(getWarehouses(page));
    // dispatch(getBlogcats())  
  }, [dispatch, page]);

  const deleteABlog = (e) => {
    dispatch(deleteWarehouse(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getWarehouses());
    }, 100);
  };

  const warehousesState = useSelector((state) => state.warehouse.warehouses);


  const data1 = [];
  console.log(warehousesState)
  for (let i = 0; i < warehousesState.length; i++) {
    data1.push({
      key: i + 1,
      title: warehousesState[i].collectionName,
      description: warehousesState[i].description,
      ...warehousesState[i],
      // bcategories: blogcat ? blogcat.title : "",
      // action: (
      //   <>
      //     <Link
      //       className="ms-3 fs-3 text-danger"
      //       to={`/admin/warehouse/${warehousesState[i].warehouseLogId}`}
      //     >
      //       <BiEdit />
      //     </Link>
      //     <button
      //       className="ms-3 fs-3 text-danger bg-transparent border-0"
      //       onClick={() => showModal(warehousesState[i].warehouseLogId)}
      //     >
      //       <AiFillDelete />
      //     </button>
      //   </>
      // ),
    });
  }


  return (
    <div>
      <h3 className="mb-4 title">Danh Sách Nhật Ký Kho</h3>
      <Table columns={columns} dataSource={data1} />
      <Pagination defaultCurrent={1} pageSize={20} onChange={(page) => setPage(page)} total={100} />
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteABlog(warehouseLogId);
        }}
        title="Bạn có chắc chắn khi xoá không?"
      />
    </div>
  );
};
export default WarehouseList;
