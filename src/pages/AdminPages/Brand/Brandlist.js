/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Space, Table, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteABrand,
  getBrands,
} from "../../../features/admin/admin-brand/brandSlice";
import { Link } from "react-router-dom";
import { resetState } from "../../../features/admin/admin-brand/brandSlice";
import CustomModal from "../../../components/CustomModal";

// const columns = [
//   {
//     width: 100,
//     title: "SNo",
//     dataIndex: "key",
//   },
//   {
//     title: "Title",
//     dataIndex: "title",
//     sorter: (a, b) => a.title.length - b.title.length,
//   },
//   {
//     title: "Action",
//     width: 150,
//     dataIndex: "action",
//   },
// ];

// const Brandlist = () => {
//   const [open, setOpen] = useState(false);
//   const [brandId, setbrandId] = useState("");
//   const showModal = (e) => {
//     setOpen(true);
//     setbrandId(e);
//   };

//   const hideModal = () => {
//     setOpen(false);
//   };
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(resetState());
//     dispatch(getBrands());
//   }, []);
//   const brandState = useSelector((state) => state.brand.brands);
//   const data1 = [];
//   for (let i = 0; i < brandState.length; i++) {
//     data1.push({
//       key: i + 1,
//       title: brandState[i].title,
//       action: (
//         <>
//           <Link
//             className="ms-3 fs-3 text-danger"
//             to={`/admin/brand/${brandState[i]._id}`}
//           >
//             <BiEdit />
//           </Link>

//           <button
//             className="ms-3 fs-3 text-danger bg-transparent border-0"
//             onClick={() => showModal(brandState[i]._id)}
//           >
//             <AiFillDelete />
//           </button>
//         </>
//       ),
//     });
//   }

//   const deleteBrand = (e) => {
//     dispatch(deleteABrand(e));
//     setOpen(false);
//     setTimeout(() => {
//       dispatch(getBrands());
//     }, 100);
//   };
//   return (
//     <div>
//       <h3 className="mb-4 title">Brand List</h3>
//       <Table columns={columns} dataSource={data1} />
//       <CustomModal
//         hideModal={hideModal}
//         open={open}
//         performAction={() => {
//           deleteBrand(brandId);
//         }}
//         title="Are you sure you want to delete this brand?"
//       />
//     </div>
//   );
// };
// export default Brandlist;
