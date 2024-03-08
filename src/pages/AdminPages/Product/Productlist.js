/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Table, } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts, resetState } from "../../../features/admin/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../../../components/CustomModal";
import { getBrands } from "../../../features/customer/brand/brandSlice";
import { getCategorys } from "../../../features/customer/category/categorySlice";

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
    title: "Brand",
    dataIndex: "brands",
    sorter: (a, b) => a.brands.length - b.brands.length,
  },
  {
    title: "Category",
    dataIndex: "pcategories",
    sorter: (a, b) => a.pcategories.length - b.pcategories.length,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: 'Action',
    dataIndex: "action",
    width: 150,
  },
];

const Productlist = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [productId, setPoductId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setPoductId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(resetState())
    dispatch(getProducts());
    dispatch(getBrands())
    dispatch(getCategorys())
  }, [dispatch]);

  const deleteAProduct = (e) => {
    dispatch(deleteProduct(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };
  
  const productstate = useSelector((state) => state.product.products);
  const brandState = useSelector((state) => state.brand.brands);
  const categoryState = useSelector((state) => state.category.categorys);
  
  console.log(productstate)
  const data1 = [];
  for (let i = 0; i < productstate.length; i++) {
    const brand = brandState.find((brand) => brand._id === productstate[i].brands);
    const category = categoryState.find((category) => category._id === productstate[i].pcategories);

    data1.push({
      key: i + 1,
      title: productstate[i].title,
      brands: brand ? brand.title : "",
      pcategories: category ? category.title : "",
      price: `${productstate[i].price}`,
      quantity: `${productstate[i].quantity}`,
      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/product/${productstate[i]._id}`}
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(productstate[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Product List</h3>
      <Table columns={columns} dataSource={data1} />
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteAProduct(productId);
        }}
        title="Are you sure you want to delete this product?"
      />
    </div>
  );
};
export default Productlist;
