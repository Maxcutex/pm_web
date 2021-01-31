import axios from 'axios'
import { getToken } from "../utils/common";
import { config } from '../config/index';
export const baseUrl = config.PM_API_BASE_URL;
var token = getToken()


export const getAllUsers = async () => {
  try {
    const url = `${baseUrl}/api/v1/users/`
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    const { data } = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,

      },

    });
    return data
  } catch (error) {
    throw new Error(
      error.message || `Oops! That's awkward. We messed up.`
    )
  }
}

export const getUserProfile = async (id) => {
  try {
    const url = `${baseUrl}/api/v1/users/user_profile/${id}`
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    const { data } = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,

      },

    });
    return data
  } catch (error) {
    throw new Error(
      error.message || `Oops! That's awkward. We messed up.`
    )
  }
}

export const getUserSkills = async (id) => {
  try {
    const url = `${baseUrl}/api/v1/user_skill/user/${id}`
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    const { data } = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return data
  } catch (error) {
    throw new Error(
      error.message || `Oops! That's awkward. We messed up.`
    )
  }
}

export const getUserSkill = async (id) => {
  try {
    const url = `${baseUrl}/api/v1/user_skill/user-single/${id}`
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    const { data } = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return data
  } catch (error) {
    throw new Error(
      error.message || `Oops! That's awkward. We messed up.`
    )
  }
}

export const getUserEmployments = async (id) => {
  try {
    const url = `${baseUrl}/api/v1/user_employment_history/user/${id}`
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    const { data } = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return data
  } catch (error) {
    throw new Error(
      error.message || `Oops! That's awkward. We messed up.`
    )
  }
}

export const getUserEmployment = async (id) => {
  try {
    const url = `${baseUrl}/api/v1/user_employment_history/user-single/${id}`
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    const { data } = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return data
  } catch (error) {
    throw new Error(
      error.message || `Oops! That's awkward. We messed up.`
    )
  }
}

export const getUserProjects = async (id) => {
  try {
    const url = `${baseUrl}/api/v1/user_project/${id}`
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    const { data } = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return data
  } catch (error) {
    throw new Error(
      error.message || `Oops! That's awkward. We messed up.`
    )
  }
}

export const getUserProject = async (id) => {
  try {
    const url = `${baseUrl}/api/v1/user_project/user-single/${id}`
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    const { data } = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return data
  } catch (error) {
    throw new Error(
      error.message || `Oops! That's awkward. We messed up.`
    )
  }
}

export const getUserEducations = async (id) => {
  try {
    const url = `${baseUrl}/api/v1/user_education/user/${id}`
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    const { data } = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return data
  } catch (error) {
    throw new Error(
      error.message || `Oops! That's awkward. We messed up.`
    )
  }
}


export const getUserEducation = async (id) => {
  try {
    const url = `${baseUrl}/api/v1/user_education/user-single/${id}`
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    const { data } = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return data
  } catch (error) {
    throw new Error(
      error.message || `Oops! That's awkward. We messed up.`
    )
  }
}

export const getUserHobbies = async (id) => {
  try {
    const url = `${baseUrl}/api/v1/user_hobby/${id}/`
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    const { data } = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return data
  } catch (error) {
    throw new Error(
      error.message || `Oops! That's awkward. We messed up.`
    )
  }
}

export const getSkills = async (id) => {
  try {
    const url = `${baseUrl}/api/v1/skills/`
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    const { data } = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return data
  } catch (error) {
    throw new Error(
      error.message || `Oops! That's awkward. We messed up.`
    )
  }
}

export const getCheckEmail = async (email) => {
  try {
    var url = `${baseUrl}/api/v1/users/check_email_exists?email=${email}`
    const { data } = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return data
  } catch (error) {
    throw new Error(
      error.message || `Oops! That's awkward. We messed up.`
    )
  }
}