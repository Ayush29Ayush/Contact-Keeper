//! We're just going to check to see if a token is passed in.
//! If it is, then we're going to set it to the main the global header.
//! If not, then we're going to delete it from the global header.

import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
 