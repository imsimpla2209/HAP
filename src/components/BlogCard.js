import React from "react";
import { Link } from "react-router-dom";

const BlogCard = (props) => {
  const { postId, title, content, date, image } = props;
  // console.log(postId)
  return (
    <div className="blog-card">
      <div className="card-image">
        <img
          src="https://img.freepik.com/premium-vector/global-network-connection-world-map-point-line-composition-concept-global-business-internet-technology-social-network-vector-illustration_230610-458.jpg"
          className="img-fluid "
          alt="blog"
        />
      </div>
      <div className="blog-content">
        <p className="date">{date}</p>
        <h5 className="title">{title.substr(0, 30)}</h5>
        <p
          className="desc"
          dangerouslySetInnerHTML={{
            __html: content.substr(0, 170) + "...",
          }}
        ></p>
        <Link to={"/blog/" + postId} className="button read-more">
          Đọc thêm
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
