import axios from "axios";

export const API_URL = "http://localhost:8080/api";


class AppServices {
    login(body) {
        return axios.post(`${API_URL}/admins/` + "login", body);
    }

    getEmployeeLaptopData(){
        return axios.get(`${API_URL}/employeeLaptops`);
    }

}

export default new AppServices();