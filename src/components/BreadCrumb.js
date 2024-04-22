import React from 'react'
import { Link } from 'react-router-dom'

const BreadCrumb = (props) => {
  const { title } = props;
  const divStyle = {
    backgroundImage: `url(${props?.imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '75px', // Adjust this as per your requirement
  };

  return (
    <div className='breadscrumb mb-0 py-4' style={props?.imageUrl ? divStyle : {
      backgroundColor: "#000000",
    }}>
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <p className="text-center mb-0 " style={{
              fontWeight: '700',
              color: 'whiteSmoke',
            }}>
              <Link to="/" className="me-1" style={{
                fontWeight: '700',
                color: 'whiteSmoke',
              }}>
                Trang chủ  /
              </Link>
              {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BreadCrumb