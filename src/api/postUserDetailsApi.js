import axios from 'axios'
import { getToken } from "../utils/common";

import { config } from '../config/index';


export const baseUrl = config.PM_API_BASE_URL;
var token = getToken()
export const postUserEmployment = async (action, id, form_data, token) => {
  try {
    var url = "";
    var method = "";
    if (action == "Add") {
      method = "post";
      url = `${baseUrl}/api/v1/user_employment_history/`
    } else {
      method = "put";
      url = `${baseUrl}/api/v1/user_employment_history/${id}`
    }
    // axios.defaults.headers.Authorization = `Bearer ${token}`;
    const { data } = await axios({
      method: method,
      url: url,
      data: form_data,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    });
    return data
  } catch (error) {
    throw new Error(
      error.message || `Oops! That's awkward. We messed up.`
    )
  }
}


export const postUserSummary = async (id, form_data) => {
  try {
    var method = "put"
    var url = `${baseUrl}/api/v1/users/${id}/summary`
    // axios.defaults.headers.Authorization = `Bearer ${token}`;
    console.log("axisossss  ", form_data)
    const { data } = await axios({
      method: method,
      url: url,
      data: form_data,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    });
    return data
  } catch (error) {
    throw new Error(
      error.message || `Oops! That's awkward. We messed up.`
    )
  }
}