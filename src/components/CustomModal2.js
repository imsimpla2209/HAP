import React from "react";
import { Modal, Button, Form, Input, Select } from "antd";

const { Option } = Select;

const CustomModal2 = ({ visible, hideModal, performAction, userData }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        performAction(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title="Edit User"
      visible={visible}
      onOk={handleOk}
      onCancel={hideModal}
      footer={[
        <Button key="back" onClick={hideModal}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} initialValues={userData}>
        <Form.Item label="First Name" name="firstname" rules={[{ required: true, message: "Please input your first name!" }]}>
          <Input disabled={userData?.isBlocked} />
        </Form.Item>
        <Form.Item label="Last Name" name="lastname" rules={[{ required: true, message: "Please input your last name!" }]}>
          <Input disabled={userData?.isBlocked} />
        </Form.Item>
        <Form.Item label="Phone Number" name="mobile" rules={[{ required: true, message: "Please input your mobile number!" }]}>
          <Input disabled={userData?.isBlocked} />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input disabled={userData?.isBlocked} />
        </Form.Item>
        <Form.Item label="City" name="city">
          <Input disabled={userData?.isBlocked} />
        </Form.Item>
        <Form.Item label="Country" name="country">
          <Input disabled={userData?.isBlocked} />
        </Form.Item>
        <Form.Item label="Role" name="role" rules={[{ required: true, message: "Please select a role!" }]}>
          <Select disabled={userData?.isBlocked}>
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CustomModal2;
