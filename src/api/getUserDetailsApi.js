import axios from 'axios'

import { config } from '../config/index';
export const baseUrl = config.PM_API_BASE_URL; 
export const getUserProfile =  async (id, token) => {
    try {
        const url = `${baseUrl}/api/v1/users/${id}/`
        axios.defaults.headers.Authorization = `Bearer ${token}`;
        const { data }  =  await axios.get(url, {
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

export const getUserSkills =  async (id, token) => {
  try {
      const url = `${baseUrl}/api/v1/user_skill/${id}/`
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data }  =  await axios.get(url, {
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

export const getUserSkill =  async (id, token) => {
  try {
      const url = `${baseUrl}/api/v1/user_skill/user-single/${id}`
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data }  =  await axios.get(url, {
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

export const getUserEmployments=  async (id, token) => {
  try {
      const url = `${baseUrl}/api/v1/user_employment_history/user/${id}`
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data }  =  await axios.get(url, {
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

export const getUserEmployment=  async (id, token) => {
  try {
      const url = `${baseUrl}/api/v1/user_employment_history/user-single/${id}`
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data }  =  await axios.get(url, {
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

export const getUserProjects =  async (id, token) => {
  try {
      const url = `${baseUrl}/api/v1/user_project/${id}`
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data }  =  await axios.get(url, {
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

export const getUserProject =  async (id, token) => {
  try {
      const url = `${baseUrl}/api/v1/user_project/user-single/${id}`
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data }  =  await axios.get(url, {
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

export const getUserEducations =  async (id, token) => {
  try {
      const url = `${baseUrl}/api/v1/user_education/user/${id}`
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data }  =  await axios.get(url, {
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


export const getUserEducation =  async (id, token) => {
  try {
      const url = `${baseUrl}/api/v1/user_education/user-single/${id}`
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data }  =  await axios.get(url, {
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

export const getUserHobbies =  async (id, token) => {
  try {
      const url = `${baseUrl}/api/v1/user_hobby/${id}/`
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data }  =  await axios.get(url, {
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