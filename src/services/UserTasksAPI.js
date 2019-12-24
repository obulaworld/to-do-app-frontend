import axios from "axios";
import { resolveBaseUrl } from ".";

const baseUrl = resolveBaseUrl();

class UserTasksAPI {
  static createTask(taskData) {
    return axios.post(`${baseUrl}/tasks`, taskData);
  }
  static fetchAllUserTasks(userId) {
    return axios.get(`${baseUrl}/tasks/${userId}`);
  }
  static updateTask(taskData, taskId) {
    return axios.put(`${baseUrl}/tasks/${taskId}`, taskData);
  }

  static deleteTask(taskId) {
    return axios.delete(`${baseUrl}/tasks/${taskId}`);
  }
}

export default UserTasksAPI;
