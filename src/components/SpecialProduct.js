import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";

const SpecialProduct = (props) => {
  const {
    collectionName,
    description,
    totalrating,
    price,
    sold,
    quantity,
    collectionId,
    image,
  } = props;
  // console.log(quantity)
  // console.log("sold",sold)
  return (
    <div className="col-6 mb-3">
      <div className="special-product-card">
        <div className="d-flex justify-content-between">
          <div>
            <img
              src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/307773363_500749115391640_3906085054103576647_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFWrlNaYkQUo1Pk0ZnwCdwz10djKjD-dFrXR2MqMP50Wk-rHiPTsE-YhYCE3kOkIkJ6TnOi8yVQwmLYY_Z604U3&_nc_ohc=pDdhRtfhiBIAX_bZsaY&_nc_ht=scontent.fhan2-3.fna&oh=00_AfBEv8jcaxN7_uL0fCztGywUuGG9ZLBwVWkZScLAsGK9Cg&oe=65FEF101"
              style={{ width: "300px", height: "300px" }}
              className="img-fluid special-img"
              alt="watch"
            />
          </div>
          <div className="special-product-content">
            <h5 className="brand"> </h5>
            <h6 className="title">{collectionName}</h6>
            {/* <ReactStars
              count={5}
              size={24}
              value={2}
              edit={false}
              activeColor="#ffd700"
            /> */}
            {/* <p className="price">
              <span className="red-p">$ {100}</span> &nbsp;{" "}
              {/* <strike>$200</strike> */}
            {/* </p>  */}
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
              <p>Sản phẩm: {10}</p>
              {/* <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style={{ width: 10 / 10 + 3 * 100 + "%" }}
                  aria-valuenow={10 / 10 + 3 * 100}
                  aria-valuemin={10}
                  aria-valuemax={3 + 10}
                ></div>
              </div> */}
            </div>
            <Link className="button" to={"/product/" + collectionId}>
              Xem chi tiết
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProduct;
