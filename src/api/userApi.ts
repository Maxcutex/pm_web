import axios from 'axios'

import { UserProfileType  } from '../types'
import { config } from '../config/index';
export const baseUrl = config.PM_API_BASE_URL; 
export const getUserProfile= async (
    id: number,
    token: string,
  ): Promise<UserProfileType> => {
    try {
        const url = `${baseUrl}/api/v1/users/${id}`
        axios.defaults.headers.Authorization = `Bearer ${token}` || "";
        const { data }  = await axios(url);
        return data
    } catch (error) {
      throw new Error(
        error.message || `Oops! That's awkward. We messed up.`
      )
    }
}