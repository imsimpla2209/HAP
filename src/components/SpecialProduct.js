import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";

const SpecialProduct = (props) => {
  const { title, brand, totalrating, price, sold, quantity, id, image } = props;
  console.log(quantity)
  console.log("sold",sold)
  return (
    <div className="col-6 mb-3">
      <div className="special-product-card">
        <div className="d-flex justify-content-between">
          <div>
            <img
              src={image}
              style={{ width: "300px", height: "300px" }}
              className="img-fluid special-img"
              alt="watch"
            />
          </div>
          <div className="special-product-content">
            <h5 className="brand">{brand}</h5>
            <h6 className="title">{title}</h6>
            <ReactStars
              count={5}
              size={24}
              value={totalrating}
              edit={false}
              activeColor="#ffd700"
            />
            <p className="price">
              <span className="red-p">$ {price}</span> &nbsp;{" "}
              {/* <strike>$200</strike> */}
            </p>
            {/* <div className="discount-till d-flex align-items-center">
                            <p className='mb-0'>
                                <b>5 days</b>&nbsp;
                            </p>
                            <div className="d-flex gap-10">
                                <span className="badge rounded-circle p-3 bg-danger">1</span>:
                                <span className="badge rounded-circle p-3 bg-danger">1</span>:
                                <span className="badge rounded-circle p-3 bg-danger">1</span>
                            </div>
                        </div> */}
            <div className="prod-count my-3">
              <p>Products: {quantity}</p>
              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style={{ width: quantity / quantity + sold * 100 + "%" }}
                  aria-valuenow={quantity / quantity + sold * 100}
                  aria-valuemin={quantity}
                  aria-valuemax={sold + quantity}
                ></div>
              </div>

            </div>
            <Link className="button" to={"/product/" + id}>
              View to Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProduct;
