/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <footer className='footer py-4'>
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src="images\newsletter.png" alt='newsleter' />
                <h2 className='mb-0 text-white'>Đăng ký để nhận bản tin </h2>
              </div>
            </div>
            <div className="col-7">
              <div className='input-group'>
                <input type='text'
                  className='form-control py-1'
                  placeholder='Nhập địa chỉ email'
                  aria-label='Your Email Address'
                  aria-describedby='basic-addon2'
                />
                <span className='input-group-text p-2' id='basic-addon2'>
                  Subcribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='footer py-3'>
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className='text-white mb-4'>Liên hệ</h4>
              <div >
                <a className="text-white fs-6">Cửa hàng </a>
                <address className="text-white py-2 mb-1"><br />Địa chỉ: 102 Vũ Phạm Hàm</address>
                <a href="tel: +84345532150"
                  className="mt-4 d-block mb-2 text-white">Số điện thoại: +84345532150</a>
                <a href="mailto: hdhien2002@gmail.com"
                  className="mt-4 d-block mb-2 text-white">Email</a>
                <div class="social-icons d-flex align-items-center gap-30">
                  <a href="#"><i class="fa fa-apple" id="apple"></i></a>
                  <a href="#"><i class="fa fa-twitter" id="twitter"></i></a>
                  <a href="#"><i class="fa fa-github-square github" id="github"></i></a>
                  <a href="#"><i class="fa fa-facebook-square" id="facebook"></i></a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className='text-white mb-4'>Thông tin</h4>
              <div className="footer-link d-flex flex-column">
                <Link className="text-white py-2 mb-1">Chính sách bảo mật</Link>
                <Link className="text-white py-2 mb-1">Chính sách điều khoản dịch vụ</Link>
              </div>

            </div>
            <div className="col-3">
              <h4 className='text-white mb-4'>Giới thiệu</h4>
              <div className="footer-link d-flex flex-column">
                <Link className="text-white py-2 mb-1">Tài khoản</Link>
                <Link className="text-white py-2 mb-1">Liên hệ</Link>
              </div>
            </div>
            <div className="col-2">
              <h4 class className="text-white py-2 mb-1">Đường dẫn nhanh</h4>
              <div className="footer-link d-flex flex-column">
                <Link className="text-white py-2 mb-1">Piano</Link>
                <Link className="text-white py-2 mb-1">Guitar</Link>
                <Link className="text-white py-2 mb-1">Organs</Link>
                <Link className="text-white py-2 mb-1">Ukulele</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='footer py-4'>
        <div className='container-xxl'>
          <div className="row">
            <div className="col-2 mb-0 text-white ">
              <p className="text-center">&copy; {new Date().getFullYear()}; Powered by Me</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer