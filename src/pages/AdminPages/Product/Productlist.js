/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Pagination, Table, } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts, resetState } from "../../../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../../../components/CustomModal";
import { getCollections } from "../../../features/collections/collectionsSlice";
import { getCategorys } from "../../../features/category/categorySlice";
import { getUnits } from "../../../features/unit/unitsSlice";
import { formatCurrencyVND } from "utils/formator";
import { getModels } from "features/models/modelsSlice";
import modelsServices from "features/models/modelsService";

const columns = [
  {
    title: "No.",
    dataIndex: "key",
    width: 80,
    sorter: (a, b) => a.key - b.key,
    fixed: 'left',
  },
  {
    title: "Tên",
    dataIndex: "productName",
    sorter: (a, b) => a.productName.length - b.productName.length,
    fixed: 'left',
    width: 180,
  },
  {
    title: "Bộ",
    dataIndex: "collections",
    sorter: (a, b) => a.collections.length - b.collections.length,
  },
  {
    title: "Danh Mục",
    dataIndex: "pcategories",
    sorter: (a, b) => a.pcategories.length - b.pcategories.length,
  },
  {
    title: "Đánh giá",
    dataIndex: "voteStar",
    sorter: (a, b) => a.voteStar - b.voteStar,
  },
  {
    title: "Đã Bán",
    dataIndex: "sold",
    sorter: (a, b) => a.sold - b.sold,
  },
  {
    title: 'Action',
    dataIndex: "action",
    width: 150,
    fixed: 'right',
  },
];

const Productlist = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [productId, setPoductId] = useState("");
  const [page, setPage] = useState(1);
  const showModal = (e) => {
    setOpen(true);
    setPoductId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(resetState())
    dispatch(getCollections())
    dispatch(getCategorys())
    dispatch(getUnits())
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts(page));
  }, [page]);

  const deleteAProduct = (e) => {
    dispatch(deleteProduct({ id: e, page }));
    setOpen(false);
  };

  const productstate = useSelector((state) => state.product.products);
  const collectionsState = useSelector((state) => state.collections.collections);
  const categoryState = useSelector((state) => state.category.categorys);
  const unitsState = useSelector((state) => state.unit.units);

  console.log(productstate)
  const data1 = [];
  for (let i = 0; i < productstate.length; i++) {
    const collections = collectionsState?.filter((collections) => productstate?.[i].collection?.include?.(collections.collectionId));

    data1.push({
      key: i + 1,
      productId: productstate[i].productId,
      productName: productstate[i].productName,
      collections: collections?.length ? collections?.map((c) => c?.collectionName).join(", ") : "",
      pcategories: productstate?.[i]?.category?.categoryName || "",
      price: `${productstate[i].price}`,
      quantity: `${productstate[i].quantity}`,
      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/product/${productstate[i]?.productId}`}
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(productstate[i].productId)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Danh Sách Sản Phẩm</h3>
      <Table
        columns={columns}
        dataSource={data1}
        scroll={{ x: 1350, y: 1500 }}
        pagination={false}
        expandable={{
          expandedRowRender: (record, index) => <ExpandedRowRenderModels
            productId={record.productId}
            unitsState={unitsState} />
        }} />
      <Pagination defaultCurrent={1} pageSize={20} onChange={(page) => setPage(page)} total={100} />
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteAProduct(productId);
        }}
        heading="Xóa sản phẩm"
        title="Bạn có chắc chắn khi xoá sản phẩm này?"
        cancelText="Huỷ"
      />
    </div>
  );
};
export default Productlist;


const ExpandedRowRenderModels = ({ productId, unitsState }) => {
  const columns = [
    {
      title: 'Mẫu',
      dataIndex: 'modelName',
      key: 'modelName',
      render: (text) => <>{text}</>,
    },
    {
      title: 'Đơn vị',
      dataIndex: 'unitId',
      key: 'unitId',
      render: (text) => <>{unitsState?.find((u) => u.unitId === text)?.unitName || text}</>,
    },
    {
      title: 'Thông số',
      dataIndex: 'specification',
      key: 'specification',
      render: (text) => <div style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: text }}></div>
    },
    {
      title: 'Giá Bán Lẻ',
      dataIndex: 'primaryPrice',
      key: 'primaryPrice',
      render: (text) => <>{formatCurrencyVND(text)}</>,
    },
    {
      title: 'Giá Bán Buôn',
      dataIndex: 'secondaryPrice',
      key: 'secondaryPrice',
      render: (text) => <>{formatCurrencyVND(text)}</>,
    },
    // {
    //   title: '',
    //   dataIndex: 'key',
    //   key: 'action',
    //   render: (text) => (
    //     <Space size="middle">
    //       <Button
    //         type="text"
    //         icon={<EditTwoTone twoToneColor={'#2954e3'} />}
    //         onClick={() => onEdit(text)}
    //       />
    //       <Button
    //         type="text"
    //         icon={<DeleteTwoTone twoToneColor={'#e62e4d'} />}
    //         onClick={() => onDelete(text)}
    //       />
    //     </Space>
    //   ),
    // },
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    modelsServices.getModels(productId).then((res) => setData(res));
  }, [productId]);



  return <>
    {data?.length ? <Table columns={columns} dataSource={data} pagination={false} /> : <>Không có mẫu nào</>}
  </>
};