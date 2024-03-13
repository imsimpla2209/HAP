import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getUsers } from "../../../features/customers/customerSlice";
import { deleteAUser, updateUserRole } from "../../../features/auth/authSlice";
import CustomModal from "../../../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Role",
    dataIndex: "role",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const User = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

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
  const customerstate = useSelector((state) => state.customer.customers);
  const data1 = [];
  console.log(customerstate[0]?._id)
  console.log(customerstate[1]?._id)
  console.log(userId)
  for (let i = 0; i < customerstate.length; i++) {
    data1.push({
      key: i + 1,
      name: customerstate[i].firstname + " " + customerstate[i].lastname,
      email: customerstate[i].email,
      mobile: customerstate[i].mobile,
      role: (
        <>
          <select
            name=""
            defaultValue={customerstate[i]?.role}
            onChange={(e) => updateRole(customerstate[i]?._id, e.target.value)}
            id=""
            className="form-control form-select"
          >
            <option value="admin">admin</option>
            <option value="user">user</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/user/${customerstate[i]._id}`}
          >
            <BiEdit />
          </Link>

          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(customerstate[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">User</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteUser(userId);
          }}
          title="Are you sure you want to delete this brand?"
        />
      </div>
    </div>
  );
};

export default User;
