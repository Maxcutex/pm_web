import axios from 'axios'
import { getToken } from "../utils/common";
import { toastSuccess, toastError } from '../utils/toast'
import { config } from '../config/index';
// import { profileImageUpload } from '../utils/imageHelper'


export const baseUrl = config.PM_API_BASE_URL;
var token = getToken()
export const postUserEmployment = async (action, id, form_data) => {
  try {
    var url = "";
    var method = "";
    if (action === "Add") {
      method = "post";
      url = `${baseUrl}/api/v1/user_employment_history/`
    } else {
      method = "put";
      url = `${baseUrl}/api/v1/user_employment_history/${id}`
    }
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


export const postUserEducation = async (action, id, form_data) => {
  try {
    var url = "";
    var method = "";
    if (action === "Add") {
      method = "post";
      url = `${baseUrl}/api/v1/user_education/`
    } else {
      method = "put";
      url = `${baseUrl}/api/v1/user_education/${id}`
    }
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

export const postUserInfo = async (id, form_data) => {
  try {
    var method = "put"
    var url = `${baseUrl}/api/v1/users/${id}/info`
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

export const postUserSkill = async (action, id, form_data) => {
  try {
    var url = "";
    var method = "";
    if (action === "Add") {
      method = "post";
      url = `${baseUrl}/api/v1/user_skill/`
    } else {
      method = "put";
      url = `${baseUrl}/api/v1/user_skill/${id}`
    }
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

export const postUserProfile = async (action, id, form_data) => {
  try {
    var url = "";
    var method = "";
    if (action === "Add") {
      method = "post";
      url = `${baseUrl}/api/v1/users/register/`
    } else {
      method = "put";
      url = `${baseUrl}/api/v1/users/${id}`
    }
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

// export const addImageUpload = async (id, formData) => {


//   return profileImageUpload(formData.file, formData.dataurl, (error, url) => {
//     if (error) throw error;
//     else {
//       const { file, dataurl, ...rest } = formData;
//       const reqData = { ...rest, image: url };

//       return axios
//         .post(`${baseUrl}/api/v1/users/upload_image/`, reqData)
//         .then((response) => {
//           const { mealItem } = response.data.payload;
//           toastSuccess('Image successfully uploaded');

//         })
//         .catch((err) => {
//           toastError(err.response.data.msg);
//         });
//     }
//   });
// };