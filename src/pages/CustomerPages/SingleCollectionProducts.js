import { List, Space } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const SingleCollectionProducts = ({ data }) => (
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={data}
    footer={
      <div>
      </div>
    }
    renderItem={(item, index) => (
      <List.Item
        key={item.title}
        // actions={[
        //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
        //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
        //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        // ]}
        extra={
          <img
            width={150}
            alt="logo"
            src={item.image?.[0].path}
          />
        }
      >
        <List.Item.Meta
          avatar={<p>{index + 1}.</p>}
          title={<Link
            to={"/product/" + item?.productId}
          // className="product-card position-relative"
          >
            <h6>{item?.productName}</h6>
          </Link>}
          description={item.category?.categoryName}
        />
        <span className='text-muted'>Mã Sản Phẩm:</span> {item.productCode}
      </List.Item>
    )}
  />
);

export default SingleCollectionProducts;