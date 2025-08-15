import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/PahanaBillingSystem_war'
});

export default api;
