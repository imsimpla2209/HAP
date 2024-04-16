import axios from "axios";
import { base_url } from "../../../utils/axiosConfig";
import { instance } from "apis/http";

const postQuery = async (contactData) => {
  const respone = await instance.post(`/Guest/enquiries/add`, contactData);
  if (respone.data) {
    return respone.data;
  }
};


export const contactService = {
  postQuery,
};
