import axios from 'axios';

const apiClient = axios.create({
    // APIのURI
    baseURL: "http://localhost:8080",
    // リクエストヘッダ
    headers: {
      "Content-type": "application/json",
    },
  });

class APIService {
    createUser(data: any): Promise<any> {
        return apiClient.post("/api/users", data);
    }
    loginUser(data: any): Promise<any> {
        return apiClient.post("/api/users/login", data);
    }
}

export default new APIService();