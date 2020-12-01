import axios from "axios";

const API_BASE_URL = "https://yv0k2rnuv0.execute-api.us-east-1.amazonaws.com";

const api = ({ method, path, data, options }) => {
  const url = `${API_BASE_URL}${path}`;
  const config = {
    method,
    url,
    data,
    ...options
  };

  return axios(config);
};

export default api;
