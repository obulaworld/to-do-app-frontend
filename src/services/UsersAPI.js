import axios from "axios";
import { resolveBaseUrl } from ".";

const baseUrl = resolveBaseUrl();

class UsersAPI {
  static createUser(userData) {
    return axios.post(`${baseUrl}/users`, userData);
  }
  static fetchAllUsers() {
    return axios.get(`${baseUrl}/users`);
  }
  static updateUser(userData, userId) {
    return axios.put(`${baseUrl}/users/${userId}`, userData);
  }

  static deleteUser(userId) {
    return axios.delete(`${baseUrl}/users/${userId}`);
  }
}

export default UsersAPI;
