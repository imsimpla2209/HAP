/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useMemo, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import ProductCard from "../../components/ProductCard";

import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../features/customer/brand/brandSlice";
import { getCategorys } from "../../features/customer/category/categorySlice";
import { getProducts } from "features/product/productSlice";
import productService from "features/product/productService";
import { Button, Pagination } from "antd";
import { getCollections } from "features/collections/collectionsSlice";
import SpecialProduct from "components/SpecialProduct";
import ScrollToTopOnMount from "components/ScrollToTopOnMount";
import { getWindowDimensions } from "utils";



const OurStore = () => {
  const [grid, setGrid] = useState(4);
  const categoryState = useSelector((state) => state.category.categorys);
  const collectionsState = useSelector((state) => state.collections.collections);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  //Filter State
  const [collection, setSelectedCollection] = useState(null);
  const [pcategories, setCategory] = useState(null);
  const [sort, setSort] = useState(null);
  const [viewCollectionMode, setViewCollectionMode] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getCategorys());
    dispatch(getCollections());
  }, []);

  useEffect(() => {
    productService.getProducts(0).then((res) => {
      setProducts(res);
    })
  }, [dispatch]);

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  const { width } = getWindowDimensions()

  const filteredProducts = useMemo(() => {
    let productsFiltered = products?.slice(currentPage * 12 - 12, currentPage * 12)
    if (sort?.includes("productName")) {
      productsFiltered = productsFiltered?.sort((a, b) => (sort?.startsWith("-") ? -1 : 1) * a.productName.localeCompare(b.productName))
    }
    if (pcategories) {
      productsFiltered = productsFiltered?.filter(product => product.category?.categoryName === pcategories?.categoryName)
    }
    if (collection) {
      productsFiltered = productsFiltered?.filter(product => product?.collection?.find(item => item?.collectionId === collection?.collectionId))
    }
    return productsFiltered
  }, [sort, currentPage, pcategories, products, collection])

  const filteredCollections = useMemo(() => {
    if (!viewCollectionMode) return collectionsState
    let filteredCollections = collectionsState?.slice(currentPage * 12 - 12, currentPage * 12)
    if (sort?.includes("productName")) {
      filteredCollections = filteredCollections?.sort((a, b) => (sort?.startsWith("-") ? -1 : 1) * a.collectionName.localeCompare(b.collectionName))
    }
    return filteredCollections
  }, [sort, currentPage, pcategories, products, collection])

  console.log(width)

  return (
    <>
      <ScrollToTopOnMount />
      <Meta title={"Gian Hàng"} />
      <BreadCrumb title="Gian Hàng" />
      <div className="store-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-md-3 col-12">
              {!viewCollectionMode && <div className="filter-card mb-3">
                <h3 className="filter-title">Lọc Theo Danh Mục</h3>
                <div>
                  <div className="product-tags d-flex flex-wrap align-content-center gap-10">
                    {categoryState &&
                      [...new Set(categoryState)].map((item, index) => {
                        return (
                          <span
                            key={index}
                            onClick={() =>
                              setCategory(pcategories === item ? null : item)
                            }
                            className={`btn ${pcategories === item ? "btn-primary" : "btn-light"
                              } fst-italic py-2 px-3`}
                          >
                            {item ? item.categoryName : ""}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>}
              {
                viewCollectionMode && <div className="filter-card mb-3">
                  <h3 className="filter-title">Bộ Sản Phẩm</h3>
                  <Button type="primary" onClick={() => setViewCollectionMode(false)}>Trở về danh sách sản phẩm</Button>
                </div>
              }
              {/* <div className="filter-card mb-3">
                <h3 className="filter-title">Locj</h3>
                <div>
                  <h5 className="sub-title">Price</h5>
                  <div className="d-flex align-items-center gap-10">
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control py-1"
                        id="floatingInput"
                        placeholder="From"
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                      <label for="floatingInput">From</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control py-1"
                        id="floatingInput1"
                        placeholder="To"
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                      <label for="floatingInput1">To</label>
                    </div>
                  </div>
                </div>
              </div> */}
              {
                !viewCollectionMode && <div className="filter-card mb-3">
                  <div className="d-flex align-items-baseline justify-content-between">
                    <h3 className="filter-title">Bộ Sản Phẩm</h3>
                    <Button type="link" className="py-0" onClick={() => setViewCollectionMode(true)}>Xem Tất Cả</Button>
                  </div>
                  <div>
                    <div className="product-tags d-flex flex-wrap align-content-center gap-10">
                      {collectionsState &&
                        [...new Set(collectionsState)]?.map((item, index) => {

                          return (
                            <span
                              key={index}
                              onClick={() =>
                                setSelectedCollection(collection?.collectionId === item?.collectionId ? null : item)
                              }
                              // className="badge bg-light text-muted fst-italic py-2 px-3"
                              className={`btn ${collection?.collectionId === item?.collectionId ? "btn-primary" : "btn-light"
                                } fst-italic py-2 px-3`}
                            >
                              {item ? item.collectionName : ""}
                            </span>
                          );
                        })}
                    </div>
                  </div>
                </div>
              }
            </div>
            <div className="col-md-9 col-12">
              <div className="filter-sort-grid">
                <div className="d-flex flex-wrap gap-md-0 gap-10 justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10">
                    <p className="mb-0 d-block" style={{ width: "100px" }}>
                      Sắp xếp theo:
                    </p>
                    <select
                      name=""
                      className="form-control form-select"
                      id=""
                      onChange={(e) => setSort(e.target.value)}
                    >
                      <option value="productName" selected="selected">
                        Tên Sản Phẩm, A-Z
                      </option>
                      <option value="-productName" selected="selected">
                        Tên Sản Phẩm, Z-A
                      </option>
                      {/* <option value="created" selected="selected">
                        Ngày Đăng, cũ nhất
                      </option>
                      <option value="-created" selected="selected">
                        Ngày Đăng, mới nhất
                      </option> */}
                    </select>
                  </div>
                  <div className="d-flex align-items-center gap-10">
                    <p className="total-products mb-0">{viewCollectionMode ? `Tất cả ${collectionsState?.length} bộ sản phẩm` : `Tất cả ${products?.length} sản phẩm`}</p>
                    <div className="d-flex gap-10 align-items-center grid">
                      <img
                        onClick={() => {
                          setGrid(width > 720 ? 3 : 1);
                        }}
                        src="images/gr.svg"
                        c
                        lassName="d-block img-fluid"
                        a
                        lt="grid"
                      />
                      <img
                        onClick={() => {
                          setGrid(width > 720 ? 4 : 2);
                        }}
                        src="images/gr3.svg"
                        className="d-block img-fluid"
                        alt="grid"
                      />
                      <img
                        onClick={() => {
                          setGrid(width > 720 ? 6 : 3);
                        }}
                        src="images/gr2.svg"
                        className="d-block img-fluid"
                        alt="grid"
                      />
                      {/* <img
                        onClick={() => {
                          setGrid(12);
                        }}
                        src="images/gr4.svg"
                        className="d-block img-fluid"
                        alt="grid"
                      /> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-list pb-5">
                <div className="d-flex gap-10 flex-wrap">
                  {!viewCollectionMode ? <ProductCard
                    data={filteredProducts ? filteredProducts : []}
                    grid={grid}
                  /> : filteredCollections &&
                  filteredCollections?.map((item, index) => {
                    return (
                      <div className="col-md-6 col-12" key={index}>
                        <SpecialProduct
                          key={index}
                          width={'100%'}
                          collectionId={item?.collectionId}
                          description={item?.description}
                          collectionName={item?.collectionName}
                          // sold={3}
                          // price={200}
                          image={item?.thumbnail ? item?.thumbnail : "https://st4.depositphotos.com/1393072/39779/v/450/depositphotos_397791404-stock-illustration-tool-box-line-icon-house.jpg"}
                        // totalrating={3}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <Pagination defaultCurrent={currentPage || 1} current={currentPage} total={products?.length} onChange={(page) => onChangePage(page)} />

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStore;
