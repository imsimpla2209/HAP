import axios from "axios";
import { base_url } from "../../../utils/base_url"
import { config } from "../../../utils/axiosConfig"
import { instance } from "apis/http";


const getEnquiries = async () => {
  const response = await instance.get(`Admin/enquiries?page=0`, config);

  return response.data;
};
const deleteEnquiry = async (id) => {
  const response = await instance.delete(`Admin/enquiries/remove/${id}`, config);
  return response.data;
};
const getEnquiry = async (id) => {
  const response = await instance.get(`Admin/enquiries/${id}`, config);
  return response.data;
};
const udpateEnquiry = async (enq) => {
  const response = await instance.put(
    `Admin/enquiries/edit/${enq.enquiryId}`,
    { status: enq.enqData },
    config
  );
  return response.data;
};
const enquiryService = {
  getEnquiries,
  deleteEnquiry,
  getEnquiry,
  udpateEnquiry,
};

export default enquiryService;