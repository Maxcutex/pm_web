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
    const url = `${baseUrl}/api/v1/user_employment_history/user/${id}`
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    const { data } = await axios({
      method: method,
      url: url,
      data: form_data,
      headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
    });
    // .then(function (response) {
    //   //handle success
    //   console.log(response);
    // })
    // .catch(function (response) {
    //   //handle error
    //   console.log(response);
    // });
    // const { data } = await axios.post(url, {
    //   headers: {
    //     'Authorization': `Bearer ${token}`
    //   }
    // });
    return data
  } catch (error) {
    throw new Error(
      error.message || `Oops! That's awkward. We messed up.`
    )
  }
}
