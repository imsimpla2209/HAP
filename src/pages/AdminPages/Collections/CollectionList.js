/* eslint-disable no-unused-vars */
import { Table } from "antd";
import React, { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
// import { deleteCollection, getCollections } from "../../../features/blog/blogSlice";
import { deleteCollection, getCollections } from "features/collections/collectionsSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomModal from "../../../components/CustomModal";
// import { getBlogcats } from "../../../features/admin/blogcat/blogcatSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Tên",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    render: (text) => <div style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: text }}></div>
  },
  {
    title: "",
    width: 150,
    dataIndex: "action",
  },
];

const CollectionList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [collectionId, setCollectionId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setCollectionId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getCollections());
  }, [dispatch]);

  const deleteABlog = (e) => {
    dispatch(deleteCollection(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCollections());
    }, 100);
  };

  const collectionState = useSelector((state) => state.collections.collections);


  const data1 = [];
  console.log(collectionState)
  for (let i = 0; i < collectionState.length; i++) {
    data1.push({
      key: i + 1,
      title: collectionState[i].collectionName,
      description: collectionState[i].description,
      // bcategories: blogcat ? blogcat.title : "",
      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/collection/${collectionState[i].collectionId}`}
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(collectionState[i].collectionId)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }


  return (
    <div>
      <h3 className="mb-4 title">Danh Sách Bộ Sản Phẩm</h3>
      <Table columns={columns} dataSource={data1} />
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteABlog(collectionId);
        }}
        title="Bạn có chắc chắn khi xoá không?"
      />
    </div>
  );
};
export default CollectionList;
