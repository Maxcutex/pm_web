import jwtDecode from 'jwt-decode';
import { isAuthorized } from './authorization';


const decodeToken = (token) => {
  if (token.length !== 0) {
    try {
      const jwtToken = token[1];
      const decodedToken = jwtDecode(token);
      const userInfo = decodedToken.UserInfo;
      return userInfo;
    } catch (error) {
      return error;
    }
  }
  return 'unauthorised';
};
export default decodeToken;

export const isValid = (token) => {
  
  if (token.length!==0) {
    const decodedToken = jwtDecode(token);
    const { exp } = decodedToken;
    if (exp > Math.floor(new Date().getTime() / 1000)) {      
      return true;
    } 
    return false;
  }
  return false;
};