/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Button, Drawer, Pagination, Space, Table, } from 'antd';
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
import { ImportOutlined } from '@ant-design/icons';
import productService from "features/product/productService";

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
  // {
  //   title: "Bộ",
  //   dataIndex: "collections",
  //   sorter: (a, b) => a.collections.length - b.collections.length,
  // },
  {
    title: "Danh Mục",
    dataIndex: "pcategories",
    sorter: (a, b) => a.pcategories.length - b.pcategories.length,
  },
  {
    title: "Đã Bán",
    dataIndex: "sold",
    sorter: (a, b) => a.sold - b.sold,
  },
];

const SelectModelModal = ({
  show,
  hide,
  selectedRowKeys,
  setSelectedRowKeys,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [productId, setPoductId] = useState("");
  const [page, setPage] = useState(1);
  const [product, setProduct] = useState([]);
  useEffect(() => {
    dispatch(resetState())
    dispatch(getCollections())
    dispatch(getUnits())
  }, [dispatch]);

  useEffect(() => {
    productService.getProducts(page).then((res) => {
      setProduct(res);
    });
  }, [page]);

  const collectionsState = useSelector((state) => state.collections.collections);
  const unitsState = useSelector((state) => state.unit.units);

  const data1 = [];
  for (let i = 0; i < product.length; i++) {
    const collections = collectionsState?.filter((collections) => product?.[i].collection?.include?.(collections.collectionId));

    data1.push({
      key: i + 1,
      productId: product[i].productId,
      productName: product[i].productName,
      collections: collections?.length ? collections?.map((c) => c?.collectionName).join(", ") : "",
      pcategories: product?.[i]?.category?.categoryName || "",
      price: `${product[i].price}`,
      quantity: `${product[i].quantity}`,
      // action: (
      //   <>
      //     <Link
      //       className="ms-3 fs-3 text-danger"
      //       to={`/admin/product/${product[i]?.productId}`}
      //     >
      //       <BiEdit />
      //     </Link>
      //     <button
      //       className="ms-3 fs-3 text-danger bg-transparent border-0"
      //       onClick={() => showModal(product[i].productId)}
      //     >
      //       <AiFillDelete />
      //     </button>
      //   </>
      // ),
    });
  }

  return (
    <Drawer open={show} placement="top" onClose={hide} size="large">
      <h3 className="mb-4 title">Danh Sách Sản Phẩm(Mở rộng để chọn mẫu)</h3>
      <Table
        columns={columns}
        dataSource={data1}
        scroll={{ x: 1350, y: 1500 }}
        pagination={false}
        expandable={{
          expandedRowRender: (record, index) => <ExpandedRowRenderModels
            productId={record.productId}
            unitsState={unitsState}
            onSelect={setSelectedRowKeys} />
        }} />
      <Pagination defaultCurrent={1} pageSize={20} onChange={(page) => setPage(page)} total={100} style={{ marginTop: 20 }} />
    </Drawer>
  );
};
export default SelectModelModal;


const ExpandedRowRenderModels = ({ productId, unitsState, onSelect }) => {
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
    {
      title: 'Số lượng còn lại(Cái)',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text) => <>{text}</>,
    },
    {
      title: '',
      key: 'action',
      render: (text) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<ImportOutlined twoToneColor={'#e62e4d'} />}
            onClick={() => onSelect(text)}
            title="Chọn"
          >Chọn</Button>
        </Space>
      ),
    },
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    modelsServices.getModels(productId).then((res) => setData(res));
  }, [productId]);



  return <>
    {data?.length ? <Table columns={columns} dataSource={data} pagination={false} /> : <>Không có mẫu nào</>}
  </>
};