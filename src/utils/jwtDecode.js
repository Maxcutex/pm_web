import jwtDecode from 'jwt-decode';
import { isAuthorized } from './authorization';


const decodeToken = (token) => {
  if (token!==null) {
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

  if (token!==null) {
    const decodedToken = jwtDecode(token);
    const { exp } = decodedToken;
    const newTime = Math.floor(new Date().getTime() / 1000)
    console.log("expiry time", exp)
    console.log("current time", newTime)
    if (exp > newTime) {    

      return true;
    } 
    
    return false;
  }
  return false;
}; 


const authCheck = (token) => {
  let decoded;
  if (token!==null) {
    // setAuthHeader(localStorage.jwtToken);
    // decoded = jwt_decode(localStorage.jwtToken);
    decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      sessionStorage.removeItem("token");
      window.location.href = "/login";
    }
    return decoded;
  }
};