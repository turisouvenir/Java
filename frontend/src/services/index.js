import axios from "axios";

export const API_URL = "http://localhost:8000/api/v1";


class AppServices {
    login(body) {
        return axios.post(`${API_URL}/auth/` + "login", body);
    }

    signup(body) {
        return axios.post(`${API_URL}/auth/register/as-standard/`, body);
    }
    getAuthToken() {
        const auth_token = localStorage.getItem('auth_token');
        return auth_token ? JSON.parse(auth_token) : null;
    }
    getProducts = async () => {
        return axios.get(API_URL + '/products', {
            headers: {
                'Authorization': await getAuthToken()
            }
        })
    }

    getEmployeeLaptopData() {
        return axios.get(`${API_URL}/employeeLaptops`);
    }
   

}


const getAuthToken = async () => {
    const auth_token = localStorage.getItem('auth_token');
    console.log(auth_token);
    return auth_token ? JSON.parse(auth_token) : null;
}

export default new AppServices();