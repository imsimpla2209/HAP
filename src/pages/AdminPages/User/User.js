import { Table } from 'antd';
import React, { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomModal from "../../../components/CustomModal";
import { deleteAUser, updateUserRole } from "../../../features/auth/authSlice";
import { getUsers } from "../../../features/customers/customerSlice";
import { getColumnSearchProps } from 'utils'



const User = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (
    selectedKeys,
    confirm,
    dataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const columns = [
    {
      title: "No.",
      dataIndex: "key",
    },
    {
      title: "Tên",
      dataIndex: "name",
      sorter: (a, b) => (a.firstName + " " + a.lastName).length - (b.firstName + " " + b.lastName).length,
      ...getColumnSearchProps({ dataIndex: 'firstName', searchInput, setSearchText, searchedColumn, setSearchedColumn, handleSearch, handleReset, searchText })
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phoneNumber",
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
    },
    {
      title: "Hành Động",
      dataIndex: "action",
    },
  ];



  const showModal = (e) => {
    setOpen(true);
    setUserId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const updateRole = (a, b) => {
    dispatch(updateUserRole({ id: a, status: b }));
  };


  const deleteUser = (e) => {
    dispatch(deleteAUser(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getUsers());
    }, 100);
  };
  const usersState = useSelector((state) => state.customer.users);
  const data1 = [];
  console.log(userId)
  for (let i = 0; i < usersState?.length; i++) {
    data1.push({
      key: i + 1,
      name: usersState[i].firstName + " " + usersState[i].lastName,
      email: usersState[i].email,
      mobile: usersState[i].mobile,
      ...usersState[i],
      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/user/${usersState[i]._id}`}
          >
            <BiEdit />
          </Link>

          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(usersState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Người Dùng</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteUser(userId);
          }}
          title="Xóa người dùng này?"
        />
      </div>
    </div>
  );
};

export default User;
