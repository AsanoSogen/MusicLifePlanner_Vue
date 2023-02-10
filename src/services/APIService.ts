import http from "@/http-common";

class APIService {
    createUser(data: any): Promise<any> {
        return http.post("/users", data);
    }
    loginUser(data: any): Promise<any> {
        return http.post("/api/users/login", data);
    }
}

export default new APIService();