import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

export const getCustomers = () => api.get("/customers");
export const getCustomerById = (id) => api.get(`/customers/${id}`);
export const createCustomer = (customer) => api.post("/customers", customer);

export const transferMoney = (transaction) =>
  api.post("/transactions", transaction);
export const getTransactionsByAccount = (accountNumber) =>
  api.get(`/transactions/${accountNumber}`);

export default api;
