import axios from "axios";
import { base_url } from "../../../utils/axiosConfig";

const postQuery = async (contactData) => {
  const respone = await axios.post(`${base_url}enquiry`,contactData);
  if (respone.data) {
    return respone.data;
  }
};


export const contactService = {
    postQuery,
};
