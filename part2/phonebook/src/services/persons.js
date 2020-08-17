import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then(res => res.data);
};

const create = (newPersonObj) => {
  const req = axios.post(baseUrl, newPersonObj)
  return req.then(res => res.data);
};

const remove = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then(() => id);
};

const edit = (id, newPersonObj) => {
  const req = axios.put(`${baseUrl}/${id}`, newPersonObj);
  return req.then(res => res.data);
};

export default {getAll, create, remove, edit}